const fs = require('fs');
const path = require('path');
const axios = require("axios");
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const { exec } = require('child_process');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function scrapeYouTubePage(url) {
    console.log('[scrapeYouTube] Launching browser...');
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-extensions',
            '--disable-gpu',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            '--ignore-certificate-errors'
        ],
        protocolTimeout: 180000, // 3 minutes
        timeout: 120000 // 2 minutes browser launch timeout
    });

    try {
        const page = await browser.newPage();
        page.setDefaultTimeout(60000);

        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
        );

        console.log(`[scrapeYouTube] Navigating to ${url}`);
        await page.goto(url, { waitUntil: "networkidle2", timeout: 45000 });

        // Wait for main video content
        await page.waitForSelector("#content", { timeout: 20000 });

        // // Scroll loop (load comments, recommendations, etc.)
        // console.log("[scrapeYouTube] Scrolling to load more...");
        // let prevHeight;
        // for (let i = 0; i < 8; i++) {
        //     prevHeight = await page.evaluate("document.documentElement.scrollHeight");
        //     await page.evaluate("window.scrollTo(0, document.documentElement.scrollHeight)");
        //     await new Promise(resolve => setTimeout(resolve, 2500));
        //     const newHeight = await page.evaluate("document.documentElement.scrollHeight");
        //     if (newHeight === prevHeight) break;
        // }

        // Extract only the #content div HTML
        console.log("[scrapeYouTube] Extracting #content div HTML...");
        const contentHtml = await page.evaluate(() => {
            const contentDiv = document.querySelector('#content');
            return contentDiv ? contentDiv.outerHTML : '';
        });

        // fs.writeFileSync("./text2.html", contentHtml);

        console.log(`[scrapeYouTube] Saved #content HTML (${contentHtml.length} chars)`);
        return contentHtml;
    } catch (err) {
        console.error("[scrapeYouTube] Error:", err);
        throw err;
    } finally {
        await browser.close();
    }
}

const extractYoutubeVideo = async (html) => {
    const cheerio = require('cheerio');
    const $ = cheerio.load(html);

    // 1. Extract main video data from #microformat script
    let videoData = {};
    const microformatScript = $('#microformat script[type="application/ld+json"]').html();
    if (microformatScript) {
        try {
            const json = JSON.parse(microformatScript);
            videoData.name = json.name || null;
            videoData.description = json.description || null;
            videoData.thumbnail = Array.isArray(json.thumbnailUrl) ? json.thumbnailUrl[0] : json.thumbnailUrl || null;
            videoData.uploadedDate = json.uploadDate || null;
            videoData.channelName = json.author || null;
        } catch (e) {
            // fallback: leave fields as null
        }
    }

    // 2. Extract video metrics from #factoids
    const metrics = {};
    const factoidsDiv = $('#factoids');
    if (factoidsDiv.length) {
        factoidsDiv.find('.ytwFactoidRendererFactoid').each((i, el) => {
            const label = $(el).find('.ytwFactoidRendererLabel').text().trim().toLowerCase();
            const value = $(el).find('.ytwFactoidRendererValue').text().trim();
            if (label.includes('like')) metrics.likes = value;
            if (label.includes('view')) metrics.views = value;
            if (label.match(/comment/)) metrics.comments = value;
            if (label.match(/\d{4}/)) metrics.uploadedYear = value; // sometimes year is in label
        });
    }

    // 3. Extract channel sub count from #owner-sub-count
    const subCount = $('#owner-sub-count').text().trim();
    if (subCount) {
        videoData.channelSubscribers = subCount;
    }

    // 4. Extract channel image from #owner yt-img-shadow img[src]
    let channelImage = null;
    const ownerDiv = $('#owner');
    if (ownerDiv.length) {
        const img = ownerDiv.find('yt-img-shadow img');
        if (img.length) {
            channelImage = img.attr('src') || null;
        }
    }
    videoData.channelImage = channelImage;

    // Merge metrics into videoData
    return { ...videoData, ...metrics };
}

const extractYoutubeChannelData = async (html) => {
    const $ = cheerio.load(html);
    // Banner image
    let bannerImg = null;
    const bannerDiv = $('#page-header-banner-sizer img');
    if (bannerDiv && bannerDiv.attr('src')) {
        bannerImg = bannerDiv.attr('src');
    }

    // Channel logo
    let logo = null;
    const logoImg = $('yt-avatar-shape img');
    if (logoImg && logoImg.attr('src')) {
        logo = logoImg.attr('src');
    }

    // Channel name, handle, verified
    let channelName = null;
    let channelHandle = null;
    let verified = false;
    const ytDynamic = $('yt-dynamic-text-view-model h1');
    if (ytDynamic.length) {
        // Get the first span inside h1
        const firstSpan = ytDynamic.find('span').first();
        if (firstSpan.length) {
            // Get only the direct text node (not children)
            channelName = firstSpan.clone().children().remove().end().text().trim();
        } else {
            // fallback: get all text
            channelName = ytDynamic.text().trim();
        }
        // Check for verified icon (svg present)
        verified = ytDynamic.find('svg').length > 0;
    }

    // Channel handle
    const handleSpan = $('yt-content-metadata-view-model span').filter(function() {
        return $(this).text().trim().startsWith('@');
    });
    if (handleSpan.length) {
        channelHandle = handleSpan.first().text().trim();
    }

    // Sub count and num videos
    let subCount = null;
    let numVideos = null;
    const metaRows = $('yt-content-metadata-view-model .yt-content-metadata-view-model-wiz__metadata-row');
    if (metaRows.length) {
        metaRows.each(function() {
            const text = $(this).text();
            // Subscribers
            if (/subscribers/i.test(text)) {
                subCount = text.match(/[\d.,]+\s*[MK]?\s*subscribers/i);
                if (subCount) subCount = subCount[0].replace('subscribers', '').trim();
            }
            // Videos (handle both '3.3K videos' and '3.3K' in a span)
            if (/videos/i.test(text)) {
                // Try to extract from '3.3K videos' pattern
                let match = text.match(/[\d.,]+\s*[MK]?\s*videos/i);
                if (match) {
                    numVideos = match[0].replace('videos', '').trim();
                } else {
                    // Try to find a span with 'videos' and get its text or previous sibling
                    $(this).find('span').each(function() {
                        const spanText = $(this).text();
                        if (/videos/i.test(spanText)) {
                            // Get just the number (from this or previous span)
                            let num = spanText.match(/[\d.,]+[MK]?/i);
                            if (num) {
                                numVideos = num[0].trim();
                            } else {
                                // Try previous sibling
                                const prev = $(this).prev('span');
                                if (prev.length) {
                                    let prevNum = prev.text().match(/[\d.,]+[MK]?/i);
                                    if (prevNum) numVideos = prevNum[0].trim();
                                }
                            }
                        }
                    });
                }
            }
        });
    }

    // Description
    let description = null;
    const descSpan = $('yt-description-preview-view-model truncated-text > truncated-text-content').first().find('span');
    if (descSpan.length) {
        description = descSpan.first().text().trim();
    }

    return {
        bannerImg,
        logo,
        channelName,
        channelHandle,
        verified,
        subCount,
        numVideos,
        description
    };
}

module.exports = {
    scrapeYouTubePage,
    extractYoutubeVideo,
    extractYoutubeChannelData
};
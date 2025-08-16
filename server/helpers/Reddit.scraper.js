const cheerio       = require('cheerio');
const puppeteer     = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs            = require('fs');

puppeteer.use(StealthPlugin());


async function scrapeRedditPost(url) {
    console.log('[scrapeRedditPost] Starting Puppeteer browser...');
    const browser = await puppeteer.launch({
        headless: "new",
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
    const page = await browser.newPage();
    page.setDefaultTimeout(60000);
    page.setDefaultNavigationTimeout(60000);

    // Set a realistic user-agent and language
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({
        'accept-language': 'en-US,en;q=0.9'
    });

    try {
        console.log(`[scrapeRedditPost] Navigating to URL: ${url}`);
        await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

        // Wait for the page to load completely
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Get only the <body> HTML from document
        const pageHtml = await page.evaluate(() => document.body.outerHTML);

        // Write HTML to text2.html file
        fs.writeFileSync('./text2.html', pageHtml);
        console.log('[scrapeRedditPost] HTML written to text2.html successfully!');

        await browser.close();
        console.log('[scrapeRedditPost] Scraping completed successfully.');
        return pageHtml;
    } catch (err) {
        await browser.close();
        console.log('[scrapeRedditPost] Error during scraping:', err);
        throw err;
    }
}

/**
 * Extracts essential Reddit post data from the HTML string of a Reddit post page.
 * @param {string} html - The HTML string (body) of the Reddit post page.
 * @returns {object} An object with title, subreddit, subredditIcon, timeAgo, username, body, score, commentCount
 */
function extractRedditPostData(html) {
    const $ = cheerio.load(html);
    let post = $('shreddit-post').first();
    // console.log("post Data is: ",post);
    if (!post.length) {
       post = $('shreddit-ad-post').first(); 
    }

    if (!post.length) {
        console.log('[extractRedditPostData] No post found in the HTML.');
        return null; // No post found
    }

    // Title
    const title = post.attr('post-title') || '';

    // Subreddit
    const subreddit = post.attr('subreddit-name') || '';

    // Subreddit Icon
    let subredditIcon = '';
    // Try to find the icon img inside the post
    const iconImg = post.find('img[alt$="icon"]');
    if (iconImg.length) {
        subredditIcon = iconImg.attr('src') || '';
    } else {
        subredditIcon = post.attr('icon') || '';
    }

    // Time Ago
    let timeAgo = '';
    const timeElem = post.find('faceplate-timeago time');
    if (timeElem.length) {
        timeAgo = timeElem.text().trim();
    }

    // Username
    let username = '';
    const authorSpan = post.find('span[slot="authorName"] a');
    if (authorSpan.length) {
        username = authorSpan.text().trim();
    } else {
        username = post.attr('author') || '';
    }

    // Body (HTML)
    let body = '';
    const bodyDiv = post.find('div[slot="text-body"]');
    if (bodyDiv.length) {
        bodyDiv.find('button[id$="read-more-button"]').remove();
        body = $.html(bodyDiv);
    }

    // Post Flair
    let postFlair = '';
    let postFlairBackground = '';
    const flairElem = post.find('shreddit-post-flair[slot="post-flair"] a');
    if (flairElem.length) {
        postFlair = flairElem.text().trim();

        const spanElem = flairElem.find('span');
        if (spanElem.length) {
            const style = spanElem.attr('style');
            if (style) {
                // Extract background-color from style attribute
                const bgColorMatch = style.match(/background-color\s*:\s*([^;]+)/i);
                if (bgColorMatch) {
                    postFlairBackground = bgColorMatch[1].trim();
                }
            }
        }
    }

    // Score (upvotes)
    const score = post.attr('score') || '';

    // Comment count
    const commentCount = post.attr('comment-count') || '';

    // Images inside <zoomable-img>
    let images = [];
    $('zoomable-img img').each((i, el) => {
        const src = $(el).attr('src');
        if (src) images.push(src);
    });

    // Images inside <gallery-carousel>
    $('gallery-carousel img').each((i, el) => {
        const src = $(el).attr('src');
        const lazySrc = $(el).attr('data-lazy-src');
        if (src && !images.includes(src)) images.push(src);
        if (lazySrc && !images.includes(lazySrc)) images.push(lazySrc);
    });

    // Videos inside <shreddit-player-2>
    let videos = [];
    let isVideoPresent = false;
    const videoPlayers = $('shreddit-player-2');
    if (videoPlayers.length > 0) {
        isVideoPresent = true;
        videoPlayers.each((i, el) => {
            const src = $(el).attr('src');
            if (src && !videos.includes(src)) videos.push(src);
            // Poster image
            const poster = $(el).attr('poster');
            if (poster && !images.includes(poster)) {
                // Place poster at the first index if not already present
                images.unshift(poster);
            }
        });
    }

    return {
        title,
        subreddit,
        subredditIcon,
        timeAgo,
        username,
        body,
        postFlair,
        postFlairBackground,
        score,
        commentCount,
        images,
        isVideoPresent,
        videos
    };
}

module.exports = {
    scrapeRedditPost,
    extractRedditPostData
};
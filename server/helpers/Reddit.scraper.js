const cheerio             = require('cheerio');
const puppeteer           = require('puppeteer-extra');
const StealthPlugin       = require('puppeteer-extra-plugin-stealth');
const { uploadDebugHTML } = require("./fileUpload");
const fs                  = require('fs');
const axios = require("axios");

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
        // await uploadDebugHTML(pageHtml, 'reddit');

        // Write HTML to text2.html file
        // fs.writeFileSync('./text2.html', pageHtml);
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

async function getRedditPostJSON(url) {
    try {
        let response = await axios({
            method:"GET",
            url: url + '.json',
            headers: {
                "User-Agent": "ZapshotInApp/1.0 (by /u/Enough_Machine_9164)",
                "Accept": "application/json",
            }
        });

        console.log("UserAgent: ","User-Agent: ZapshotInApp/1.0 (contact: https://zapshot.in)");
        console.log("Scraing url is : ", url + '.json');

        return response.data;
    }
    catch(err) {
        console.log('[scrapeRedditPost] Error during scraping:', err);
        throw err;
    }
}

const extractaDataFromJson = async (postJson) => {
    let postData = postJson[0].data.children[0].data;
    
    let title = postData?.title || '';
    let subreddit = postData?.subreddit_name_prefixed || '';
    let upvotes = postData?.ups || 0;
    let author = postData?.author || '';
    let comments = postData?.num_comments  || 0;
    let rawBody = postData?.selftext_html || '';
    let subredditIcon = '';
    let postFlairBackground = postData?.link_flair_background_color || '';
    let authorFlairBackground = postData?.author_flair_background_color || '';
    let authorFlairText;
    let authorFlairEmojees;
    let timeAgo = postData?.created_utc || 0;

    
    // Post Flair and Emoji
    let flairArray = postData?.link_flair_richtext || [];
    let emojiFlair = flairArray.find(flair => flair.e === 'emoji')?.u;
    let postFlair = flairArray.find(flair => flair.e === 'text')?.t;
    
    // Author Flair and Emojees
    authorFlairText = postData?.author_flair_richtext?.find(flair => flair.e === 'text')?.t?.trim() || '';
    authorFlairEmojees = postData?.author_flair_richtext?.map((item) => {
        if (item.e == "emoji") {
            return item.u;
        }
    });

    console.log("emojeesL :",authorFlairEmojees);


    let $stage1 = cheerio.load(rawBody);
    let body = $stage1.root().text();
    let images = [];

    // https://i.redd.it/${mediaId}.png

    if (subreddit) {
        let response = await axios({
            url: `https://www.reddit.com/${subreddit}/about.json`,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept': 'application/json',
                'Content-Type': 'application/json',   
            }
        });

        let subredditData = response?.data;
        subredditIcon = subredditData?.data?.community_icon?.replace(/&amp;/g, "&") || '';
    }

    let isGallery = postData?.is_gallery || false;
    let isVideo = postData?.is_video || false;

    if (isGallery) {
        let gallerItems = postData?.gallery_data?.items || [];
        images = gallerItems.map(item => {
            let mediaId = item?.media_id;
            let meta = postData?.media_metadata?.[mediaId];
            if (meta) {
                let ext = meta?.m?.split('/')?.[1] || 'jpg';
                return `https://i.redd.it/${mediaId}.${ext}`;
            }
            return null;
        }).filter(url => url !== null);
    } else if (!isVideo) {
        images = [postData?.thumbnail];
    }

    if (isVideo) {
        let thumbnail = postData?.thumbnail;
        images = [thumbnail.replace(/&amp;/g, "&")];
    }

    return {
        title,
        subreddit,
        subredditIcon: subredditIcon || 'https://www.redditstatic.com/avatars/avatar_default_02_24A0ED.png',
        timeAgo,
        username: author,
        body, 
        postFlair,
        postFlairBackground,
        score: upvotes,
        commentCount: comments,
        images,
        emojiFlair,
        isVideoPresent: isVideo,
        authorFlairBackground,
        authorFlairEmojees,
        authorFlairText
    }

}

module.exports = {
    scrapeRedditPost,
    extractRedditPostData,
    getRedditPostJSON,
    extractaDataFromJson
};
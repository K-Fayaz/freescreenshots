const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const cheerio = require('cheerio');
const axios = require("axios");

puppeteer.use(StealthPlugin());

async function scrapeTweet(url) {
    console.log('[scrapeTweet] Starting Puppeteer browser...');
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
            '--disable-renderer-backgrounding'
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
        console.log(`[scrapeTweet] Navigating to URL: ${url}`);
        // FIXME: Navigation timeout of 30000 ms exceeded - Fix this error
        await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

        // Wait for the tweet article, but with a timeout
        await page.waitForSelector("article", { timeout: 15000 });

        // Optionally, try to close login modal if it appears
        try {
            await page.click('div[role="dialog"] div[aria-label="Close"]', { timeout: 3000 });
        } catch (e) {
            // Modal not present, ignore
        }

        const tweetHtml = await page.$eval("article", el => el.outerHTML);

        await browser.close();
        console.log('[scrapeTweet] Scraping completed successfully.');
        return tweetHtml;
    } catch (err) {
        await browser.close();
        console.log('[scrapeTweet] Error during scraping:', err);
        throw err;
    }
}
  
async function scrapePeerlistPost(url) {
    console.log('[scrapePeerlistPost] Starting Puppeteer browser...');
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
            '--disable-renderer-backgrounding'
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
        console.log(`[scrapePeerlistPost] Navigating to URL: ${url}`);
        await page.goto(url, { waitUntil: "networkidle2" });
  
        // Fetch only the <body> HTML content of the page
        const bodyHtml = await page.$eval('body', el => el.outerHTML);
  
        await browser.close();
        console.log('[scrapePeerlistPost] Scraping completed successfully.');
        return bodyHtml;
    } catch (err) {
        await browser.close();
        console.log('[scrapePeerlistPost] Error during scraping:', err);
        throw err;
    }
}
  
function extractTweetData(htmlString) {
    const $ = cheerio.load(htmlString);

    // Main tweet (first occurrence)
    let username = null;
    let userHandle = null;
    const usernameElem = $('[data-testid="User-Name"]').eq(0);
    if (usernameElem.length) {
      // Find all spans
      const spans = usernameElem.find('span');
      spans.each((i, el) => {
        const txt = $(el).text().trim();
        if (!username && !txt.startsWith('@') && !txt.includes('·')) {
          username = txt;
        }
        if (!userHandle && txt.startsWith('@')) {
          userHandle = txt;
        }
      });
    }
    // Main tweet time: look for the first <time> element
    let time = null;
    const timeElem = $('time').first();
    if (timeElem.length) {
      time = timeElem.text().trim();
    }

    // Profile Picture (main)
    const profileImgElem = $('[data-testid^="UserAvatar-Container-"] img').eq(0);
    const profileImg = profileImgElem.length ? profileImgElem.attr('src') : null;

    // Tweet Content (main)
    const tweetContentElem = $('[data-testid="tweetText"]').eq(0);
    const tweetContent = tweetContentElem.length ? tweetContentElem.html() : null;

    // Tweet Image (main)
    let tweetImage = null;
    let isVideo = false;
    const tweetPhotoImg = $('[data-testid="tweetPhoto"] img').eq(0);
    if (tweetPhotoImg.length) {
      tweetImage = tweetPhotoImg.attr('src');
    }
    if (!tweetImage) {
      const videoPoster = $('[data-testid="videoComponent"] video[poster]').eq(0).attr('poster');
      if (videoPoster) {
        tweetImage = videoPoster;
        isVideo = true;
      }
    }
    if (!tweetImage) {
      const videoThumbImg = $('[data-testid="card.layoutLarge.media"] img').eq(0);
      if (videoThumbImg.length) {
        tweetImage = videoThumbImg.attr('src');
        isVideo = true;
      }
    }
    if (!tweetImage) {
      const fallbackImg = $('[data-testid="tweetPhoto"] img, img[alt="Image"]').filter((i, el) => $(el).attr('src')).eq(0);
      if (fallbackImg.length) tweetImage = fallbackImg.attr('src');
    }

    // --- Extract metrics: replies, retweets, likes, views ---
    let replies = null, retweets = null, likes = null, views = null;
    const metricsGroup = $('[role="group"]').first();
    if (metricsGroup.length) {
      // Replies
      const replyBtn = metricsGroup.find('button[data-testid="reply"]').first();
      if (replyBtn.length) {
        const replySpan = replyBtn.find('span').first();
        if (replySpan.length) replies = replySpan.text().trim();
      }
      // Retweets
      const retweetBtn = metricsGroup.find('button[data-testid="retweet"]').first();
      if (retweetBtn.length) {
        const retweetSpan = retweetBtn.find('span').first();
        if (retweetSpan.length) retweets = retweetSpan.text().trim();
      }
      // Likes
      const likeBtn = metricsGroup.find('button[data-testid="like"]').first();
      if (likeBtn.length) {
        const likeSpan = likeBtn.find('span').first();
        if (likeSpan.length) likes = likeSpan.text().trim();
      }
      // Views: look for the span with 'Views' nearby in metricsGroup
      let viewsCandidate = metricsGroup.find('span').filter((i, el) => $(el).text().trim().toLowerCase() === 'views').first();
      if (viewsCandidate.length) {
        const prev = viewsCandidate.prev();
        if (prev.length && prev.text()) {
          views = prev.text().trim();
        } else if (viewsCandidate.parent().length) {
          const numberSpan = viewsCandidate.parent().find('span').filter((i, el) => el !== viewsCandidate[0] && /[0-9]/.test($(el).text())).first();
          if (numberSpan.length) views = numberSpan.text().trim();
        }
      }
  
      // If not found in metricsGroup, try global search
      if (!views) {
        viewsCandidate = $('span').filter((i, el) => $(el).text().trim().toLowerCase() === 'views').first();
        if (viewsCandidate.length) {
          const prev = viewsCandidate.prev();
          if (prev.length && prev.text()) {
            views = prev.text().trim();
          } else if (viewsCandidate.parent().length) {
            const numberSpan = viewsCandidate.parent().find('span').filter((i, el) => el !== viewsCandidate[0] && /[0-9]/.test($(el).text())).first();
            if (numberSpan.length) views = numberSpan.text().trim();
          }
        }
      }
    }
  
    // --- Quoted Tweet Extraction (second occurrence) ---
    let isQuoted = false;
    let quoted = null;
    if ($('[data-testid="User-Name"]').length > 1 && $('[data-testid="tweetText"]').length > 1) {
      isQuoted = true;
      // Username (quoted)
      const qUsernameElem = $('[data-testid="User-Name"]').eq(1);
      // Username: first span inside User-Name that does NOT start with @ and does NOT contain '·'
      let qUsername = null;
      let qUserHandle = null;
      let qTime = null;
      if (qUsernameElem.length) {
        // Find all spans
        const spans = qUsernameElem.find('span');
        spans.each((i, el) => {
          const txt = $(el).text().trim();
          if (!qUsername && !txt.startsWith('@') && !txt.includes('·')) {
            qUsername = txt;
          }
          if (!qUserHandle && txt.startsWith('@')) {
            qUserHandle = txt;
          }
          if (!qTime && txt.includes('·')) {
            qTime = txt.replace('·', '').trim();
          }
        });
      }
      // Profile Picture (quoted)
      const qProfileImgElem = $('[data-testid^="UserAvatar-Container-"] img').eq(1);
      const qProfileImg = qProfileImgElem.length ? qProfileImgElem.attr('src') : null;
      // Tweet Content (quoted)
      const qTweetContentElem = $('[data-testid="tweetText"]').eq(1);
      const qTweetContent = qTweetContentElem.length ? qTweetContentElem.html() : null;
      // Tweet Image (quoted)
      let qTweetImage = null;
      let qIsVideo = false;
      const qTweetPhotoImg = $('[data-testid="tweetPhoto"] img').eq(1);
      if (qTweetPhotoImg.length) {
        qTweetImage = qTweetPhotoImg.attr('src');
      }
      if (!qTweetImage) {
        const qVideoPoster = $('[data-testid="videoComponent"] video[poster]').eq(1).attr('poster');
        if (qVideoPoster) {
          qTweetImage = qVideoPoster;
          qIsVideo = true;
        }
      }
      if (!qTweetImage) {
        const qVideoThumbImg = $('[data-testid="card.layoutLarge.media"] img').eq(1);
        if (qVideoThumbImg.length) {
          qTweetImage = qVideoThumbImg.attr('src');
          qIsVideo = true;
        }
      }
      if (!qTweetImage) {
        const qFallbackImg = $('[data-testid="tweetPhoto"] img, img[alt="Image"]').filter((i, el) => $(el).attr('src')).eq(1);
        if (qFallbackImg.length) qTweetImage = qFallbackImg.attr('src');
      }
      quoted = {
        username: qUsername,
        userHandle: qUserHandle,
        profileImg: qProfileImg,
        tweetContent: qTweetContent,
        tweetImage: qTweetImage,
        isVideo: qIsVideo,
        time: qTime
      };
    }

    return { username, userHandle, profileImg, tweetContent, tweetImage, replies, retweets, likes, views, isVideo, isQuoted, quoted, time };
}

function extractPeerlistPostData(htmlString) {
  const $ = cheerio.load(htmlString);

  // Try to get from JSON-LD if available
  const jsonLdScript = $('script#__NEXT_DATA__').html();
  console.log(jsonLdScript);
  let profileImg = null, username = null, profileHandle = null, contextLabel = null, title = null, content = null, upvotes = 0, comments = 0, reposts = 0, time = null, media = [], isVideo = false, embed = null, projectEmbed = null, linkEmbed = null;
  let pollEmbed = null;
  let articleEmbed = null;

  if (jsonLdScript) {
    try {
      const json = JSON.parse(jsonLdScript);
      const postData = json?.props?.pageProps?.postData;
      // Profile info
      profileImg = postData?.postedBy?.profilePicture || postData?.metaData?.createdBy?.profilePicture || null;
      username = postData?.postedBy?.displayName || postData?.metaData?.createdBy?.displayName || null;
      profileHandle = postData?.postedBy?.profileHandle || postData?.metaData?.createdBy?.profileHandle || null;
      // Context label
      contextLabel = postData?.contextLabel || postData?.context || null;
      // Title
      title = postData?.postTitle || postData?.postOG?.title || null;
      // Content
      content = postData?.caption || postData?.postOG?.description || null;
      // Upvotes, comments, reposts
      upvotes = postData?.upvoteCount ?? postData?.metaData?.upvotesCount ?? 0;
      comments = postData?.commentCount ?? postData?.metaData?.commentCount ?? 0;
      reposts = postData?.resharedCount ?? 0;
      // Time
      time = postData?.createdAt || postData?.timestamp || null;
      // Media: always use postData.media if present
      if (postData?.media && Array.isArray(postData.media)) {
        media = postData.media;
      }
      // isVideo
      isVideo = (postData?.videos && Array.isArray(postData.videos) && postData.videos.length > 0);
      // If video, filter out fallback and use postOG.image as thumbnail if present
      if (isVideo) {
        const VIDEO_FALLBACK = "https://dqy38fnwh4fqs.cloudfront.net/mobile/video-mobile-fallback.png";
        media = media.filter(url => url && url !== VIDEO_FALLBACK);
        if (postData?.postOG?.image) {
          media = [postData.postOG.image];
        }
      }
      // Filter out Peerlist's default "Read this post" image
      const DEFAULT_PEERLIST_IMAGE = "https://dqy38fnwh4fqs.cloudfront.net/website/scroll-post-og.webp";
      media = media.filter(url => url && url !== DEFAULT_PEERLIST_IMAGE);
      // Poll detection
      const jsonLD = postData?.jsonLD;
      if (jsonLD?.additionalType === "Poll") {
        const metaData = postData?.metaData || {};
        const options = metaData.option || {};
        const labels = Object.values(options).map(opt => opt.label).filter(Boolean);
        pollEmbed = {
          type: "poll",
          endsOn: metaData.endOn,
          totalVotes: metaData.totalVotes,
          labels
        };
      }

      console.log(postData);
      // Project embed detection (not else-if, so can coexist)
      if (postData?.embed === 'PROJECT' && postData?.metaData) {
        const meta = postData.metaData;
        projectEmbed = {
          type: 'project',
          title: meta.title || null,
          tagline: meta.tagline || null,
          logo: meta.logo || null,
          upvotes: meta.upvotesCount ?? null,
          comments: meta.commentCount ?? null,
          bookmarks: meta.bookmarkCount ?? null,
          categories: Array.isArray(meta.categories) ? meta.categories.map(cat => cat.name) : []
        };
      }
      // Article embed detection
      if (postData?.embed === 'ARTICLE' && postData?.metaData) {
        const meta = postData.metaData;
        articleEmbed = {
          type: 'article',
          title: meta.title || null,
          subtitle: meta.subTitle || null,
          keywords: meta?.seo?.keywords || [],
          upvoteCount: meta.upvoteCount ?? null,
          bookmarkCount: meta.bookmarkCount ?? null,
          commentCount: meta.commentCount ?? null,
          featuredImage: meta.featuredImage || null,
          readTime: meta.readTime || null,
          creator: meta.creator ? {
            displayName: meta.creator.displayName || null,
            profilePicture: meta.creator.profilePicture || null
          } : null
        };
      }
      // Link embed
      if (media.length === 0 && postData?.metaData?.link) {
        linkEmbed = {
          type: 'link',
          link: postData.metaData.link || null,
          image: postData.metaData.image || null,
          description: postData.metaData.description || null,
          title: postData.metaData.title || null,
          tldr: postData.metaData?.tldr || null
        };
      }
    } catch (e) {}
  }

  return {
    profileImg,
    contextLabel,
    profileHandle,
    username,
    content,
    title,
    upvotes,
    comments,
    reposts,
    time,
    media,
    isVideo,
    pollEmbed,
    projectEmbed,
    linkEmbed,
    articleEmbed
  };
}

module.exports = {
    scrapeTweet,
    scrapePeerlistPost,
    extractTweetData,
    extractPeerlistPostData
}
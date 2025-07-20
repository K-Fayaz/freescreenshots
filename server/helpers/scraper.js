const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const cheerio = require('cheerio');
const axios = require("axios");

puppeteer.use(StealthPlugin());

async function scrapeTweet(url) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Set a realistic user-agent and language
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({
        'accept-language': 'en-US,en;q=0.9'
    });

    try {
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
        return tweetHtml;
    } catch (err) {
        await browser.close();
        throw err;
    }
}
  
async function scrapePeerlistPost(url) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
  
    await page.goto(url, { waitUntil: "networkidle2" });
  
    // Fetch the entire HTML content of the page
    const fullHtml = await page.content();
  
    await browser.close();
    return fullHtml;
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

  // Profile picture
  let profileImg = null;
  const profileImgElem = $('img[alt][class*="rounded-full"][src]').first();
  if (profileImgElem.length) profileImg = profileImgElem.attr('src');

  // Username (display name)
  let username = null;
  const usernameElem = $('h3.text-gray-1k.font-semibold.text-sm').first();
  if (usernameElem.length) username = usernameElem.text().trim();

  // Profile handle (e.g., raymond)
  let profileHandle = null;
  const handleElem = $('div.text-gray-500.text-xs a[href^="/"] span').filter((i, el) => $(el).text().trim().startsWith('@')).first();
  if (handleElem.length) {
    profileHandle = handleElem.text().trim().replace(/^@/, '');
  }

  // #Show or #Ask (context label)
  let contextLabel = null;
  const contextElem = $('div.text-gray-500.text-xs a[href^="/scroll/"]').first();
  if (contextElem.length) {
    contextLabel = contextElem.text().trim().replace('#', '');
  }

  // Post title
  let title = null;
  const titleElem = $('h1.text-gray-1k.font-semibold').first();
  if (titleElem.length) title = titleElem.text().trim();

  // Post content (HTML, with \n)
  let content = null;
  const contentElem = $('.post-caption.rich-text-paragraph-regular').first();
  if (contentElem.length) {
    // Keep HTML, but replace <br> with \n for newlines
    content = contentElem.html()?.replace(/<br\s*\/?>(\s*)/gi, '\n');
  }

  // Upvotes (number)
  let upvotes = null;
  const upvoteBtn = $('button[title="Upvote"]').first();
  if (upvoteBtn.length) {
    const upvoteNum = upvoteBtn.find('span.tabular-nums').first().text().trim();
    if (upvoteNum) upvotes = upvoteNum;
  }

  // Comments (number)
  let comments = null;
  const commentBtn = $('button[title="Comment"]').first();
  if (commentBtn.length) {
    const commentNum = commentBtn.find('span.tabular-nums').first().text().trim();
    if (commentNum) comments = commentNum;
  }

  // Reposts (number)
  let reposts = null;
  const repostBtn = $('button[title="Reshare or Repost"]').first();
  if (repostBtn.length) {
    const repostNum = repostBtn.find('span.tabular-nums').first().text().trim();
    if (repostNum) reposts = repostNum;
  }

  // Time (e.g., '31m', '2h', etc.)
  let time = null;
  const timeElem = $('div.text-gray-500.text-xs span').filter((i, el) => /[0-9]+[mhds]/.test($(el).text().trim())).first();
  if (timeElem.length) time = timeElem.text().trim();

  // Media (array of image/video URLs)
  let media = [];
  // Main post image (if any)
  const postImageElem = $('.ml-12 .bg-gray-200, .ml-12 img').first();
  if (postImageElem.length && postImageElem.is('img')) {
    media.push(postImageElem.attr('src'));
  } else {
    // Try to get from JSON-LD if available
    const jsonLdScript = $('script#__NEXT_DATA__').html();
    if (jsonLdScript) {
      try {
        const json = JSON.parse(jsonLdScript);
        const postData = json?.props?.pageProps?.postData;
        if (postData?.media && Array.isArray(postData.media)) {
          media = postData.media;
        } else if (postData?.postOG?.image) {
          media = [postData.postOG.image];
        }
      } catch (e) {}
    }
  }

  // Fallback: if no media found, try og:image meta
  if (media.length === 0) {
    const ogImg = $('meta[property="og:image"]').attr('content');
    if (ogImg) media.push(ogImg);
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
    media
  };
}

module.exports = {
    scrapeTweet,
    scrapePeerlistPost,
    extractTweetData,
    extractPeerlistPostData
}
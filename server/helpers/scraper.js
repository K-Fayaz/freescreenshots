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

    // Tweet Images (main) - collect all images into an array
    let tweetImages = [];
    let video = null;
    let isVideo = false;
    
    // First, check if main tweet has a video component
    const videoComponent = $('[data-testid="videoComponent"] video').eq(0);
    if (videoComponent.length) {
      const videoSrc = videoComponent.attr('src');
      const videoPoster = videoComponent.attr('poster');
      if (videoSrc || videoPoster) {
        video = {
          src: videoSrc || null,
          poster: videoPoster || null
        };
        isVideo = true;
      }
    }
    
    // If no video component found, check for video thumbnails in main tweet
    if (!video) {
      const videoThumbImg = $('[data-testid="card.layoutLarge.media"] img').eq(0);
      if (videoThumbImg.length) {
        const src = videoThumbImg.attr('src');
        if (src) {
          video = {
            src: null,
            poster: src
          };
          isVideo = true;
        }
      }
    }
    
    // Only collect images if there's no video in main tweet
    if (!video) {
      // Get all tweet photos (only from the main tweet, not quoted)
      const tweetPhotoImgs = $('[data-testid="tweetPhoto"] img');
      tweetPhotoImgs.each((i, el) => {
        const src = $(el).attr('src');
        if (src) {
          // Only add if this image belongs to the main tweet (not quoted)
          // Check if this image is NOT within the quoted tweet section (r-9aw3ui r-1s2bzr4)
          const isMainTweetImage = $(el).closest('.r-9aw3ui.r-1s2bzr4').length === 0;
          if (isMainTweetImage) {
            tweetImages.push(src);
          }
        }
      });
      
      // Fallback: check for any images with alt="Image" in main tweet
      if (tweetImages.length === 0) {
        const fallbackImgs = $('img[alt="Image"]').filter((i, el) => $(el).attr('src'));
        fallbackImgs.each((i, el) => {
          const src = $(el).attr('src');
          if (src) {
            // Only add if this image belongs to the main tweet
            const isMainTweetImage = $(el).closest('.r-9aw3ui.r-1s2bzr4').length === 0;
            if (isMainTweetImage) {
              tweetImages.push(src);
            }
          }
        });
      }
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
      // Tweet Images (quoted) - collect all images into an array
      let qTweetImages = [];
      let qVideo = null;
      let qIsVideo = false;
      
      // Check for video components in quoted tweet
      const qVideoComponent = $('[data-testid="videoComponent"] video').eq(1);
      if (qVideoComponent.length) {
        const qVideoSrc = qVideoComponent.attr('src');
        const qVideoPoster = qVideoComponent.attr('poster');
        if (qVideoSrc || qVideoPoster) {
          qVideo = {
            src: qVideoSrc || null,
            poster: qVideoPoster || null
          };
          qIsVideo = true;
        }
      }
      
      // If no video component found, check for video thumbnails in quoted tweet
      if (!qVideo) {
        const qVideoThumbImg = $('[data-testid="card.layoutLarge.media"] img').eq(1);
        if (qVideoThumbImg.length) {
          const src = qVideoThumbImg.attr('src');
          if (src) {
            qVideo = {
              src: null,
              poster: src
            };
            qIsVideo = true;
          }
        }
      }
      
      // Only collect images if there's no video in quoted tweet
      if (!qVideo) {
        // Get all tweet photos for quoted tweet (only from the quoted tweet section)
        const qTweetPhotoImgs = $('[data-testid="tweetPhoto"] img');
        qTweetPhotoImgs.each((i, el) => {
          const src = $(el).attr('src');
          if (src) {
            // Only add if this image belongs to the quoted tweet section (r-9aw3ui r-1s2bzr4)
            const isQuotedTweetImage = $(el).closest('.r-9aw3ui.r-1s2bzr4').length > 0;
            if (isQuotedTweetImage) {
              qTweetImages.push(src);
            }
          }
        });
        
        // Fallback: check for any images with alt="Image" in quoted tweet
        if (qTweetImages.length === 0) {
          const qFallbackImgs = $('img[alt="Image"]').filter((i, el) => $(el).attr('src'));
          qFallbackImgs.each((i, el) => {
            const src = $(el).attr('src');
            if (src) {
              // Only add if this image belongs to the quoted tweet
              const isQuotedTweetImage = $(el).closest('.r-9aw3ui.r-1s2bzr4').length > 0;
              if (isQuotedTweetImage) {
                qTweetImages.push(src);
              }
            }
          });
        }
      }
      quoted = {
        username: qUsername,
        userHandle: qUserHandle,
        profileImg: qProfileImg,
        tweetContent: qTweetContent,
        tweetImages: qTweetImages,
        video: qVideo,
        isVideo: qIsVideo,
        time: qTime
      };
    }

    return { 
      username, 
      userHandle, 
      profileImg, 
      tweetContent, 
      tweetImages, 
      video, 
      replies, 
      retweets, 
      likes, 
      views, 
      isVideo, 
      isQuoted, 
      quoted, 
      time
    };
}

function extractPeerlistPostData(htmlString) {
  const $ = cheerio.load(htmlString);

  // Try to get from JSON-LD if available
  const jsonLdScript = $('script#__NEXT_DATA__').html();
  console.log(jsonLdScript);
  let profileImg = null, username = null, profileHandle = null, contextLabel = null, title = null, content = null, upvotes = 0, comments = 0, reposts = 0, time = null, media = [], isVideo = false, embed = null, projectEmbed = null, linkEmbed = null;
  let pollEmbed = null;
  let articleEmbed = null;
  let jobEmbed = null;
  let reshareEmbed = null;
  let profileEmbed = null;

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
      title = postData?.postTitle || null;
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
        
        // Extract votes for each option
        const votes = {};
        let hasVotes = false;
        
        Object.keys(options).forEach(optionKey => {
          const option = options[optionKey];
          votes[optionKey] = option.votes || 0;
          if (option.votes || option.votes === 0) {
            hasVotes = true;
          }
        });

        pollEmbed = {
          type: "poll",
          endsOn: metaData.endOn,
          totalVotes: metaData.totalVotes,
          labels,
          hasVotes,
          votes
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
      // Job embed detection
      if (postData?.embed === 'JOB' && postData?.metaData) {
        const meta = postData.metaData;
        jobEmbed = {
          type: 'job',
          companyLogo: meta.company?.logo || null,
          companyName: meta.companyName || meta.company?.name || null,
          jobTitle: meta.jobTitle || null,
          location: meta.location || null,
          jobType: meta.jobType || null,
          publishedAt: meta.publishedAt || null,
          experience: meta.experience || null,
          skills: Array.isArray(meta.skills) ? meta.skills : []
        };
      }
      // User Profile embed detection
      if (postData?.embed === 'USER_PROFILE' && postData?.metaData) {
        const meta = postData.metaData;
        profileEmbed = {
          type: 'profile',
          username: meta.displayName || null,
          bio: meta.headline || null,
          profilePicture: meta.profilePicture || null,
          skills: Array.isArray(meta.skills) ? meta.skills.slice(0, 4) : []
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

      // Reshare embed detection (highest priority)
      if (postData?.reshared && postData?.metaData) {
        const meta = postData.metaData;
        reshareEmbed = {
          type: 'reshare',
          resharedContext: meta.resharedContext || null,
          postTitle: meta.postTitle || null,
          content: meta.caption || null,
          createdAt: meta.createdAt || null,
          media: Array.isArray(meta.media) ? meta.media : [],
          videos: Array.isArray(meta.videos) ? meta.videos : [],
          username: meta.postedBy?.displayName || null,
          profilePicture: meta.postedBy?.profilePicture || null
        };
      }

      // Apply embed hierarchy: reshareEmbed > jobEmbed > articleEmbed > pollEmbed > projectEmbed > profileEmbed > linkEmbed
      // Only keep the highest priority embed, set others to null
      if (reshareEmbed) {
        // If reshareEmbed exists, clear all lower priority embeds
        jobEmbed = null;
        articleEmbed = null;
        pollEmbed = null;
        projectEmbed = null;
        profileEmbed = null;
        linkEmbed = null;
      } else if (jobEmbed) {
        // If jobEmbed exists, clear all lower priority embeds
        articleEmbed = null;
        pollEmbed = null;
        projectEmbed = null;
        profileEmbed = null;
        linkEmbed = null;
      } else if (articleEmbed) {
        // If articleEmbed exists (and no higher priority embeds), clear all lower priority embeds
        pollEmbed = null;
        projectEmbed = null;
        profileEmbed = null;
        linkEmbed = null;
      } else if (pollEmbed) {
        // If pollEmbed exists (and no higher priority embeds), clear lower priority embeds
        projectEmbed = null;
        profileEmbed = null;
        linkEmbed = null;
      } else if (projectEmbed) {
        // If projectEmbed exists (and no higher priority embeds), clear lower priority embeds
        profileEmbed = null;
        linkEmbed = null;
      } else if (profileEmbed) {
        // If profileEmbed exists (and no higher priority embeds), clear linkEmbed
        linkEmbed = null;
      }
      // If only linkEmbed exists, keep it as is
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
    articleEmbed,
    jobEmbed,
    reshareEmbed,
    profileEmbed
  };
}

function extractTweetDataNew(htmlString) {
    const $ = cheerio.load(htmlString);

    // Find the main tweet article
    const tweetArticle = $('[data-testid="tweet"]');
    if (!tweetArticle.length) {
        throw new Error('Tweet article not found');
    }

    // Navigate to the div with 6 children as per user's detailed structure
    let targetDiv = tweetArticle;
    targetDiv = targetDiv.children().first(); // First div inside article
    if (!targetDiv.length) return null;
    
    targetDiv = targetDiv.children().first(); // Second div
    if (!targetDiv.length) return null;
    
    targetDiv = targetDiv.children().eq(2); // Third div (this should have 6 children)
    if (!targetDiv.length) return null;

    const children = targetDiv.children();
    if (children.length < 6) {
        console.warn(`Expected 6 children, found ${children.length}`);
    }

    // Extract main tweet content from the first child of targetDiv
    const mainTweetContentDiv = children.eq(0);
    const mainTweetText = mainTweetContentDiv.find('[data-testid="tweetText"]').first();
    // console.log(mainTweetContentDiv)
    const tweetContent = mainTweetText.length ? mainTweetText.html() : null;
    // console.log("tweetContent: ",tweetContent);

    // Extract main tweet media and quoted tweet from the second child of targetDiv
    const mediaAndQuotedDiv = children.eq(1);
    const mediaAndQuotedChildren = mediaAndQuotedDiv.children();
    
    // Main tweet media div has child divs:
    // Could be 0, 1, or 2 children:
    // - 0: No media, no quoted tweet
    // - 1: Either main tweet media OR quoted tweet (need to check which)
    // - 2: Main tweet media (first child) + quoted tweet (second child)
    const mainTweetMediaDiv = mediaAndQuotedChildren.eq(0);
    const mainTweetMediaChildren = mainTweetMediaDiv.children();
    
    let tweetImages = [];
    let video = null;
    let isVideo = false;
    let isQuoted = false;
    let quoted = null;
    
    if (mainTweetMediaChildren.length === 0) {
        // No media, no quoted tweet
        // Do nothing, all variables remain null/false
    } else if (mainTweetMediaChildren.length === 1) {
        // Only one child - need to determine if it's main tweet media or quoted tweet
        const singleChild = mainTweetMediaChildren.eq(0);
        
                 // Check if this child is a quoted tweet by looking for profile details
         // If it has profile details (User-Name or UserAvatar), it's a quoted tweet
         // If it doesn't have profile details, it's main tweet media
         const hasProfileDetails = singleChild.find('[data-testid="User-Name"]').length > 0 || 
                                   singleChild.find('[data-testid^="UserAvatar-Container-"]').length > 0;
         
         if (!hasProfileDetails) {
            // This is main tweet media
            const mainTweetMediaContentDiv = singleChild;
            
            // Check for video in main tweet media
            const mainTweetVideo = mainTweetMediaContentDiv.find('[data-testid="videoComponent"] video').first();
            if (mainTweetVideo.length) {
                const videoSrc = mainTweetVideo.attr('src');
                const videoPoster = mainTweetVideo.attr('poster');
                if (videoSrc || videoPoster) {
                    video = { src: videoSrc || null, poster: videoPoster || null };
                    isVideo = true;
                }
            }
            
            // Collect images from main tweet media
            const mainTweetPhotos = mainTweetMediaContentDiv.find('[data-testid="tweetPhoto"] img');
            mainTweetPhotos.each((i, el) => {
                const src = $(el).attr('src');
                if (src && !src.includes('amplify_video_thumb')) { 
                    tweetImages.push(src); 
                }
            });

            console.log("main Tweet images: ",tweetImages);
          
          } else {
            // This is a quoted tweet (no main tweet media)
            const quotedTweetDiv = singleChild;
            const quotedTweetText = quotedTweetDiv.find('[data-testid="tweetText"]').first();
            if (quotedTweetText.length) {
                isQuoted = true;
                const qTweetContent = quotedTweetText.html();
                
                // Extract quoted tweet user info
                const qUsernameElem = quotedTweetDiv.find('[data-testid="User-Name"]').first();
                let qUsername = null, qUserHandle = null, qTime = null;
                if (qUsernameElem.length) {
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
                
                // Extract quoted tweet profile image
                const qProfileImgElem = quotedTweetDiv.find('[data-testid^="UserAvatar-Container-"] img').first();
                const qProfileImg = qProfileImgElem.length ? qProfileImgElem.attr('src') : null;
                
                let qTweetImages = [];
                let qVideo = null;
                let qIsVideo = false;
                
                // Check for video in quoted tweet
                const qVideoComponent = quotedTweetDiv.find('[data-testid="videoComponent"] video').first();
                if (qVideoComponent.length) {
                    const qVideoSrc = qVideoComponent.attr('src');
                    const qVideoPoster = qVideoComponent.attr('poster');
                    if (qVideoSrc || qVideoPoster) {
                        qVideo = { src: qVideoSrc || null, poster: qVideoPoster || null };
                        qIsVideo = true;
                    }
                }
                
                // If no video, collect images from quoted tweet
                if (!qVideo) {
                    const qTweetPhotos = quotedTweetDiv.find('[data-testid="tweetPhoto"] img');
                    qTweetPhotos.each((i, el) => {
                        const src = $(el).attr('src');
                        if (src) { qTweetImages.push(src); }
                    });
                }
                
                quoted = { 
                    username: qUsername, 
                    userHandle: qUserHandle, 
                    profileImg: qProfileImg, 
                    tweetContent: qTweetContent, 
                    tweetImages: qTweetImages, 
                    video: qVideo, 
                    isVideo: qIsVideo, 
                    time: qTime 
                };
            }
        }
    } else if (mainTweetMediaChildren.length >= 2) {
        // Two or more children: first is main tweet media, second is quoted tweet
        const mainTweetMediaContentDiv = mainTweetMediaChildren.eq(0);
        
        // Check for video in main tweet media
        const mainTweetVideo = mainTweetMediaContentDiv.find('[data-testid="videoComponent"] video').first();
        if (mainTweetVideo.length) {
            const videoSrc = mainTweetVideo.attr('src');
            const videoPoster = mainTweetVideo.attr('poster');
            if (videoSrc || videoPoster) {
                video = { src: videoSrc || null, poster: videoPoster || null };
                isVideo = true;
            }
        }

        console.log("before : ",tweetImages)
        
        // Collect images from main tweet media
        const mainTweetPhotos = mainTweetMediaContentDiv.find('[data-testid="tweetPhoto"] img');
        mainTweetPhotos.each((i, el) => {
            const src = $(el).attr('src');
            if (src && !src.includes('amplify_video_thumb')) { 
                tweetImages.push(src); 
            }
        });
        console.log("After : ",tweetImages)

        // Quoted tweet is in the second child
        const quotedTweetDiv = mainTweetMediaChildren.eq(1);
        const quotedTweetText = quotedTweetDiv.find('[data-testid="tweetText"]').first();
        if (quotedTweetText.length) {
            isQuoted = true;
            const qTweetContent = quotedTweetText.html();
            
            // Extract quoted tweet user info
            const qUsernameElem = quotedTweetDiv.find('[data-testid="User-Name"]').first();
            let qUsername = null, qUserHandle = null, qTime = null;
            if (qUsernameElem.length) {
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
            
            // Extract quoted tweet profile image
            const qProfileImgElem = quotedTweetDiv.find('[data-testid^="UserAvatar-Container-"] img').first();
            const qProfileImg = qProfileImgElem.length ? qProfileImgElem.attr('src') : null;
            
            let qTweetImages = [];
            let qVideo = null;
            let qIsVideo = false;
            
            // Check for video in quoted tweet
            const qVideoComponent = quotedTweetDiv.find('[data-testid="videoComponent"] video').first();
            if (qVideoComponent.length) {
                const qVideoSrc = qVideoComponent.attr('src');
                const qVideoPoster = qVideoComponent.attr('poster');
                if (qVideoSrc || qVideoPoster) {
                    qVideo = { src: qVideoSrc || null, poster: qVideoPoster || null };
                    qIsVideo = true;
                }
            }
            
            // If no video, collect images from quoted tweet
            if (!qVideo) {
                const qTweetPhotos = quotedTweetDiv.find('[data-testid="tweetPhoto"] img');
                qTweetPhotos.each((i, el) => {
                    const src = $(el).attr('src');
                    if (src) { qTweetImages.push(src); }
                });
            }
            
            quoted = { 
                username: qUsername, 
                userHandle: qUserHandle, 
                profileImg: qProfileImg, 
                tweetContent: qTweetContent, 
                tweetImages: qTweetImages, 
                video: qVideo, 
                isVideo: qIsVideo, 
                time: qTime 
            };
        }
    }
    console.log("quoted: ",quoted);
    // Extract main tweet metadata (username, handle, profile image, time) from the overall tweetArticle
    let username = null, userHandle = null, profileImg = null, time = null;
    const usernameElem = tweetArticle.find('[data-testid="User-Name"]').first();
    if (usernameElem.length) {
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
    
    const profileImgElem = tweetArticle.find('[data-testid^="UserAvatar-Container-"] img').first();
    profileImg = profileImgElem.length ? profileImgElem.attr('src') : null;
    
    const timeElem = tweetArticle.find('time').first();
    time = timeElem.length ? timeElem.text().trim() : null;

    // Extract metrics (replies, retweets, likes, views) from the overall tweetArticle
    let replies = null, retweets = null, likes = null, views = null;
    const metricsGroup = tweetArticle.find('[role="group"]').first();
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
        // Views
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

    return { 
        username, 
        userHandle, 
        profileImg, 
        tweetContent, 
        tweetImages, 
        video, 
        replies, 
        retweets, 
        likes, 
        views, 
        isVideo, 
        isQuoted, 
        quoted, 
        time
    };
}

function extractPeerlistProfileData(htmlString) {
  const $ = cheerio.load(htmlString);

  // Try to get from JSON-LD if available
  const jsonLdScript = $('script#__NEXT_DATA__').html();
  
  let displayName = null;
  let profileHandle = null;
  let followers = null;
  let profilePicture = null;
  let headline = null;
  let verified = null;
  let website = null;
  let createdAt = null;
  let skills = [];
  let projects = [];

  if (jsonLdScript) {
    try {
      const json = JSON.parse(jsonLdScript);
      const userData = json?.props?.pageProps?.user;
      
      if (userData) {
        // Extract basic profile information
        displayName = userData.displayName || null;
        profileHandle = userData.profileHandle || null;
        profilePicture = userData.profilePicture || null;
        headline = userData.headline || null;
        verified = userData.verified || false;
        website = userData.website || null;
        createdAt = userData.createdAt || null;
        
        // Extract followers count
        if (userData.networkCount && userData.networkCount.followers) {
          followers = userData.networkCount.followers;
        }
        
        // Extract skills - only the name part
        if (userData.skills && Array.isArray(userData.skills)) {
          skills = userData.skills.map(skill => skill.name || skill.label || skill.id).filter(Boolean);
        }
        
        // Extract projects
        if (userData.projects && Array.isArray(userData.projects)) {
          projects = userData.projects.map(project => ({
            title: project.title || null,
            tagline: project.tagline || null,
            logo: project.logo || null,
            categories: Array.isArray(project.categories) 
              ? project.categories.map(cat => cat.name).filter(Boolean)
              : [],
            commentCount: project.commentCount || 0,
            upvotesCount: project.upvotesCount || 0,
            bookmarkCount: project.bookmarkCount || 0
          }));
        }
      }
    } catch (e) {
      console.error('Error parsing JSON-LD script:', e);
    }
  }

  return {
    displayName,
    profileHandle,
    followers,
    profilePicture,
    headline,
    verified,
    website,
    createdAt,
    skills,
    projects
  };
}

module.exports = {
    scrapeTweet,
    scrapePeerlistPost,
    extractTweetData,
    extractTweetDataNew,
    extractPeerlistPostData,
    extractPeerlistProfileData
}
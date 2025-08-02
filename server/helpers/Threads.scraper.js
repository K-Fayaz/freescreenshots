const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const cheerio = require('cheerio');
const axios = require("axios");

puppeteer.use(StealthPlugin());

// Helper function to convert image URL to base64
async function imageToBase64(url) {
  if (!url || typeof url !== 'string') {
    console.error('Invalid URL provided to imageToBase64:', url);
    return null;
  }
  
  try {
    console.log(`Converting image to base64: ${url}`);
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache'
      }
    });
    
    const buffer = Buffer.from(response.data, 'binary');
    const base64 = buffer.toString('base64');
    const mimeType = response.headers['content-type'] || 'image/jpeg';
    
    console.log(`Successfully converted image to base64: ${url}`);
    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error(`Error converting image to base64: ${url}`, error.message);
    return null;
  }
}

// Helper function to convert multiple images to base64
async function convertImagesToBase64(imageUrls) {
  if (!imageUrls || !Array.isArray(imageUrls)) return [];
  
  const base64Promises = imageUrls.map(async (imageUrl) => {
    if (typeof imageUrl === 'string') {
      return await imageToBase64(imageUrl);
    } else if (imageUrl && imageUrl.src) {
      const base64 = await imageToBase64(imageUrl.src);
      return {
        ...imageUrl,
        src: base64 || imageUrl.src
      };
    }
    return imageUrl;
  });
  
  return await Promise.all(base64Promises);
}

async function scrapeThreadsPosts(url) {
    console.log('[scrapeThreadsPosts] Starting Puppeteer browser...');
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
            '--ignore-certificate-errors',
            '--ignore-ssl-errors',
            '--ignore-certificate-errors-spki-list',
            '--ignore-ssl-errors-spki-list',
            '--ignore-certificate-errors-spki-list',
            '--allow-running-insecure-content',
            '--disable-features=VizDisplayCompositor,VizHitTestSurfaceLayer'
        ],
        protocolTimeout: 180000,
        timeout: 120000
    });
    const page = await browser.newPage();
    page.setDefaultTimeout(60000);
    page.setDefaultNavigationTimeout(60000);
  
    // Handle certificate errors
    await page.setBypassCSP(true);
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({
        'accept-language': 'en-US,en;q=0.9'
    });
    
    // Listen for certificate errors and continue
    page.on('error', err => {
        console.log('[scrapeThreadsPosts] Page error:', err.message);
    });
    
    page.on('pageerror', err => {
        console.log('[scrapeThreadsPosts] Page error:', err.message);
    });
  
    try {
        console.log(`[scrapeThreadsPosts] Navigating to URL: ${url}`);
        await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
        
        await page.waitForSelector("body", { timeout: 15000 });
        
        const mountDivHtml = await page.$eval('div[id^="mount_"]', el => el.outerHTML);
  
        // console.log(mountDivHtml);
        
        await browser.close();
        console.log('[scrapeThreadsPosts] Scraping completed successfully.');
        return mountDivHtml;
    } catch (err) {
        await browser.close();
        console.log('[scrapeThreadsPosts] Error during scraping:', err);
        throw err;
    }
}

async function extractThreadsPostsData(htmlString,url) {
    console.log('[extractThreadsPostsData] Starting data extraction...');
    
    const $ = cheerio.load(htmlString);
    
    // Extract all posts from the page
    const posts = [];
    
    // Find all post containers using the data-pressable-container attribute
    $('[data-pressable-container="true"]').each((index, container) => {
      const $container = $(container);
      
      // Extract username from profile link
      const usernameElement = $container.find('a[href^="/@"]').first();
      const username = usernameElement.attr('href')?.replace('/@', '') || null;
      
      // Extract profile photo (using the x90nhty class pattern)
      const profilePhoto = $container.find('.x90nhty img, img[alt*="profile picture"]').first().attr('src') || null;
      
      // Extract timestamp
      const timestampElement = $container.find('time[datetime]').first();
      const timestamp = timestampElement.attr('datetime') || null;
      const timeDisplay = timestampElement.text().trim() || null;
      
             // Extract post text content - look for the main post text container
       let description = [];
       
       // Try to find the main post text container
       const postTextContainer = $container.find('[data-testid="post-text"], .x1a6qonq.x6ikm8r.x10wlt62.xj0a0fe.x126k92a.x6prxxf.x7r5mf7').first();
       
       if (postTextContainer.length) {
         // Get all text content from this container, avoiding duplicates
         const textElements = postTextContainer.find('span').filter((i, el) => {
           const text = $(el).text().trim();
           return text && text.length > 0 && !$(el).find('span').length; // Only leaf spans
         });
         
         const uniqueTexts = new Set();
         textElements.each((i, element) => {
           const text = $(element).text().trim();
           if (text && text.length > 0) {
             uniqueTexts.add(text);
           }
         });
         
         description = Array.from(uniqueTexts);
       } else {
         // Fallback: try a more specific selector
         const fallbackTexts = new Set();
         $container.find('.x1a6qonq span').filter((i, el) => {
           const text = $(el).text().trim();
           return text && text.length > 0 && !$(el).find('span').length; // Only leaf spans
         }).each((i, element) => {
           const text = $(element).text().trim();
           if (text && text.length > 0) {
             fallbackTexts.add(text);
           }
         });
         
         description = Array.from(fallbackTexts);
       }
      
      // Extract videos first to identify video thumbnails
      const videos = [];
      const videoThumbnails = new Set(); // Track video thumbnail URLs
      
      $container.find('video').each((i, element) => {
        const src = $(element).attr('src');
        const poster = $(element).attr('poster');
        if (src) {
          videos.push({
            src,
            poster,
            duration: $(element).attr('duration')
          });
          // Add poster/thumbnail URL to set if it exists
          if (poster) {
            videoThumbnails.add(poster);
          }
        }
      });
      
      // Extract images (using the x1xmf6yo class pattern for media containers)
      const images = [];
      $container.find('.x1xmf6yo img, .x1f7gzso img').each((i, element) => {
        const src = $(element).attr('src');
        const alt = $(element).attr('alt') || '';
        if (src && !src.includes('profile') && !src.includes('avatar')) {
          // Check if this image is a video thumbnail
          const isVideoThumbnail = videoThumbnails.has(src);
          
          images.push({
            src,
            alt,
            width: $(element).attr('width'),
            height: $(element).attr('height'),
            isVideo: isVideoThumbnail
          });
        }
      });
      
      // Extract engagement metrics using SVG aria-labels
      let likes = '0';
      $container.find('svg[aria-label="Like"]').each((i, element) => {
        const likeContainer = $(element).closest('div');
        const likeCountElement = likeContainer.find('span').last();
        const likeText = likeCountElement.text().trim();
        if (likeText && !isNaN(likeText)) {
          likes = likeText;
        }
      });
      
      let comments = '0';
      $container.find('svg[aria-label="Comment"]').each((i, element) => {
        const commentContainer = $(element).closest('div');
        const commentCountElement = commentContainer.find('span').last();
        const commentText = commentCountElement.text().trim();
        if (commentText && !isNaN(commentText)) {
          comments = commentText;
        }
      });
      
      let reposts = '0';
      $container.find('svg[aria-label="Repost"]').each((i, element) => {
        const repostContainer = $(element).closest('div');
        const repostCountElement = repostContainer.find('span').last();
        const repostText = repostCountElement.text().trim();
        if (repostText && !isNaN(repostText)) {
          reposts = repostText;
        }
      });
      
      let shares = '0';
      $container.find('svg[aria-label="Share"]').each((i, element) => {
        const shareContainer = $(element).closest('div');
        const shareCountElement = shareContainer.find('span').last();
        const shareText = shareCountElement.text().trim();
        if (shareText && !isNaN(shareText)) {
          shares = shareText;
        }
      });
      
      // Extract external links
      const externalLinks = [];
      $container.find('a[href*="l.threads.com"]').each((i, element) => {
        const href = $(element).attr('href');
        const text = $(element).text().trim();
        if (href && text) {
          externalLinks.push({ text, url: href });
        }
      });
      
      // Extract post URL
      const postUrl = $container.find('a[href*="/post/"]').first().attr('href') || null;
      
      // Create post object
      const post = {
        username,
        profilePhoto,
        timestamp,
        timeDisplay,
        description,
        images,
        videos,
        likes,
        comments,
        reposts,
        shares,
        externalLinks,
        postUrl
      };
      
      posts.push(post);
    });
    
    // If no posts found with the new method, fall back to the old method
    if (posts.length === 0) {
      console.log('[extractThreadsPostsData] No posts found with new method, using fallback...');
      
      // Extract title/username (fallback)
      const title = $('span[dir="auto"]').first().text().trim() || null;
      
      // Extract description/text content (fallback)
      const description = $('div[dir="auto"]').text().trim() || null;
      
      // Extract videos first to identify video thumbnails (fallback)
      const videos = [];
      const videoThumbnails = new Set();
      
      $('video').each((index, element) => {
        const src = $(element).attr('src');
        const poster = $(element).attr('poster');
        if (src) {
          videos.push({ src, poster });
          if (poster) {
            videoThumbnails.add(poster);
          }
        }
      });
      
      // Extract images array (fallback)
      const images = [];
      $('img').each((index, element) => {
        const src = $(element).attr('src');
        if (src && !src.includes('avatar') && !src.includes('profile')) {
          const isVideoThumbnail = videoThumbnails.has(src);
          images.push({ 
            src,
            isVideo: isVideoThumbnail
          });
        }
      });
      
      // Extract engagement metrics (fallback)
      const likes = $('span').filter((index, element) => {
        return $(element).text().includes('like') || $(element).text().includes('Like');
      }).first().text().trim() || '0';
      
      const comments = $('span').filter((index, element) => {
        return $(element).text().includes('comment') || $(element).text().includes('Comment');
      }).first().text().trim() || '0';
      
      const reposts = $('span').filter((index, element) => {
        return $(element).text().includes('repost') || $(element).text().includes('Repost');
      }).first().text().trim() || '0';
      
      const shares = $('span').filter((index, element) => {
        return $(element).text().includes('share') || $(element).text().includes('Share');
      }).first().text().trim() || '0';
      
      // Extract profile photo (fallback)
      const profilePhoto = $('img').filter((index, element) => {
        const src = $(element).attr('src');
        return src && (src.includes('avatar') || src.includes('profile'));
      }).first().attr('src') || null;
      
      posts.push({
        title,
        description,
        images,
        videos,
        likes,
        comments,
        reposts,
        shares,
        profilePhoto
      });
    }

         const parts = url.split("/");
     let userhandle = parts[3].split("@")[1];
     console.log("handle ",userhandle);
     
     // Collect all posts until we find the first match with userHandle
     let testData = [];
     let extractedData = null;
     
     for (let i = 0; i < posts.length; i++) {
       const item = posts[i];
       
       // Add this post to testData array
       testData.push(item);
       
       // Check if this post matches the userHandle
       if (item.username === userhandle) {
         extractedData = item;
         break; // Exit the loop once we find the first match
       }
     }

     console.log("testData ",testData);
     
     // If no match found, use the first post as fallback
     if (testData && testData.length > 0) {
       extractedData = testData;
     } else {
        extractedData = [posts[0]];
     }
    
    // console.log('[extractThreadsPostsData] Extracted data:', extractedData);
    
    // Convert images to base64 for all posts in the array
    console.log('[extractThreadsPostsData] Converting images to base64...');
    
    try {
      // Iterate through each post in the array
      for (let i = 0; i < extractedData.length; i++) {
        const post = extractedData[i];
        
        // Convert profile photo to base64
        if (post.profilePhoto) {
          console.log(`[extractThreadsPostsData] Converting profile photo for post ${i + 1}...`);
          post.profilePhoto = await imageToBase64(post.profilePhoto);
        }
        
        // Convert media images to base64
        if (post.images && post.images.length > 0) {
          console.log(`[extractThreadsPostsData] Converting ${post.images.length} media images for post ${i + 1}...`);
          post.images = await convertImagesToBase64(post.images);
        }
      }
      
      console.log('[extractThreadsPostsData] Base64 conversion completed successfully');
    } catch (error) {
      console.error('[extractThreadsPostsData] Error during base64 conversion:', error);
      // Continue with original URLs if base64 conversion fails
    }
    
    return extractedData;
}

module.exports = {
    scrapeThreadsPosts,
    extractThreadsPostsData
}
  
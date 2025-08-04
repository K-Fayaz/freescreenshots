const { 
  scrapePeerlistPost, 
  extractPeerlistPostData,
  extractPeerlistProfileData 
} = require("../helpers/Peerlist.scraper");

const {
  scrapeTweet,
  scrapeTweetProfile,
  extractTweetDataNew,
  extractTwitterProfileData
} = require("../helpers/Twitter.scraper");

const {
  scrapeThreadsPosts,
  scrapeThreadsProfile,
  extractThreadsPostsData,
  extractThreadsProfileData
} = require("../helpers/Threads.scraper");

const getDetails = async (req, res) => {
    try {
      const { url } = req.query;
      if (!url) {
        return res.status(400).json({ error: "Missing tweet URL" });
      }
  
      let html;
      let data;
      let type;
  
      let platform = url.split('/')[2];
      
      if (platform.includes('x.com')) {
        if (url.includes('/status/')) {
          type="post";
          html = await scrapeTweet(url);
          data = extractTweetDataNew(html);
          // console.log(html)
        } else {
          type="profile";
          html = await scrapeTweetProfile(url);
          data = extractTwitterProfileData(html);
          // console.log(data);
        }
      }
      else if (platform.includes('peerlist.io')) {
        
        html = await scrapePeerlistPost(url);

        if (url.includes('peerlist.io/scroll')) {
          data = extractPeerlistPostData(html);
          type="post";
        } else {
          data = extractPeerlistProfileData(html);
          type="profile";
        }
      } 
      else if (platform.includes('threads.com')) {
        if (url.includes('/post')) {
          type="post";
          html = await scrapeThreadsPosts(url);
          data = await extractThreadsPostsData(html,url);
        } else {
          type = "profile";
          html = await scrapeThreadsProfile(url);
          data = await extractThreadsProfileData(html,url);
        }
      }
      else {
        return res.status(400).json({ error: "Invalid URL" });
      }
  
  
      return res.status(200).json({
        status: "success",
        platform: platform,
        data: data,
        type:type
      });
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).json({
        status: "Something went wrong",
        error: err.message,
      });
    }
}

module.exports = {
    getDetails
}
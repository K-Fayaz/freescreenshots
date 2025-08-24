const User = require("../models/User");

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

const {
  getRedditPostJSON,
  extractaDataFromJson
} = require("../helpers/Reddit.scraper");

const {
  scrapeYouTubePage,
  extractYoutubeVideo,
  extractYoutubeChannelData
} = require("../helpers/Youtube.scraper");


const getDetails = async (req, res) => {
    try {
      const { url,userId } = req.query;

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
      } else if (platform.includes('reddit.com')) {
        let jsonData = await getRedditPostJSON(url);
        let data = await extractaDataFromJson(jsonData,url);

        return res.status(200).json({
          status: true,
          platform,
          data,
        });
      }
      else if (platform.includes('youtu.be') || platform.includes('youtube.com')) {
        platform = "youtube";
        if (url.includes('/channel') || url.includes('/@')) {
          console.log("this is a youtube chanel")
          type = "profile";
          html = await scrapeYouTubePage(url);
          data = await extractYoutubeChannelData(html);
        } else {
          type = "post";
          html = await scrapeYouTubePage(url);
          data = await extractYoutubeVideo(html);
        }
      }
      else {
        return res.status(400).json({ error: "Invalid URL" });
      }

      if (userId && userId !== "undefined" && userId !== "") {
        console.log("user id is: ",userId)
        let user = await User.findById(userId);
        if (user && user.subscription === "premium") {
          user.credits -= 1;
          await user.save();
        }
  
        if (user.credits <= 0 && user.subscription === "premium") {
          user.subscription = "free";
          user.credits = 0;
          await user.save();
        }
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
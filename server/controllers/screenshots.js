const { scrapeTweet, scrapePeerlistPost, extractTweetData, extractTweetDataNew, extractPeerlistPostData,extractPeerlistProfileData } = require("../helpers/scraper");


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
        html = await scrapeTweet(url);
        console.log(html)
        data = extractTweetDataNew(html);
        type="post";
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
      } else {
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
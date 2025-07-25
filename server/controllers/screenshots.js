const { scrapeTweet, scrapePeerlistPost, extractTweetData, extractPeerlistPostData } = require("../helpers/scraper");


const getDetails = async (req, res) => {
    try {
      const { url } = req.query;
      if (!url) {
        return res.status(400).json({ error: "Missing tweet URL" });
      }
  
      let html;
      let data;
  
      let platform = url.split('/')[2];
      console.log(platform);
      
      if (platform.includes('x.com')) {
        html = await scrapeTweet(url);
        console.log(html)
        data = extractTweetData(html);
      }
      else if (platform.includes('peerlist.io')) {
        html = await scrapePeerlistPost(url);
        // console.log(html)
        data = extractPeerlistPostData(html);
      }
  
  
      return res.status(200).json({
        status: "success",
        platform: platform,
        data: data
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
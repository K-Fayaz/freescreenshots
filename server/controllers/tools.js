const fs = require("fs");

const {
    getThreadsVideo,
    scrapeThreadsPosts,
    extractThreadsPostsData,
} = require("../helpers/Threads.scraper");

const { scrapeTweetHTML, scrapeTweetVideoUrls, combineAudioVideoFromUrls } = require("../helpers/Twitter.scraper");

const ThreadsVideoDownloader = async (req,res) => {
    try {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ error: "Missing tweet URL" });
        }
    
        let platform = url.split('/')[2];
    
        if (!platform.includes('threads.com')) {
            return res.status(400).json({ error: "Invalid URL" });
        }
    
        let html = await scrapeThreadsPosts(url);
        let data = await extractThreadsPostsData(html,url);

        let video = data[0].videos[0].src;
    
        return res.status(200).json({ video: video });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const TwitterVideoDownloader = async (req,res) => {
    try {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ error: "Missing tweet URL" });
        }
    
        let platform = url.split('/')[2];
    
        if (!platform.includes('x.com')) {
            return res.status(400).json({ error: "Invalid URL" });
        }
    
        // Use the new network interception scraper
        const videoUrls = await scrapeTweetVideoUrls(url);
        if (videoUrls.length === 0) {
            return res.status(404).json({ status: false, message: "No video URLs found." });
        }

        console.log(videoUrls)

        return res.status(200).json({
            videos: videoUrls
        });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message:"Something went wrong!"
        });
    }
}

const TwitterDownload = async (req, res) => {
    try {
        const { tweetUrl } = req.body;
        if (!tweetUrl) {
            return res.status(400).json({ error: "Missing tweet URL" });
        }
    
        let platform = tweetUrl.split('/')[2];
    
        if (!platform.includes('x.com')) {
            return res.status(400).json({ error: "Invalid URL" });
        }
    
        // Use the new network interception scraper
        const videoUrls = await scrapeTweetVideoUrls(tweetUrl);
        if (videoUrls.length === 0) {
            return res.status(404).json({ status: false, message: "No video URLs found." });
        }

        console.log(videoUrls)

        let { outputPath } = await combineAudioVideoFromUrls(videoUrls);

        console.log(outputPath);

        res.setHeader('Content-Disposition', 'attachment; filename="twitter_video.mp4"');
        res.setHeader('Content-Type', 'video/mp4');
        const stream = fs.createReadStream(outputPath);
        stream.pipe(res);
        stream.on('close', () => fs.unlinkSync(outputPath));
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message:"Something went wrong!"
        });
    }
}

module.exports = {
    ThreadsVideoDownloader,
    TwitterVideoDownloader,
    TwitterDownload
}
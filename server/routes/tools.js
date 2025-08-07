const express    = require("express");
const router     = express.Router();
const controller = require("../controllers/tools")

router.get('/threads-video-downloader',controller.ThreadsVideoDownloader);
router.get('/twitter-video-downloader',controller.TwitterVideoDownloader);
router.post('/twitter/download',controller.TwitterDownload);

module.exports = router;
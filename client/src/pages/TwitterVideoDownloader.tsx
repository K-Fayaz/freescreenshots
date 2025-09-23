import React, { useState, useRef, useEffect } from 'react';
// import Navbar from '../components/Navbar';
import Navbar from '@/components/LandingPageComps/Navbar';
import { Download } from 'lucide-react';
import Footer from '../components/Footer';
import axios from 'axios';
import BASE_URL from '@/config';
import { useToast } from '../components/ToastContext';
import Hls from "hls.js";
import { X } from 'lucide-react';

const TwitterVideoDownloader = () => {
  const [postUrl, setPostUrl] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [fetched,setFetched] = useState(false);
  const { showToast, showError } = useToast();
  const [scrapedVideos,setScrapedVideos] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostUrl(e.target.value);
  };

  const handleFetchTwo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFetching(true);


    axios({
      url: `${BASE_URL}api/tools/twitter-video-downloader?url=${postUrl}`,
      method:"GET",
    })
    .then((response) => {
      if (response.status == 200) {
        console.log(response);
        let videos = response?.data?.videos || [];
        setScrapedVideos(videos);
        setFetched(true);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsFetching(false);
    });
  }

  useEffect(() => {
    if (!scrapedVideos.length) return;
    console.log("Hey there: ", scrapedVideos[0]);

    let filterVideos = scrapedVideos.filter(video => video.includes('.m3u8'));

    if (filterVideos.length === 0) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(filterVideos[0]);
      hls.attachMedia(videoRef.current);

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      // For Safari
      videoRef.current.src = filterVideos[0];
    }
  }, [scrapedVideos]);

  const handleVideoDownload = async () => {
    if (scrapedVideos.length == 0) {
      return showError('No video available to download.');
    }
    
    let splittedUrl = postUrl.split('/');
    console.log(splittedUrl);

    let TweetId = splittedUrl[splittedUrl.length - 1];
    setIsDownloading(true);

    let videoUrl = scrapedVideos[0];

    let Apiurl = `${BASE_URL}api/tools/video/download?url=${encodeURIComponent(videoUrl)}`;

    const res = await fetch(Apiurl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zapshot-${TweetId}-video.mp4`;
    a.click();
    URL.revokeObjectURL(url);
    setIsDownloading(false)
  }

  const resetPage = () => {
    setFetched(false);
    setIsDownloading(false);
    setIsFetching(false);
    setScrapedVideos([]);
    setPostUrl('');
  }

  return (
    <>
      <Navbar page="not-landing"/>
      <div className="h-auto min-h-screen flex flex-col justify-between">
        <div className="flex-1 flex flex-col justify-center items-center my-10">
          <div className="max-w-xl w-full">
            <h1 className="text-2xl md:text-4xl font-bold text-center mb-2">Twitter Video Downloader</h1>
            <p className="mb-6 text-gray-600 text-center text-sm md:text-lg mt-5">Fast and free Twitter video downloader. Save videos from Twitter in HD MP4 format with one click.</p>
            <form onSubmit={handleFetchTwo} className="flex flex-col items-center md:flex-row gap-2 md:max-w-2xl mx-auto">
              <div className='relative'>
                <input
                  type="text"
                  value={postUrl}
                  onChange={handleInputChange}
                  disabled={fetched || isFetching}
                  placeholder="Paste Twitter video URL here"
                  className={`flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${fetched || isFetching ? 'text-gray-300 text-sm' : ''}`}
                  required
                />
                {
                  fetched && !isDownloading && (
                    <X size={18} onClick={resetPage} className='absolute top-5 right-2 font-bold rounded-full text-gray-700 hover:rounded-full hover:bg-gray-400 hover:p-0.5 cursor-pointer' />
                  )
                }
              </div>
              <button
                type="submit"
                disabled={!!scrapedVideos?.length || isDownloading || isFetching || fetched}
                className={`bg-black text-white hover:bg-gray-900 transition-colors duration-200 rounded-lg px-6 py-3 text-base md:text-lg font-semibold transition flex items-center gap-2 ${
                  !!scrapedVideos?.length || isDownloading || isFetching || fetched ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
              >
                <Download className="w-5 h-5" />
                {isFetching ? 'Fetching...' : 'Fetch Video'}
              </button>
            </form>
          </div>
          {
              scrapedVideos.length > 0 && (
                  <div className='max-w-5xl flex flex-col mt-5 items-center justify-between gap-5 p-5'>
                      <video ref={videoRef} muted controls={false} autoPlay={true} className="h-auto max-h-[300px] mt-5 rounded-lg shadow-lg"></video>

                      <button 
                        onClick={handleVideoDownload} 
                        disabled={isDownloading}
                        className={`bg-black text-white hover:bg-gray-900 transition-colors duration-200 rounded-lg px-6 py-3 font-semibold transition flex items-center gap-2 ${
                          isDownloading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                        }`}
                        >
                          {isDownloading ? 'Downloading...' : 'Download'}
                      </button>
                  </div>
              )
          }
          {
            fetched && !isFetching && scrapedVideos.length === 0 && (
              <div className="text-red-500 mt-5">
                <h1 className='md:text-xl'>No videos found for the provided URL. </h1>
              </div>
            )
          }
        </div>
        <Footer />
      </div>
    </>
  );
};

export default TwitterVideoDownloader;
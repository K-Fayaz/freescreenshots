import React, { useState, useRef, useEffect  } from 'react';
// import Navbar from '../components/Navbar';
import Navbar from '@/components/LandingPageComps/Navbar';
import { Download } from 'lucide-react';
import Footer from '../components/Footer';
import { ToastProvider } from '../components/ToastContext';
import { useToast } from '../components/ToastContext';
import BASE_URL from '@/config';
import axios from 'axios';
import Hls from "hls.js";
import { X } from 'lucide-react';

const RedditVideoDownloader = () => {
    const [postUrl, setPostUrl] = useState('');
    const [video, setVideo] = useState<string>('');
    const [isDownloading, setIsDownloading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const { showToast, showError } = useToast();
    const [scrapedVideos,setScrapedVideos] = useState<string[]>([]);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [fetched,setFetched] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostUrl(e.target.value);
    };

  const handleFetchVideo = (e: React.FormEvent) => {
    e.preventDefault();
    // To be implemented

    let url = `${BASE_URL}api/tools/reddit-video-downloader?url=${postUrl}`;
    setIsFetching(true);

    axios({
      method:"GET",
      url,
      headers: {
        'Content-Type':'application/json',
      }
    })
    .then((response) => {
      if (response.status === 200) {
        let videos = response?.data?.videos || [];
          // setScrapedVideos(videos);
          setFetched(true);
          setVideo(response?.data?.videos[0].url);
        } else {
          showError('Failed to fetch video. Please try again.');
        }
      })
    .catch((err) => {
      console.log(err);

      let message = err.response?.data?.message || 'An error occurred while fetching the video.';
      showError(message);
    })
    .finally(() => {
      setIsFetching(false);
    })
  };

  /*useEffect(() => {
        if (!scrapedVideos.length) return;
        console.log("Hey there: ",scrapedVideos[0]);
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(scrapedVideos[0]);
            hls.attachMedia(videoRef.current);

            return () => {
                hls.destroy();
            };
        } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
            // For Safari
            videoRef.current.src = scrapedVideos[0];
        }
  }, [scrapedVideos]);
  */

  /*const handleVideoDownload = async () => {
        if (scrapedVideos.length == 0) {
        return showError('No video available to download.');
        }
        
        let splittedUrl = postUrl.split('/');
        console.log(splittedUrl);

        let TweetId = splittedUrl[6] || splittedUrl[splittedUrl.length - 2];
        console.log(TweetId);
        console.log("video url : ",scrapedVideos[0]);
        setIsDownloading(true);

        let videoUrl = scrapedVideos[0];

        let Apiurl = `${BASE_URL}api/tools/reddit/video/download?url=${encodeURIComponent(videoUrl)}`;

        const res = await fetch(Apiurl);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `zapshot-${TweetId}-video.mp4`;
        a.click();
        URL.revokeObjectURL(url);
        setIsDownloading(false);
    }*/

  const handleDownload = async () => {
    if (!video) return;

    setIsDownloading(true);
    
    try {
      // Always treat video as a URL or data URL string
      const response = await fetch(video);
      const blob = await response.blob();
      let splited = postUrl.split('/');
      let name = `reddit-video-${splited[splited.length - 2]}.mp4`;
      downloadBlob(blob, name);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
      <div className="min-h-screen flex flex-col justify-between">
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="max-w-xl w-full">
            <h1 className="text-2xl md:text-4xl font-bold text-center mb-2">Reddit Video Downloader</h1>
            <p className="mb-6 text-gray-600 text-center text-sm md:text-lg mt-5">Fast and free Reddit video downloader. Save videos from Reddit in HD MP4 format with one click.</p>
            <form onSubmit={handleFetchVideo} className="flex flex-col items-center md:flex-row gap-2 md:max-w-2xl mx-auto">
              <div className='relative'>
                <input
                  type="text"
                  value={postUrl}
                  disabled={fetched || isFetching}
                  onChange={handleInputChange}
                  placeholder="Paste Reddit post URL here"
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
                disabled={!!video || isDownloading || isFetching}
                className={`rounded-lg px-6 py-3 text-base md:text-lg font-semibold transition flex items-center gap-2 bg-black text-white hover:bg-gray-900 transition-colors duration-200 ${
                  !!video || isDownloading || isFetching ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
              >
                <Download className="w-5 h-5" />
                {isFetching ? 'Fetching...' : 'Fetch Video'}
              </button>
            </form>
          </div>
          {/* {
              scrapedVideos.length > 0 && (
                  <div className='max-w-5xl flex flex-col mt-5 items-center justify-between gap-5 p-5'>
                      <video ref={videoRef} muted controls={false} className="mt-5 rounded-lg shadow-lg"></video>

                      <button 
                        onClick={handleVideoDownload} 
                        disabled={isDownloading}
                        className={`bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold transition flex items-center gap-2 bg-black text-white hover:bg-gray-900 transition-colors duration-200 ${
                          isDownloading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                        }`}
                        >
                          {isDownloading ? 'Downloading...' : 'Download'}
                      </button>
                  </div>
              )
          } */}

          {video && (
            <div className="grid place-items-center space-y-4 my-5">
              <video src={video} muted controls={false} autoPlay={true} className="h-auto max-h-[300px] mt-5 rounded-lg shadow-lg"></video>
                <button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className={`px-4 py-3 md:px-8 md:py-5 rounded-lg flex text-base md:text-lg items-center gap-2 font-medium transition-colors bg-black text-white hover:bg-gray-900 transition-colors duration-200 ${
                  isDownloading
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    : 'text-white'
                  }`}
                >
                  <Download className='w-5 h-5'/>
                    {isDownloading ? 'Downloading...' : 'Download Video'}
                </button>
            </div>
          )}

          {
            fetched && !isFetching && !video && (
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

export default RedditVideoDownloader;

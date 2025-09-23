import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
import Navbar from '@/components/LandingPageComps/Navbar';
import { Download } from 'lucide-react';
import Footer from '../components/Footer';
import axios from 'axios';
import BASE_URL from '@/config';
import { ToastProvider } from '../components/ToastContext';
import { useToast } from '../components/ToastContext';
import { X } from 'lucide-react';

const ThreadsVideoDownloader = () => {
  const [postUrl, setPostUrl] = useState('');
  const [video, setVideo] = useState<string>('');
  const [isDownloading,setIsDownloading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { showToast,showError } = useToast();
  const [fetched,setFetched] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostUrl(e.target.value);
  };


  const handleDownload = async () => {
    if (!video) return;

    setIsDownloading(true);
    
    try {
      // Always treat video as a URL or data URL string
      const response = await fetch(video);
      const blob = await response.blob();
      let splited = postUrl.split('/');
      let name = `threads-video-${splited[splited.length - 1]}.mp4`;
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

  const handleFetchVideo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFetching(true);
    let url = `${BASE_URL}api/tools//threads-video-downloader?url=${postUrl}`
    axios({
      url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (res.status == 200) {
        setVideo(res.data.video);
        setFetched(true);
      }
    })
    .catch((err) => {
      let message = err?.response?.data?.error || "something went wrong!";
      showError(message);
    })
    .finally(() => {
      setIsFetching(false);
    });
  };

  const resetPage = () => {
    setFetched(false);
    setIsDownloading(false);
    setIsFetching(false);
    setPostUrl('');
    setVideo('');
  }

  return (
      <>
        <Navbar page="not-landing" />
        <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="max-w-xl w-full">
              <h1 className="text-2xl md:text-4xl font-bold text-center mb-2">Threads Video Downloader</h1>
              <p className="mb-6 text-gray-600 text-center text-sm md:text-lg mt-5">Fast and free Threads video downloader. Save videos from Threads in HD MP4 format with one click.</p>
              <form onSubmit={handleFetchVideo} className="flex flex-col items-center md:flex-row gap-2 md:max-w-2xl mx-auto">
                <div className='relative'>
                  <input
                    type="text"
                    value={postUrl}
                    onChange={handleInputChange}
                    disabled={fetched || isFetching}
                    placeholder="Paste video Tweet URL here"
                    className={`flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${fetched || isFetching ? 'text-gray-300 text-sm' : ''}`}
                    required
                  />
                  {fetched && !isDownloading && (
                    <X size={18} onClick={resetPage} className='absolute top-5 right-2 font-bold rounded-full text-gray-700 hover:rounded-full hover:bg-gray-400 hover:p-0.5 cursor-pointer' />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!!video || isDownloading || isFetching}
                  className={`rounded-lg px-6 py-3 text-base md:text-lg font-semibold transition flex items-center gap-2 bg-black text-white hover:bg-gray-900 transition-colors duration-200${
                    !!video || isDownloading || isFetching ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                >
                  <Download className="w-5 h-5" />
                  {isFetching ? 'Fetching...' : 'Fetch Video'}
                </button>
              </form>
            </div>
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
              <div className="text-red-500 mt-5 mb-4">
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

export default ThreadsVideoDownloader;
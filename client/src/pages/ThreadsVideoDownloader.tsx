import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
import Navbar from '@/components/LandingPageComps/Navbar';
import { Download } from 'lucide-react';
import Footer from '../components/Footer';
import axios from 'axios';
import BASE_URL from '@/config';
import { ToastProvider } from '../components/ToastContext';
import { useToast } from '../components/ToastContext';

const ThreadsVideoDownloader = () => {
  const [postUrl, setPostUrl] = useState('');
  const [video, setVideo] = useState<string>('');
  const [isDownloading,setIsDownloading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { showToast,showError } = useToast();

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

  return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="max-w-xl w-full">
              <h1 className="text-2xl md:text-4xl font-bold text-center mb-2">Threads Video Downloader</h1>
              <p className="mb-6 text-gray-600 text-center text-sm md:text-lg mt-5">Fast and free Threads video downloader. Save videos from Threads in HD MP4 format with one click.</p>
              <form onSubmit={handleFetchVideo} className="flex flex-col items-center md:flex-row gap-2 md:max-w-2xl mx-auto">
                <input
                  type="text"
                  value={postUrl}
                  onChange={handleInputChange}
                  placeholder="Paste video Tweet URL here"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <button
                  type="submit"
                  disabled={!!video || isDownloading || isFetching}
                  className={`bg-blue-600 text-white rounded-lg px-6 py-3 text-base md:text-lg font-semibold transition flex items-center gap-2 ${
                    !!video || isDownloading || isFetching ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                >
                  <Download className="w-5 h-5" />
                  {isFetching ? 'Fetching...' : 'Fetch Video'}
                </button>
              </form>
            </div>
              {video && (
              <div className="grid place-items-center space-y-4 mt-5">
                <button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className={`px-4 py-3 md:px-8 md:py-5 rounded-lg flex text-base md:text-lg items-center gap-2 font-medium transition-colors ${
                    isDownloading
                      ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  <Download className='w-5 h-5'/>
                  {isDownloading ? 'Downloading...' : 'Download Video'}
                </button>
              </div>
            )}
          </div>
          <Footer />
        </div>
      </>
  );
};

export default ThreadsVideoDownloader;
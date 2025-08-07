import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Download } from 'lucide-react';
import Footer from '../components/Footer';
import axios from 'axios';
import BASE_URL from '@/config';
import { ToastProvider } from '../components/ToastContext';
import { useToast } from '../components/ToastContext';

const TwitterVideoDownloader = () => {
  const [postUrl, setPostUrl] = useState('');
  const [video, setVideo] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { showToast, showError } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostUrl(e.target.value);
  };

  const handleDownload = async () => {
    if (!video) return;
    setIsDownloading(true);
    try {
      const response = await fetch(video);
      const blob = await response.blob();
      let splited = postUrl.split('/');
      let name = `twitter-video-${splited[splited.length - 1]}.mp4`;
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

  const handleFetchVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFetching(true);
    
    try {
      const res = await fetch(`${BASE_URL}api/tools/twitter/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweetUrl: postUrl }),
      });

      if (!res.ok) {
        const error = await res.text();
        console.error(error);
        showError('Failed to download video');
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'twitter_video.mp4'; // Or dynamic name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      showError('Something went wrong!');
    } finally {
      setIsFetching(false);
    }
  };


  const handleFetchTwo = (e: React.FormEvent) => {
    e.preventDefault();

    axios({
      url: `${BASE_URL}api/tools/twitter-video-downloader?url=${postUrl}`,
      method:"GET",
    })
    .then((response) => {
      if (response.status == 200) {
        console.log(response);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Navbar />
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="max-w-xl w-full">
          <h1 className="text-4xl font-bold text-center mb-2">Twitter Video Downloader</h1>
          <p className="mb-6 text-gray-600 text-center text-lg mt-5">Fast and free Twitter video downloader. Save videos from Twitter in HD MP4 format with one click.</p>
          <form onSubmit={handleFetchTwo} className="flex gap-2 max-w-2xl mx-auto">
            <input
              type="text"
              value={postUrl}
              onChange={handleInputChange}
              placeholder="Paste Twitter video URL here"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              disabled={!!video || isDownloading || isFetching}
              className={`bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold transition flex items-center gap-2 ${
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
              className={`px-8 py-5 rounded-lg flex items-center gap-2 font-medium transition-colors ${
                isDownloading
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <Download className="w-5 h-5" />
              {isDownloading ? 'Downloading...' : 'Download Video'}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TwitterVideoDownloader;
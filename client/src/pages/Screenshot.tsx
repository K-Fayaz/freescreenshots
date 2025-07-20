import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import TweetPreview from '../components/TweetPreview';
import Sidebar from '../components/Sidebar';
import NewTweetModal from '../components/NewTweetModal';
import html2canvas from 'html2canvas';
import { toPng } from 'html-to-image';

// Define the color arrays here to sync with Sidebar
const lightColors = [
  '#ffffff', '#f3f4f6', '#e0e7ff', '#bae6fd', '#fef9c3', '#fca5a5', '#7C3AED'
];
const darkColors = [
  '#000000', '#1F2937', '#374151', '#111827', '#334155', '#0f172a', '#9333EA'
];

function Screenshot() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Shared state for Sidebar and TweetPreview
  const [theme, setTheme] = useState<'Light' | 'Dark'>('Dark');
  const [selectedColor, setSelectedColor] = useState(darkColors[0]);
  const [customColor, setCustomColor] = useState('#000');
  const [padding, setPadding] = useState(16);
  const [logo, setLogo] = useState('None');
  const [font, setFont] = useState('Inter');
  const [watermark, setWatermark] = useState(true);
  const [highlightColor, setHighlightColor] = useState('#3B82F6');
  const [timestamp, setTimestamp] = useState('Hidden');
  const [showTimeAgo, setShowTimeAgo] = useState(true);
  const [showMetrics, setShowMetrics] = useState(true);
  const [showViews, setShowViews] = useState(true);
  const [postDetails,setPostDetails] = useState(null);

  // Ref for the tweet card
  const tweetRef = useRef<HTMLDivElement>(null);

  const handleNewTweetClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Export function
  // const handleExport = async () => {
  //   if (!tweetRef.current) return;
  //   const canvas = await html2canvas(tweetRef.current, { backgroundColor: null, useCORS: true });
  //   const dataUrl = canvas.toDataURL('image/png');
  //   const link = document.createElement('a');
  //   link.href = dataUrl;
  //   link.download = 'tweet.png';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const handleExport = () => {
    if (tweetRef.current) {
      toPng(tweetRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'tweet.png';
          link.href = dataUrl;
          link.click();
        });
    }
  };

  // Update selectedColor when theme changes
  React.useEffect(() => {
    setSelectedColor(theme === 'Light' ? lightColors[0] : darkColors[0]);
  }, [theme]);

  // Props to pass down
  const sidebarProps = {
    theme, setTheme,
    selectedColor, setSelectedColor,
    customColor, setCustomColor,
    padding, setPadding,
    logo, setLogo,
    font, setFont,
    watermark, setWatermark,
    highlightColor, setHighlightColor,
    timestamp, setTimestamp,
    showTimeAgo, setShowTimeAgo,
    showMetrics, setShowMetrics,
    showViews, setShowViews,
    postDetails,
    onExport: handleExport,
  };
  const tweetPreviewProps = {
    theme,
    selectedColor,
    customColor,
    padding,
    logo,
    font,
    watermark,
    highlightColor,
    timestamp,
    showTimeAgo,
    showMetrics,
    showViews,
    tweetRef,
    postDetails,
  };

  // Skeleton component for loading
  const Skeleton = () => (
    <div className="bg-gray-100 min-h-screen grid place-items-center">
      <div className="bg-black rounded-md shadow-lg w-[460px] h-[220px] flex flex-col items-center justify-center">
        <div className="flex items-center mb-4 w-full px-8">
          <div className="w-10 h-10 bg-gray-700 rounded-full mr-4 animate-pulse" />
          <div className="flex-1">
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-2 animate-pulse" />
            <div className="h-4 bg-gray-700 rounded w-1/3 animate-pulse" />
          </div>
        </div>
        <div className="w-full px-8">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2 animate-pulse" />
          <div className="h-4 bg-gray-700 rounded w-2/4 mb-2 animate-pulse" />
        </div>
        <div className="flex space-x-2 w-full px-8 mt-4">
          <div className="h-4 bg-gray-700 rounded w-1/6 animate-pulse" />
          <div className="h-4 bg-gray-700 rounded w-1/6 animate-pulse" />
          <div className="h-4 bg-gray-700 rounded w-1/6 animate-pulse" />
        </div>
        <div className="flex justify-center items-center mt-6">
          <svg className="animate-spin h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <span className="text-sm text-blue-400">Loading...</span>
        </div>
      </div>
    </div>
  );

  // Common empty state card
  const EmptyState = () => (
    <div className="bg-gray-100 min-h-screen grid place-items-center">
      <div className="w-[460px] bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-10 border border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2M12 12v.01M12 16h.01M8 12h.01M16 12h.01" />
        </svg>
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Paste a Tweet URL to get started</h2>
        <p className="text-gray-500 text-center mb-2">Enter a tweet, thread, or profile URL using the button above.<br/>Your preview will appear here!</p>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header onNewTweetClick={handleNewTweetClick} />
      <div className="flex-1 flex">
        <div className="flex-1">
          {loading ? <Skeleton /> : !postDetails ? <EmptyState /> : <TweetPreview {...tweetPreviewProps} />}
        </div>
        <Sidebar {...sidebarProps} />
      </div>
      <NewTweetModal isOpen={isModalOpen} onClose={handleCloseModal} setPostDetails={setPostDetails} setLoading={setLoading} />
    </div>
  );
}

export default Screenshot; 
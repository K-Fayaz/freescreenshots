import React from 'react';
import { ChevronDown, Download, Copy, MoreHorizontal } from 'lucide-react';
import { FaTwitter } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { SiPeerlist } from "react-icons/si";
import { FaThreads } from "react-icons/fa6";
import styles from './RedditPost.module.css';
import RedditSnooIcon from './RedditSnooIcon';
import { SiYoutube } from "react-icons/si";
import PhKitty from "../assets/phKitty.png";
import igLogo1 from "../assets/ig-logo-1.png";
import igLogo2 from "../assets/igLogo-2.png";


interface SidebarProps {
  theme: 'Light' | 'Dark';
  setTheme: React.Dispatch<React.SetStateAction<'Light' | 'Dark'>>;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  customColor: string;
  setCustomColor: React.Dispatch<React.SetStateAction<string>>;
  padding: number;
  setPadding: React.Dispatch<React.SetStateAction<number>>;
  logo: string;
  setLogo: React.Dispatch<React.SetStateAction<string>>;
  font: string;
  setFont: React.Dispatch<React.SetStateAction<string>>;
  watermark: boolean;
  setWatermark: React.Dispatch<React.SetStateAction<boolean>>;
  highlightColor: string;
  setHighlightColor: React.Dispatch<React.SetStateAction<string>>;
  timestamp: string;
  setTimestamp: React.Dispatch<React.SetStateAction<string>>;
  showTimeAgo: boolean;
  setShowTimeAgo: React.Dispatch<React.SetStateAction<boolean>>;
  showMetrics: boolean;
  setShowMetrics: React.Dispatch<React.SetStateAction<boolean>>;
  showViews: boolean;
  setShowViews: React.Dispatch<React.SetStateAction<boolean>>;
  showProjects: boolean;
  foldProjects: boolean;
  foldText: boolean;
  showCaption: boolean;
  showGridView: boolean;
  setShowProjects: React.Dispatch<React.SetStateAction<boolean>>;
  setFoldProjects: React.Dispatch<React.SetStateAction<boolean>>;
  setFoldText: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCaption: React.Dispatch<React.SetStateAction<boolean>>;
  setShowGridView: React.Dispatch<React.SetStateAction<boolean>>;
  postDetails: any;
  onExport: () => void;
  exporting: boolean;
  parentWidth: number;
  setParentWidth: React.Dispatch<React.SetStateAction<number>>;
  showPauseOverlay: boolean;
  setShowPauseOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
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
  showProjects,foldProjects, setShowProjects, setFoldProjects,
  postDetails, onExport, exporting, parentWidth, setParentWidth,
  showPauseOverlay, setShowPauseOverlay,
  foldText, setFoldText,
  showCaption, setShowCaption,
  showGridView, setShowGridView
}) => {
  // Theme-based color and gradient options
  const lightColors = [
    '#ffffff', '#f3f4f6', '#e0e7ff', '#bae6fd', '#fef9c3', '#fca5a5', '#7C3AED'
  ];
  const darkColors = [
    '#000000','#1F2937', '#374151', '#111827', '#334155', '#0f172a', '#9333EA'
  ];
  const lightGradients = [
    'linear-gradient(90deg, #e0e7ff 0%, #bae6fd 100%)',
    'linear-gradient(90deg, #fef9c3 0%, #fca5a5 100%)',
    'linear-gradient(90deg, #f3f4f6 0%, #e0e7ff 100%)',
    'linear-gradient(90deg, #bae6fd 0%, #7C3AED 100%)',
    'linear-gradient(90deg, #fff1eb 0%, #ace0f9 100%)',
    'linear-gradient(90deg, #f9f9f9 0%, #fbc2eb 100%)',
    'linear-gradient(90deg, #f6d365 0%, #fda085 100%)',
  ];
  const darkGradients = [
    'linear-gradient(90deg, #ff5f6d 0%, #ffc371 100%)',      // Pink to yellow
    'linear-gradient(90deg, #36d1c4 0%, #1e3c72 100%)',      // Teal to blue
    'linear-gradient(90deg, #fc466b 0%, #3f5efb 100%)',      // Pink to blue
    'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)',      // Orange to yellow
    'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',      // Green to blue
    'linear-gradient(90deg, #ee0979 0%, #ff6a00 100%)',      // Magenta to orange
    'linear-gradient(90deg, #7f00ff 0%, #e100ff 100%)',      // Purple to magenta
  ];
  const colors = theme === 'Light' ? lightColors : darkColors;
  const gradientOptions = theme === 'Light' ? lightGradients : darkGradients;
  const highlightColors = [
    '#F59E0B', '#EF4444', '#3B82F6', '#10B981', '#EC4899'
  ];
  const paddingOptions = [16, 32, 64, 128];
  const widthOptions = [320, 400, 460, 540, 640];
  const [showSettings, setShowSettings] = React.useState(false);
  const [colorTab, setColorTab] = React.useState<'Color' | 'Gradient'>('Color');
  // Add state for custom gradient colors
  const [customGradientFrom, setCustomGradientFrom] = React.useState('#4F46E5');
  const [customGradientTo, setCustomGradientTo] = React.useState('#9333EA');
  return (
    <div className="w-[95%] md:w-[400px] bg-white border-l border-gray-200 overflow-y-auto md:overflow-x-hidden relative">
      <div className="p-6">
        {/* Theme Selection */}
        <div className="mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setTheme('Light')}
              className={`flex-1 px-4 rounded-lg border-2 ${
                theme === 'Light' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="text-xs font-medium text-gray-700 mb-2">Light</div>
              <div className="h-8 bg-white rounded border border-gray-200"></div>
            </button>
            <button
              onClick={() => setTheme('Dark')}
              className={`flex-1 py-4 px-4 rounded-lg border-2 ${
                theme === 'Dark' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="text-xs font-medium text-gray-700 mb-2">Dark</div>
              <div className="h-8 bg-gray-800 rounded"></div>
            </button>
          </div>
        </div>

        {/* Color/Gradient Tab Selection */}
        <div className="flex w-full bg-blue-50 rounded-lg mb-3">
          <button
            className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${colorTab === 'Color' ? 'bg-blue-500 text-white shadow' : 'bg-blue-50 text-blue-600'}`}
            onClick={() => setColorTab('Color')}
          >
            Color
          </button>
          <button
            className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${colorTab === 'Gradient' ? 'bg-blue-500 text-white shadow' : 'bg-blue-50 text-blue-600'}`}
            onClick={() => setColorTab('Gradient')}
          >
            Gradient
          </button>
        </div>

        {/* Color or Gradient Selection */}
        {colorTab === 'Color' ? (
          <div className="mb-6">
            <div className="flex space-x-2 mb-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-lg border-2 ${
                    selectedColor === color 
                      ? 'border-blue-500' 
                      : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-sm text-gray-500">Custom</span>
              <input
                type="color"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  setSelectedColor(e.target.value);
                }}
                className="w-8 h-8 p-0 border-none bg-transparent cursor-pointer"
                style={{ minWidth: 32 }}
              />
              <input
                type="text"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  setSelectedColor(e.target.value);
                }}
                className="flex-1 px-3 py-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <div className="flex space-x-2 mb-3">
              {gradientOptions.map((gradient, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(gradient)}
                  className={`w-8 h-8 rounded-lg border-2 ${
                    selectedColor === gradient 
                      ? 'border-blue-500' 
                      : 'border-gray-200'
                  }`}
                  style={{ background: gradient }}
                />
              ))}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-sm text-gray-500">Custom</span>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-1">
                  <span className="text-xs text-gray-500">From</span>
                  <input
                    type="color"
                    value={customGradientFrom}
                    onChange={(e) => {
                      setCustomGradientFrom(e.target.value);
                      setSelectedColor(`linear-gradient(90deg, ${e.target.value} 0%, ${customGradientTo} 100%)`);
                    }}
                    className="w-8 h-8 p-0 border-none bg-transparent cursor-pointer"
                    style={{ minWidth: 32 }}
                  />
                </label>
                <label className="flex items-center space-x-1">
                  <span className="text-xs text-gray-500">To</span>
                  <input
                    type="color"
                    value={customGradientTo}
                    onChange={(e) => {
                      setCustomGradientTo(e.target.value);
                      setSelectedColor(`linear-gradient(90deg, ${customGradientFrom} 0%, ${e.target.value} 100%)`);
                    }}
                    className="w-8 h-8 p-0 border-none bg-transparent cursor-pointer"
                    style={{ minWidth: 32 }}
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Padding */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Padding</span>
          </div>
          <div className="flex space-x-2">
            {paddingOptions.map((p) => (
              <button
                key={p}
                onClick={() => setPadding(p)}
                className={`px-3 py-1 text-sm rounded-md ${
                  padding === p 
                    ? 'bg-gray-200 text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Width Selection */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Parent Width</span>
          </div>
          <div className="flex space-x-2">
            {widthOptions.map((w) => (
              <button
                key={w}
                onClick={() => setParentWidth(w)}
                className={`px-3 py-1 text-sm rounded-md ${
                  parentWidth === w
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {w}px
              </button>
            ))}
          </div>
        </div>

        {/* Logo */}
        <div className="mb-6">
          <div className="flex space-x-4">
          {postDetails && (
            postDetails.platform === 'x.com' ? (
              <>
                <label className="flex flex-col items-center cursor-pointer">
                  <input
                    type="radio"
                    name="logo"
                    value="X"
                    checked={logo === 'X'}
                    onChange={() => setLogo('X')}
                    className="hidden"
                  />
                  <span className={`p-2 rounded-lg border-2 ${logo === 'X' ? 'border-blue-500' : 'border-gray-200'}`}>
                    <BsTwitterX size={24} />
                  </span>
                </label>
                <label className="flex flex-col items-center cursor-pointer">
                  <input
                    type="radio"
                    name="logo"
                    value="Twitter"
                    checked={logo === 'Twitter'}
                    onChange={() => setLogo('Twitter')}
                    className="hidden"
                  />
                  <span className={`p-2 rounded-lg border-2 ${logo === 'Twitter' ? 'border-blue-500' : 'border-gray-200'}`}>
                    <FaTwitter size={24} color="#1DA1F2" />
                  </span>
                </label>
              </>
            ) : postDetails.platform === 'peerlist.io' ? (
              <label className="flex flex-col items-center cursor-pointer">
                <input
                  type="radio"
                  name="logo"
                  value="Peerlist"
                  checked={logo === 'Peerlist'}
                  onChange={() => setLogo('Peerlist')}
                  className="hidden"
                />
                <span className={`p-2 rounded-lg border-2 ${logo === 'Peerlist' ? 'border-blue-500' : 'border-gray-200'}`}>
                  <svg width="30" height="30" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className=""><g id="Logo Colour=Primary, Logo Type=LogoMark, Shape=Squircle"><g id="bg"><path id="mask" d="M28 0C6.22222 0 0 6.22222 0 28C0 49.7778 6.23778 56 28 56C49.7622 56 56 49.7778 56 28C56 6.22222 49.7622 0 28 0Z" fill="#00AA45"></path><path id="mask (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M7.24755 7.24755C3.5875 10.9076 2 17.153 2 28C2 38.8461 3.59108 45.0918 7.25306 48.7521C10.9153 52.4127 17.1612 54 28 54C38.8388 54 45.0847 52.4127 48.7469 48.7521C52.4089 45.0918 54 38.8461 54 28C54 17.1539 52.4089 10.9082 48.7469 7.24787C45.0847 3.58733 38.8388 2 28 2C17.153 2 10.9076 3.5875 7.24755 7.24755ZM0 28C0 6.22222 6.22222 0 28 0C49.7622 0 56 6.22222 56 28C56 49.7778 49.7622 56 28 56C6.23778 56 0 49.7778 0 28Z" fill="#219653"></path></g><g id="logo"><path id="shadow" fillRule="evenodd" clipRule="evenodd" d="M27.0769 13H15V47H24.3846V39.8889H27.0769C34.7305 39.8889 41 33.9048 41 26.4444C41 18.984 34.7305 13 27.0769 13ZM24.3846 30.7778V22.1111H27.0769C29.6194 22.1111 31.6154 24.0864 31.6154 26.4444C31.6154 28.8024 29.6194 30.7778 27.0769 30.7778H24.3846Z" fill="#24292E"></path><path id="solid" fillRule="evenodd" clipRule="evenodd" d="M18 12H29.0769C36.2141 12 42 17.5716 42 24.4444C42 31.3173 36.2141 36.8889 29.0769 36.8889H25.3846V44H18V12ZM25.3846 29.7778H29.0769C32.1357 29.7778 34.6154 27.39 34.6154 24.4444C34.6154 21.4989 32.1357 19.1111 29.0769 19.1111H25.3846V29.7778Z" fill="white"></path><path id="outline" fillRule="evenodd" clipRule="evenodd" d="M17 11H29.0769C36.7305 11 43 16.984 43 24.4444C43 31.9048 36.7305 37.8889 29.0769 37.8889H26.3846V45H17V11ZM19 13V43H24.3846V35.8889H29.0769C35.6978 35.8889 41 30.7298 41 24.4444C41 18.1591 35.6978 13 29.0769 13H19ZM24.3846 18.1111H29.0769C32.6521 18.1111 35.6154 20.9114 35.6154 24.4444C35.6154 27.9775 32.6521 30.7778 29.0769 30.7778H24.3846V18.1111ZM26.3846 20.1111V28.7778H29.0769C31.6194 28.7778 33.6154 26.8024 33.6154 24.4444C33.6154 22.0864 31.6194 20.1111 29.0769 20.1111H26.3846Z" fill="#24292E"></path></g></g></svg>
                </span>
              </label>
            ) : postDetails.platform === 'www.threads.com' ? (
              <label className="flex flex-col items-center cursor-pointer">
                <input
                  type="radio"
                  name="logo"
                  value="Threads"
                  checked={logo === 'Threads'}
                  onChange={() => setLogo('Threads')}
                  className="hidden"
                />
                <span className={`p-2 rounded-lg border-2 ${logo === 'Threads' ? 'border-blue-500' : 'border-gray-200'}`}>
                  <FaThreads size={24} />
                </span>
              </label>
            ) : postDetails.platform === "reddit.com" || postDetails.platform === "www.reddit.com" ? (
                <label className="flex flex-col items-center cursor-pointer">
                  <input
                    type="radio"
                    name="logo"
                    value="Reddit"
                    checked={logo === 'Reddit'}
                    onChange={() => setLogo('Reddit')}
                    className="hidden"
                  />
                  <span className={`p-2 rounded-lg border-2 ${logo === 'Reddit' ? 'border-blue-500' : 'border-gray-200'}`}>
                    <RedditSnooIcon />
                  </span>
                </label>              
            ) : postDetails.platform === "youtube" ? (
              <label className="flex flex-col items-center cursor-pointer">
                  <input
                    type="radio"
                    name="logo"
                    value="youtube"
                    checked={logo === 'youtube'}
                    onChange={() => setLogo('youtube')}
                    className="hidden"
                  />
                  <span className={`p-2 rounded-lg border-2 ${logo === 'youtube' ? 'border-blue-500' : 'border-gray-200'}`}>
                    <SiYoutube className='text-[#ff0c12]' size={20}/>
                  </span>
                </label>    
            ): postDetails.platform === "www.producthunt.com" || postDetails.platform === "producthunt.com" ? (
                <label className="flex flex-col items-center cursor-pointer">
                  <input
                    type="radio"
                    name="logo"
                    value="ph"
                    checked={logo === 'ph'}
                    onChange={() => setLogo('ph')}
                    className="hidden"
                  />
                  <span className={`p-2 rounded-lg border-2 ${logo === 'ph' ? 'border-blue-500' : 'border-gray-200'}`}>
                    <img className='text-[#ff0c12] w-10 h-10' src={PhKitty} />
                  </span>
               </label>  
            ): postDetails.platform === "www.instagram.com" || postDetails.platform === "instagram.com" ? (
              <>
                <label className="flex flex-col items-center cursor-pointer">
                    <input
                      type="radio"
                      name="logo"
                      value="instagram"
                      checked={logo === 'instagram'}
                      onChange={() => setLogo('instagram')}
                      className="hidden"
                    />
                    <span className={`p-2 rounded-lg border-2 ${logo === 'instagram' ? 'border-blue-500' : 'border-gray-200'}`}>
                      <svg aria-label="Instagram" fill="currentColor" height="29" role="img" viewBox="32 4 113 32" width="103"><title>Instagram</title><path clip-rule="evenodd" d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z" fill="currentColor" fill-rule="evenodd"></path></svg>
                    </span>
                </label>
                
                <label className="flex flex-col items-center cursor-pointer">
                  <input
                    type="radio"
                    name="logo"
                    value="instagram-1"
                    checked={logo === 'instagram-1'}
                    onChange={() => setLogo('instagram-1')}
                    className="hidden"
                  />
                  <span className={`p-2 rounded-lg border-2 ${logo === 'instagram-1' ? 'border-blue-500' : 'border-gray-200'}`}>
                    <img 
                      src={igLogo1}
                      className='w-7 h-7 object-cover'
                      alt="ig logo 1"
                    />
                  </span>
               </label>

               <label className="flex flex-col items-center cursor-pointer">
                  <input
                    type="radio"
                    name="logo"
                    value="instagram-2"
                    checked={logo === 'instagram-2'}
                    onChange={() => setLogo('instagram-2')}
                    className="hidden"
                  />
                  <span className={`p-2 rounded-lg border-2 ${logo === 'instagram-2' ? 'border-blue-500' : 'border-gray-200'}`}>
                    <img 
                      src={igLogo2}
                      className='w-7 h-7 object-cover'
                      alt="ig logo 2"
                    />
                  </span>
               </label>
              </>
               
            )
            : null
          )}
            <label className="flex flex-col items-center cursor-pointer">
              <input
                type="radio"
                name="logo"
                value="None"
                checked={logo === 'None'}
                onChange={() => setLogo('None')}
                className="hidden"
              />
              <span className={`p-2 rounded-lg border-2 ${logo === 'None' ? 'border-blue-500' : 'border-gray-200'}`}>
                <span className="text-xs text-gray-500">None</span>
              </span>
            </label>
          </div>
        </div>

        {/* Have Projects for Peerlist Profile  */}
        { 
            postDetails && postDetails.platform === 'peerlist.io' && postDetails.type === "profile" && (
              <>
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">Projects</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showProjects}
                                onChange={(e) => setShowProjects(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
                
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">Fold Projects</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={foldProjects}
                                onChange={(e) => setFoldProjects(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
              </>
            )
        }

        {/* Font */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Font</span>
          </div>
          <div className="relative">
            <select
              value={font}
              onChange={(e) => setFont(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="Inter">Inter</option>
              <option value="ibmSans">IBM Plex Sans</option>
              <option value="noto">Noto Sans</option>
              <option value="rubik">Rubik</option>
              <option value="geistMono">Geist Mono</option>
              <option value="poppins">Poppins</option>
              <option value="imbMono">IBM Plex Mono</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>


        <div
          className="mb-6"
          style={{ minWidth: '240px' }}
        >
          {/* <div className="mb-4">
            <span className="text-sm text-gray-600 mb-2 block">Timestamp</span>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="timestamp"
                  value="Date"
                  checked={timestamp === 'Date'}
                  onChange={() => setTimestamp('Date')}
                  className="text-blue-600"
                />
                <span className="text-sm">Date</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="timestamp"
                  value="Datetime"
                  checked={timestamp === 'Datetime'}
                  onChange={() => setTimestamp('Datetime')}
                  className="text-blue-600"
                />
                <span className="text-sm">Datetime</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="timestamp"
                  value="Hidden"
                  checked={timestamp === 'Hidden'}
                  onChange={() => setTimestamp('Hidden')}
                  className="text-blue-600"
                />
                <span className="text-sm">Hidden</span>
              </label>
            </div>
          </div> */}
          <div className="space-y-3">
            {/* <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Show time ago</span>
              <button
                onClick={() => setShowTimeAgo(!showTimeAgo)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full ${
                  showTimeAgo ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${
                    showTimeAgo ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div> */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Show metrics</span>
              <button
                onClick={() => setShowMetrics(!showMetrics)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full ${
                  showMetrics ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${
                    showMetrics ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            {
              postDetails && (postDetails?.platform === "www.instagram.com" || postDetails?.platform === "instagram.com") && postDetails.type !== "profile" && (
                <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Fold Text</span>
                      <button
                        onClick={() => setFoldText(!foldText)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full ${
                          foldText ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${
                            foldText ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Show Caption</span>
                      <button
                        onClick={() => setShowCaption(!showCaption)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full ${
                          showCaption ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${
                            showCaption ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    {
                      postDetails?.post.carouselMedia.length > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Show Grid View</span>
                          <button
                            onClick={() => setShowGridView(!showGridView)}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full ${
                              showGridView ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${
                                showGridView ? 'translate-x-5' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      )
                    }
                </>
              )
            }
            {
              postDetails && (postDetails.platform === 'x.com' || postDetails.platform === "youtube") && postDetails.type !== "profile" && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Show views</span>
                    <button
                      onClick={() => setShowViews(!showViews)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full ${
                        showViews ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${
                          showViews ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                </div>   
              )
            }

            {
              postDetails && (postDetails.platform === "youtube") && postDetails.type !== "profile" && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Show Pause Overlay</span>
                    <button
                      onClick={() => setShowPauseOverlay(!showPauseOverlay)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full ${
                        showPauseOverlay ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${
                          showPauseOverlay ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                </div>   
              )
            }
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {/* <button className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Copy size={16} />
          </button> */}
          <button 
            className={`flex items-center justify-center space-x-2 flex-1 px-4 py-2 rounded-lg transition-colors ${
              exporting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
            onClick={onExport}
            disabled={exporting}
          >
            {exporting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download size={16} />
                <span>Export</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
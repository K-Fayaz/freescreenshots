import React from 'react';
import { ChevronDown, Download, Copy, MoreHorizontal } from 'lucide-react';
import { FaTwitter } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { SiPeerlist } from "react-icons/si";

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
  postDetails: any;
  onExport: () => void;
  parentWidth: number;
  setParentWidth: React.Dispatch<React.SetStateAction<number>>;
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
  showViews, setShowViews,postDetails, onExport, parentWidth, setParentWidth
}) => {
  // Theme-based color and gradient options
  const lightColors = [
    '#ffffff', '#f3f4f6', '#e0e7ff', '#bae6fd', '#fef9c3', '#fca5a5', '#7C3AED'
  ];
  const darkColors = [
    postDetails && postDetails.platform === 'peerlist.io' ? '#171717' : '#000000',
    '#1F2937', '#374151', '#111827', '#334155', '#0f172a', '#9333EA'
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
    <div className="w-110 bg-white border-l border-gray-200 h-screen overflow-y-auto overflow-x-hidden relative">
      <div className="p-6">
        {/* Tab Selection */}
        {/* <div className="flex space-x-1 mb-6">
          <button
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-blue-50 text-blue-600`}
          >
            Image
          </button>
        </div> */}

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
        <div className="mb-6">
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
            ) : (
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
            )
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
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Copy size={16} />
          </button>
          <button className="flex items-center justify-center space-x-2 flex-1 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            onClick={onExport}
          >
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
import React, { useState } from 'react';
import { AtSignIcon } from '../Icons/Mention';
import { SmileIcon } from '../Icons/EmojeeIcon';
import { FileTextIcon } from "../Icons/FileText";
import { UserIcon } from "../Icons/User";
import { TwitterPostSeed, TwitterSeed, TwitterQuotedPost } from "../Seed/HeroSeed";
import Tweet from './Tweet';
import TwitterUserProfile from './TwitterUserProfile';

const TwitterDetail = () => {
  const [activeTab, setActiveTab] = useState('Tweet');

  const handleFetchVideo = async (tweetUrl: string) => {
    try {
      const res = await fetch('/api/tools/twitter/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweetUrl }),
      });

      if (!res.ok) {
        const error = await res.text();
        console.error(error);
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
    }
  };

  return (
    <div id="x" className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side - Content */}
          <div className="text-left">
            <p className="text-blue-600 font-medium mb-2">Solutions</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Screenshot Tweet, never lose content
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              If you're looking for the best free tweet screenshot to share on media like Instagram newsletter or TikTok, this is it.
            </p>
            
            {/* Feature List */}
            <div className="space-y-4">
              {/* <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                  </svg>
                </div>
                <span className="text-gray-700">Long thread. Unroll long threads into image or PDF.</span>
              </div> */}
              
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center mr-4">
                  <AtSignIcon className='text-blue-600' />
                </div>
                <span className="text-gray-700">Quoted post. Fully display Quoted post.</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center mr-4">
                  <SmileIcon className='text-yellow-500'/>
                </div>
                <span className="text-gray-700">Media content. Format emojis 👍, links 🔗, and polls consistently.</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center mr-4">
                  <FileTextIcon className='text-blue-600' />
                </div>
                <span className="text-gray-700">Article. Turn Articles into image.</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center mr-4">
                  <UserIcon className="text-blue-600"/>
                </div>
                <span className="text-gray-700">Profile. Share your beautiful profile card.</span>
              </div>
            </div>
          </div>

                     {/* Right Side - Preview */}
           <div className="bg-white rounded-xl shadow-lg p-6 overflow-y-auto scrollbar-hide h-auto max-h-[600px] relative">
             {/* Tabs - Sticky Header */}
             <div className="sticky top-0 z-10 bg-white pb-4 mb-6">
               <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                 {['Tweet', 'Quoted', 'Article', 'Profile'].map((tab) => (
                   <button
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                       activeTab === tab 
                         ? 'bg-white text-purple-600 shadow-sm' 
                         : 'text-gray-600 hover:text-gray-900'
                     }`}
                   >
                     {tab}
                   </button>
                 ))}
               </div>
             </div>

            {/* Content based on active tab */}
            {activeTab === 'Tweet' && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide">
                <Tweet details={TwitterPostSeed.data} logo='X' theme='Light' showMetrics={true} showViews={true}/>
              </div>
            )}
            
            {activeTab === 'Quoted' && (
              <div className="bg-white border border-gray-200 rounded-lg overflow-y-auto scrollbar-hide">
                <Tweet details={TwitterQuotedPost.data} logo='X' theme='Light' showMetrics={true} showViews={true}/>
              </div>
            )}
            
            {activeTab === 'Article' && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide">
                <div className="text-center text-gray-500 py-8">
                  <p>Article preview coming soon...</p>
                </div>
              </div>
            )}
            
            {activeTab === 'Profile' && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide">
                <TwitterUserProfile details={TwitterSeed.data} logo='X' theme='Light' showMetrics={true} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterDetail; 
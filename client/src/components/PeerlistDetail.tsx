import React, { useState, useRef } from 'react';
import { AtSignIcon } from '../Icons/Mention';
import { SmileIcon } from '../Icons/EmojeeIcon';
import { FileTextIcon } from "../Icons/FileText";
import { UserIcon } from "../Icons/User";
import { LinkIcon } from "../Icons/Link"
import { ArrowBigUpIcon } from "../Icons/Project";
import { ChartBarDecreasingIcon } from "../Icons/ChartBar";
import { PeerlistProfileData, PeerlistPostSeed,PeerlistLinkEmbed,PeerlistProjectEmbed,PeerlistPollEmbed,PeerlistArticleEmbed,PeerlistQuotedEmbed } from "../Seed/HeroSeed";
import Tweet from './Tweet';
import TwitterUserProfile from './TwitterUserProfile';
import PeerlistProfile from './PeerlistProfile';
import PeerlistPost from './PeerlistPost';

const PeerlistDetail = () => {
  const [activeTab, setActiveTab] = useState('Post');
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsContainerRef.current) {
      const container = tabsContainerRef.current;
      const scrollAmount = 200; // Adjust this value to control scroll distance
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div id="peerlist" className="w-full py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side - Content */}
          <div className="text-left">
            <p className="text-blue-600 font-medium mb-2">Solutions</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Screenshot Peerlist, showcase your work
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Create stunning screenshots from Peerlist posts, profiles, and embeds to share your professional journey and projects.
            </p>
            
            {/* Feature List */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center mr-4">
                  <FileTextIcon className='text-blue-600' />
                </div>
                <span className="text-gray-700">Post. Capture professional posts with rich formatting and media.</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center mr-4">
                  <UserIcon className="text-blue-600"/>
                </div>
                <span className="text-gray-700">Profile. Showcase your professional profile and achievements.</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center mr-4">
                  <LinkIcon className='text-green-600'/>
                </div>
                <span className="text-gray-700">Link Embeds. Display external links with rich previews.</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center mr-4">
                  <ArrowBigUpIcon className='text-purple-600' />
                </div>
                <span className="text-gray-700">Project Embeds. Showcase your projects and portfolios.</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center mr-4">
                  <ChartBarDecreasingIcon className='text-orange-500'/>
                </div>
                <span className="text-gray-700">Poll Embeds. Capture interactive polls and surveys.</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center mr-4">
                  <FileTextIcon className='text-blue-600' />
                </div>
                <span className="text-gray-700">Article Embeds. Turn articles into beautiful images.</span>
              </div>
            </div>
          </div>

          {/* Right Side - Preview */}
           <div className="bg-white rounded-xl shadow-lg p-6 overflow-y-auto scrollbar-hide h-auto max-h-[600px] relative">
            {/* Tabs - Sticky Header */}
            <div className="sticky top-0 z-10 bg-white pb-4 mb-6">
              <div className="flex items-center space-x-2">
                {/* Left Navigation Arrow */}
                 <button 
                   onClick={() => scrollTabs('left')}
                   className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                   </svg>
                 </button>
                 
                 {/* Tabs Container */}
                 <div 
                   ref={tabsContainerRef}
                   className="flex-1 flex space-x-1 bg-gray-100 rounded-lg p-1 overflow-x-auto scrollbar-hide"
                 >
                   {['Post', 'Profile', 'Link Embed',"Quoted Post", 'Project Embed', 'Poll Embed', 'Article Embed'].map((tab) => (
                     <button
                       key={tab}
                       onClick={() => setActiveTab(tab)}
                       className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                         activeTab === tab 
                           ? 'bg-white text-purple-600 shadow-sm' 
                           : 'text-gray-600 hover:text-gray-900'
                       }`}
                     >
                       {tab}
                     </button>
                   ))}
                 </div>
                 
                 {/* Right Navigation Arrow */}
                 <button 
                   onClick={() => scrollTabs('right')}
                   className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                   </svg>
                 </button>
              </div>
            </div>

            {/* Content based on active tab */}
                         {activeTab === 'Post' && (
               <div className="bg-white border rounded-lg overflow-y-auto scrollbar-hide">
                 <PeerlistPost details={PeerlistPostSeed.data} logo='Peerlist' theme='Light' showMetrics={true} />
               </div>
             )}
             
             {activeTab === 'Profile' && (
               <div className="bg-white border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide">
                 <div className="text-gray-500">
                     <PeerlistProfile details={PeerlistProfileData.data} logo='Peerlist' theme='Light' showMetrics={true} showProjects={true} />
                 </div>
               </div>
             )}
             
             {activeTab === 'Link Embed' && (
                <div className="bg-white border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide">
                  <PeerlistPost details={PeerlistLinkEmbed.data} logo='Peerlist' theme='Light' showMetrics={true} />
                </div>
              )}

              {activeTab === 'Quoted Post' && (
                <div className="bg-white border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide">
                  <PeerlistPost details={PeerlistQuotedEmbed.data} logo='Peerlist' theme='Light' showMetrics={true} />
                </div>
              )}
              
              {activeTab === 'Project Embed' && (
                <div className="bg-white border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide">
                  <PeerlistPost details={PeerlistProjectEmbed.data} logo='Peerlist' theme='Light' showMetrics={true} />
                </div>
              )}
              
              {activeTab === 'Poll Embed' && (
                <div className="bg-white border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide">
                  <PeerlistPost details={PeerlistPollEmbed.data} logo='Peerlist' theme='Light' showMetrics={true} />
                </div>
              )}
              
              {activeTab === 'Article Embed' && (
                <div className="bg-white border border-gray-200 rounded-lg overflow-y-auto scrollbar-hide">
                  <PeerlistPost details={PeerlistArticleEmbed.data} logo='Peerlist' theme='Light' showMetrics={true} />
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerlistDetail; 
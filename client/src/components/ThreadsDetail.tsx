import React, { useState } from 'react';
import { FaThreads } from "react-icons/fa6";
import { threadsSeed, ThreadsConversationSeed, ThreadsProfilSeed, ThreadsQuotedPost } from "../Seed/HeroSeed";
import ThreadsPost from './ThreadsPost';
import ThreadsProfile from './ThreadsProfile';
import ThreadsFeed from './ThreadsFeed';

import { FileTextIcon } from "../Icons/FileText";
import { UserIcon } from "../Icons/User";
import { AtSignIcon } from '../Icons/Mention';

const TABS = ['Post', 'Threads', 'Profile', 'Quoted'];

const ThreadsDetail = () => {
  const [activeTab, setActiveTab] = useState('Post');

  // Use the first post for demo; adapt as needed
  const postDetails = threadsSeed.data[0];

  return (
    <div id="threads" className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side - Content */}
          <div className="text-left">
            <p className="text-purple-600 font-medium mb-2">Solutions</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Screenshot Threads, capture conversations
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Create beautiful screenshots from Threads posts, profiles, and conversations to share on any platform.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center mr-4">
                  <FileTextIcon className="text-violet-600" />
                </div>
                <span className="text-gray-700">Post. Capture any Threads post with media and replies.</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center mr-4">
                  <AtSignIcon className="text-blue-600" />
                </div>
                <span className="text-gray-700">Threads. Screenshot entire conversations or threads.</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center mr-4">
                  <UserIcon className="text-purple-600" />
                </div>
                <span className="text-gray-700">Profile. Showcase your Threads profile beautifully.</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center mr-4">
                  <AtSignIcon className="text-green-600" />
                </div>
                <span className="text-gray-700">Quoted. Capture quoted posts and context.</span>
              </div>
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className="bg-white rounded-xl shadow-lg p-6 relative">
            {/* Tabs - Fixed Header */}
            <div className="bg-white pb-4 mb-6">
              <div className="flex space-x-1 bg-gray-200 rounded-lg p-1">
                {TABS.map((tab) => (
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
            </div>

            {/* Content based on active tab */}
            <div className="overflow-y-auto scrollbar-hide max-h-[500px]">
              {activeTab === 'Post' && (
                <div className="bg-white border border-gray-200 rounded-lg">
                  <ThreadsPost details={postDetails} theme="Light" logo="Threads" showMetrics={true} isFeed={false} />
                </div>
              )}
              {activeTab === 'Threads' && (
                <div className="bg-white border border-gray-200 rounded-lg">
                  <ThreadsFeed posts={ThreadsConversationSeed.data} theme="Light" logo="Threads" showMetrics={true} />
                </div>
              )}
              {activeTab === 'Profile' && (
                <div className="bg-white border border-gray-200 rounded-lg">
                  <ThreadsProfile details={ThreadsProfilSeed.data} theme="Light" logo="Threads" />
                </div>
              )}
              {activeTab === 'Quoted' && (
                <div className="bg-white border border-gray-200 rounded-lg">
                    <ThreadsPost details={ThreadsQuotedPost.data[0]} theme="Light" logo="Threads" showMetrics={true} isFeed={false} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadsDetail;
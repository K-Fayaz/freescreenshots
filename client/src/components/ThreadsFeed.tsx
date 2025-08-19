import React from 'react';
import ThreadsPost from './ThreadsPost';

interface ThreadsFeedProps {
  posts: any[];
  theme: 'Light' | 'Dark';
  logo?: string;
  showMetrics?: boolean;
  userType: any;
}

const ThreadsFeed = React.forwardRef<HTMLDivElement, ThreadsFeedProps>(
  ({ posts, theme, logo, userType,showMetrics = true }, ref) => {
    if (!posts || posts.length === 0) return null;

    return (
      <div ref={ref} className="relative">
        {posts.map((post, index) => (
          <div key={index} className="relative">
            {/* Thread connection line - only show if not the last post */}
            {index < posts.length - 1 && (
              <div 
                className={`absolute z-0 ${
                  theme === 'Dark' ? 'bg-gray-600' : 'bg-gray-300'
                }`}
                style={{ 
                  left: '38px', // 16px (padding) + 20px (center of 40px profile picture)
                  top: '76px', // 16px (padding) + 40px (profile picture height) + 20px (gap below profile)
                  width: '1px',
                  height: 'calc(100% - 45px - 30px)' // Account for padding, profile height, and 20px gap at bottom
                }}
              />
            )}
            
            {/* Post content */}
            <div className="relative z-10">
              <ThreadsPost
                details={post}
                theme={theme}
                logo={logo}
                showMetrics={showMetrics}
                isFeed={true}
                userType={{}}
              />
            </div>
          </div>
        ))}
        {
          (userType == null || userType == undefined || userType?.type == 'free') && (
            <div className="text-center pb-5">
              <span className="text-gray-500 text-sm">
                made with <span className="text-red-500">❤</span> by <span className="">ZapShot.in</span>
              </span>
            </div>
          )
        }
      </div>
    );
  }
);

ThreadsFeed.displayName = 'ThreadsFeed';

export default ThreadsFeed; 
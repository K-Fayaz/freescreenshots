import React from 'react';
import ThreadsPost from './ThreadsPost';

interface ThreadsFeedProps {
  posts: any[];
  theme: 'Light' | 'Dark';
  logo?: string;
  showMetrics?: boolean;
}

const ThreadsFeed = React.forwardRef<HTMLDivElement, ThreadsFeedProps>(
  ({ posts, theme, logo, showMetrics = true }, ref) => {
    if (!posts || posts.length === 0) return null;

    return (
      <div ref={ref} className="relative">
        {posts.map((post, index) => (
          <div key={index} className="relative">
            {/* Thread connection line - only show if not the last post */}
            {index < posts.length - 1 && (
              <div 
                className={`absolute left-5 top-[40px] w-0.5 h-full z-0 ${
                  theme === 'Dark' ? 'bg-gray-600' : 'bg-gray-300'
                }`}
                style={{ 
                  height: 'calc(100% - 20px)',
                  top: '40px'
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
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
);

ThreadsFeed.displayName = 'ThreadsFeed';

export default ThreadsFeed; 
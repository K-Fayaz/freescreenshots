import React from 'react';
import { Heart, MessageCircle, Repeat2 } from 'lucide-react';
import Tweet from './Tweet';
import PeerlistPost from './PeerlistPost';

interface TweetPreviewProps {
  theme: 'Light' | 'Dark';
  selectedColor: string;
  customColor: string;
  padding: number;
  logo: string;
  font: string;
  watermark: boolean;
  highlightColor: string;
  timestamp: string;
  showTimeAgo: boolean;
  showMetrics: boolean;
  showViews: boolean;
  postDetails: any;
  tweetRef?: React.RefObject<HTMLDivElement>;
  parentWidth: number;
}

const TweetPreview: React.FC<TweetPreviewProps> = ({
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
  postDetails,
  tweetRef,
  parentWidth
}) => {
  // Determine background for light mode
  const isGradient = selectedColor.startsWith('linear-gradient');
  let parentBg, childBg, childText;
  if (postDetails && postDetails.platform === 'peerlist.io' && theme === 'Dark') {
    parentBg = selectedColor === '#171717' || !selectedColor ? '#171717' : selectedColor;
    childBg = '#171717';
    childText = 'text-white';
  } else if (theme === 'Light') {
    if (isGradient) {
      parentBg = selectedColor;
      childBg = 'bg-white';
      childText = 'text-black';
    } else {
      parentBg = selectedColor || '#000';
      childBg = 'bg-white';
      childText = 'text-black';
    }
  } else {
    // Dark mode: child is always black
    parentBg = isGradient || selectedColor ? selectedColor || '#181C20' : '#181C20';
    childBg = 'bg-black';
    childText = 'text-white';
  }
  // Map font prop to Tailwind class (static mapping for Tailwind compatibility)
  const fontMap: Record<string, string> = {
    Inter: 'font-sans',
    ibmSans: 'font-ibmSans',
    noto: 'font-noto',
    rubik: 'font-rubik',
    geistMono: 'font-geistMono',
    poppins: 'font-poppins',
    imbMono: 'font-imbMono',
  };
  const fontClass = fontMap[font] || 'font-sans';
  return (
    <div className="bg-gray-100 min-h-screen grid place-items-center">
      <div style={{ background: parentBg, padding }} className='shadow-lg transition-all duration-400' ref={tweetRef}>
        <div
          className={`h-auto rounded-md transition-all duration-500 ${childBg} ${childText} ${fontClass}`}
          style={{ width: parentWidth + 'px', ...(theme === 'Dark' ? { background: childBg, color: '#fff' } : {}) }}
        >
          {/* Render post details if available */}
          {postDetails && (
            postDetails.platform === 'x.com' ? (
              <Tweet details={postDetails.post} logo={logo} theme={theme} showMetrics={showMetrics} showViews={showViews}/>
            ) : postDetails.platform === 'peerlist.io' ? (
              <PeerlistPost details={postDetails.post} theme={theme} logo={logo} />
            ) : (
              <h1>hola</h1>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TweetPreview;
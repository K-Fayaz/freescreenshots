import React, { useEffect } from 'react';
import { Heart, MessageCircle, Repeat2 } from 'lucide-react';
import Tweet from './Tweet';
import TwitterUserProfile from './TwitterUserProfile';
import PeerlistPost from './PeerlistPost';
import PeerlistProfile from './PeerlistProfile';
import ThreadsPost from './ThreadsPost';
import ThreadsFeed from './ThreadsFeed';
import ThreadsProfile from './ThreadsProfile';
import YoutubeVideo from './Youtube/YoutubeVideo';
import YoutubeChannel from './Youtube/YoutubeChannel';
import RedditPost from './RedditPost';
import BASE_URL from '@/config';
import axios from 'axios';
import ProductHunt from './ProductHunt';
import InstagramPost from './Instagram/InstagramPost';

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
  showProjects: boolean;
  foldProjects: boolean;
  showPauseOverlay: boolean;
  foldText: boolean;
  showCaption: boolean;
  showGridView: boolean;
}

interface userType {
  type:string;
  credits: number;  
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
  showProjects,
  foldProjects,
  parentWidth,
  showPauseOverlay,
  foldText,
  showCaption,
  showGridView
}) => {
  // Determine background for light mode
  const isGradient = selectedColor.startsWith('linear-gradient');
  let parentBg, childBg, childText;
  if (postDetails && postDetails.platform === 'peerlist.io' && theme === 'Dark') {
    parentBg = selectedColor === '#000' || !selectedColor ? '#171717' : selectedColor;
    childBg = '#000';
    childText = 'text-white';
  } else if (postDetails && postDetails.platform === 'www.threads.com' && theme === 'Dark') {
    parentBg = selectedColor === '#000' || !selectedColor ? '#000' : selectedColor;
    childBg = '#000';
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

  const [userType, setUserType] = React.useState<userType | null>(null);


  useEffect(() => {
    let url = `${BASE_URL}api/user/get`;

    axios({
      method:"GET",
      url: url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }
    })
    .then((response) => {
      // console.log(response);
      setUserType({
        type: response?.data?.type,
        credits: response?.data?.credits
      });
    })
    .catch((err) => {
      console.log(err);
      setUserType(null)
    })
  }, []);

  return (
    <div className="overflow-y-auto grid place-items-center">
      <div style={{ background: parentBg, padding }} className='shadow-lg transition-all duration-400' ref={tweetRef}>
        <div
          className={`h-auto transition-all duration-500 ${childBg} ${childText} ${fontClass} rounded-xl`}
          style={{ width: parentWidth + 'px', ...(theme === 'Dark' ? { background: childBg, color: '#fff' } : {}) }}
        >
          {/* Render post details if available */}
          {postDetails && (
            postDetails.platform === 'x.com' ? (
              postDetails.type === 'post' ? (
                <Tweet details={postDetails.post} logo={logo} theme={theme} showMetrics={showMetrics} showViews={showViews} userType={userType}/>
              ) : (
                <TwitterUserProfile details={postDetails.post} logo={logo} theme={theme} showMetrics={showMetrics} userType={userType}/>
              )
            ) : postDetails.platform === 'peerlist.io' ? (
              postDetails.type === 'post' ? (
                <PeerlistPost details={postDetails.post} theme={theme} logo={logo} showMetrics={showMetrics} userType={userType}/>
              ) : (
                <PeerlistProfile details={postDetails.post} theme={theme} logo={logo} showMetrics={showMetrics} showProjects={showProjects} foldProjects={foldProjects} userType={userType}/>
              )
            ) : postDetails.platform === 'www.threads.com' ? (
              postDetails.type === 'post' ? (
                postDetails.post.length > 1 ? (
                  <ThreadsFeed posts={postDetails.post} theme={theme} logo={logo} showMetrics={showMetrics} userType={userType}/>
                ) : (
                  <ThreadsPost details={postDetails.post[0]} theme={theme} logo={logo} showMetrics={showMetrics} isFeed={false} userType={userType}/>
                )
              ) : (
                <ThreadsProfile details={postDetails.post} theme={theme} logo={logo} userType={userType} />
              )
            ) : postDetails.platform === 'reddit.com' || postDetails.platform === 'www.reddit.com' ? (
              <RedditPost
                details={postDetails.post}
                theme={theme}
                logo={logo}
                showMetrics={showMetrics}
                userType={userType}
              />
            ) : postDetails.platform === "youtube" ? (
              postDetails.type === 'post' ? (
                <YoutubeVideo details={postDetails.post} theme={theme} logo={logo} userType={userType} showMetrics={showMetrics} showViews={showViews} showPauseOverlay={showPauseOverlay}/>
              ) : (
                <YoutubeChannel details={postDetails.post} theme={theme} logo={logo} userType={userType} showMetrics={showMetrics} showViews={showViews} showPauseOverlay={showPauseOverlay}/>
              )
            ) : postDetails.platform === "www.producthunt.com" ? (
              <ProductHunt details={postDetails.post} logo={logo} theme={theme} showMetrics={showMetrics} showViews={showViews} userType={userType} font={font} />
            ) : postDetails.platform === "www.instagram.com" ? (
              <InstagramPost details={postDetails.post} logo={logo} theme={theme} showMetrics={showMetrics} showViews={showViews} userType={userType} fontClass={fontClass} foldText={foldText} showCaption={showCaption} showGridView={showGridView}/>
            ) : (
              <h1>Could not Find this platform! Please Report this!</h1>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TweetPreview;
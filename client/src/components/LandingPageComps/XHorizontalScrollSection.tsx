import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TwitterPostSeed, TwitterQuotedPost3, TwitterElomMuskProfile } from "@/Seed/HeroSeed";
import TwitterUserProfile from "../TwitterUserProfile";
import PeerlistProfile from '../PeerlistProfile';
import PeerlistPost from '../PeerlistPost';
import { PeerlistProfileData, PeerlistPostPretty,PeerlistLinkEmbed,PeerlistProjectEmbed,PeerlistVotePost, TwitterPattern } from "@/Seed/HeroSeed";
import { ThreadsPostData, Threads, ThreadsProfilSeed, ThreadsQuotedPost, redditPost,youtubeVideo,youtubeChannels,PHData } from "@/Seed/HeroSeed";
import RedditPost from "../RedditPost";
import ThreadsPost from '../ThreadsPost';
import ThreadsProfile from '../ThreadsProfile';
import ThreadsFeed from '../ThreadsFeed';
import Tweet from "../Tweet";
import YoutubeVideo from "../Youtube/YoutubeVideo";
import YoutubeChannel from "../Youtube/YoutubeChannel";
import ProductHunt from "../ProductHunt";
import { GrNext } from "react-icons/gr";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollOnVertical = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [theme,setTheme] = useState<"Light" | "Dark">("Light");
  const navigate = useNavigate();

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) return;

    const totalScrollWidth = track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: () => -totalScrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${totalScrollWidth}`,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  // Use the first post for demo; adapt as needed
  const postDetails = ThreadsPostData.data[0];

  return (
    <section ref={containerRef} className="w-full relative bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 absolute top-24 md:top-32 left-0 right-0 z-10 mb-5">
            {/* <h1 className="text-6xl font-bold text-center mt-5 mb-4">Capture post Screenshots from various platforms!</h1> */}
            <div className="flex justify-center items-center mb-2">
                <label className="relative inline-flex items-center cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={theme === 'Dark'}
                        onChange={() => setTheme(theme === 'Light' ? 'Dark' : 'Light')}
                        className="sr-only peer"
                    />
                        <div className={`w-12 md:w-16 h-6 md:h-8 flex items-center px-1 pr-4 rounded-full border-2 transition-colors duration-300 ${theme === 'Light' ? 'bg-yellow-200 border-yellow-400' : 'bg-gray-900 border-gray-700'}`}>
                            <span className={`transition-transform duration-300 text-base md:text-2xl pr-2 mr-2 ${theme === 'Dark' ? 'translate-x-5 md:translate-x-6' : 'translate-x-0'} peer-checked:translate-x-8 select-none`} style={{ display: 'inline-block' }}>{theme === 'Light' ? '🌞' : '🌙'}</span>
                        </div>
                        <span className="ml-3 text-sm font-medium text-gray-600 select-none">
                            {theme === 'Light' ? 'Light Mode' : 'Dark Mode'}
                        </span>
                </label>
            </div>
        </div>
      <div ref={trackRef} className="flex h-screen justify-start items-center mt-8">
        <div>
            <h1 className="mb-4 text-center font-bold text-lg">Twitter posts</h1>
            <div className={`${theme == 'Light' ? 'bg-white' : 'bg-black text-white'} w-[90%] md:w-[460px] max-h-[80%] border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm`}>
                <Tweet details={TwitterPattern.data} logo='X' theme={theme} showMetrics={true} showViews={true} userType={{}} />
            </div>
        </div>
        
        <div>
            <h1 className="mb-4 text-center font-bold text-lg">Quoted Twitter posts</h1>
            <div className={`${theme == 'Light' ? 'bg-white' : 'bg-black text-white'} border w-[95%] md:w-[500px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm`}>
                <Tweet details={TwitterQuotedPost3.data} logo='X' theme={theme} showMetrics={true} showViews={true} userType={{}}/>
            </div>
        </div>
        
        <div>
            <h1 className="mb-4 text-center font-bold text-lg">Twitter Profiles</h1>
            <div className={`${theme == 'Light' ? 'bg-white' : 'bg-black text-white'} border w-[95%] md:w-[500px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm`}>
                <TwitterUserProfile details={TwitterElomMuskProfile.data} logo='X' theme={theme} showMetrics={true} userType={{}} />
            </div>
        </div>

        <div>
            <h1 className="mb-4 text-center font-bold text-lg">Product Launch</h1>
            <div className={`${theme == 'Light' ? 'bg-white' : 'bg-black text-white'} border w-[95%] md:w-[600px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm`}>
                <ProductHunt details={PHData.data} logo='ph' theme={theme} showMetrics={true} userType={{}} showViews={false} />
            </div>
        </div>

        <div>
            <h1 className="mb-4 text-center font-bold text-lg">Youtube Channels</h1>
            <div className={`${theme == 'Light' ? 'bg-white' : 'bg-black text-white'} border w-[95%] md:w-[500px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm`}>
                <YoutubeChannel details={youtubeChannels.data} theme={theme} logo={"youtube"} userType={{}} showMetrics={true} showViews={true} showPauseOverlay={true}/>
            </div>
        </div>

        <div>
            <h1 className="mb-4 text-center font-bold text-lg">Youtube Videos</h1>
            <div className={`${theme == 'Light' ? 'bg-white' : 'bg-black text-white'} border w-[95%] md:w-[500px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm`}>
                <YoutubeVideo details={youtubeVideo.data} theme={theme} logo={"youtube"} userType={{}} showMetrics={true} showViews={true} showPauseOverlay={true}/>
            </div>
        </div>

        <div>
            <div onClick={() => navigate('/gallery')} className={`border w-[95%] md:w-[500px] h-[400px] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm flex flex-col justify-center items-center hover:scale-105 transition-all duration-300 cursor-pointer bg-gray-200 hover:bg-gray-300`}>
                <GrNext className="p-4 bg-gray-200 rounded-full w-20 h-20"/>
                <p className="my-2">+3 more Platform screenshots</p>
                <p className="hover:text-blue-800 hover:underline cursor-pointer">
                    Check here
                </p>
            </div>
        </div>


        {/* <div>
            <h1 className="mb-4 text-center font-bold text-lg">Threads Post</h1>
            <div className={`${theme == 'Light' ? 'bg-white' : 'bg-black text-white'} border w-[90%] md:w-[500px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm`}>
                <ThreadsPost details={postDetails} theme={theme} logo="Threads" showMetrics={true} isFeed={false} userType={{}} />
            </div>
        </div> */}

        {/* <div>
            <h1 className="mb-4 text-center font-bold text-lg">Threads!</h1>
            <div className={`${theme == 'Light' ? 'bg-white' : 'bg-black text-white'} border w-[90%] md:w-[500px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm`}>
                <ThreadsFeed posts={Threads.data} theme={theme} logo="Threads" showMetrics={true} userType={{}} />
            </div>
        </div> */}

        {/* <div>
            <h1 className="mb-4 text-center font-bold text-lg">Threads Profile</h1>
            <div className={`${theme == 'Light' ? 'bg-white' : 'bg-black text-white'} border w-[90%] md:w-[500px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm`}>
                <ThreadsProfile details={ThreadsProfilSeed.data} theme={theme} logo="Threads" userType={{}} />
            </div>
        </div> */}
        
        {/* <div>
            <h1 className="mb-4 text-center font-bold text-lg">Threads Quoted Post</h1>
            <div className={`${theme == 'Light' ? 'bg-white' : 'bg-black text-white'} border w-[90%] md:w-[500px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm`}>
                <ThreadsPost details={ThreadsQuotedPost.data[0]} theme={theme} logo="Threads" showMetrics={true} isFeed={false} userType={{}} />
            </div>
        </div> */}

      </div>
    </section>
  );
};

export default HorizontalScrollOnVertical;

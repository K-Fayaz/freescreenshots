import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TwitterPostSeed, TwitterQuotedPost2, TwitterSeed } from "@/Seed/HeroSeed";
import TwitterUserProfile from "../TwitterUserProfile";
import PeerlistProfile from '../PeerlistProfile';
import PeerlistPost from '../PeerlistPost';
import { PeerlistProfileData, PeerlistPostSeed,PeerlistLinkEmbed,PeerlistProjectEmbed,PeerlistPollEmbed } from "@/Seed/HeroSeed";
import { threadsSeed, ThreadsConversationSeed, ThreadsProfilSeed, ThreadsQuotedPost } from "@/Seed/HeroSeed";
import ThreadsPost from '../ThreadsPost';
import ThreadsProfile from '../ThreadsProfile';
import ThreadsFeed from '../ThreadsFeed';
import Tweet from "../Tweet";


gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollOnVertical = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

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
  const postDetails = threadsSeed.data[0];

  return (
    <section ref={containerRef} className="w-full bg-white overflow-hidden">
      <div ref={trackRef} className="flex h-screen justify-start items-center">
        {/* {cards.map((card, idx) => (
          <div
            key={idx}
            className={`flex-shrink-0 h-screen flex flex-col items-center justify-center ${card.color}`}
          >
            <h2 className="text-4xl font-bold mb-4">{card.heading}</h2>
            <p className="text-lg">{card.text}</p>
          </div>
        ))} */}
        <div>
            <h1 className="mb-4 text-center font-bold text-lg">Twitter posts</h1>
            <div className="bg-black text-white w-[90%] md:w-[460px] max-h-[80%] border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm">
                <Tweet details={TwitterPostSeed.data} logo='X' theme='Dark' showMetrics={true} showViews={true} userType={{}} />
            </div>
        </div>
        
        <div>
            <h1 className="mb-4 text-center font-bold text-lg">Quoted Twitter posts</h1>
            <div className="bg-white border w-[95%] md:w-[500px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm">
                <Tweet details={TwitterQuotedPost2.data} logo='X' theme='Light' showMetrics={true} showViews={true} userType={{}}/>
            </div>
        </div>
        
        <div>
            <h1 className="mb-4 text-center font-bold text-lg">Twitter Profiles</h1>
            <div className="bg-white border w-[95%] md:w-[500px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm">
                <TwitterUserProfile details={TwitterSeed.data} logo='X' theme='Light' showMetrics={true} userType={{}} />
            </div>
        </div>

        <div>
            <h1 className="mb-4 text-center font-bold text-lg">Peerlist Post</h1>
            <div className="bg-white border w-[95%] md:w-[500px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm">
                <PeerlistPost details={PeerlistPostSeed.data} logo='Peerlist' theme='Light' showMetrics={true} userType={{}} />
            </div>
        </div>

        <div>
            <h1 className="mb-4 text-center font-bold text-lg">Peerlist Profile</h1>
            <div className="bg-white border w-[95%] md:w-[500px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm">
                <PeerlistProfile details={PeerlistProfileData.data} logo='Peerlist' theme='Light' showMetrics={true} showProjects={false} userType={{}} />
            </div>
        </div>
        
        <div>
            <h1 className="mb-4 text-center font-bold text-lg">Peerlist Link Embeds</h1>
            <div className="bg-white border w-[400px] md:w-[500px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm">
                <PeerlistPost details={PeerlistLinkEmbed.data} logo='Peerlist' theme='Light' showMetrics={true} userType={{}} />
            </div>
        </div>

        <div>
            <h1 className="mb-4 text-center font-bold text-lg">Peerlist project embed</h1>
            <div className="bg-white border w-[400px] md:w-[500px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm">
                <PeerlistPost details={PeerlistProjectEmbed.data} logo='Peerlist' theme='Light' showMetrics={true} userType={{}} />
            </div>
        </div>

        <div>
            <h1 className="mb-4 text-center font-bold text-lg">Peerlist poll Embeds</h1>
            <div className="bg-white border w-[95%] md:w-[500px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm">
                <PeerlistPost details={PeerlistPollEmbed.data} logo='Peerlist' theme='Light' showMetrics={true} userType={{}} />
            </div>
        </div>

        <div>
            <h1 className="mb-4 text-center font-bold text-lg">Threads Post</h1>
            <div className="bg-white border w-[90%] md:w-[500px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm">
                <ThreadsPost details={postDetails} theme="Light" logo="Threads" showMetrics={true} isFeed={false} userType={{}} />
            </div>
        </div>

        <div>
            <h1 className="mb-4 text-center font-bold text-lg">Threads!</h1>
            <div className="bg-white border w-[90%] md:w-[500px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm">
                <ThreadsFeed posts={ThreadsConversationSeed.data} theme="Light" logo="Threads" showMetrics={true} userType={{}} />
            </div>
        </div>

        <div>
            <h1 className="mb-4 text-center font-bold text-lg">Threads Profile</h1>
            <div className="bg-white border w-[90%] md:w-[500px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm">
                <ThreadsProfile details={ThreadsProfilSeed.data} theme="Light" logo="Threads" userType={{}} />
            </div>
        </div>
        
        <div>
            <h1 className="mb-4 text-center font-bold text-lg">Threads Quoted Post</h1>
            <div className="bg-white border w-[90%] md:w-[500px] max-h-[80%] border-gray-200 rounded-lg overflow-y-auto scrollbar-hide ml-4 md:ml-10 mr-24 text-xs md:text-sm">
                <ThreadsPost details={ThreadsQuotedPost.data[0]} theme="Light" logo="Threads" showMetrics={true} isFeed={false} userType={{}} />
            </div>
        </div>

      </div>
    </section>
  );
};

export default HorizontalScrollOnVertical;

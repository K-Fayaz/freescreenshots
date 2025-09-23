
import Navbar from "@/components/LandingPageComps/Navbar";
import Footer from "@/components/Footer";
import { useState, useRef } from "react";
import { LuConstruction } from "react-icons/lu";
import PeerlistProfile from "@/components/PeerlistProfile";
import PeerlistPost from "@/components/PeerlistPost";
import Tweet from "@/components/Tweet";
import TwitterUserProfile from "@/components/TwitterUserProfile";
import RedditPost from "@/components/RedditPost";
import YoutubeChannel from "@/components/Youtube/YoutubeChannel";
import YoutubeVideo from "@/components/Youtube/YoutubeVideo";
import ProductHunt from "@/components/ProductHunt";
import InstagramPost from "@/components/Instagram/InstagramPost";
import { useLocation } from "react-router-dom";

// Reddit seed data
import { redditPost, redditPost2, redditPost3, redditPost4 } from "../Seed/HeroSeed";
// twitter seed data
import { TwitterSeed,TwitterPostSeed,TwitterElomMuskProfile, TwitterQuotedPost2,TwitterPoll, TwitterPattern } from "../Seed/HeroSeed";
// Peerlisr SeedData
import { PeerlistSeed,
        PeerlistProfileData, 
        PeerlistPostSeed, 
        PeerlistLinkEmbed,
        PeerlistProjectEmbed,
        PeerlistPollEmbed,
        PeerlistArticleEmbed,
        PeerlistQuotedEmbed,
        PeerlistPostPretty,
        PeerlistVotePost
    } from "../Seed/HeroSeed";

// youtubeVideo seed data
import {
    youtubeVideo,
    youtubeChannels,
    PHData,
    PH2,
    PH3
} from "../Seed/HeroSeed";

import {
    instagramPost1,
    igPost2,
    igPost3,
    igPost4,
    igPost5,
} from "../Seed/HeroSeed";

const tabs = [
    // 'All platforms',
    'X',
    'Reddit',
    'Peerlist',
    'Youtube',
    'Product-Hunt',
    'Instagram'
]

const Gallery = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab");
    const [selectedTab, setSelectedTab] = useState(tab ? tab : 'X');
    // Horizontal scroll controls for tab bar
    const tabScrollRef = useRef<HTMLDivElement>(null);
    const scrollTabs = (dir: 'left' | 'right') => {
        const el = tabScrollRef.current;
        if (!el) return;
        const scrollAmount = 120;
        if (dir === 'left') el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        else el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    return (
        <div>
            <Navbar page="not-landing"/>
            <section className="w-full flex flex-col items-center mt-24 mb-24">
                <div className="mb-6">
                    <span className="inline-block bg-gray-300 font-semibold text-gray-700 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
                    Gallery showcase<span className='text-md md:text-xl'>📸</span>
                    </span>
                </div>
                <h1 className="text-center text-4xl md:text-8xl font-bold">
                    Explore the Zapshot <br/> Gallery 
                </h1>
                <p className="text-gray-500 text-center text-xl mt-5">See all the clean, distraction-free screenshots you can create in seconds.</p>
            </section>
            <section className="w-full flex justify-center mb-5">
                <div className="relative w-full max-w-[600px] flex items-center">
                    {/* Left scroll button */}
                    <button
                        className="absolute left-0 z-10 h-10 w-8 flex items-center justify-center bg-white/80 hover:bg-gray-200 rounded-l-full shadow-md transition md:hidden"
                        style={{ top: '50%', transform: 'translateY(-50%)' }}
                        onClick={() => scrollTabs('left')}
                        aria-label="Scroll left"
                    >
                        <span className="text-xl">&#8592;</span>
                    </button>
                    {/* Tab bar */}
                    <div
                        ref={tabScrollRef}
                        className="flex gap-4 overflow-x-auto scrollbar-hide px-10 py-1 w-full md:justify-center md:overflow-visible md:px-0"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {tabs.map((tab, idx) => (
                            <button
                                key={tab}
                                onClick={()=> setSelectedTab(tab)}
                                className={
                                    `px-6 py-2 rounded-full font-medium text-sm transition-colors shadow-sm whitespace-nowrap ` +
                                    (selectedTab === tab
                                        ? 'bg-black text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                                }
                            >
                                {tab === 'All platforms' ? 'All Platforms' : tab}
                            </button>
                        ))}
                    </div>
                    {/* Right scroll button */}
                    <button
                        className="absolute right-0 z-10 h-10 w-8 flex items-center justify-center bg-white/80 hover:bg-gray-200 rounded-r-full shadow-md transition md:hidden"
                        style={{ top: '50%', transform: 'translateY(-50%)' }}
                        onClick={() => scrollTabs('right')}
                        aria-label="Scroll right"
                    >
                        <span className="text-xl">&#8594;</span>
                    </button>
                </div>
            </section>
            <section className="w-4/5 mx-auto my-5">
                {
                    selectedTab  == 'X' ? (
                       <div className="w-full grid md:grid-cols-3 auto-rows-auto relative">
                            <div className="">
                                {/* <h1 className="text-center">Twitter Posts</h1> */}
                                <div className={`bg-black text-white w-full h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-90`}>
                                    <Tweet details={TwitterPostSeed.data} logo='X' theme={'Dark'} showMetrics={true} showViews={true} userType={{}} />
                                </div>
                            </div>

                            <div className="">
                                {/* <h1 className="text-center">Twitter Profiles</h1> */}
                                <div className={`bg-black text-white border w-full h-auto border-gray-200 rounded-lg overflow-y-auto scrollbar-hide text-xs md:text-sm scale-90`}>
                                    <TwitterUserProfile details={TwitterElomMuskProfile.data} logo='X' theme={'Dark'} showMetrics={true} userType={{}} />
                                </div>
                            </div>

                            {/* Example of a third column placeholder, replace with real content as needed */}
                            <div className="">
                                {/* <h1 className="text-center">Twitter Profiles</h1> */}
                                <div className={`bg-black text-white border w-full h-auto border-gray-200 rounded-lg overflow-y-auto scrollbar-hide text-xs md:text-sm scale-90`}>
                                    <TwitterUserProfile details={TwitterSeed.data} logo='X' theme={'Dark'} showMetrics={true} userType={{}} />
                                </div>
                            </div>

                            <div className="md:relative md:-top-10">
                                <div className={`bg-black text-white border w-full h-auto border-gray-200 rounded-lg overflow-y-auto scrollbar-hide text-xs md:text-sm scale-90`}>
                                    <Tweet details={TwitterQuotedPost2.data} logo='X' theme={'Dark'} showMetrics={true} userType={{}} />
                                </div>
                            </div>

                            <div className="md:relative md:-top-28">
                                <div className={`bg-black text-white border w-full h-auto border-gray-200 rounded-lg overflow-y-auto scrollbar-hide text-xs md:text-sm scale-90`}>
                                    <Tweet details={TwitterPoll.data} logo='X' theme={'Dark'} showMetrics={true} userType={{}} />
                                </div>
                            </div>

                            <div className="">
                                <div className={`bg-black text-white border w-full h-auto border-gray-200 rounded-lg overflow-y-auto scrollbar-hide text-xs md:text-sm scale-90`}>
                                    <Tweet details={TwitterPattern.data} logo='X' theme={'Dark'} showMetrics={true} userType={{}} />
                                </div>
                            </div>
                       </div>
                    ) : selectedTab == 'Peerlist' ? (
                        <div className="w-full grid md:grid-cols-3 auto-rows-auto">
                            <div className="overflow-hidden">
                                <div className={`bg-black text-white w-full h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-95`}>
                                    <PeerlistPost details={PeerlistSeed.data} logo='Peerlist' theme={'Dark'} showMetrics={true} userType={{}} />
                                </div>
                            </div>

                            <div className="overflow-hidden">
                                <div className={`bg-black text-white w-full h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-95`}>
                                    <PeerlistPost details={PeerlistPostSeed.data} logo='Peerlist' theme={'Dark'} showMetrics={true} userType={{}} />
                                </div>
                            </div>

                            <div className="overflow-hidden">
                                <div className={`bg-black text-white w-full h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-95`}>
                                    <PeerlistPost details={PeerlistLinkEmbed.data} logo='Peerlist' theme={'Dark'} showMetrics={true} userType={{}} />
                                </div>
                            </div>

                            <div className="md:relative md:-top-28 overflow-hidden">
                                <div className={`bg-black text-white w-full h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-95`}>
                                    <PeerlistPost details={PeerlistProjectEmbed.data} logo='Peerlist' theme={'Dark'} showMetrics={true} userType={{}} />
                                </div>
                            </div>

                            <div className="overflow-hidden">
                                <div className={`bg-black text-white w-full h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-95`}>
                                    <PeerlistProfile details={PeerlistProfileData.data} logo='Peerlist' theme={'Dark'} showMetrics={true} showProjects={false} userType={{}} foldProjects={true}/>
                                </div>
                            </div>

                            <div className="md:relative md:-top-60 overflow-hidden">
                                <div className={`bg-black text-white w-full h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-95`}>
                                    <PeerlistPost details={PeerlistPollEmbed.data} logo='Peerlist' theme={'Dark'} showMetrics={true} userType={{}} />
                                </div>
                            </div>

                            <div className="md:relative md:-top-80 overflow-hidden">
                                <div className={`bg-black text-white w-full h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-95`}>
                                    <PeerlistPost details={PeerlistArticleEmbed.data} logo='Peerlist' theme={'Dark'} showMetrics={true} userType={{}} />
                                </div>
                            </div>

                            <div className="md:relative md:-top-28 overflow-hidden">
                                <div className={`bg-black text-white w-full h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-95`}>
                                    <PeerlistPost details={PeerlistQuotedEmbed.data} logo='Peerlist' theme={'Dark'} showMetrics={true} userType={{}} />
                                </div>
                            </div>

                            <div className="md:relative md:-top-56 overflow-hidden">
                                <div className={`bg-black text-white w-full h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-95`}>
                                    <PeerlistPost details={PeerlistVotePost.data} logo='Peerlist' theme={'Dark'} showMetrics={true} userType={{}} />
                                </div>
                            </div>

                        </div>
                    ) : selectedTab == 'Reddit' ? (
                        <div className="w-full grid md:grid-cols-3 auto-rows-auto relative gap-4">
                            <div className="overflow-hidden">
                                <div className={`bg-black text-white border w-full h-auto border-gray-200 rounded-lg scrollbar-hide text-xs md:text-sm scale-90`}> 
                                    <RedditPost details={redditPost.data} theme={'Dark'} logo={"Reddit"} showMetrics={true} userType={{}} />
                                </div>
                            </div>

                            <div className="overflow-hidden">
                                <div className={`bg-black text-white w-full max-w-full h-auto border border-gray-200 rounded-lg p-4 overflow-x-auto overflow-y-auto scrollbar-hide text-xs md:text-sm scale-95 break-words whitespace-normal`}>
                                    <RedditPost details={redditPost2.data} theme={'Dark'} logo={"Reddit"} showMetrics={true} userType={{}} />
                                </div>
                            </div>

                            <div className="overflow-hidden">
                                <div className={`bg-black text-white w-full max-w-full h-auto border border-gray-200 rounded-lg p-4 overflow-x-auto overflow-y-auto scrollbar-hide text-xs md:text-sm scale-95 break-words whitespace-normal`}>
                                    <RedditPost details={redditPost3.data} theme={'Dark'} logo={"Reddit"} showMetrics={true} userType={{}} />
                                </div>
                            </div>

                            <div className="md:absolute md:top-[42%] w-full max-w-full overflow-hidden">
                                <div className={`bg-black text-white md:w-[460px] max-w-full h-auto border border-gray-200 rounded-lg p-4 overflow-x-auto overflow-y-auto scrollbar-hide text-xs md:text-sm scale-95 break-words whitespace-normal`}>
                                    <RedditPost details={redditPost4.data} theme={'Dark'} logo={"Reddit"} showMetrics={true} userType={{}} />
                                </div>
                            </div>
                        </div>
                    ) : selectedTab == 'Youtube' ? (
                        <div className="w-full grid md:grid-cols-3 auto-rows-auto">
                            <div className="overflow-hidden">
                                <div className={`bg-black text-white w-full h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-95`}>
                                    <YoutubeVideo details={youtubeVideo.data} theme={'Dark'} logo={"youtube"} userType={{}} showMetrics={true} showViews={true} showPauseOverlay={true}/>
                                </div>
                            </div>

                            <div className="">
                                <div className={`bg-black text-white w-[520px] h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-95`}>
                                    <YoutubeChannel details={youtubeChannels.data} theme={'Dark'} logo={"youtube"} userType={{}} showMetrics={true} showViews={true} showPauseOverlay={true}/>
                                </div>
                            </div>
                        </div>
                    ) : selectedTab == 'Product-Hunt' ? (
                        <div className="w-full grid md:grid-cols-3 auto-rows-auto">
                            <div className="">
                                <div className={`bg-black text-white w-[520px] h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-90`}>
                                    <ProductHunt details={PHData.data} logo='ph' theme={'Dark'} showMetrics={true} userType={{}} showViews={false} />
                                </div>
                            </div>

                            <div className="">
                                <div className={`bg-black text-white w-[520px] h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-90`}>
                                    <ProductHunt details={PH2.data} logo='ph' theme={'Dark'} showMetrics={true} userType={{}} showViews={false} />
                                </div>
                            </div>

                            <div className="">
                                <div className={`bg-black text-white w-[520px] h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-90`}>
                                    <ProductHunt details={PH3.data} logo='ph' theme={'Dark'} showMetrics={true} userType={{}} showViews={false} />
                                </div>
                            </div>
                        </div>
                    ) : selectedTab == 'Instagram' ? (
                        <div className="w-full grid md:grid-cols-3 auto-rows-auto">
                            <div className="">
                                <div className={`bg-black text-white w-[520px] h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-90`}>
                                    <InstagramPost details={igPost4.data} logo={'instagram-1'} theme={'Dark'} showMetrics={true} showViews={false} userType={{}} fontClass={'inter'} foldText={true} showCaption={true} showGridView={true}/>
                                </div>
                            </div>

                            <div className="">
                                <div className={`bg-black text-white w-[520px] h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-90`}>
                                    <InstagramPost details={igPost5.data} logo={'instagram-1'} theme={'Dark'} showMetrics={true} showViews={false} userType={{}} fontClass={'inter'} foldText={true} showCaption={true} showGridView={true}/>
                                </div>
                            </div>

                            <div className="">
                                <div className={`bg-black text-white w-[520px] h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-90`}>
                                    <InstagramPost details={instagramPost1.data} logo={'instagram'} theme={'Dark'} showMetrics={true} showViews={false} userType={{}} fontClass={'inter'} foldText={false} showCaption={true} showGridView={false}/>
                                </div>
                            </div>

                            <div className="">
                                <div className={`bg-black text-white w-[520px] h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-90`}>
                                    <InstagramPost details={igPost2.data} logo={'instagram-2'} theme={'Dark'} showMetrics={true} showViews={false} userType={{}} fontClass={'inter'} foldText={true} showCaption={true} showGridView={false}/>
                                </div>
                            </div>

                            <div className="shadow-none">
                                <div className={`bg-black text-white w-[520px] h-auto border border-gray-200 rounded-lg p-4 overflow-y-auto scrollbar-hide text-xs md:text-sm scale-90`}>
                                    <InstagramPost details={igPost3.data} logo={'instagram-1'} theme={'Dark'} showMetrics={true} showViews={false} userType={{}} fontClass={'inter'} foldText={true} showCaption={true} showGridView={true}/>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </section>
            <Footer />
        </div>
    )
}

export default Gallery;
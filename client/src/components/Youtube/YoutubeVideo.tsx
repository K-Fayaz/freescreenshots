
import React, { useEffect } from 'react';
import { Bell, ThumbsDown, ThumbsUp,ArrowDownToLine,Eye } from 'lucide-react';
import { PiShareFat } from "react-icons/pi";
import { SiYoutube } from "react-icons/si";
import { Play,SkipForward,Volume2, Captions,Settings,RectangleHorizontal,Maximize } from 'lucide-react';

interface YoutubeVideoProps {
    details: any;
    logo: string;
    theme: 'Light' | 'Dark';
    showMetrics: boolean;
    showViews: boolean;
    userType: any;
    showPauseOverlay: boolean;
}

const YoutubeVideo : React.FC<YoutubeVideoProps> = ({ details = {}, theme, showMetrics, logo, userType, showViews, showPauseOverlay }) => {
    // Theme-based colors
    const isDark = theme === 'Dark';
    const bgMain = isDark ? 'bg-black' : 'bg-white';
    const textMain = isDark ? 'text-white' : 'text-black';
    const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
    const borderColor = isDark ? 'border-gray-700' : 'border-gray-300';
    const statBg = isDark ? 'bg-[#181818]' : 'bg-gray-100';
    const statText = isDark ? 'text-gray-200' : 'text-gray-700';
    const divider = isDark ? 'bg-[#333]' : 'bg-gray-300';
    const subscribeBtn = isDark ? 'bg-[#ff0c12] text-white' : 'bg-[#ff0c12] text-white';

    return (
        <div className={`w-full max-w-4xl mx-auto ${bgMain} overflow-hidden transition-all duration-300`}>
            {/* Video Thumbnail */}
            <div className={`relative w-full aspect-video ${bgMain}`}>
                <img
                    src={details.thumbnail}
                    alt={details.name}
                    className="w-full h-full object-cover"
                />
                {
                    logo === 'youtube' && (
                        <SiYoutube className={`absolute top-2 left-2 text-white text-3xl`} />
                    )
                }

                {
                    showPauseOverlay && (
                        <div className="w-[98%] absolute bottom-2 left-0 right-0 flex flex-col justify-center items-start left-1/2 transform -translate-x-1/2">
                            <div className="w-full h-1 bg-gray-500">
                                <div className="h-1 bg-red-600" style={{ width: '50%' }}></div>
                            </div>
                            <div className='flex items-center justify-between w-full mt-2'>
                                <div className='flex justify-center items-center gap-3'>
                                    <Play size={20} className='text-white' />
                                    <SkipForward size={20} className='text-white' />
                                    <Volume2 size={20} className='text-white' />
                                </div>
                                <div className='flex justify-center items-center gap-3'>
                                    <Captions size={20} className='text-white' />
                                    <Settings size={20} className='text-white' />
                                    <RectangleHorizontal size={20} className='text-white' />
                                    <Maximize size={20} className='text-white' />
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    showViews && (
                        <div className={`absolute ${showPauseOverlay ? 'bottom-12' : 'bottom-2'} left-2 ${textMain} text-sm flex items-center gap-1 ${bgMain} bg-opacity-50 px-2 py-1 rounded transition-all duration-100`}>
                            <Eye/>
                            {details.views && (
                                <span className={`${textMain} text-xs ml-1`}>{details.views } views</span>  
                            )}
                        </div>
                    )
                }
                <div>

                </div>
                {
                    !showPauseOverlay && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                <circle cx="40" cy="40" r="40" fill="rgba(0,0,0,0.5)" />
                                <polygon points="32,25 60,40 32,55" fill="#fff" />
                            </svg>
                        </div>
                    )
                }
            </div>

            {/* Video Info */}
            <div className="p-6">
                {/* Title */}
                <h1 className={`${textMain} text-base font-bold mb-4`}>{details.name}</h1>

                {/* Channel Row */}
                <div className='flex items-center justify-between gap-2'>
                    <div className={`basis-[60%] flex items-center gap-2`}>
                        <img
                            src={details.channelImage}
                            alt={details.channelName}
                            className={`w-10 h-10 rounded-full object-cover border ${borderColor}`}
                        />
                        <div className=''>
                            <div className={`${textMain} font-semibold text-sm leading-tight`}>{details.channelName}</div>
                            <div className={`${textSecondary} text-xs`}>{details.channelSubscribers}</div>
                        </div>
                    </div>
                    <div className='basis-[25%] flex justify-end'>
                        <button className={`flex items-center px-4 py-2 font-semibold rounded-full text-sm ${subscribeBtn} transition`}>
                            Subscribe
                            <Bell size={18} className='ml-2'/>
                        </button>
                    </div>
                </div>

                {
                    showMetrics && (
                        <div className='flex justify-end mt-4'>
                            {/* Stats Row */}
                            <div className='flex items-center gap-4'>
                                <div className={`flex items-center text-sm h-10 ${statBg} rounded-full px-3`}>
                                    {/* Like button */}
                                    <button className="flex items-center px-2 py-1 focus:outline-none">
                                        <ThumbsUp size={20} className={statText} strokeWidth={2} />
                                        <span className={`ml-1 ${statText} font-medium text-sm`}>{details.likes}</span>
                                    </button>
                                    {/* Divider */}
                                    <span className={`w-px h-6 ${divider} mx-2`}></span>
                                    {/* Dislike button */}
                                    <button className="flex items-center px-2 py-1 focus:outline-none">
                                        <ThumbsDown size={20} className={statText} strokeWidth={2} />
                                    </button>
                                </div>
                                <div className={`flex items-center text-sm h-10 ${statBg} rounded-full px-3`}>
                                    <PiShareFat size={18} className='mr-3' />
                                    <span>Share</span>
                                </div>
                                <div className={`flex items-center text-sm h-10 ${statBg} rounded-full px-3`}>
                                    <ArrowDownToLine size={18} className='mr-3' />
                                    <span>Download</span>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* {details.uploadedYear && (
                                <div className="flex items-center text-gray-300 text-sm">
                                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    {details.uploadedYear}
                                </div>
                            )} */}

                {/* {details.views && (
                                <div className="flex items-center text-gray-300 text-sm">
                                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    {details.views} views
                                </div>
                            )} */}

                {/* Description */}
                {/* <div className="text-gray-200 text-sm whitespace-pre-line mb-2 max-h-40 overflow-y-auto">
                    {details.description}
                </div> */}
                {
                    (userType == null || userType == undefined || userType?.type == 'free') && (
                        <div className="text-center mt-4">
                        <span className="text-gray-500 text-sm">
                            made with <span className="text-red-500">❤</span> by <span className="">ZapShot.in</span>
                        </span>
                        </div>
                    )
                }
            </div>
        </div>
    );
};
export default YoutubeVideo;


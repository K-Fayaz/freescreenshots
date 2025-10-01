import React from "react";
import type { Reply } from "./ReplyChainEditor";
import { FaLinkedin } from "react-icons/fa";
import emptyDp from "../../assets/emptyDP.png";
import { GrLinkedin } from "react-icons/gr";
import { AiOutlineLike, AiFillLike  } from "react-icons/ai";
import { MdModeComment } from "react-icons/md";
import { MdOutlineModeComment } from "react-icons/md";
import { BsSend } from "react-icons/bs";
import { BsFillSendFill } from "react-icons/bs";
import { BiRepost } from "react-icons/bi";
import LoveSvg from "../../assets/likesvg.svg";
import likeSvg from "../../assets/lovesvg.svg";
import ideasvg from "../../assets/ideasvg.svg";
import supportsvg from "../../assets/supportsvg.svg";
interface LinkedInPostProps {
    name: string;
    headline: string;
    verified: boolean;
    profilePic: string;
    time: string;
    date: string;
    appearance: string;
    content: string;
    media: string[];
    views: string;
    likes: string;
    comments: string;
    reposts: string;
    bookmarks: string;
    font: string;
    coloredIcons: boolean;
    logo: string;
    theme: string;
    mediaName: string;
    replies: Reply[];
}

interface FakeLinkedInPostProps {
    linkedInPostData: LinkedInPostProps | null;
}

const FakeLinkedInPost: React.FC<FakeLinkedInPostProps> = ({ linkedInPostData }) => {
    if (!linkedInPostData) {
        return <h1>No LinkedIn Post data</h1>;
    }


    // Combine date and time into a single relative time string (e.g., '1h', '2d', '3w')
    function getRelativeTime(date: string, time: string) {
        // If either is missing, fallback to empty
        if (!date || !time) return '';
        const now = new Date();
        const [hour, minute] = time.split(":").map(Number);
        const postDate = new Date(date);
        postDate.setHours(hour || 0, minute || 0, 0, 0);
        const diffMs = now.getTime() - postDate.getTime();
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHr = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHr / 24);
        const diffWk = Math.floor(diffDay / 7);
        if (diffMin < 1) return 'now';
        if (diffMin < 60) return `${diffMin}m`;
        if (diffHr < 24) return `${diffHr}h`;
        if (diffDay < 7) return `${diffDay}d`;
        return `${diffWk}w`;
    }

    function formatNumber(numStr: string) {
        const num = parseInt(numStr, 10);
        if (isNaN(num)) return numStr;
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1) + 'M';
        if (num >= 1_000) return (num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1) + 'k';
        return num.toString();
    }

    function highlightContent(content: string) {
        if (!content) return '';
        // Highlight #hashtags and @mentions in LinkedIn blue
        return content.replace(/([#@][\w]+)/g, '<span style="color:#0a66c2">$1</span>');
    }

    return (
        <div className={`${linkedInPostData.theme === 'dark' ? 'bg-[#1d2226] text-white' : 'bg-white text-black'} w-[500px] p-6 rounded-2xl shadow-md`}>
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                        {linkedInPostData.profilePic ? (
                            <img src={linkedInPostData.profilePic} className="w-12 h-12 object-cover rounded-full" />
                        ) : (
                            <img src={emptyDp} className="w-12 h-12 object-cover rounded-full" />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-1">
                            <span className="text-base font-semibold">{linkedInPostData.name}</span>
                            {linkedInPostData.verified && (
                                <GrLinkedin fill="#daa657" size={15} />
                            )}
                        </div>
                        <div className="flex items-center">
                            <span className="text-xs text-gray-500">
                                {linkedInPostData.headline.length > 40
                                    ? linkedInPostData.headline.slice(0, 40) + '...'
                                    : linkedInPostData.headline}
                            </span>
                            <span className="text-gray-500 mx-1 text-sm">·</span>
                            <span className="text-xs text-gray-500">{getRelativeTime(linkedInPostData.date, linkedInPostData.time)}</span>
                        </div>
                    </div>
                </div>
                {linkedInPostData.logo === 'LinkedIn' && <FaLinkedin size={28} color="" />}
            </div>

            {/* Content */}
            <div
                className="my-3 whitespace-pre-line text-sm"
                dangerouslySetInnerHTML={{ __html: highlightContent(linkedInPostData.content || '') }}
            />

            {/* Media */}
            {linkedInPostData.media.length > 0 && (
                <div className="w-full h-auto mt-2">
                    <img 
                        src={linkedInPostData.media[0]} 
                        className="w-full h-full object-cover rounded-xl post-media-gif"
                        alt="post media"
                    />
                </div>
            )}

            {/* likes, love reaction overlay */}
            <div className={`flex flex-row justify-between items-center mt-3 ${linkedInPostData.theme == 'light' ? 'text-gray-800' :'text-gray-400'}`}>
                <div className="text-gray-400 text-xs flex items-center space-x-1 relative">
                    <img 
                        src={LoveSvg}
                        className="w-5 h-5 relative"
                    />

                    <img 
                        src={likeSvg}
                        className="w-5 h-5 relative right-2"
                    />

                    <img 
                        src={ideasvg}
                        className="w-5 h-5 relative right-4"
                    />

                    {/* <img 
                        src={supportsvg}
                        className="w-5 h-5 relative right-7"
                    /> */}
                    <span className="text-base relative right-4">{linkedInPostData?.likes}</span>
                </div>
                
                <div className="flex flex-row items-center text-sm space-x-2">
                    <div className="flex items-center space-x-1">
                        <span>{linkedInPostData?.comments}</span>
                        <span>Comments</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center space-x-1">
                        <span>{linkedInPostData?.reposts}</span>
                        <span>Repost</span>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className={`border-b ${linkedInPostData.theme === 'light' ? 'border-gray-200' : 'border-gray-700'} my-3`}></div>

            {/* Stats Row */}
            {
                linkedInPostData?.coloredIcons ? (
                    <div className={`flex items-center justify-between ${linkedInPostData.theme == 'light' ? 'text-gray-800' :'text-gray-400'} text-sm`}>
                        <div className="flex items-center space-x-1">
                            <AiFillLike fill="#388fe9" size={22} />
                            <span className="text-[#388fe9]">Like</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <MdModeComment fill="#d77353" size={22}/>
                            <span className="text-[#d77353]">Comments</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            {/* #f5bb60 */}
                            <BiRepost size={26} fill="#f5bb60" />
                            <span className="text-[#f5bb60]">Repost</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <BsFillSendFill size={22} fill="#6eab54" />
                            <span className="text-[#6eab54]">Share</span>
                        </div>
                    </div>
                ) : (
                    <div className={`flex items-center justify-between ${linkedInPostData.theme == 'light' ? 'text-gray-800' :'text-gray-400'} text-sm`}>
                        <div className="flex items-center space-x-1">
                            <AiOutlineLike size={22} />
                            <span>Like</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <MdOutlineModeComment size={22}/>
                            <span>Comments</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <BiRepost size={26} />
                            <span>Repost</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <BsSend size={22} />
                            <span>Share</span>
                        </div>
                    </div>
                )
            }
            {
                linkedInPostData?.replies?.length > 0 && (
                    <div className={`border-b ${linkedInPostData.theme === 'light' ? 'border-gray-200' : 'border-gray-700'} my-3`}></div>
                )
            }
            {/* Replies */}
            {Array.isArray(linkedInPostData.replies) && linkedInPostData.replies.length > 0 && (
                <div className="">
                    {linkedInPostData.replies.map((reply, idx) => (
                        <div key={idx} className={`flex items-start space-x-3 rounded-xl p-3`}>
                            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-gray-300">
                                {reply.pfp ? (
                                    <img src={reply.pfp} alt="pfp" className="w-full h-full object-cover" />
                                ) : (
                                    <img src={emptyDp} alt="empty" className="w-full h-full object-cover" />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm">{reply.name}</span>
                                    <span className="text-xs text-gray-400">{reply.headline}</span>
                                </div>
                                <div className="flex justify-between text-sm mt-1 whitespace-pre-line">
                                    <span>
                                        {reply.comment}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <img 
                                        src={likeSvg}
                                        className="w-4 h-4"
                                    />
                                    {/* <span>·</span> */}
                                    <span>
                                        {reply.likesCount}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FakeLinkedInPost;
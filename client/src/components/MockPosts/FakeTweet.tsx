import React from "react";
import { BadgeCheck } from "lucide-react";
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { LuUpload } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import emptyDp from "../../assets/emptyDP.png";
import { FaTwitter } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";

interface TwitterReply {
    name: string;
    userHandle: string;
    pfp: string;
    comment: string;
    likesCount: number;
    retweets: number;
    comments: number;
}

interface TwitterPostProps {
    name: string;
    userHandle: string;
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
    retweets: string;
    bookmarks: string;
    coloredIcons: boolean;
    logo: string;
    font: string;
    theme: string;
    mediaName: string;
    replies: TwitterReply[];
}

interface FakeTwitterPostEditorProps {
    twitterPostData: TwitterPostProps | null;
}


const FakeTweet: React.FC<FakeTwitterPostEditorProps> = ({ twitterPostData }) => {
    if (!twitterPostData || twitterPostData == null) {
        return <h1>No Twitter Post data</h1>
    }

    // Format time to AM/PM
    function formatTime(time: string) {
        if (!time) return '';
        const [hourStr, minute] = time.split(":");
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12;
        if (hour === 0) hour = 12;
        return `${hour}:${minute} ${ampm}`;
    }

    // Format date to 'Mon DD, YYYY'
    function formatDate(date: string) {
        if (!date) return '';
        const d = new Date(date);
        if (isNaN(d.getTime())) return date;
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    // Format numbers to k/M (e.g., 10000 -> 10k, 1500000 -> 1.5M)
    function formatNumber(numStr: string) {
        const num = parseInt(numStr, 10);
        if (isNaN(num)) return numStr;
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1) + 'M';
        if (num >= 1_000) return (num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1) + 'k';
        return num.toString();
    }

    // Highlight hashtags and mentions in blue
    function highlightContent(content: string) {
        if (!content) return '';
        // Replace hashtags and mentions with span
        // Handles #hashtag and @mention, not inside words
        return content.replace(/([#@][\w]+)/g, '<span style="color:#1d9bf0">$1</span>');
    }

    return (
        <div className={`${twitterPostData?.theme == 'dark' ? 'bg-black text-white' :'bg-white text-black'} w-[500px] p-5 rounded-2xl`}>
            {/* Tweet Component UI */}
            <div className="">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                {
                                    twitterPostData?.profilePic ? (
                                        <img 
                                            src={twitterPostData?.profilePic}
                                            className="w-10 h-10 object-cover rounded-full"
                                        />
                                    ) : (
                                        <img 
                                            src={emptyDp}
                                            className="w-10 h-10 object-cover rounded-full"
                                        />
                                    )
                                }
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center space-x-1">
                                    <span className="text-sm font-semibold">{twitterPostData?.name}</span>
                                    {
                                        twitterPostData?.verified && (
                                            <VscVerifiedFilled size={16} fill="#2798e5"/>
                                        )
                                    }
                                </div>
                                <span className="text-gray-400 text-xs">{twitterPostData?.userHandle}</span>
                            </div>
                        </div>
                        {
                            twitterPostData?.logo == 'X' ? (
                                <FaXTwitter size={23} />  
                            ) : (
                                twitterPostData?.logo == 'Twitter' ? (
                                    <FaTwitter size={23} fill="#2798e5"/>
                                ) : ''
                            )
                        }         
                    </div>
                    <div
                        className="tweet-content my-2 whitespace-pre-line text-sm"
                        dangerouslySetInnerHTML={{ __html: highlightContent(twitterPostData?.content || '') }}
                    />

                    {
                        twitterPostData?.media.length > 0 && (
                            <div className="w-full h-auto">
                                <img 
                                    src={twitterPostData?.media[0]}
                                    className="w-full h-full object-cover rounded-xl post-media-gif"
                                    alt="post media"
                                />
                            </div>
                        )
                    }
                    
                    {/* Time, Date, Views */}
                    <div className="mt-3 text-gray-400 text-xs flex items-center space-x-1">
                        <span>{formatTime(twitterPostData?.time || "")}</span>
                        <span>·</span>
                        <span>{formatDate(twitterPostData?.date || "")}</span>
                        <span>·</span>
                        <span>{formatNumber(twitterPostData?.views || "")} views</span>
                    </div>
                    
                    {/* Divider */}
                    <div className={`border-b ${twitterPostData?.theme == 'light' ? 'border-gray-200' :'border-gray-700'} my-3`}></div>
                    {/* Stats Row */}

                    <div className="flex items-center justify-between text-gray-400 text-sm">
                        <div className="flex items-center space-x-1">
                            {
                                twitterPostData?.coloredIcons ? (
                                    <FaComment size={17} fill='#03a9f4'/>
                                ) : (
                                    <FaRegComment size={17}/>
                                )
                            }
                            <span className={`${twitterPostData?.coloredIcons ? 'text-[#03a9f4]' : ''}`}>{formatNumber(twitterPostData?.comments || "")}</span>
                        </div>
                                
                        <div className="flex items-center space-x-1">
                            <FaRetweet size={19} fill={`${twitterPostData?.coloredIcons ? '#07a185ff' :'#b8bdbbff'}`}/>
                            <span className={`${twitterPostData?.coloredIcons ? 'text-[#07a185ff]' : ''}`}>{formatNumber(twitterPostData?.retweets || "")}</span>
                        </div>
                                
                        <div className="flex items-center space-x-1">
                            {
                                twitterPostData?.coloredIcons ? (
                                    <FaHeart size={17} fill="#f91880"/>
                                ) : (
                                    <FaRegHeart size={16}/>
                                )
                            }
                            <span className={`${twitterPostData?.coloredIcons ? 'text-[#f91880]' : ''}`}>{formatNumber(twitterPostData?.likes || "")}</span>
                        </div>
                                
                        <div className="flex items-center space-x-1">
                            {
                                twitterPostData?.coloredIcons ? (
                                    <FaBookmark size={16} fill="#1d9bf0"/>
                                ) : (
                                    <FaRegBookmark size={16}/>
                                )
                            }
                            <span className={`${twitterPostData?.coloredIcons ? 'text-[#1d9bf0]' : ''}`}>{formatNumber(twitterPostData?.bookmarks || "")}</span>
                        </div>
                                
                        <div className="flex items-center space-x-1">
                            <LuUpload size={18} className={`${twitterPostData?.coloredIcons ? 'text-[#03a9f4]' :''}`}/>
                        </div>
                    </div>
            </div>

            {/* This section has mocked replies of user */}
            {/* Replies */}
            {
                twitterPostData?.replies.length > 0 && (
                    <div className={`border-b ${twitterPostData?.theme == 'light' ? 'border-gray-200' :'border-gray-700'} mt-3`}></div>
                )
            }
            {Array.isArray(twitterPostData.replies) && twitterPostData.replies.length > 0 && (
                <div className="mt-6 space-y-4">
                    {twitterPostData.replies.map((reply, idx) => (
                        <div key={idx} className={`flex items-start space-x-3`}>
                            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-gray-300">
                                {reply.pfp ? (
                                    <img src={reply.pfp} alt="pfp" className="w-full h-full object-cover" />
                                ) : (
                                    <img src={emptyDp} alt="empty" className="w-full h-full object-cover" />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    <span className="font-semibold text-sm">{reply.name}</span>
                                    <span className="text-xs text-gray-400">{reply.userHandle}</span>
                                </div>
                                <div className="text-sm whitespace-pre-line">
                                    {reply.comment}
                                </div>
                                <div className="flex items-center justify-between space-x-4 mt-2 text-xs text-gray-400">
                                    {/* <span className="flex items-center space-x-1"><FaRegComment size={14}/>{reply.comments}</span>
                                    <span className="flex items-center space-x-1"><FaRetweet size={14}/>{reply.retweets}</span>
                                    <span className="flex items-center space-x-1"><FaRegHeart size={14}/>{reply.likesCount}</span> */}
                                    <div className="flex items-center space-x-1">
                                        <FaRegComment size={17}/>
                                        <span>{reply.comments}</span>
                                    </div>
                                            
                                    <div className="flex items-center space-x-1">
                                        <FaRetweet size={19}/>
                                        <span>{reply.retweets}</span>
                                    </div>
                                            
                                    <div className="flex items-center space-x-1">
                                        <FaRegHeart size={16}/>
                                        <span>{reply.likesCount}</span>
                                    </div>
                                            
                                    {/* <div className="flex items-center space-x-1">
                                        <FaRegBookmark size={16}/>
                                        <span className={`${twitterPostData?.coloredIcons ? 'text-[#1d9bf0]' : ''}`}>{formatNumber(twitterPostData?.bookmarks || "")}</span>
                                    </div> */}
                                            
                                    <div className="flex items-center space-x-1">
                                        <LuUpload size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FakeTweet;
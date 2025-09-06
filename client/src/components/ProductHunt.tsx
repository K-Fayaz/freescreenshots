import React from "react";
import { useState } from "react";
import PHKitty from "../assets/phKitty.png";
import { FaRegCommentAlt } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";
import { BsCaretUp } from "react-icons/bs";
import { FaCaretUp } from "react-icons/fa";

interface PHProps {
    details: any;
    logo: string;
    theme: 'Light' | 'Dark';
    showMetrics: boolean;
    showViews: boolean;
    userType: any;
    font?: string;
}

const fontMap: Record<string, string> = {
    Inter: 'font-sans',
    ibmSans: 'font-ibmSans',
    noto: 'font-noto',
    rubik: 'font-rubik',
    geistMono: 'font-geistMono',
    poppins: 'font-poppins',
    imbMono: 'font-imbMono',
};

const ProductHunt: React.FC<PHProps> = ({ details, logo, theme, showMetrics, showViews, userType, font }) => {
    // Theme classes
    const isDark = theme === 'Dark';
    const bgClass = isDark ? 'bg-black' : 'bg-white';
    const textMain = isDark ? 'text-gray-100' : 'text-gray-800';
    const textSub = isDark ? 'text-gray-300' : 'text-gray-700';
    const textDesc = isDark ? 'text-gray-400' : 'text-gray-600';
    const tagBg = isDark ? 'bg-gray-800' : 'bg-gray-100';
    const tagText = isDark ? 'text-gray-300' : 'text-gray-500';
    const borderClass = isDark ? 'border border-gray-700' : '';
    const upvoteBtn = isDark ? 'bg-orange-600' : 'bg-orange-500';
    const upvoteText = isDark ? 'text-white' : 'text-white';
    const commentText = isDark ? 'text-gray-400' : 'text-gray-400';
    const launchText = isDark ? 'text-gray-400' : 'text-black';

    const fontClass = fontMap[font || 'Inter'] || 'font-sans';
    return (
        <div>
            <div className={`${bgClass} p-6 mx-auto rounded-xl transition-all duration-300 ${fontClass}`}>
                {
                    logo == "ph" && (
                    <div className="flex items-center justify-between">
                        {/* <div className="mt-4">
                            <img src={PHKitty} alt="Product Hunt Logo" className="mr-2" style={{width:'100px', height: '100px'}} />
                        </div> */}
                        {/* <div>
                            <p className={`font-semibold text-base ${textMain} mr-2`}>Product Hunt</p>
                            <p className={`text-xs  ${launchText}`}>
                                    Launched on {new Date(details.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                        </div> */}
                    </div>
                    )
                }
                <div className="flex items-start gap-4 mt-3">
                    <img src={details.thumbnail.url} alt={details.name} className="w-14 h-14 rounded-xl bg-gray-100 object-cover border" />
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h2 className={`text-2xl font-bold m-0 ${textMain}`}>{details.name}</h2>
                            <p className="flex flex-row items-center">
                                <button className={`${upvoteBtn} ${upvoteText} font-bold rounded px-4 py-1.5 cursor-pointer flex flex-row items-center`}>
                                    <FaCaretUp className="w-7 h-7 font-bold mr-2"/>
                                    <span>
                                        {details.votesCount} Upvotes
                                    </span> 
                                </button>
                            </p>
                        </div>
                        <div className={`text-[15px] my-1.5 ${textSub}`}>{details.tagline}</div>
                        <div className={`text-sm mb-2.5 ${textDesc}`}>{details.description}</div>
                        <div className="flex gap-2 mb-2.5">
                            {details.topics.edges.map((topic: any, idx: number) => (
                                <span key={idx} className={`${tagBg} ${tagText} text-xs font-medium rounded px-2 py-0.5`}>{topic.node.name}</span>
                            ))}
                        </div>
                        {
                            showMetrics && (
                                <div className={`flex items-center gap-4 text-sm ${commentText} mt-3 mb-4`}>
                                    <span className="flex items-center gap-1"><FaRegCommentAlt className="w-4 h-4 mr-1" /><span>{details.commentsCount} comments</span></span>
                                    <span className="flex items-center gap-1"><BiUpvote className="w-4 h-4 mr-1" /><span>{details.votesCount}</span></span>
                                </div>
                            )
                        }
                        <p className={`text-xs  ${launchText}`}>
                            Launched on {new Date(details.createdAt).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    </div>
                </div>
                {
                    logo == "ph" && (
                    <div className="flex flex-col items-center justify-between">
                        <div className="mt-4">
                            <img src={PHKitty} alt="Product Hunt Logo" className="mr-2" style={{width:'80px', height: '80px'}} />
                        </div>
                        <div>
                            {/* <p className={`font-semibold text-base ${textMain} mr-2`}>Product Hunt</p> */}
                        </div>
                    </div>
                    )
                }
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
    )
}

export default ProductHunt;
import React, { useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import { LuBriefcaseBusiness } from 'react-icons/lu';
import EmptyDp from "../assets/emptyDP.png"

interface TweetProps {
    details: any;
    logo: string;
    theme: 'Light' | 'Dark';
    showMetrics: boolean;
    userType: any;
}

const TwitterUserProfile: React.FC<TweetProps> = ({ details, logo, theme, showMetrics,userType }) => {

    // Extract links from bioHTML
    const extractLinks = (bioHTML: string) => {
        const linkRegex = /<a[^>]+href="[^"]*"[^>]*>.*?<span[^>]*>http:\/\/<\/span>([^<]+)<\/a>/g;
        const links: string[] = [];
        let match;
        
        while ((match = linkRegex.exec(bioHTML)) !== null) {
            links.push(match[1]);
        }
        
        return links;
    };

    // Extract bio text (remove HTML tags)
    const extractBioText = (bioHTML: string) => {
        return bioHTML.replace(/<[^>]*>/g, '').replace(/\n/g, ' ').trim();
    };

    const links = details?.bioHTML ? extractLinks(details.bioHTML) : [];
    const bioText = details?.bioHTML ? extractBioText(details.bioHTML) : '';

    return (
        <div className={`w-full mx-auto transition-all duration-300 ${theme === 'Dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                         {/* Banner */}
             <div className="relative h-34 bg-white overflow-hidden">
                 {details?.bannerImage ? (
                     <img 
                         src={details.bannerImage} 
                         alt="Profile banner" 
                         className="w-full h-full object-cover overflow-hidden"
                     />
                 ) : (
                     <div className="w-full h-32 bg-[#323639] overflow-hidden"></div>
                 )}
             </div>

            {/* Profile Picture */}
            <div className="relative px-4">
                <div className="absolute -top-16">
                    <div className={`w-32 h-32 rounded-full border-4 ${theme === 'Dark' ? 'border-black' : 'border-white'} overflow-hidden`}>
                        {details?.profilePicture ? (
                            <img 
                                src={details.profilePicture || EmptyDp} 
                                alt="Profile picture" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                <svg className="w-16 h-16 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Profile Info */}
            <div className="px-4 pt-20">
                {/* Name and Verification */}
                <div className="flex items-center justify-between gap-0.5 mb-3">
                    <div>
                        <div className='flex items-center gap-0.5'>
                            <h1 className="text-xl font-bold">{details?.profileName || details?.profileHandle || '@user'}</h1>
                            {
                                details.verified && (
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center">
                                        <svg viewBox="0 0 22 22" aria-label="Verified account" role="img" width="18" height="18" className="ml-0.5"><g><path fill="#1da1f2" d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.569 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>
                                    </div>
                                )
                            }
                        </div>
                        {/* Handle */}
                        <p className="text-gray-400 text-sm">{details?.profileHandle || '@user'}</p>
                    </div>
                    <button className='bg-[#1d9bef] text-white px-6 py-2 rounded-full'>Follow</button>
                </div>

                <div
                     className="tweet-content my-2 whitespace-pre-line"
                     dangerouslySetInnerHTML={{ __html: details.bioHTML }}
                 />

                {
                    details?.userProfessionalCategory && 
                    <div className='flex gap-2 mt-4 mb-2'>
                        <div className={`flex items-center gap-0.5 ${theme === 'Dark' ? 'text-gray-400': 'text-slate-700'} text-sm`}>
                            <LuBriefcaseBusiness className='w-4 h-4'/>
                            <span>{details?.userProfessionalCategory || 'Unknown'}</span>
                        </div>
                    </div>
                }

                {/* Joined Date */}
                <div className="flex flex-wrap gap-3">
                    {
                        details?.userLocation && 
                        <div className={`flex items-center gap-1 ${theme === 'Dark' ? 'text-gray-400': 'text-slate-700'} text-sm`}>
                            <MapPin className='w-4 h-4'/>
                            <span>{details?.userLocation || 'Unknown'}</span>
                        </div>
                    }

                    {
                        details?.userUrl && 
                        <div className={`flex items-center gap-1 ${theme === 'Dark' ? 'text-gray-400': 'text-slate-700'} text-sm`}>
                            <Link className='w-4 h-4'/>
                            <span className='text-blue-500'>{details?.userUrl || 'Unknown'}</span>
                        </div>
                    }

                    {
                        details?.joinedDate && 
                        <div className={`flex items-center gap-1 ${theme === 'Dark' ? 'text-gray-400': 'text-slate-700'} text-sm`}>
                                <CalendarDays className='w-4 h-4'/>
                            <span>Joined {details?.joinedDate || 'Unknown'}</span>
                        </div>
                    }

                </div>

                {/* Following/Followers */}
                {
                    showMetrics && (
                        <div className="flex flex-wrap gap-3 text-sm mt-4 pb-4">
                            <div className="flex gap-1">
                                <span className="font-bold">{details?.following || 0}</span>
                                <span className={`${theme === 'Dark' ? 'text-gray-400': 'text-slate-700'}`}>Following</span>
                            </div>
                            <div className="flex gap-1">
                                <span className="font-bold">{details?.followers || 0}</span>
                                <span className={`${theme === 'Dark' ? 'text-gray-400': 'text-slate-700'}`}>Followers</span>
                            </div>
                            <div className='flex gap-1'>
                                <span className="font-bold">{details?.totalPosts || 0}</span>
                                {/* <span className="text-gray-400"></span> */}
                            </div>
                        </div>
                    )
                }
            </div>
            {
              (userType == null || userType == undefined || userType?.type == 'free') && (
                <div className="text-center pb-3">
                  <span className="text-gray-500 text-sm">
                    made with <span className="text-red-500">❤</span> by <span className="">ZapShot.in</span>
                  </span>
                </div>
              )
            }
        </div>
    );
};

export default TwitterUserProfile;
import { useEffect } from "react";
import { Shield, MapPin, Link, Calendar, Zap } from "lucide-react";
import badge from "../assets/badge.webp";
import EmptyLogo from "../assets/emptyLogo.png";
import PeerListLogoDark from "../assets/peerlist-logo-full.svg";
import PeerListLogoLight from "../assets/peerlist-logo-full-light.svg";
import { ChevronDown } from 'lucide-react';

interface PeerlistProfileProps {
  details: any;
  theme: 'Light' | 'Dark';
  logo: string;
  showMetrics: boolean;
  showProjects: boolean;
  foldProjects: boolean;
  userType: any;
}

const PeerlistProfile: React.FC<PeerlistProfileProps> = ({ details, theme, logo, showMetrics,userType, showProjects,foldProjects }) => {
    
    useEffect(() => {
        console.log("updated: ",foldProjects);
    }, [foldProjects]);
    
    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
    };

  return(
        <div className="p-6 w-full mx-auto text-center transition-all duration-300">
            {/* Profile Picture */}
            <div className="mb-4">
                <img 
                    src={details?.profilePicture || '/default-avatar.png'} 
                    alt="Profile" 
                    className={`w-24 h-24 rounded-full object-cover border-2 mx-auto ${
                        theme === 'Light' ? 'border-black' : 'border-gray-600'
                    }`}
                />
            </div>

            {/* Name and Verification */}
            <div className="flex items-center justify-center gap-2 mb-2">
                <h1 className={`text-2xl font-bold ${
                    theme === 'Light' ? 'text-black' : 'text-white'
                }`}>
                    {details?.displayName || 'Unknown'}
                </h1>
                {details?.verified && (
                    <div className="rounded-full">
                        <img src={badge} alt="Badge" className="w-6 h-6" />
                    </div>
                )}
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
                <p className="text-sm text-gray-500">{details.followers || 0} followers </p>
            </div>

            {/* Headline */}
            <p className={`text-sm mb-4 leading-relaxed text-center w-full ${
                theme === 'Light' ? 'text-gray-700' : 'text-white'
            }`}>
                {details?.headline || 'No headline available'}
            </p>

            {/* Metadata */}
            <div className={`flex justify-center gap-3 mb-6 text-sm ${
                theme === 'Light' ? 'text-gray-600' : 'text-white'
            }`}>
                <div className="flex items-center justify-center gap-0.5 text-xs">
                    <svg width="16" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.49999 1.83325C13.4333 1.83325 14.6667 3.06659 14.6667 7.99992C14.6667 12.9333 13.4333 14.1666 8.49999 14.1666C3.56666 14.1666 2.33333 12.9333 2.33333 7.99992C2.33333 3.06659 3.56666 1.83325 8.49999 1.83325Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path><path d="M6.5 11.3334V4.66675H9.16667C9.6971 4.66675 10.2058 4.87746 10.5809 5.25253C10.956 5.62761 11.1667 6.13631 11.1667 6.66675C11.1667 7.19718 10.956 7.70589 10.5809 8.08096C10.2058 8.45603 9.6971 8.66675 9.16667 8.66675H6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path></svg>
                    <span>Joined {formatDate(details?.createdAt || '')}</span>
                </div>
                {details?.website && (
                    <div className="flex items-center justify-center gap-0.5 text-xs">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 14.5L14.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke"></path><path d="M16.8463 14.6095L19.4558 12C21.5147 9.94112 21.5147 6.60302 19.4558 4.54415C17.397 2.48528 14.0589 2.48528 12 4.54415L9.39045 7.1537M14.6095 16.8463L12 19.4558C9.94113 21.5147 6.60303 21.5147 4.54416 19.4558C2.48528 17.3969 2.48528 14.0588 4.54416 12L7.1537 9.39045" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke"></path></svg>
                        <span>{details.website}</span>
                    </div>
                )}
            </div>

            {/* Skills */}
            {details?.skills && details.skills.length > 0 && (
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {details.skills.map((skill: string, index: number) => (
                            <span 
                                key={index}
                                className={`px-3 py-1 rounded-full text-xs ${
                                    theme === 'Light' 
                                        ? 'bg-gray-200 border border-gray-300 text-gray-800' 
                                        : 'bg-[#333333] border border-gray-600 text-white'
                                }`}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {showProjects && details?.projects && details.projects.length > 0 && (
                <div className="mt-4 space-y-2 text-left">
                    {(foldProjects ? details.projects.slice(0, 3) : details.projects).map((project: any, index: number) => (
                        <div key={index} className="flex items-start gap-4 p-2 rounded-lg">
                            {/* Project Logo */}
                            <div className={`flex-shrink-0 border rounded-lg ${theme === 'Dark' ? 'bg-[#18191B] border-[#232428]' : 'bg-white border-gray-200'}`}>
                                <img 
                                    src={project.logo || EmptyLogo} 
                                    alt={project.title}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                            </div>

                            {/* Project Details */}
                            <div className="flex-1 min-w-0 text-left">
                                <h3 className={`font-semibold text-sm mb-1 text-left ${
                                    theme === 'Light' ? 'text-gray-900' : 'text-gray-300'
                                }`}>
                                    {project.title}
                                </h3>
                                <p className={`text-xs mb-2 text-left ${
                                    theme === 'Light' ? 'text-gray-600' : 'text-gray-300'
                                }`}>
                                    {project.tagline}
                                </p>

                                {/* Metrics */}
                                <div className="flex gap-2 text-xs">
                                    <div className={`flex gap-1${
                                        theme === 'Light' ? 'text-gray-500' : 'text-[#636363]'
                                    }`}>
                                        <svg className={`${theme === 'Light' ? 'text-gray-500' : 'text-gray-400'}`} width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.09881 19C4.7987 18.8721 3.82475 18.4816 3.17157 17.8284C2 16.6569 2 14.7712 2 11V10.5C2 6.72876 2 4.84315 3.17157 3.67157C4.34315 2.5 6.22876 2.5 10 2.5H14C17.7712 2.5 19.6569 2.5 20.8284 3.67157C22 4.84315 22 6.72876 22 10.5V11C22 14.7712 22 16.6569 20.8284 17.8284C19.6569 19 17.7712 19 14 19C13.4395 19.0125 12.9931 19.0551 12.5546 19.155C11.3562 19.4309 10.2465 20.0441 9.14987 20.5789C7.58729 21.3408 6.806 21.7218 6.31569 21.3651C5.37769 20.6665 6.29454 18.5019 6.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke"></path></svg>
                                        <span className={`ml-1 ${theme === 'Light' ? 'text-gray-500' : 'text-gray-400'}`}>
                                            {project.commentCount}
                                        </span>
                                    </div>
                                    <div className={`flex gap-1 ${
                                        theme === 'Light' ? 'text-gray-500' : 'text-gray-400'
                                    }`}>
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 17.9808V9.70753C4 6.07416 4 4.25748 5.17157 3.12874C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.12874C20 4.25748 20 6.07416 20 9.70753V17.9808C20 20.2867 20 21.4396 19.2272 21.8523C17.7305 22.6514 14.9232 19.9852 13.59 19.1824C12.8168 18.7168 12.4302 18.484 12 18.484C11.5698 18.484 11.1832 18.7168 10.41 19.1824C9.0768 19.9852 6.26947 22.6514 4.77285 21.8523C4 21.4396 4 20.2867 4 17.9808Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path></svg>
                                        {project.bookmarkCount}
                                    </div>

                                    {project.categories && project.categories.length > 0 && (
                                        <p className={`text-xs mb-2 text-left ${
                                            theme === 'Light' ? 'text-gray-500' : 'text-gray-400'
                                        }`}>
                                            {project.categories.join(', ')}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="ml-4 flex flex-col items-center">
                                 <div className={`${theme === 'Dark' ? 'bg-[#232428] border border-[#232428]' : 'bg-gray-100 border border-gray-200'} rounded-xl flex flex-col items-center justify-center px-3 py-2 w-12`}>
                                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0017 21.9982H10.0475C9.03149 21.9982 7.32508 22.1082 7.32508 20.6026V13.5667C7.32508 13.0684 7.01695 12.7268 6.43689 12.7268H2.59948C1.43841 12.7268 2.24946 11.8116 2.66039 11.4193C3.07133 11.027 6.69819 7.22967 6.69819 7.22967C6.69819 7.22967 10.941 2.78849 11.4091 2.34169C11.8772 1.8949 12.1044 1.87739 12.5909 2.34169C13.0774 2.806 17.3018 7.22967 17.3018 7.22967C17.3018 7.22967 20.9287 11.027 21.3396 11.4193C21.7505 11.8116 22.5616 12.7268 21.4005 12.7268H17.5631C16.983 12.7268 16.6749 13.0684 16.6749 13.5667V20.6026C16.6749 22.1082 14.9685 21.9982 13.9525 21.9982H12.0017Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path></svg>
                                 <span className={`${theme === 'Dark' ? 'text-white' : 'text-black'} font-bold text-base mt-1`}>{project.upvotesCount || 0}</span>
                                 </div>
                             </div>
                        </div>
                    ))}
                    <div className="text-center">
                        {details.projects.length > 3 && foldProjects && (
                            <button 
                                className={`text-sm font-semibold ${
                                    theme === 'Light' ? 'text-gray-600' : 'text-gray-400'
                                }`}
                            >
                                <ChevronDown size={18} className="inline mr-1" />
                                +{details?.projects.length - 3} projects
                            </button>
                        )}    
                    </div>
                </div>
            )}

            {
                logo == "Peerlist" && 
                <div className="grid place-items-center mt-1">
                    {
                        theme === 'Dark' ? <img src={PeerListLogoDark} alt="PeerList Logo" className="w-[110px] h-[60px]" /> : <img src={PeerListLogoLight} alt="PeerList Logo" className="w-[110px] h-[60px]" />
                    }
                </div>
            }

            {
              (userType == null || userType == undefined || userType?.type == 'free') && (
                <div className="text-center">
                  <span className="text-gray-500 text-sm">
                    made with <span className="text-red-500">❤</span> by <span className="">ZapShot.in</span>
                  </span>
                </div>
              )
            }
        </div>
  )
}

export default PeerlistProfile;
import React from 'react';
import { ArrowBigUp, MessageCircle, Repeat2 } from 'lucide-react';
import { SiPeerlist } from "react-icons/si";
import { FaPlay } from "react-icons/fa6";
import emptyDP from '../assets/emptyDP.png';
import "../peerlist.css";

interface PeerlistPostProps {
  details: any;
  theme: 'Light' | 'Dark';
  logo?: string;
  showMetrics?: boolean;
  userType: any;
}

// Helper to format time as relative (e.g., '5 minutes ago')
function getRelativeTime(isoString: string) {
  if (!isoString) return '';
  const nowUTC = Date.now();
  const postUTC = new Date(isoString).getTime();
  const diffInSeconds = Math.floor((nowUTC - postUTC) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s`;
  if (diffInSeconds < 3600) {
    const mins = Math.floor(diffInSeconds / 60);
    return `${mins}m`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h`;
  }
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d`;
  }
  const weeks = Math.floor(diffInSeconds / 604800);
  return `${weeks}w`;
}

// Helper to get time left from endsOn
function getTimeLeft(endsOn: string) {
  if (!endsOn) return '';
  const end = new Date(endsOn);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  if (diff <= 0) return 'Poll ended';
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''} left`;
  if (mins > 0) return `${mins} minute${mins !== 1 ? 's' : ''} left`;
  return 'Less than a minute left';
}

const PeerlistPost = React.forwardRef<HTMLDivElement, PeerlistPostProps>(({ details, theme, logo, userType, showMetrics = true }, ref) => {
  if (!details) return null;
  return (
    <div ref={ref} className="p-5 transition-all duration-300">
      {/* Top: Profile */}
      <div className="flex items-center mb-3">
        <img src={details.profileImg || emptyDP} alt="profile" className="rounded-full w-[40px] h-[40px] mr-3" />
        <div className="flex flex-col">
          <span className="font-semibold text-[16px]">{details.username}</span>
          <div className="flex items-center mt-0.5">
            <span className="text-gray-400 text-xs">@{details.profileHandle}</span>
            <span className="text-gray-400 mx-0.5" style={{ fontSize: '18px', lineHeight: '1' }}>&middot;</span>
            <span className="text-gray-400 text-xs">#{details.contextLabel}</span>
            <span className="text-gray-400 mx-0.5" style={{ fontSize: '18px', lineHeight: '1' }}>&middot;</span>
            <span className="text-gray-400 text-xs">{getRelativeTime(details.time)}</span>
          </div>
        </div>
        {logo === 'Peerlist' && (
            <span className="ml-auto p-1 rounded-lg flex items-center justify-center">
                <svg width="37" height="37" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                    <g id="Logo Colour=Primary, Logo Type=LogoMark, Shape=Squircle">
                        <g id="bg">
                            <path id="mask" d="M28 0C6.22222 0 0 6.22222 0 28C0 49.7778 6.23778 56 28 56C49.7622 56 56 49.7778 56 28C56 6.22222 49.7622 0 28 0Z" fill="#00AA45"></path>
                            <path id="mask (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M7.24755 7.24755C3.5875 10.9076 2 17.153 2 28C2 38.8461 3.59108 45.0918 7.25306 48.7521C10.9153 52.4127 17.1612 54 28 54C38.8388 54 45.0847 52.4127 48.7469 48.7521C52.4089 45.0918 54 38.8461 54 28C54 17.1539 52.4089 10.9082 48.7469 7.24787C45.0847 3.58733 38.8388 2 28 2C17.153 2 10.9076 3.5875 7.24755 7.24755ZM0 28C0 6.22222 6.22222 0 28 0C49.7622 0 56 6.22222 56 28C56 49.7778 49.7622 56 28 56C6.23778 56 0 49.7778 0 28Z" fill="#219653"></path>
                        </g>
                        <g id="logo">
                            <path id="shadow" fillRule="evenodd" clipRule="evenodd" d="M27.0769 13H15V47H24.3846V39.8889H27.0769C34.7305 39.8889 41 33.9048 41 26.4444C41 18.984 34.7305 13 27.0769 13ZM24.3846 30.7778V22.1111H27.0769C29.6194 22.1111 31.6154 24.0864 31.6154 26.4444C31.6154 28.8024 29.6194 30.7778 27.0769 30.7778H24.3846Z" fill="#24292E"></path>
                            <path id="solid" fillRule="evenodd" clipRule="evenodd" d="M18 12H29.0769C36.2141 12 42 17.5716 42 24.4444C42 31.3173 36.2141 36.8889 29.0769 36.8889H25.3846V44H18V12ZM25.3846 29.7778H29.0769C32.1357 29.7778 34.6154 27.39 34.6154 24.4444C34.6154 21.4989 32.1357 19.1111 29.0769 19.1111H25.3846V29.7778Z" fill="white"></path>
                            <path id="outline" fillRule="evenodd" clipRule="evenodd" d="M17 11H29.0769C36.7305 11 43 16.984 43 24.4444C43 31.9048 36.7305 37.8889 29.0769 37.8889H26.3846V45H17V11ZM19 13V43H24.3846V35.8889H29.0769C35.6978 35.8889 41 30.7298 41 24.4444C41 18.1591 35.6978 13 29.0769 13H19ZM24.3846 18.1111H29.0769C32.6521 18.1111 35.6154 20.9114 35.6154 24.4444C35.6154 27.9775 32.6521 30.7778 29.0769 30.7778H24.3846V18.1111ZM26.3846 20.1111V28.7778H29.0769C31.6194 28.7778 33.6154 26.8024 33.6154 24.4444C33.6154 22.0864 31.6194 20.1111 29.0769 20.1111H26.3846Z" fill="#24292E"></path>
                        </g>
                    </g>
                </svg>
            </span>
        )}
      </div>
      {/* Title */}
      <div className="font-semibold text-[15px] mb-1" style={{ color: theme === 'Dark' ? '#fff' : '#000' }}>{details.title}</div>
      {/* Content */}
      <div className="text-[15px] font-normal leading-snug mb-2" style={{ color: theme === 'Dark' ? '#fff' : '#000' }}>
        <div
          className={`peerlist-content break-words overflow-x-auto`}
          style={{ wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}
          dangerouslySetInnerHTML={{ __html: details.content }}
        />
      </div>

      {/* Media */}
      {details.media && details.media.length > 0 && (
        <div className="w-full my-3">
          {details.media.length === 1 && (
            <div className="relative w-full">
              <img src={details.media[0]} alt="media" className="w-full border border-white rounded-lg" />
              {details.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-60 rounded-full w-14 h-14 flex items-center justify-center">
                    <FaPlay size={24} color="white" className="ml-1" />
                  </div>
                </div>
              )}
            </div>
          )}
          {details.media.length === 2 && (
            <div className="flex flex-row gap-1 ">
              <div className="relative w-1/2 h-[300px]">
                <img src={details.media[0]} alt="media1" className="w-full h-full object-cover rounded-lg" />
                {details.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black bg-opacity-60 rounded-full w-14 h-14 flex items-center justify-center">
                      <FaPlay size={24} color="white" className="ml-1" />
                    </div>
                  </div>
                )}
              </div>
              {/* <div className="w-0.5 bg-gray-300 mx-1" /> */}
              <div className="relative w-1/2 h-[300px]">
                <img src={details.media[1]} alt="media2" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
          )}
          {details.media.length === 3 && (
            <div className="flex flex-row gap-2 w-full h-[300px]">
              {/* Left column: one tall image */}
              <div className="w-1/2 h-full">
                <img src={details.media[0]} alt="media1" className="w-full h-full object-cover rounded-lg" />
                      </div>
              {/* Right column: two stacked images */}
              <div className="w-1/2 h-full flex flex-col gap-2">
                <div className="h-1/2">
                  <img src={details.media[1]} alt="media2" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="h-1/2">
                  <img src={details.media[2]} alt="media3" className="w-full h-full object-cover rounded-lg" />
                </div>
              </div>
            </div>
          )}
          {details.media.length === 4 && (
            <div className="grid grid-cols-2 grid-rows-2 gap-2 border border-white rounded-lg">
              {[0,1,2,3].map((idx) => (
                <div key={idx} className="relative w-full h-full">
                  <img src={details.media[idx]} alt={`media${idx+1}`} className="w-full h-[150px] object-cover" />
                  {details.isVideo && idx === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black bg-opacity-60 rounded-full w-14 h-14 flex items-center justify-center">
                        <FaPlay size={24} color="white" className="ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Link Embed Card */}
      {details?.linkEmbed && (
        <div className={`rounded-xl overflow-hidden mt-3 ${theme === 'Dark' ? 'bg-[#0f0f0f] border border-zinc-800' : 'bg-white border border-gray-200'}`}
             style={{ boxShadow: theme === 'Dark' ? '0 1px 2px 0 #0002' : '0 1px 2px 0 #0001' }}>
        <a
            href={details.linkEmbed.link}
          target="_blank"
          rel="noopener noreferrer"
            className="block no-underline"
        >
            <div className="flex items-center p-4">
            <div className="flex-1 min-w-0">
                <div className={`font-semibold text-sm mb-1 truncate ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>{details.linkEmbed.title}</div>
                <div className={`text-xs mb-2 ${theme === 'Dark' ? 'text-zinc-300' : 'text-gray-600'}`}>{details.linkEmbed.description}</div>
                <div className={`text-xs truncate ${theme === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`}>{details.linkEmbed.link.replace(/^https?:\/\//, '')}</div>
            </div>
            {
              details.linkEmbed.image && <div className="ml-4 flex-shrink-0">
                <img
                    src={details.linkEmbed.image}
                    alt={details.linkEmbed.title}
                  className={`w-auto max-w-30 h-16 rounded-lg object-cover border ${theme === 'Dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-100 border-gray-200'}`}
                  style={{ minWidth: 64, minHeight: 64 }}
                />
              </div>
            }
          </div>
        </a>
          {/* TL;DR by Peerlist */}
          {details.linkEmbed.tldr && (
            <div className={`border-t flex ${theme === 'Dark' ? 'border-zinc-800' : 'border-gray-200'}`}
            >
              <div className={`border-l-4 pl-3 py-3 flex-1 ${theme === 'Dark' ? 'border-green-600 bg-transparent' : 'border-green-500 bg-transparent'}`}>
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold mb-2 ${theme === 'Dark' ? 'bg-[#0f0f0f] text-gray-400' : 'bg-green-100 text-green-700'}`}>TL;DR by Peerlist</span>
                <div className={`text-sm mt-1 ${theme === 'Dark' ? 'text-gray-100' : 'text-gray-800'}`}>{details.linkEmbed.tldr}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Project Embed Card */}
      {details.projectEmbed && details.projectEmbed.type === 'project' && (
        <div
          className={`flex items-center rounded-xl p-3 mt-4 border ${theme === 'Dark' ? 'bg-[#0f0f0f] border-[#232428]' : 'bg-white border-gray-200'}`}
          style={{ minHeight: 64 }}
        >
          {/* Logo */}
          <div className={`flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center mr-4 overflow-hidden ${theme === 'Dark' ? 'bg-black' : 'bg-gray-100'}`}>
            <img
              src={details.projectEmbed.logo}
              alt={details.projectEmbed.title}
              className="object-contain"
              // style={{ minWidth: 40, minHeight: 40 }}
            />
          </div>
          {/* Title & Tagline */}
          <div className="flex-1 min-w-0">
            <div className={`font-semibold text-sm mb-1 truncate ${theme === 'Dark' ? 'text-white' : 'text-gray-900'}`}>{details.projectEmbed.title}</div>
            <div className={`text-xs truncate max-w-[260px] ${theme === 'Dark' ? 'text-gray-300' : 'text-gray-600'}`}>{details.projectEmbed.tagline}</div>
            {/* Metrics and Categories */}
            <div className="flex items-center gap-4 mt-2">
              {/* Comments */}
              <span className={`flex items-center text-xs gap-1 ${theme === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.09881 19C4.7987 18.8721 3.82475 18.4816 3.17157 17.8284C2 16.6569 2 14.7712 2 11V10.5C2 6.72876 2 4.84315 3.17157 3.67157C4.34315 2.5 6.22876 2.5 10 2.5H14C17.7712 2.5 19.6569 2.5 20.8284 3.67157C22 4.84315 22 6.72876 22 10.5V11C22 14.7712 22 16.6569 20.8284 17.8284C19.6569 19 17.7712 19 14 19C13.4395 19.0125 12.9931 19.0551 12.5546 19.155C11.3562 19.4309 10.2465 20.0441 9.14987 20.5789C7.58729 21.3408 6.806 21.7218 6.31569 21.3651C5.37769 20.6665 6.29454 18.5019 6.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke"></path></svg>
                {details.projectEmbed.comments || 0}
              </span>
              {/* Bookmarks */}
              <span className={`flex items-center text-xs gap-1 ${theme === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 17.9808V9.70753C4 6.07416 4 4.25748 5.17157 3.12874C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.12874C20 4.25748 20 6.07416 20 9.70753V17.9808C20 20.2867 20 21.4396 19.2272 21.8523C17.7305 22.6514 14.9232 19.9852 13.59 19.1824C12.8168 18.7168 12.4302 18.484 12 18.484C11.5698 18.484 11.1832 18.7168 10.41 19.1824C9.0768 19.9852 6.26947 22.6514 4.77285 21.8523C4 21.4396 4 20.2867 4 17.9808Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path></svg>
                {details.projectEmbed.bookmarks || 0}
              </span>
              {/* Categories */}
              {details.projectEmbed.categories && details.projectEmbed.categories.length > 0 && (
                <span className={`flex items-center gap-1 ${theme === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path><path d="M2.774 11.144c-1.003 1.12-1.024 2.81-.104 4a34.008 34.008 0 006.186 6.186c1.19.92 2.88.899 4-.104a92.344 92.344 0 008.516-8.698 1.95 1.95 0 00.47-1.094c.164-1.796.503-6.97-.902-8.374-1.405-1.405-6.578-1.066-8.374-.901a1.952 1.952 0 00-1.094.47 92.35 92.35 0 00-8.698 8.515z" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke"></path><path d="M7 14l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path></svg>
                  {details.projectEmbed.categories.map((cat: string, idx: number) => (
                    <span key={cat} className="text-xs">
                      {cat}
                      {idx !== details.projectEmbed.categories.length - 1 && <span className="">,</span>}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </div>
          {/* Upvotes */}
          <div className="ml-4 flex flex-col items-center">
            <div className={`${theme === 'Dark' ? 'bg-[#232428]' : 'bg-gray-100'} rounded-xl flex flex-col items-center justify-center px-3 py-2`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0017 21.9982H10.0475C9.03149 21.9982 7.32508 22.1082 7.32508 20.6026V13.5667C7.32508 13.0684 7.01695 12.7268 6.43689 12.7268H2.59948C1.43841 12.7268 2.24946 11.8116 2.66039 11.4193C3.07133 11.027 6.69819 7.22967 6.69819 7.22967C6.69819 7.22967 10.941 2.78849 11.4091 2.34169C11.8772 1.8949 12.1044 1.87739 12.5909 2.34169C13.0774 2.806 17.3018 7.22967 17.3018 7.22967C17.3018 7.22967 20.9287 11.027 21.3396 11.4193C21.7505 11.8116 22.5616 12.7268 21.4005 12.7268H17.5631C16.983 12.7268 16.6749 13.0684 16.6749 13.5667V20.6026C16.6749 22.1082 14.9685 21.9982 13.9525 21.9982H12.0017Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path></svg>
              <span className={`${theme === 'Dark' ? 'text-white' : 'text-black'} font-bold text-base mt-1`}>{details.projectEmbed.upvotes || 0}</span>
            </div>
          </div>
        </div>
      )}

      {/* Poll Embed Card */}
      {details?.pollEmbed && (
        <div className={`mt-3 rounded-xl py-2 `}
        >
          <div className="flex flex-col gap-2">
            {details.pollEmbed.labels.map((label: string, idx: number) => {
              const optionKey = `option${idx + 1}`;
              const voteCount = details.pollEmbed.votes?.[optionKey] || 0;
              const totalVotes = details.pollEmbed.totalVotes || 0;
              const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
              
              return (
                <div
                  key={idx}
                  className={`w-full py-2 px-3 text-sm font-semibold rounded-lg transition-colors relative
                    ${theme === 'Dark' ? 'bg-transparent border border-zinc-700 text-white' : 'bg-transparent border border-gray-300 text-black'}`}
                >
                  {details.pollEmbed.hasVotes ? (
                    // Show vote results with percentages and progress bars
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-xs font-medium min-w-[30px]">{percentage}%</span>
                        <span className="flex-1">{label}</span>
                      </div>
                      <div className="flex-1 max-w-[200px] ml-4">
                        <div className={`h-1 rounded-full ${theme === 'Dark' ? 'bg-zinc-700' : 'bg-gray-200'}`}>
                          <div 
                            className={`h-1 rounded-full ${theme === 'Dark' ? 'bg-white' : 'bg-gray-600'}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Show regular poll options (current behavior)
                    <div className="text-center">
                      {label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-3 text-xs" style={{ color: theme === 'Dark' ? '#b3b3b3' : '#555' }}>
            <span>Total {details.pollEmbed.totalVotes} votes</span>
            <span>{getTimeLeft(details.pollEmbed.endsOn)}</span>
          </div>
        </div>
      )}

      {/* Article Embed Card */}
      {details.articleEmbed && details.articleEmbed.type === 'article' && (
        <div className={`${theme == 'Dark' ? 'bg-[#0f0f0f]' : 'bg-[#f1f4f9]'} pt-2 px-1 pb-1 rounded-xl`}>
          <div className="flex items-center min-w-0 mb-1 p-0.5">
              <img src={details.articleEmbed.creator?.profilePicture} alt={details.articleEmbed.creator?.displayName} className="w-5 h-5 rounded-full mr-2 object-cover" />
              <span className={`text-xs font-medium truncate ${theme === 'Dark' ? 'text-gray-200' : 'text-gray-800'}`}>{details.articleEmbed.creator?.displayName}</span>
              <span className={`mx-1 text-xs ${theme === 'Dark' ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
              <span className={`text-xs truncate ${theme === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`}>{details.articleEmbed.readTime} min read</span>
              <span className="flex-1" />
              <span className={`ml-auto px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1 ${theme === 'Dark' ? '' : ''}`}
                style={{ whiteSpace: 'nowrap' }}>
                <svg width="16" height="16" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                    <g id="Logo Colour=Primary, Logo Type=LogoMark, Shape=Squircle">
                        <g id="bg">
                            <path id="mask" d="M28 0C6.22222 0 0 6.22222 0 28C0 49.7778 6.23778 56 28 56C49.7622 56 56 49.7778 56 28C56 6.22222 49.7622 0 28 0Z" fill="#00AA45"></path>
                            <path id="mask (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M7.24755 7.24755C3.5875 10.9076 2 17.153 2 28C2 38.8461 3.59108 45.0918 7.25306 48.7521C10.9153 52.4127 17.1612 54 28 54C38.8388 54 45.0847 52.4127 48.7469 48.7521C52.4089 45.0918 54 38.8461 54 28C54 17.1539 52.4089 10.9082 48.7469 7.24787C45.0847 3.58733 38.8388 2 28 2C17.153 2 10.9076 3.5875 7.24755 7.24755ZM0 28C0 6.22222 6.22222 0 28 0C49.7622 0 56 6.22222 56 28C56 49.7778 49.7622 56 28 56C6.23778 56 0 49.7778 0 28Z" fill="#219653"></path>
                        </g>
                        <g id="logo">
                            <path id="shadow" fillRule="evenodd" clipRule="evenodd" d="M27.0769 13H15V47H24.3846V39.8889H27.0769C34.7305 39.8889 41 33.9048 41 26.4444C41 18.984 34.7305 13 27.0769 13ZM24.3846 30.7778V22.1111H27.0769C29.6194 22.1111 31.6154 24.0864 31.6154 26.4444C31.6154 28.8024 29.6194 30.7778 27.0769 30.7778H24.3846Z" fill="#24292E"></path>
                            <path id="solid" fillRule="evenodd" clipRule="evenodd" d="M18 12H29.0769C36.2141 12 42 17.5716 42 24.4444C42 31.3173 36.2141 36.8889 29.0769 36.8889H25.3846V44H18V12ZM25.3846 29.7778H29.0769C32.1357 29.7778 34.6154 27.39 34.6154 24.4444C34.6154 21.4989 32.1357 19.1111 29.0769 19.1111H25.3846V29.7778Z" fill="white"></path>
                            <path id="outline" fillRule="evenodd" clipRule="evenodd" d="M17 11H29.0769C36.7305 11 43 16.984 43 24.4444C43 31.9048 36.7305 37.8889 29.0769 37.8889H26.3846V45H17V11ZM19 13V43H24.3846V35.8889H29.0769C35.6978 35.8889 41 30.7298 41 24.4444C41 18.1591 35.6978 13 29.0769 13H19ZM24.3846 18.1111H29.0769C32.6521 18.1111 35.6154 20.9114 35.6154 24.4444C35.6154 27.9775 32.6521 30.7778 29.0769 30.7778H24.3846V18.1111ZM26.3846 20.1111V28.7778H29.0769C31.6194 28.7778 33.6154 26.8024 33.6154 24.4444C33.6154 22.0864 31.6194 20.1111 29.0769 20.1111H26.3846Z" fill="#24292E"></path>
                        </g>
                    </g>
                </svg>
                ARTICLES
              </span>
            </div>
          <div className={`flex rounded-xl mt-3 rounded ${theme === 'Dark' ? 'bg-black' : 'bg-white'}`}
          >
            {/* Left: Article Info */}
            <div className="flex-1 flex flex-col justify-between p-4 min-w-0">
              {/* Top Row: Creator, read time, chip */}
              {/* Title and subtitle */}
              <div className="min-w-0">
                <div className={`font-bold text-[16px] leading-tight mb-1 truncate-2l ${theme === 'Dark' ? 'text-white' : 'text-black'}`}
                  style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {details.articleEmbed.title}
                </div>
                {details.articleEmbed.subtitle && (
                  <div className={`text-xs mb-1 truncate-21 ${theme === 'Dark' ? 'text-gray-300' : 'text-gray-600'}`} style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {details.articleEmbed.subtitle}
                  </div>
                )}
              </div>
              {/* Metrics and keywords */}
              <div className="flex items-center gap-2 mt-2 min-w-0">
                {/* Metrics */}
                <span className={`flex items-center gap-1 text-xs ${theme === 'Dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.09881 19C4.7987 18.8721 3.82475 18.4816 3.17157 17.8284C2 16.6569 2 14.7712 2 11V10.5C2 6.72876 2 4.84315 3.17157 3.67157C4.34315 2.5 6.22876 2.5 10 2.5H14C17.7712 2.5 19.6569 2.5 20.8284 3.67157C22 4.84315 22 6.72876 22 10.5V11C22 14.7712 22 16.6569 20.8284 17.8284C19.6569 19 17.7712 19 14 19C13.4395 19.0125 12.9931 19.0551 12.5546 19.155C11.3562 19.4309 10.2465 20.0441 9.14987 20.5789C7.58729 21.3408 6.806 21.7218 6.31569 21.3651C5.37769 20.6665 6.29454 18.5019 6.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke"></path></svg>
                  {details.articleEmbed.commentCount || 0}
                </span>
                <span className={`flex items-center gap-1 text-xs ${theme === 'Dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.4626 3.9941C16.7809 2.34918 14.4404 4.01206 13.0344 5.06796C12.4578 5.50091 12.1696 5.71738 12 5.71738C11.8304 5.71738 11.5422 5.50091 10.9656 5.06796C9.55962 4.01206 7.21909 2.34918 4.53744 3.9941C1.01807 6.15289 0.22172 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15289 19.4626 3.9941Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" vector-effect="non-scaling-stroke"></path></svg>
                  {details.articleEmbed.upvoteCount || 0}
                </span>
                {/* Keywords */}
                {details.articleEmbed.keywords && details.articleEmbed.keywords.length > 0 && (
                  <span className={`flex flex-wrap gap-1 ml-2 ${theme === 'Dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                    <svg className="mt-0.5 text-xs" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path><path d="M2.774 11.144c-1.003 1.12-1.024 2.81-.104 4a34.008 34.008 0 006.186 6.186c1.19.92 2.88.899 4-.104a92.344 92.344 0 008.516-8.698 1.95 1.95 0 00.47-1.094c.164-1.796.503-6.97-.902-8.374-1.405-1.405-6.578-1.066-8.374-.901a1.952 1.952 0 00-1.094.47 92.35 92.35 0 00-8.698 8.515z" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke"></path><path d="M7 14l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path></svg>
                    {details.articleEmbed.keywords.map((kw: string) => (
                      <span key={kw} className={`text-xs font-medium ${theme === 'Dark' ? 'text-gray-400' : 'text-gray-700'} text-gray-400`}>{kw}</span>
                    ))}
                  </span>
                )}
              </div>
            </div>
            {/* Right: Featured image */}
            {details.articleEmbed.featuredImage && (
              <div className="flex-shrink-0 w-36 h-28 m-3 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                <img src={details.articleEmbed.featuredImage} alt={details.articleEmbed.title} className="w-full h-full object-contain" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reshare Embed Card */}
      {details.reshareEmbed && details.reshareEmbed.type === 'reshare' && (
        <div className={`mt-3 rounded-xl p-4 ${theme === 'Dark' ? 'bg-black border border-[#2a2a2a]' : 'bg-white border border-gray-200'}`}>
          {/* Top: Original Author Info */}
          <div className="flex items-center mb-3">
            <img 
              src={details.reshareEmbed.profilePicture || emptyDP} 
              alt="profile" 
              className="rounded-full w-[40px] h-[40px] mr-3" 
            />
            <div className="flex flex-col">
              <span className={`font-semibold text-[16px] ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                {details.reshareEmbed.username}
              </span>
              <div className="flex items-center mt-0.5">
                <span className={`text-xs ${theme === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  #{details.reshareEmbed.resharedContext?.toLowerCase()}
                </span>
                <span className={`mx-0.5 ${theme === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontSize: '18px', lineHeight: '1' }}>&middot;</span>
                <span className={`text-xs ${theme === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {getRelativeTime(details.reshareEmbed.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Post Title */}
          {details.reshareEmbed.postTitle && (
            <div className={`font-semibold text-[15px] mb-2 ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
              {details.reshareEmbed.postTitle}
            </div>
          )}

          {/* Post Content */}
          {details.reshareEmbed.content && (
            <div className={`text-[15px] font-normal leading-snug mb-2 ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
              <div
                className={`peerlist-content whitespace-pre-line break-words overflow-x-auto`}
                style={{ wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}
                dangerouslySetInnerHTML={{ __html: details.reshareEmbed.content }}
              />
            </div>
          )}

          {/* Media from reshared post */}
          {details.reshareEmbed.media && details.reshareEmbed.media.length > 0 && (
            <div className="w-full my-3">
              {details.reshareEmbed.media.length === 1 && (
                <div className="relative w-full">
                  <img src={details.reshareEmbed.media[0]} alt="media" className="w-full border border-white rounded-lg" />
                  {details.reshareEmbed.videos && details.reshareEmbed.videos.length > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black bg-opacity-60 rounded-full w-14 h-14 flex items-center justify-center">
                        <FaPlay size={24} color="white" className="ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              )}
              {details.reshareEmbed.media.length === 2 && (
                <div className="flex flex-row gap-1">
                  <div className="relative w-1/2 h-[300px]">
                    <img src={details.reshareEmbed.media[0]} alt="media1" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="relative w-1/2 h-[300px]">
                    <img src={details.reshareEmbed.media[1]} alt="media2" className="w-full h-full object-cover rounded-lg" />
                  </div>
                </div>
              )}
              {details.reshareEmbed.media.length === 3 && (
                <div className="flex flex-row gap-2 w-full h-[300px]">
                  <div className="w-1/2 h-full">
                    <img src={details.reshareEmbed.media[0]} alt="media1" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="w-1/2 h-full flex flex-col gap-2">
                    <div className="h-1/2">
                      <img src={details.reshareEmbed.media[1]} alt="media2" className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className="h-1/2">
                      <img src={details.reshareEmbed.media[2]} alt="media3" className="w-full h-full object-cover rounded-lg" />
                    </div>
                  </div>
                </div>
              )}
              {details.reshareEmbed.media.length === 4 && (
                <div className="grid grid-cols-2 grid-rows-2 gap-2 border border-white rounded-lg">
                  {[0,1,2,3].map((idx) => (
                    <div key={idx} className="relative w-full h-full">
                      <img src={details.reshareEmbed.media[idx]} alt={`media${idx+1}`} className="w-full h-[150px] object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Job Embed Card */}
      {details.jobEmbed && details.jobEmbed.type === 'job' && (
        <div className={`mt-3 rounded-xl p-4 ${theme === 'Dark' ? 'bg-black border border-[#2a2a2a]' : 'bg-white border border-gray-200'}`}>
          <div className="flex items-start gap-3">
            {/* Company Logo */}
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
              <img 
                src={details.jobEmbed.companyLogo} 
                alt={details.jobEmbed.companyName}
                className="w-12 h-12 object-contain"
              />
            </div>
            
            {/* Job Details */}
            <div className="flex-1 min-w-0">
              {/* Job Title and Company */}
              <div className={`font-bold text-base mb-1 ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                {details.jobEmbed.jobTitle} at {details.jobEmbed.companyName}
              </div>
              
              {/* Job Details Line */}
              <div className={`text-sm mb-3 ${theme === 'Dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {[
                  details.jobEmbed.location,
                  details.jobEmbed.jobType,
                  details.jobEmbed.experience,
                  getRelativeTime(details.jobEmbed.publishedAt)
                ].filter(Boolean).join(' • ')}
              </div>
              
              {/* Skills */}
              {details.jobEmbed.skills && details.jobEmbed.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {details.jobEmbed.skills.map((skill: string, index: number) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${theme === 'Dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Profile Embed Card */}
      {details.profileEmbed && details.profileEmbed.type === 'profile' && (
        <div className={`mt-3 rounded-xl p-4 ${theme === 'Dark' ? 'bg-black border border-[#2a2a2a]' : 'bg-white border border-gray-200'}`}>
          <div className="flex items-start gap-3">
            {/* Profile Picture */}
            <div className="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden">
              <img 
                src={details.profileEmbed.profilePicture || emptyDP} 
                alt={details.profileEmbed.username}
                className="w-14 h-14 object-cover"
              />
            </div>
            
            {/* Profile Details */}
            <div className="flex-1 min-w-0">
              {/* Name */}
              <div className={`font-bold text-sm mb-1 ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                {details.profileEmbed.username}
              </div>
              
              {/* Bio */}
              {details.profileEmbed.bio && (
                <div className={`text-xs mb-3 ${theme === 'Dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {details.profileEmbed.bio}
                </div>
              )}
              
              {/* Skills */}
              {details.profileEmbed.skills && details.profileEmbed.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {details.profileEmbed.skills.map((skill: string, index: number) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${theme === 'Dark' ? 'bg-[#1a1a1a] text-white border-gray-600' : 'bg-gray-100 text-gray-700 border-gray-300'}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Metrics */}
      {showMetrics && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, color: '#71767b', fontSize: 16, marginTop: 10 }}>
          {/* Upvotes */}
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="" ><path d="M6.09881 19C4.7987 18.8721 3.82475 18.4816 3.17157 17.8284C2 16.6569 2 14.7712 2 11V10.5C2 6.72876 2 4.84315 3.17157 3.67157C4.34315 2.5 6.22876 2.5 10 2.5H14C17.7712 2.5 19.6569 2.5 20.8284 3.67157C22 4.84315 22 6.72876 22 10.5V11C22 14.7712 22 16.6569 20.8284 17.8284C19.6569 19 17.7712 19 14 19C13.4395 19.0125 12.9931 19.0551 12.5546 19.155C11.3562 19.4309 10.2465 20.0441 9.14987 20.5789C7.58729 21.3408 6.806 21.7218 6.31569 21.3651C5.37769 20.6665 6.29454 18.5019 6.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke"></path></svg>
            {details.comments || 0}
        </span>
        
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.2493 6.4C17.5466 4.79481 16.3897 3.42896 14.9205 2.4698C13.4512 1.51064 11.7334 0.999845 9.97742 1C5.29924 1 1.45113 4.5523 1 9.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path><path d="M14.4889 6.40002H18.4588C18.5299 6.40002 18.6003 6.38606 18.6659 6.35892C18.7316 6.33178 18.7913 6.29201 18.8416 6.24186C18.8918 6.19172 18.9317 6.13219 18.9589 6.06667C18.9861 6.00116 19.0001 5.93094 19.0001 5.86002V1.90002M1.74994 13.6C3.14302 16.7788 6.32256 19 10.0218 19C14.7009 19 18.5481 15.4477 19.0001 10.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path><path d="M5.51127 13.6H1.54135C1.39778 13.6 1.26008 13.6569 1.15856 13.7581C1.05704 13.8594 1 13.9968 1 14.14V18.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path></svg>
            {details.reposts || 0}
        </span>
        
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0017 21.9982H10.0475C9.03149 21.9982 7.32508 22.1082 7.32508 20.6026V13.5667C7.32508 13.0684 7.01695 12.7268 6.43689 12.7268H2.59948C1.43841 12.7268 2.24946 11.8116 2.66039 11.4193C3.07133 11.027 6.69819 7.22967 6.69819 7.22967C6.69819 7.22967 10.941 2.78849 11.4091 2.34169C11.8772 1.8949 12.1044 1.87739 12.5909 2.34169C13.0774 2.806 17.3018 7.22967 17.3018 7.22967C17.3018 7.22967 20.9287 11.027 21.3396 11.4193C21.7505 11.8116 22.5616 12.7268 21.4005 12.7268H17.5631C16.983 12.7268 16.6749 13.0684 16.6749 13.5667V20.6026C16.6749 22.1082 14.9685 21.9982 13.9525 21.9982H12.0017Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path></svg>
            {details.upvotes || 0}
        </span>
      </div>
      )}

      {
        (userType == null || userType == undefined || userType?.type == 'free') && (
          <div className="text-center mt-3">
            <span className="text-gray-500 text-sm">
              made with <span className="text-red-500">❤</span> by <span className="">ZapShot.in</span>
            </span>
          </div>
        )
      }
    </div>
  );
});

export default PeerlistPost; 
import React from 'react';
import { Heart, MessageCircle, Repeat2 } from 'lucide-react';
import { FaThreads } from "react-icons/fa6";
import emptyDP from '../assets/emptyDP.png';
import { Send } from 'lucide-react';

interface ThreadsPostProps {
    details: any;
    theme: 'Light' | 'Dark';
    logo?: string;
    showMetrics?: boolean;
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

const ThreadsPost = React.forwardRef<HTMLDivElement, ThreadsPostProps>(({ details, theme, logo, showMetrics = true }, ref) => {
  if (!details) return null;

    return (
    <div ref={ref} className="p-4">
      {/* Top: Profile */}
      <div className="flex items-center mb-3">
        <img 
          src={details.profilePhoto || emptyDP} 
          alt="profile" 
          className="rounded-full w-[40px] h-[40px] mr-3 flex-shrink-0" 
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            <span className={`font-semibold text-[15px] ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
              {details.username}
            </span>
            <span className={`text-gray-500 text-xs ${theme === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              • {details.timeDisplay || getRelativeTime(details.timestamp)}
            </span>
          </div>
        </div>
        {logo === 'Threads' && (
          <div className="ml-auto p-1 rounded-lg flex items-center justify-center">
            <FaThreads size={32} className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`text-[15px] font-normal leading-snug mb-3 ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
        <div
          className="break-words overflow-x-auto"
          style={{ wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}
        >
          {Array.isArray(details.description) 
            ? details.description.map((text: string, index: number) => (
                <p key={index} className="mb-2 last:mb-0">
                  {text}
                </p>
              ))
            : <p>{details.description}</p>
          }
        </div>
      </div>

      {/* Media */}
      {details.images && details.images.length > 0 && (
        <div className="w-full mb-3">
          {details.images.length === 1 && (
            <div className="relative w-full">
              <img 
                src={details.images[0].src} 
                alt={details.images[0].alt || "media"} 
                className="w-full rounded-xl object-cover" 
                style={{ maxHeight: '500px' }}
              />
            </div>
          )}
          {details.images.length === 2 && (
            <div className="flex flex-row gap-1">
              <div className="relative w-1/2 h-[300px]">
                <img 
                  src={details.images[0].src} 
                  alt={details.images[0].alt || "media1"} 
                  className="w-full h-full object-cover rounded-l-xl" 
                />
              </div>
              <div className="relative w-1/2 h-[300px]">
                <img 
                  src={details.images[1].src} 
                  alt={details.images[1].alt || "media2"} 
                  className="w-full h-full object-cover rounded-r-xl" 
                />
              </div>
            </div>
          )}
          {details.images.length === 3 && (
            <div className="flex flex-row gap-1 w-full h-[300px]">
              {/* Left column: one tall image */}
              <div className="w-1/2 h-full">
                <img 
                  src={details.images[0].src} 
                  alt={details.images[0].alt || "media1"} 
                  className="w-full h-full object-cover rounded-l-xl" 
                />
              </div>
              {/* Right column: two stacked images */}
              <div className="w-1/2 h-full flex flex-col gap-1">
                <div className="h-1/2">
                  <img 
                    src={details.images[1].src} 
                    alt={details.images[1].alt || "media2"} 
                    className="w-full h-full object-cover rounded-tr-xl" 
                  />
                </div>
                <div className="h-1/2">
                  <img 
                    src={details.images[2].src} 
                    alt={details.images[2].alt || "media3"} 
                    className="w-full h-full object-cover rounded-br-xl" 
                  />
                </div>
              </div>
            </div>
          )}
                     {details.images.length === 4 && (
             <div className="grid grid-cols-2 grid-rows-2 gap-1 rounded-xl overflow-hidden">
               {[0,1,2,3].map((idx) => (
                 <div key={idx} className="relative w-full h-full">
                   <img 
                     src={details.images[idx].src} 
                     alt={details.images[idx].alt || `media${idx+1}`} 
                     className="w-full h-[150px] object-cover" 
                   />
                 </div>
               ))}
             </div>
           )}
           {details.images.length > 4 && (
             <div className="grid grid-cols-2 grid-rows-2 gap-1 rounded-xl overflow-hidden">
               {[0,1,2,3].map((idx) => (
                 <div key={idx} className="relative w-full h-full">
                   <img 
                     src={details.images[idx].src} 
                     alt={details.images[idx].alt || `media${idx+1}`} 
                     className="w-full h-[150px] object-cover" 
                   />
                   {idx === 3 && (
                     <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                       <span className="text-white text-lg font-semibold">
                         +{details.images.length - 4}
                       </span>
                     </div>
                   )}
                 </div>
               ))}
             </div>
           )}
        </div>
      )}

      {/* Metrics */}
      {showMetrics && (
        <div className={`flex items-center justify-between text-sm ${theme === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="flex items-center gap-6 mt-2">
            {/* Likes */}
            <span className="flex items-center gap-2">
              <Heart size={16} className="stroke-current" />
              {details.likes || 0}
            </span>
            
            {/* Comments */}
            <span className="flex items-center gap-2">
              <MessageCircle size={16} className="stroke-current" />
              {details.comments || 0}
            </span>
            
            {/* Reposts */}
            <span className="flex items-center gap-2">
              <Repeat2 size={20} className="stroke-current" />
              {details.reposts || 0}
            </span>
          <span className="flex items-center gap-2">
            <Send size={16} className="stroke-current" />
            {details.shares || 0}
          </span>
          </div>
          
          {/* Share */}
        </div>
      )}
    </div>
  );
});

export default ThreadsPost;
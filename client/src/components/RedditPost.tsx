import React from 'react';
import { Play } from 'lucide-react';
import { BiUpvote } from 'react-icons/bi';
import { FaRegComment } from "react-icons/fa";
import styles from './RedditPost.module.css';
import RedditSnooIcon from './RedditSnooIcon';
import { TbAward } from "react-icons/tb";
import { RiShareForwardLine } from "react-icons/ri";


interface RedditPostProps {
  details: any;
  logo: string;
  theme: 'Light' | 'Dark';
  showMetrics: boolean;
  userType: any;
}


const RedditPost: React.FC<RedditPostProps> = ({ details = {}, theme, showMetrics, logo, userType }) => {
  const isDark = theme === 'Dark';
  const iconTextColor = isDark ? 'text-white' : 'text-white';
  const subredditIcon = details?.subredditIcon || '';
  const subreddit = details?.subreddit || '';
  const timeAgo = details?.timeAgo || '';
  const username = details?.username || '';
  const title = details?.title || '';
  const postFlair = details?.postFlair || '';
  const emojiFlair = details?.emojiFlair || '';
  const postFlairBackground = details?.postFlairBackground || 'gray';
  const images = Array.isArray(details?.images) ? details?.images : [];
  const isVideoPresent = !!details?.isVideoPresent;
  const body = details?.body || '';
  const score = details?.score || 0;
  const commentCount = details?.commentCount || 0;
  const authorFlairText = details?.authorFlairText || '';
  let authorFlairBackground = details?.authorFlairBackground || '';
  let authorFlairEmojees = details?.authorFlairEmojees || [];

  function convertToTimeAgo(timestamp: number) {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp * 1000) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];

    if (seconds < 5) return "just now";
    if (seconds < 60) return `${seconds} seconds ago`;

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return count === 1
          ? `1 ${interval.label} ago`
          : `${count} ${interval.label}s ago`;
      }
    }
  }

  return (
    <div
      className={`rounded-lg px-6 py-4 mx-auto transition-all duration-500 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {subredditIcon && (
            <img
              src={subredditIcon}
              alt={subreddit + ' icon'}
              className="w-12 h-12 rounded-full mr-2"
            />
          )}
          <div className="flex flex-col justify-center">
            <span className="font-semibold text-[15px]">
              {
                subreddit && (<span>{subreddit}</span>)
              }
              {timeAgo && (
                <span className={`ml-2 font-normal text-[13px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>• {convertToTimeAgo(Number(timeAgo))}</span>
              )}
            </span>
            <span>
              {
                username && <span className={`text-[13px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>u/{username}</span>
              }
              {
                // • 
                authorFlairText && (
                  <span className='ml-2 rounded-xl px-2 text-black' style={{ background: authorFlairBackground }}>
                    {
                      authorFlairEmojees && authorFlairEmojees.length && authorFlairEmojees.map((emojee, index) => {
                        if (emojee) {
                          return (
                            <img
                              key={index}
                              src={emojee}
                              alt="author flair emoji"
                              className="inline-block mr-1"
                              style={{ height: 16, width: 16, verticalAlign: 'middle' }}
                            />
                          );
                        }
                      })
                    }
                    <span className={`text-[13px]`}>{authorFlairText}</span>
                  </span>
                )
              }
            </span>
          </div>
        </div>
        {
          logo === 'Reddit' && (
            <RedditSnooIcon />
          )
        }
      </div>
      {/* Title */}
      <h2 className="font-bold text-xl mt-2 mb-4 leading-tight">{title}</h2>
      {/* Flair */}
      {postFlair && (
        <div
          className="reddit-flair-wrapper px-2 py-1 rounded-full mb-2 w-auto text-center inline-block text-xs text-black"
          style={{ background: postFlairBackground }}
        >
          {
            emojiFlair && (
              <img
                src={emojiFlair}
                alt="flair emoji"
                className="inline-block mr-1"
                style={{ height: 16, width: 16, verticalAlign: 'middle' }}
              />
            )
          }
          {postFlair}
        </div>
      )}

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="w-full mb-3">
          {images.length === 1 && (
            <div className="relative w-full">
              <img
                src={images[0]}
                alt="Reddit post image"
                className="w-full rounded-xl object-contain"
                style={{ maxHeight: '400px' }}
              />
              {isVideoPresent && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play size={56} className="text-white bg-black bg-opacity-60 rounded-full p-2" />
                </div>
              )}
            </div>
          )}
          {images.length === 2 && (
            <div className="flex flex-row gap-1">
              <div className="relative w-1/2 h-[200px]">
                <img
                  src={images[0]}
                  alt="Reddit post image 1"
                  className="w-full h-full object-cover rounded-l-xl"
                />
                {isVideoPresent && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play size={40} className="text-white bg-black bg-opacity-60 rounded-full p-1" />
                  </div>
                )}
              </div>
              <div className="relative w-1/2 h-[200px]">
                <img
                  src={images[1]}
                  alt="Reddit post image 2"
                  className="w-full h-full object-cover rounded-r-xl"
                />
              </div>
            </div>
          )}
          {images.length === 3 && (
            <div className="flex flex-row gap-1 w-full h-[200px]">
              <div className="relative w-1/2 h-full">
                <img
                  src={images[0]}
                  alt="Reddit post image 1"
                  className="w-full h-full object-cover rounded-l-xl"
                />
                {isVideoPresent && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play size={40} className="text-white bg-black bg-opacity-60 rounded-full p-1" />
                  </div>
                )}
              </div>
              <div className="w-1/2 h-full flex flex-col gap-1">
                <div className="h-1/2">
                  <img
                    src={images[1]}
                    alt="Reddit post image 2"
                    className="w-full h-full object-cover rounded-tr-xl"
                  />
                </div>
                <div className="h-1/2">
                  <img
                    src={images[2]}
                    alt="Reddit post image 3"
                    className="w-full h-full object-cover rounded-br-xl"
                  />
                </div>
              </div>
            </div>
          )}
          {images.length === 4 && (
            <div className="grid grid-cols-2 grid-rows-2 gap-1 rounded-xl overflow-hidden">
              {[0,1,2,3].map((idx) => (
                <div key={idx} className="relative w-full h-full">
                  <img
                    src={images[idx]}
                    alt={`Reddit post image ${idx+1}`}
                    className="w-full h-[150px] object-cover"
                  />
                  {isVideoPresent && idx === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play size={32} className="text-white bg-black bg-opacity-60 rounded-full p-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {images.length > 4 && (
            <div className="grid grid-cols-2 grid-rows-2 gap-1 rounded-xl overflow-hidden">
              {[0,1,2,3].map((idx) => (
                <div key={idx} className="relative w-full h-full">
                  <img
                    src={images[idx]}
                    alt={`Reddit post image ${idx+1}`}
                    className="w-full h-[150px] object-cover"
                  />
                  {isVideoPresent && idx === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play size={32} className="text-white bg-black bg-opacity-60 rounded-full p-1" />
                    </div>
                  )}
                  {idx === 3 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">
                        +{images.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Body */}
      <div
        className={styles.redditPostContent}
        dangerouslySetInnerHTML={{ __html: body }}
      />
      {/* Metrics */}
      {showMetrics && (
        <div className="flex items-center gap-3 mt-4 mb-2">
          <div className={`flex items-center gap-1 ${iconTextColor} bg-[#d93804] rounded-full px-4 py-1`}>
            <BiUpvote size={20} />
            <span className="font-medium">{score}</span>
          </div>
          <div className={`flex items-center gap-1 ${iconTextColor} bg-[#1a272d] rounded-full px-4 py-1`}>
            <FaRegComment size={20} />
            <span className="font-medium">{commentCount}</span>
          </div>
          <div className={`flex items-center gap-1 ${iconTextColor} bg-[#1a272d] rounded-full px-4 py-1 font-medium`}>
            <TbAward  size={24}/>
          </div>
          <div className={`flex items-center gap-1 ${iconTextColor} bg-[#1a272d] rounded-full px-4 py-1 font-medium`}>
            <RiShareForwardLine  size={25}/>
            <span className="font-medium">Share</span>
          </div>
        </div>
      )}

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
  );
};

export default RedditPost;
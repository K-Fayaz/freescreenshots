import { BsTwitterX } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { SiPeerlist } from "react-icons/si";
import { PlayCircle } from "lucide-react";

interface TweetProps {
    details: any;
    logo: string;
    theme: 'Light' | 'Dark';
    showMetrics: boolean;
    showViews: boolean;
}

const Tweet: React.FC<TweetProps> = ({ details, logo, theme, showMetrics, showViews }) => {
    return(
        <div className="p-5">
            {/* Top: Profile */}
            <div className="flex items-center mb-4">
                {/* Left: Profile, username, verified, handle */}
                <div className="flex items-center">
                    <img src={details.profileImg} alt="profile" className="rounded-full w-[45px] h-[45px] mr-3" />
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-[17px]">{details.username}</span>
                            {/* Verified icon */}
                            <svg viewBox="0 0 22 22" aria-label="Verified account" role="img" width="18" height="18" className="ml-0.5"><g><path fill="#1da1f2" d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.569 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>
                        </div>
                        <span className="text-gray-400 text-[15px] font-normal">{details.userHandle}</span>
                    </div>
                </div>
                {/* Right: Logo */}
                {logo !== 'None' && (
                    <span className="ml-auto">
                        {logo === 'X' && <BsTwitterX size={30} />}
                        {logo === 'Twitter' && <FaTwitter size={30} color="#1DA1F2" />}
                        {logo === 'Peerlist' && <SiPeerlist size={22} color="#12D760" />}
                    </span>
                )}
            </div>
            {/* Tweet Content */}
            <div className="text-[15px] font-normal leading-snug mt-2">
                <div
                    className="tweet-content my-2 whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: details.tweetContent }}
                />
                {details?.tweetImage && (
                    <div className="relative">
                        {details.isVideo === true && (
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 flex items-center justify-center">
                                <PlayCircle
                                    className=""
                                    color="#fff"
                                    fill="none"
                                    size={32}
                                    strokeWidth={2.5}
                                />
                            </span>
                        )}
                        <img src={details.tweetImage} alt="tweet" className="w-full border border-white rounded-lg my-3" />
                    </div>
                )}
                {/* Quoted Tweet */}
                {details.isQuoted && details.quoted && (
                  <div
                    className={`rounded-xl border mt-4 p-4 text-[14px] ${theme === 'Dark' ? 'border-gray-700 bg-[#181C20] text-gray-200' : 'border-gray-200 bg-gray-100 text-gray-900'}`}
                  >
                    <div className="flex items-center mb-2">
                      <img src={details.quoted.profileImg} alt="profile" className="rounded-full w-7 h-7 mr-2" />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[14px]">{details.quoted.username}</span>
                          {/* Verified icon */}
                          <svg viewBox="0 0 22 22" aria-label="Verified account" role="img" width="16" height="16" className="ml-0.5"><g><path fill="#1da1f2" d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>
                        </div>
                        <span className="text-gray-400 text-[13px]">
                          {details.quoted.userHandle}
                          {details.quoted.time && (
                            <>
                              <span className="mx-1">·</span>
                              {details.quoted.time}
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="tweet-content my-1 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: details.quoted.tweetContent }} />
                    {details.quoted.tweetImage && (
                      <div className="relative mt-2">
                        {details.quoted.isVideo === true && (
                          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 flex items-center justify-center">
                            <PlayCircle
                              className=""
                              color="#fff"
                              fill="none"
                              size={24}
                              strokeWidth={2.5}
                            />
                          </span>
                        )}
                        <img src={details.quoted.tweetImage} alt="tweet" className="w-full border border-gray-800 rounded-lg my-2" />
                      </div>
                    )}
                  </div>
                )}
            </div>
            {/* Tweet Metrics */}
            {showMetrics && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 28, marginBottom: 0, color: '#71767b', fontSize: 16 }}>
              <div style={{ display: 'flex', gap: 32 }}>
                {/* Replies */}
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {/* Comment Icon */}
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><g><path fill="#71767b" d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
                  {details.replies || 0}
                </span>
                {/* Retweets */}
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {/* Retweet Icon */}
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><g><path fill="#71767b" d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g></svg>
                  {details.retweets || 0}
                </span>
                {/* Likes */}
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {/* Like Icon */}
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><g><path fill="#71767b" d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>
                  {details.likes || 0}
                </span>
              </div>
              {/* Views */}
              {showViews && (
                <span style={{ color: theme === 'Dark' ? '#fff' : '#000', fontWeight: 700, fontSize: 16 }}>
                  {details.views ? details.views : 0}
                  <span style={{ color: '#71767b', fontWeight: 400, marginLeft: 4 }}>Views</span>
                </span>
              )}
            </div>
            )}
        </div>
    )
}

export default Tweet;
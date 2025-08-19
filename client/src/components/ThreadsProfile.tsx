
import React, { useEffect } from "react";
import { CgDetailsLess } from "react-icons/cg";

interface ThreadsProfileProps {
    details: any;
    theme: 'Light' | 'Dark';
    logo?: string;
    userType: any;
}

const ThreadsProfile = React.forwardRef<HTMLDivElement, ThreadsProfileProps>(({details, theme, userType, logo}, ref) => {
    useEffect(() => {
        console.log(details);
    },[]);

    // Parse bio lines
    const bioLines = details?.userBio ? details.userBio.split('\n') : [];

    return(
        <div ref={ref} className={`p-4`}>
            <div className="flex items-start justify-between">
                {/* Left side - Name and handle */}
                <div className="flex-1">
                    <h1 className="text-xl font-bold mb-1">{details?.displayName || 'Name'}</h1>
                    <p className={`text-sm ${theme === 'Dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {details?.userHandle || '@handle'}
                    </p>
                </div>
                
                {/* Right side - Profile picture */}
                <div className="ml-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500">
                        {details?.profilePicture ? (
                            <img 
                                src={details.profilePicture} 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                                <span className="text-white text-lg font-bold">
                                    {details?.displayName?.charAt(0) || 'U'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bio section */}
            <div className="mt-4">
                {bioLines.map((line: string, index: number) => (
                    <p key={index} className="text-sm leading-relaxed mb-1">
                        {line}
                    </p>
                ))}
            </div>

            {/* Bottom section - Followers and link */}
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                    <span className="text-sm font-medium">
                        {details?.followers || '0 followers'}
                    </span>
                    {details?.links && details.links.length > 0 && (
                        <>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className={`text-sm ${theme === 'Dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                {details.links[0]}
                            </span>
                        </>
                    )}
                </div>
            </div>

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
    )
});

export default ThreadsProfile;
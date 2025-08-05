import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TwitterSeed, PeerlistSeed,threadsSeed } from '../Seed/HeroSeed';
import Tweet from './Tweet';
import TwitterUserProfile from './TwitterUserProfile';
import X from "../assets/X.png";
import Peerlist from "../assets/Peerlist.png";
import Threads from "../assets/Threads.png";

const Hero = () => {
  const navigate = useNavigate();
  const [currentPlatform, setCurrentPlatform] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const platforms = ['Twitter', 'Peerlist', 'Threads'];

  // Add custom CSS for subtle pulse animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes subtle-pulse {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlatform((prev) => (prev + 1) % platforms.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsTyping(true);
    setDisplayText('');
    
    const currentWord = platforms[currentPlatform];
    let index = 0;
    
    const typeInterval = setInterval(() => {
      if (index < currentWord.length) {
        setDisplayText(currentWord.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentPlatform]);
  return (
        <div className="w-full h-[calc(100vh-85px)] flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 items-center">
                {/* Left Side - Content */}
                <div className="text-left lg:col-span-3 max-w-2xl">
                  {/* What's New Section */}
                  <div className="mb-8">
                            {/* <p className="text-gray-900 font-medium mb-2">What's new v1.3.0?</p> */}
                            <p
                            className="inline-flex items-center bg-blue-100 p-2 px-5 rounded-full text-blue-600 hover:text-blue-700 transition-colors duration-200"
                            >
                            Professional screenshot generator with custom branding
                            {/* <span className="ml-1">🚀</span> */}
                            {/* <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg> */}
                            </p>
                  </div>

                  {/* Headline */}
                  <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Create Stunning
                            <br />
                            <span className="text-blue-600">
                            <span className="inline-block w-[240px] text-center">
                                {displayText}
                                                <span className="text-blue-600 text-4xl font-bold ml-1 inline-block" style={{
                                animation: 'subtle-pulse 1s ease-in-out infinite',
                                height: '1.2em',
                                width: '3px',
                                backgroundColor: 'currentColor',
                                verticalAlign: 'baseline'
                                }}></span>
                            </span>
                            <span>Screenshots</span>
                            </span>
                  </h1>

                  {/* Description */}
                  <p className="text-xl text-gray-600 mb-8">
                            Create beautiful, branded screenshots from Twitter, Peerlist, and Threads posts. Customize colors, add your logo, and export high-quality images instantly. Perfect for content creators, marketers, and social media professionals.
                  </p>

                  {/* Input Field and Button */}
                  <div className="flex flex-col sm:flex-row gap-5 items-center">
                    <input
                      type="text"
                      placeholder="Paste Tweet URL here (e.g. thread or article)"
                      className="flex-1 w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          navigate('/signin');
                        }
                      }}
                    />
                    <button 
                      onClick={() => navigate('/signin')}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200 whitespace-nowrap"
                    >
                      Try for Free
                    </button>
                  </div>
                </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               {/* Right Side - Screenshot Images */}
                <div className="hidden lg:block lg:col-span-2 flex items-center justify-center p-8">
                  <div className="relative h-[550px] w-[600px]">
                    <img 
                      src={X} 
                      alt={'X post'} 
                      className="absolute inset-0 transition-opacity duration-500 ease-in-out object-contain max-w-full max-h-full"
                      style={{ opacity: currentPlatform === 0 ? 1 : 0 }}
                    />
                    
                    <img 
                      src={Peerlist} 
                      alt={'Peerlist post'} 
                      width={600} 
                      height={550} 
                      className="absolute inset-0 transition-opacity duration-500 ease-in-out object-contain"
                      style={{ opacity: currentPlatform === 1 ? 1 : 0 }}
                    />
                             
                    <img 
                      src={Threads} 
                      alt={'Threads post'} 
                      width={600} 
                      height={550} 
                      className="absolute inset-0 transition-opacity duration-500 ease-in-out object-contain"
                      style={{ opacity: currentPlatform === 2 ? 1 : 0 }}
                    />
                  </div>
                </div>
                </div>
            </div>
        </div>
   );
 };

export default Hero; 
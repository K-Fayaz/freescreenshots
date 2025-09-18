import React, { useState } from 'react';
import { BsTwitterX } from 'react-icons/bs';
import styles from '../RedditPost.module.css';
import RedditSnooIcon from '../RedditSnooIcon';
import { FaThreads } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { SiYoutube } from "react-icons/si";
import PhKitty from "../../assets/phKitty.png";
import igLogo from "../../assets/igLogo-2.png";

const Hero = () => {
  const [url,setUrl] = useState<string>('');
  const navigate = useNavigate();

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let token = localStorage.getItem('token') || null;
    if (!token) {
      navigate(`/signin?next=${encodeURIComponent(url)}`);
      return;
    }

    navigate(`/screenshot?url=${encodeURIComponent(url)}`);
  }
  return (
    <section className="w-full flex flex-col items-center justify-center py-10 md:py-20 bg-white">
      {/* Badge */}
      <div className="mb-6">
        <span className="inline-block bg-gray-300 font-semibold text-gray-700 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
          Stop cropping. Start zapping. <span className='text-md md:text-xl'>📸</span>
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-9xl max-w-6xl font-black text-center text-black leading-tight mb-10">
        Create Stunning <br /> <h1 className='relative text-2xl md:text-8xl'> Screenshots <span className="text-xs md:text-2xl absolute top-[38%] md:top-[55%] font-cursive ml-2 md:ml-3">in seconds</span></h1> 
      </h1>

      {/* Form */}
      <form onSubmit={handleUrlSubmit} className="ml-4 md:ml-0 mt-2 w-full max-w-xl flex rounded-full overflow-hidden shadow-sm md:shadow-lg bg-white">
        <input
          type="text"
          placeholder="Paste your link here..."
          value={url}
          required
          onChange={(e) => setUrl(e.target.value)}
          className="flex-[8] px-3 py-2 md:px-6 md:py-4 text-md md:text-lg border-none outline-none bg-gray-100"
          style={{ width: '80%' }}
        />
        <button
          type="submit"
          className="flex-[2] font-cursive bg-black text-white font-semibold text-sm md:text-lg px-4 py-4 transition-all hover:bg-gray-900 w-[15%] md:w-[20%]"
          // style={{ width: '20%' }}
        >
          Zap It
        </button>
      </form>
      {/* Supported Platforms Section*/}
      <div className="w-full flex flex-col items-center mt-24">
        <div className="flex items-center w-full text-center md:max-w-6xl mb-6">
          <div className="flex-1 border-t hidden md:block border-gray-300"></div>
          <div className="px-4 text-center text-xs md:text-sm md:text-base text-gray-700 mx-auto font-medium whitespace-nowrap">
            <span className="font-bold text-black font-cursive">Zapshot</span> Works seamlessly with your favorite platforms
          </div>
          <div className="flex-1 border-t hidden md:block border-gray-300"></div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 w-full max-w-6xl">
          {/* Replace these with actual SVGs or images as needed */}
          <span className="flex items-center gap-2 text-lg font-semibold text-black opacity-80">
            <BsTwitterX size={30} /> Twitter
          </span>
          <span className="flex items-center gap-2 text-lg font-semibold text-black opacity-80">
            <SiYoutube size={30} fill={"#ff0131"} /> YouTube
          </span>
          <span className='flex items-center gap-2 text-lg font-semibold text-black opacity-80'>
            <img 
              src={PhKitty}
              className='w-12 h-12'
            />
            Product Hunt
          </span>
          <span className='flex items-center gap-2 text-lg font-semibold text-black opacity-80'>
            <img 
              src={igLogo}
              className='w-7 h-7'
            />
            Instagram
          </span>
          <span className="flex items-center gap-2 text-lg font-semibold text-black opacity-80">
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
            Peerlist
          </span>
          <span className="flex items-center gap-2 text-lg font-semibold text-black opacity-80">
            <RedditSnooIcon /> Reddit
          </span>
          {/* <span className="flex items-center gap-2 text-lg font-semibold text-black opacity-80">
            <FaThreads size={30} />Threads
          </span> */}
          {/* <span className="flex items-center gap-2 text-lg font-semibold text-black opacity-80">
            + More
          </span> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;

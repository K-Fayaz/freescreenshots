import React from 'react';
import { useNavigate } from 'react-router-dom';

const MiniCTA = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center items-center py-12">
      <div className="relative w-11/12 max-w-7xl rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 min-h-[300px] flex items-center px-8 md:px-16 py-12">
        {/* Semi-circle Concentric Circles Background */}
        <div className="absolute -right-[280px] top-0 h-full" style={{ width: '55%', height: '100%', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '500px', height: '500px', overflow: 'hidden' }}>
            <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '0', top: '0' }}>
              <circle cx="250" cy="250" r="250" fill="url(#paint0_radial)" fillOpacity="0.08" />
              <circle cx="250" cy="250" r="200" fill="url(#paint0_radial)" fillOpacity="0.12" />
              <circle cx="250" cy="250" r="170" fill="url(#paint0_radial)" fillOpacity="0.18" />
              <circle cx="250" cy="250" r="140" fill="url(#paint0_radial)" fillOpacity="0.15" />
              <circle cx="250" cy="250" r="120" fill="url(#paint0_radial)" fillOpacity="0.13" />
              <circle cx="250" cy="250" r="90" fill="url(#paint0_radial)" fillOpacity="0.11" />
              <circle cx="250" cy="250" r="70" fill="url(#paint0_radial)" fillOpacity="0.09" />
              <circle cx="250" cy="250" r="50" fill="url(#paint0_radial)" fillOpacity="0.07" />
              <defs>
                <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(250 250) scale(250)" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fff" />
                  <stop offset="1" stopColor="#a5b4fc" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="relative z-10 max-w-xl w-full text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 drop-shadow-lg">
            Make Your Social Posts Stand Out Instantly
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-8 font-medium max-w-lg">
            Zapshot turns your tweets, threads, and profiles into beautiful, shareable images in seconds. No design skills needed—just click, capture, and share!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Black button with white gradient dot */}
            <button
              onClick={() => navigate('/signin')}
              className="relative bg-black text-white font-semibold px-7 py-3 rounded-full shadow-lg flex items-center justify-center transition hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-white text-base md:text-lg"
            >
              <span className="pr-6">Try Zapshot Now</span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-white/90 to-white/30 shadow-md" />
            </button>
            <button
              onClick={() => navigate('/signin')}
              className="relative bg-black text-white font-semibold px-7 py-3 rounded-full shadow-lg flex items-center justify-center transition hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-white text-base md:text-lg"
            >
              <span className="pr-6">See Example Screenshots</span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-white/90 to-white/30 shadow-md" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCTA;
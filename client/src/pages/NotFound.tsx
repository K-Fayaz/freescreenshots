import React, { useState, useEffect } from 'react';
import { Camera, Zap, ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/LandingPageComps/Navbar';
import Footer from '@/components/Footer';


const NotFound = ({  }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [showError, setShowError] = useState(false);

  const onGoHome = () => {
    window.location.href ="/";
  }

  useEffect(() => {
    // Simulate loading and error states
    const timer1 = setTimeout(() => setShowError(true), 1000);
    const timer2 = setTimeout(() => setIsGlitching(true), 1500);
    const timer3 = setTimeout(() => setIsGlitching(false), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleRetryScreenshot = () => {
    setShowError(false);
    setIsGlitching(true);
    setTimeout(() => {
      setIsGlitching(false);
      setShowError(true);
    }, 1000);
  };

  return (
    <>
        <Navbar page='not-landing'/>
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center">
            {/* Fake Screenshot Frame */}
            <div className="relative mb-12">
            <div className="bg-gray-100 rounded-t-lg p-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                <div className="flex gap-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-500 text-left">
                    zapshot.in/this-page-doesnt-exist
                </div>
                </div>
            </div>
            
            <div className={`bg-white border border-gray-200 rounded-b-lg p-12 min-h-[300px] flex items-center justify-center transition-all duration-300 ${
                isGlitching ? 'animate-pulse bg-red-50 border-red-200' : ''
            }`}>
                {!showError ? (
                <div className="flex items-center gap-3 text-gray-400">
                    <Camera className="w-8 h-8 animate-spin" />
                    <span className="text-lg">Taking screenshot...</span>
                </div>
                ) : (
                <div className="text-center">
                    <div className="relative mb-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className={`w-12 h-12 text-red-500 ${isGlitching ? 'animate-bounce' : ''}`} />
                    </div>
                    {isGlitching && (
                        <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
                    )}
                    </div>
                    
                    <div className="space-y-2 text-gray-600">
                    <p className="font-mono text-sm">ERROR 404</p>
                    <p className="text-lg">Screenshot failed!</p>
                    <p className="text-sm">This page seems to have vanished into thin air</p>
                    </div>
                </div>
                )}
            </div>
            </div>

            {/* Main Content */}
            <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 leading-tight">
                Oops! We couldn't
                <span className="block">Zap this page</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
                Looks like this page doesn't exist. Even our super-powered screenshot tool can't capture what's not there!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                onClick={onGoHome}
                className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all duration-200 flex items-center gap-2 hover:scale-105"
                >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
                </button>
                
                <button
                onClick={handleRetryScreenshot}
                className="bg-gray-100 text-gray-700 px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all duration-200 flex items-center gap-2 hover:scale-105"
                >
                <RefreshCw className="w-5 h-5" />
                Retry Screenshot
                </button>
            </div>
            </div>

            {/* Fun Stats */}
            {/* <div className="bg-gray-50 rounded-2xl p-8 mb-12">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
                While you're here, check out what we've been up to:
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                <div className="text-3xl font-black text-gray-900 mb-2">1M+</div>
                <div className="text-sm text-gray-600">Screenshots Zapped</div>
                </div>
                <div className="text-center">
                <div className="text-3xl font-black text-gray-900 mb-2">7</div>
                <div className="text-sm text-gray-600">Platforms Supported</div>
                </div>
                <div className="text-center">
                <div className="text-3xl font-black text-gray-900 mb-2">0.3s</div>
                <div className="text-sm text-gray-600">Average Zap Time</div>
                </div>
            </div>
            </div> */}

            {/* Platform Icons */}
            {/* <div className="flex flex-wrap justify-center items-center gap-6 opacity-40">
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-black rounded"></div>
                <span className="text-sm font-medium">X</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-600 rounded"></div>
                <span className="text-sm font-medium">YouTube</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium">Product Hunt</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded"></div>
                <span className="text-sm font-medium">Instagram</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-600 rounded"></div>
                <span className="text-sm font-medium">Peerlist</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
                <span className="text-sm font-medium">Reddit</span>
            </div>
            </div> */}
        </div>
        </div>
        <Footer />
    </>
  );
};

export default NotFound;
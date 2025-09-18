import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, LogOut, Settings } from 'lucide-react';
import axios from 'axios';
import BASE_URL from '@/config';

interface UserProps {
  username: string;
  profile: string
};

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails,setUserDetails] = useState<UserProps | null>(null);

  useEffect(() => {
    // Check if user is authenticated by looking for token in localStorage
    const token = localStorage.getItem('token');
    
    axios({
      method:"GET",
      url:`${BASE_URL}api/user/get`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type':'application/json'
      }
    })
    .then((response) => {
      console.log(response);
      if (response.status == 200) {
        setIsAuthenticated(true);
        setUserDetails({
          profile: response.data.profile,
          username: response.data.username
        });
      }else {
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    })

  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    // Close mobile menu after clicking a link
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openUserMenu = () => {
    setIsUserMenuOpen(true);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    localStorage.removeItem('isEmailVerified');
    
    // Update authentication state
    setIsAuthenticated(false);
    setIsUserMenuOpen(false);
    
    // Navigate to home page
    navigate('/');
  };

  const handleAccount = () => {
    setIsUserMenuOpen(false);
    // Navigate to account page or dashboard
    navigate('/screenshot');
  };

  return (
    <nav className="bg-white shadow-sm border-b py-2 border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-2xl font-bold text-gray-900">
              <span className="text-blue-600">Zap</span>shot
            </h1>
          </div>

          {/* Center Navigation Links - Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-3">
              <div className="relative group">
                <button
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  Platforms
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={() => scrollToSection('x')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    X
                  </button>
                  <button
                    onClick={() => scrollToSection('peerlist')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Peerlist
                  </button>
                  <button
                    onClick={() => scrollToSection('threads')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Threads
                  </button>
                </div>
              </div>
              <a
                href="/#pricing"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Pricing
              </a>
              <div className="relative group">
                <button
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  Tools
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/twitter-video-downloader"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Twitter Video Downloader
                  </Link>
                  <Link
                    to="/threads-video-downloader"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Threads Video Downloader
                  </Link>
                  <Link
                    to="/reddit-video-downloader"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Reddit Video Downloader
                  </Link>
                  <a
                    href="#meme-maker"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Meme Maker
                  </a>
                  {/* <a
                    href="/twitter-banner-maker"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Twitter Banner Maker
                  </a> */}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Login or User Menu */}
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
                             <div className="relative" onMouseEnter={openUserMenu} onMouseLeave={closeUserMenu}>
                 <button 
                   className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 p-2 rounded-lg transition-colors duration-200"
                 >
                   {userDetails?.profile ? (
                     <img 
                       src={userDetails.profile} 
                       alt="Profile" 
                       className="w-8 h-8 rounded-full object-cover border border-gray-200"
                     />
                   ) : (
                     <User size={20} />
                   )}
                 </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={handleAccount}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Settings size={16} />
                      <span>Account</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => navigate('/signin')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {/* Platforms */}
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Platforms
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => scrollToSection('x')}
                    className="block w-full text-left px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  >
                    X (Twitter)
                  </button>
                  <button
                    onClick={() => scrollToSection('peerlist')}
                    className="block w-full text-left px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  >
                    Peerlist
                  </button>
                  <button
                    onClick={() => scrollToSection('threads')}
                    className="block w-full text-left px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  >
                    Threads
                  </button>
                </div>
              </div>

              {/* Pricing */}
              <div className="px-3 py-2">
                <a
                  href="#pricing"
                  className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                >
                  Pricing
                </a>
              </div>

              {/* Tools */}
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Tools
                </div>
                <div className="space-y-1">
                  <Link
                    to="/twitter-video-downloader"
                    className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  >
                    Twitter Video Downloader
                  </Link>
                  <Link
                    to="/threads-video-downloader"
                    className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  >
                    Threads Video Downloader
                  </Link>
                  <Link
                    to="/reddit-video-downloader"
                    className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  >
                    Reddit Video Downloader
                  </Link>
                  <a
                    href="#meme-maker"
                    className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  >
                    Meme Maker
                  </a>
                  {/* <a
                    href="/twitter-banner-maker"
                    className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  >
                    Twitter Banner Maker
                  </a> */}
                </div>
              </div>

              {/* Login Button or User Menu for Mobile */}
              <div className="px-3 py-2">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <button 
                      onClick={handleAccount}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                    >
                      <Settings size={16} />
                      <span>Account</span>
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => navigate('/signin')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 
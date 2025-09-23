import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, LogOut, Settings } from "lucide-react";
import axios from "axios";
import BASE_URL from "@/config";

interface UserProps {
  username: string;
  profile: string;
};

interface NavbarProps {
  page?: string;
}

const Navbar:React.FC<NavbarProps> = ({ page='landing' }) => {
  const [toolsOpen, setToolsOpen] = useState(false);
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState<UserProps | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  

  useEffect(() => {
    // Check if user is authenticated by looking for token in localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      return; 
    }
    axios({
      method: "GET",
      url: `${BASE_URL}api/user/get`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUserDetails({
            profile: response.data.profile,
            username: response.data.username,
          });
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  const openUserMenu = () => setIsUserMenuOpen(true);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("isEmailVerified");
    setIsAuthenticated(false);
    setIsUserMenuOpen(false);
    navigate("/");
  };
  
  const handleAccount = () => {
    setIsUserMenuOpen(false);
    navigate("/screenshot");
  };

  const handleSmoothScroll = (e, element:string) => {
    e.preventDefault();
    const el = document.getElementById(element);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav className={`sticky top-0 z-50 mx-auto w-full border-b bg-white flex items-center justify-between px-8 py-3 mb-8 transition-all`}>
      {/* Logo */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Bigger devices */}
        <div className="flex flex-row items-center justify-between">
          <div onClick={() => navigate('/')} className="font-black font-cursive text-md md:text-2xl tracking-tight text-black select-none cursor-pointer">
            Zapshot !
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-base font-medium">
            <a href={page == 'landing' ? "#pricing":"/pricing"} className="transition-colors" onClick={page == 'landing' ? (e) => handleSmoothScroll(e,'pricing') : () => {}}>Pricing</a>
            {
              page == 'landing' && (
                <a href="#faq" className="transition-colors" onClick={(e) => handleSmoothScroll(e,'faq')}>FAQ</a>
              )
            }
            <div
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button className="transition-colors flex items-center gap-1">
                Tools
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {toolsOpen && (
                <div className="absolute -left-8 top-full w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 flex flex-col animate-fadeIn z-50">
                  {/* <p onClick={() => navigate('/twitter-video-downloader')} className="px-5 py-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">Twitter Video Downloader</p> */}
                  <a href='/reddit-video-downloader' className="px-5 py-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">Reddit Video Downloader</a>
                  <a href={'/threads-video-downloader'} className="px-5 py-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">Threads Video Downloader</a>
                </div>
              )}
            </div>
            <a href="/fake-posts-generator" className="transition-colors">Create Mock posts</a>
            <a href="/gallery" className="transition-colors">Gallery</a>
          </div>

          {/* Profile/User Menu or CTA */}
          <div className="hidden md:block ml-4">
            {isAuthenticated ? (
              <div className="relative" onMouseEnter={openUserMenu} onMouseLeave={closeUserMenu}>
                <button className="flex items-center space-x-2 text-gray-700 hover:text-violet-600 p-2 rounded-lg transition-colors duration-200">
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
                  <div className="absolute -right-7 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {/* <button
                      onClick={handleAccount}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Settings size={16} />
                      <span>Account</span>
                    </button> */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-4 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p
                onClick={() => navigate('/signin')}
                className="px-6 py-2 rounded-full bg-black text-white font-semibold text-base shadow hover:bg-gray-900 transition-all cursor-pointer select-none"
              >
                Sign In
              </p>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden self-end">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 p-2 focus:outline-none rounded-md"
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

        {/* Mobile screen */}
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {/* Platforms */}
              <div className="px-3 py-2">
                <a
                  href="#faq"
                  className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                >
                  FAQ
                </a>
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
              
              <div className="px-3 py-2">
                <ul>
                  <li>
                    <a href="/fake-posts-generator" className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200">Create Mock posts</a>
                  </li>
                  <li>
                    <a href="/gallery" className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200">Gallery</a>
                  </li>
                </ul>
              </div>

              {/* Tools */}
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Tools
                </div>
                <div className="space-y-1">
                  {/* <Link
                    to="/twitter-video-downloader"
                    className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  >
                    Twitter Video Downloader
                  </Link> */}
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
                </div>
              </div>

              {/* Login Button or User Menu for Mobile */}
              <div className="px-3 py-2">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    {/* <button 
                      onClick={handleAccount}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                    >
                      <Settings size={16} />
                      <span>Account</span>
                    </button> */}
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
                    className="w-full bg-black text-white py-2 rounded-full text-sm font-medium transition-colors duration-200"
                  >
                    Start Now!
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

import React from 'react';
import { Plus } from 'lucide-react';
import avatar1 from '../assets/avatar1.png';
import axios from "axios";

interface HeaderProps {
  onNewTweetClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewTweetClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onNewTweetClick}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <Plus size={20} />
            <span>New post</span>
          </button>
          {/* <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Screenshots downloaded:</span>
            <span className="font-semibold text-gray-700">1,247</span>
          </div> */}
        </div>
        
        <button 
          onClick={() => window.open('https://x.com/fayaz_kudremane/', '_blank')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          {/* <img 
            src={avatar1} 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover border boder-1 border-black"
          /> */}
          {/* <span>Meet the creator</span> */}
          <span>@fayaz_kudremane</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
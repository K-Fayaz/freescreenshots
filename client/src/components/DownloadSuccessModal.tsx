import React from 'react';
import { X } from 'lucide-react';
import avatar1 from '../assets/avatar1.png';

interface DownloadSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DownloadSuccessModal: React.FC<DownloadSuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  const handleSaaSLink = () => {
    window.open('http://journaltotweet.com/', '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Thanks for using my screenshot tool! 🎉
          </h2>
        </div>

        {/* Profile Image - Centered */}
        <div className="flex justify-center mb-4">
          <img 
            src={avatar1} 
            alt="Fayaz" 
            className="w-28 h-28 rounded-full border-2 border-black"
          />
        </div>

        {/* Twitter Handle - Centered */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => window.open('https://twitter.com/fayaxtwt', '_blank')}
            className="text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors"
          >
            @fayaxtwt
          </button>
        </div>

        {/* Introduction */}
        <div className="text-center mb-6">
          <p className="text-gray-700 leading-relaxed">
            Hi, I am <strong>Fayaz</strong>. A builder from India, who is building 12 micro SaaS in 12 months. I recently shipped <strong>JournalToTweet.com</strong>.
          </p>
        </div>

        {/* Tool Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          <strong>JournalToTweet</strong> is an AI-powered tool that transforms your journal entries, notes, and thoughts into engaging tweets and social media content. It helps creators and entrepreneurs turn their ideas into viral-worthy content that grows their audience and engagement.
        </p>

        {/* Call to Action Button */}
        <button
          onClick={handleSaaSLink}
          className="w-full bg-black text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          Try JournalToTweet Free
        </button>
      </div>
    </div>
  );
};

export default DownloadSuccessModal; 
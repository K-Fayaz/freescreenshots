import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import BASE_URL from '../config';

interface NewTweetModalProps {
  isOpen: boolean;
  onClose: () => void;
  setPostDetails: (details: any) => void;
  setLoading: (loading: boolean) => void;
}

const NewTweetModal: React.FC<NewTweetModalProps> = ({ isOpen, onClose, setPostDetails, setLoading }) => {
  const [url, setUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle URL submission here
    console.log('URL submitted:', url);

    setLoading(true);
    let endpoint = `${BASE_URL}/api/screenshots?url=${url}`;

    axios({
      method:"POST",
      url: endpoint,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      let post = response.data.data;
      let platform = response.data.platform;

      setPostDetails({
        post,
        platform
      });
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    })

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Paste new Tweet URL</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Supports Tweet, thread, profile, and article URL.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your Tweet URL here"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Screenshot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTweetModal;
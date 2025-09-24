import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import BASE_URL from '../config';
import { useToast } from './ToastContext';

interface NewTweetModalProps {
  isOpen: boolean;
  onClose: () => void;
  setPostDetails: (details: any) => void;
  setLoading: (loading: boolean) => void;
}

const NewTweetModal: React.FC<NewTweetModalProps> = ({ isOpen, onClose, setPostDetails, setLoading }) => {
  const [url, setUrl] = useState('');
  const { showToast,showError } = useToast();
  const [message,setMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle URL submission here
    console.log('URL submitted:', url);


    const allowedPlatforms = ["x.com", "peerlist.io", "threads.com", "reddit.com","youtu.be/","youtube.com","producthunt.com","www.producthunt.com","www.instagram.com","instagram.com"];
    const isAllowed = allowedPlatforms.some(platform => url.includes(platform));

    // Product Hunt URL validation
    if ((url.includes("producthunt.com") || url.includes("www.producthunt.com")) && url.includes("/products")) {
      setMessage('Invalid Product Hunt URL: Please use the URL from the share button (should contain /posts, not /products).');
      return;
    }

    if (!isAllowed) {
      showError("Invalid URL");
      return;
    }

    let userId = localStorage.getItem('user') || undefined;

    setLoading(true);
    let endpoint = `${BASE_URL}api/screenshots?url=${url}&userId=${userId}`;

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
      let type = response.data.type;

      setPostDetails({
        post,
        platform,
        type: type
      });
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    })

    onClose();
  };


  const handleInputChange = (e) => {
    setMessage('');
    setUrl(e.target.value);

  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Paste new URL</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Supports Twitter, Product Hunt, Youtube, and more.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            value={url}
            onChange={handleInputChange}
            placeholder="Paste your Tweet URL here"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />

          {
            message && (
              <p className='text-sm px-3' style={{color:"red"}}>{message}</p>
            )
          }
          
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
import React from 'react';
import { Plus, Home, AirVent } from 'lucide-react';
import { BsTwitterX } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import BASE_URL from '@/config';
import axios from "axios";
import { useEffect, useState } from 'react';
import { DollarSign } from 'lucide-react';

interface HeaderProps {
  onNewTweetClick: () => void;
  setShowPlans: (plan: boolean) => void;
  setIsProModalOpen: (plan: boolean) => void;
}

interface userDetails {
  credits: number;
  avatar: string;
}

const Header: React.FC<HeaderProps> = ({ onNewTweetClick, setShowPlans, setIsProModalOpen }) => {
  const navigate = useNavigate();
  const [userDetails,setUserDetails] = useState<userDetails | null>(null);
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    axios({
      url:`${BASE_URL}api/user/get`,
      method:"GET",
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      // console.log(response);
      if (response.status === 200) {
        setUserDetails({
          avatar: response?.data?.profile || '',
          credits: response?.data?.credits || 0
        }); 
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        return navigate('/signin');
      }
    })
    .catch((err) => {
      console.log(err);

      if (err?.response?.status == 401 || err.response?.status == 404) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        return navigate('/signin');
      }
    })
  }, []);

  const handleClick = () => {
    if (userDetails?.credits == 0) {
      setShowPlans(true);
      setIsProModalOpen(true);
      return;
    }
    onNewTweetClick();
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <Home size={20} />
            <span>Home</span>
          </button>
          <button 
            onClick={handleClick}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <Plus size={20} />
            <span>New post</span>
          </button>
        </div>
        
        {
          userDetails && userDetails?.credits >= 0 && (
          <div title='Available credits' className='flex justify-between items-end rounded-full bg-gray-300 '>
            <h1 className='px-2 py-1'>
              {userDetails?.credits.toString()} credits available
            </h1>
          </div>
          )
        }
      </div>
    </header>
  );
};

export default Header;
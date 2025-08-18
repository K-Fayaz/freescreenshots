import React from 'react';
import BASE_URL from '@/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface GetProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const proPlan = {
  name: 'Pro',
  price: '$10 one-time',
  features: [
    'One-time payment for up to 1000 pixel-perfect screenshots',
    'No watermark',
    'Priority support',
    'All basic features included',
  ],
  cta: 'Buy Pro',
};

const GetProModal: React.FC<GetProModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleBuyPro = () => {
    let token = localStorage.getItem('token');
    if (!token) {
      return navigate('/signin?next=pricing');
    }

    let url = `${BASE_URL}api/polar-checkout`;

    axios({
      method: "POST",
      url: url,
      data: {
        id: localStorage.getItem('user'),
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        let url = response.data.checkoutUrl;
        if (url) {
          window.location.href = url;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-4 sm:p-8 relative mx-2 sm:mx-auto">
        <button
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">Upgrade to Pro</h2>
        <div className="rounded-2xl p-4 sm:p-6 flex flex-col items-center bg-gradient-to-br from-gray-100 via-gray-300 to-black mb-6 w-full">
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-black drop-shadow rounded-full bg-gray-200 text-gray-700 px-3 sm:px-4">{proPlan.name}</h3>
          <div className="text-2xl sm:text-3xl font-extrabold text-black drop-shadow">{proPlan.price}</div>
        </div>
        <ul className="mb-6 sm:mb-8">
          {proPlan.features.map((feature, i) => (
            <li key={i} className="flex items-center mb-2 sm:mb-3 text-gray-700 text-sm sm:text-base">
              <svg className="w-4 h-4 text-black mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              {feature}
            </li>
          ))}
        </ul>
        <button
          onClick={handleBuyPro}
          className="w-full py-2 sm:py-3 rounded-full font-semibold bg-black text-white hover:bg-gray-900 transition-colors duration-200 text-base sm:text-lg"
        >
          {proPlan.cta}
        </button>
      </div>
    </div>
  );
};

export default GetProModal;
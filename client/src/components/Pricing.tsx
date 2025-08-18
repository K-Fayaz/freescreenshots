import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '@/config';

const plans = [
  {
    name: 'Free',
    price: '$0',
    features: [
      'Basic features',
      'Watermark on screenshots',
      'Limited support',
      'No credit card required',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$10 one-time',
    features: [
      'One-time payment for up to 1000 pixel-perfect screenshots',
      'No watermark',
      'Priority support',
      'All basic features included',
    ],
    cta: 'Buy Pro',
    highlight: true,
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  const handlePlanClick = (planName:string) => {
    
    // User is logged in and clicks on 'Free model Get Started button'
    if (planName === 'Free' && localStorage.getItem('token')) {
      return navigate('/screenshot');
    }

    // User is logged in and clicks on 'buy pro' button 
    if (planName !== 'Free' && localStorage.getItem('token')) {

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
      })
      .finally(() => {
        return;
      })
    }

    if (planName === 'Free') {  
      navigate('/signin');
      return;
    }

    let token = localStorage.getItem('token');
    if (!token) {
      return navigate('/signin?next=pricing');
    }
  }
  return (
    <div className="w-full py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 text-center">Pricing</h2>
        <p className="text-lg text-gray-500 mb-12 text-center">Choose the right plan for your needs.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-8 shadow-xl flex flex-col items-center transition-transform duration-200 hover:scale-[1.02] ${plan.highlight ? 'border-black shadow-black/10' : ''}`}
            >
              <div className="w-full flex flex-col items-start mb-6">
                <div
                  className={`w-full rounded-2xl p-6 flex flex-col items-start ${plan.name === 'Free'
                    ? 'bg-gradient-to-br from-gray-100 to-gray-200'
                    : 'bg-gradient-to-br from-gray-100 via-gray-300 to-black'}
                  `}
                >
                  <h3 className={`text-xl font-bold mb-2  text-black drop-shadow rounded-full bg-gray-200 text-gray-700 px-4`}>{plan.name}</h3>
                  <div className="text-3xl font-extrabold text-black drop-shadow">{plan.price}</div>
                </div>
                <button
                  onClick={() => handlePlanClick(plan.name)}
                  className="w-full py-3 rounded-full font-semibold bg-black text-white hover:bg-gray-900 transition-colors duration-200 mt-5"
                >
                  {plan.cta}
                </button>
              </div>
              <ul className="mb-8 w-full">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center mb-3 text-gray-700">
                    <svg className="w-4 h-4 text-black mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
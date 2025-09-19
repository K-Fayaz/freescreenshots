import React from 'react';
import BASE_URL from '@/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';

interface GetProModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: string;
  showPlans: boolean;
}

const proPlan = {
  name: 'Pro',
  price: '$10',
  description: 'Everything you need to succeed!',
  features: [
    'One-time payment for up to 1000 pixel-perfect screenshots',
    'Take screenshots of posts by its URL',
    'Create realistic mock posts of Twitter',
    'No watermark',
    'Priority support',
    'All basic features included',
  ],
  cta: 'Buy Pro',
};

const basicPlan = {
  name: 'Basic',
  price: '$2',
  description: 'Perfect for getting started!',
  features: [
    'One-time payment for up to 100 pixel-perfect screenshots',
    'Take screenshots of posts by its URL',
    'Create realistic mock posts of Twitter',
    'No Watermark',
    'Priority support',
    'All Platforms included'
  ],
  cta: 'Buy 100 credits'
}

const GetProModal: React.FC<GetProModalProps> = ({ isOpen, onClose, plan, showPlans }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleBuyPro = (argPlan:string) => {
    let token = localStorage.getItem('token');
    if (!token) {
      return navigate('/signin?next=pricing');
    }

    let userChosenPlan = argPlan == 'pass' ? plan : argPlan;

    setLoading(true);
    let url = `${BASE_URL}api/polar-checkout${userChosenPlan ? `?plan=${userChosenPlan}` :'?plan=pro'}`;

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
        setLoading(false);
      });
  };

  if (!isOpen){
    return null;
  }

  let chosenPlan = null;
  chosenPlan = plan == 'basic' ? basicPlan : proPlan;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      {
        !showPlans && (
          <div className="relative w-full max-w-md mx-2 sm:mx-auto">
            <div className="bg-gradient-to-br from-black to-gray-800 rounded-3xl shadow-2xl border-2 border-black overflow-hidden relative">
              {/* Most Popular Badge */}
              {/* <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-4 py-2 rounded-bl-2xl flex items-center gap-1 z-10 shadow-lg">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                <span className="text-sm font-semibold">Most Popular</span>
              </div> */}
              {/* Close Button */}
              {!loading && (
                <button
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-300 hover:text-white text-2xl z-20"
                  onClick={onClose}
                  aria-label="Close"
                >
                  &times;
                </button>
              )}
              {/* Card Content */}
              <div className="p-8 h-full relative">
                {/* <h2 className="text-3xl font-bold text-white mb-2 text-center">Upgrade to Pro</h2> */}
                {/* Plan Name & Icon */}
                <div className="flex items-center gap-3 mb-4 justify-start">
                  <div className="p-2 rounded-xl bg-white/20">
                    {/* <svg className="w-6 h-6 text-white" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg> */}
                    <Zap className='text-white'/>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{chosenPlan?.name || ''}</h3>
                </div>
                {/* Description */}
                <p className="text-base mb-6 text-gray-300">{chosenPlan?.description || ''}</p>
                {/* Price */}
                <div className="mb-8 flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">{chosenPlan?.price || ''}</span>
                  <span className="text-lg text-gray-300">one-time</span>
                </div>
                {/* Features */}
                <div className="space-y-4 mb-8">
                  {chosenPlan?.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className="p-1 rounded-full mt-0.5 bg-white/20">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm leading-relaxed text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
                {/* CTA Button */}
                <button
                  onClick={() => handleBuyPro('pass')}
                  className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-white text-black hover:bg-gray-100 shadow-lg flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <svg className="animate-spin h-6 w-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  ) : (
                    chosenPlan?.cta || ''
                  )}
                </button>
                {/* Subtle Pattern Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] bg-[length:20px_20px]" />
                </div>
              </div>
            </div>
          </div>
        )
      }

      {
        showPlans && (
          <div className="w-full max-w-2xl mx-auto mt-8 relative">
            {/* Close Button */}
            <button
              className="absolute top-0 right-0 text-gray-300 hover:text-white text-2xl z-20"
              onClick={onClose}
              aria-label="Close"
              style={{marginTop: '-2.5rem', marginRight: '-1.5rem'}}
            >
              &times;
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[basicPlan, proPlan].map((plan, idx) => (
                <div
                  key={plan.name}
                  className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    plan.name === 'Pro'
                      ? 'border-black shadow-xl bg-gradient-to-br from-black to-gray-800'
                      : 'border-gray-200 hover:border-gray-300 bg-gradient-to-br from-gray-50 to-white'
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.name === 'Pro' && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-4 py-2 rounded-bl-2xl flex items-center gap-1 z-10 shadow-lg">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                      <span className="text-sm font-semibold">Most Popular</span>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-8 h-full relative">
                    {/* Plan Name & Icon */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-xl ${plan.name === 'Pro' ? 'bg-white/20' : 'bg-black/5'}`}>
                        {plan.name === 'Pro' ? (
                          <Zap className="w-6 h-6 text-white" />
                        ) : (
                          <svg className="w-6 h-6 text-black" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                        )}
                      </div>
                      <h3 className={`text-2xl font-bold ${plan.name === 'Pro' ? 'text-white' : 'text-black'}`}>{plan.name}</h3>
                    </div>
                    {/* Description */}
                    <p className={`text-base mb-6 ${plan.name === 'Pro' ? 'text-gray-300' : 'text-gray-600'}`}>{plan.description}</p>
                    {/* Price */}
                    <div className="mb-8 flex items-baseline gap-2">
                      <span className={`text-5xl font-bold ${plan.name === 'Pro' ? 'text-white' : 'text-black'}`}>{plan.price}</span>
                      <span className={`text-lg ${plan.name === 'Pro' ? 'text-gray-300' : 'text-gray-500'}`}>one-time</span>
                    </div>
                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <div className={`p-1 rounded-full mt-0.5 ${plan.name === 'Pro' ? 'bg-white/20' : 'bg-black/10'}`}>
                            <svg className={`w-3 h-3 ${plan.name === 'Pro' ? 'text-white' : 'text-black'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <span className={`text-sm leading-relaxed ${plan.name === 'Pro' ? 'text-gray-200' : 'text-gray-700'}`}>{feature}</span>
                        </div>
                      ))}
                    </div>
                    {/* CTA Button */}
                    <button
                      className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                        plan.name === 'Pro'
                          ? 'bg-white text-black hover:bg-gray-100 shadow-lg'
                          : 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
                      }`}
                      // disabled
                      onClick={() => handleBuyPro(plan?.name?.toLocaleLowerCase())}
                    >
                      {plan.cta}
                    </button>
                    {/* Subtle Pattern Overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className={`absolute inset-0 opacity-5 ${
                        plan.name === 'Pro'
                          ? 'bg-[radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] bg-[length:20px_20px]'
                          : 'bg-[radial-gradient(circle_at_50%_50%,black_1px,transparent_1px)] bg-[length:20px_20px]'
                      }`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) 
      }
    </div>
  );
};

export default GetProModal;
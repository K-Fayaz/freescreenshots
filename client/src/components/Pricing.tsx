import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '@/config';
import { Check, Star, Zap } from 'lucide-react';

const plans = [
    {
      name: 'Basic',
      price: '$2',
      description: 'Perfect for getting started',
      features: [
        'One-time payment for up to 100 pixel-perfect screenshots',
        'Take screenshots of posts by its URL',
        'Create realistic mock posts of Twitter',
        'No Watermark',
        'Priority support',
        'All Platforms included'
      ],
      buttonText: 'Get Started',
      popular: false,
      gradient: 'from-gray-50 to-white'
    },
    {
      name: 'Pro',
      price: '$10',
      priceSubtext: 'one-time',
      description: 'Everything you need to succeed',
      features: [
        'One-time payment for up to 1000 pixel-perfect screenshots',
        'Take screenshots of posts by its URL',
        'Create realistic mock posts of Twitter',
        'No watermark',
        'Priority support',
        'All Platforms included'
      ],
      buttonText: 'Buy Pro',
      popular: true,
      gradient: 'from-black to-gray-800'
    }
];

interface PricingProps {
  page?:string;
}

const Pricing: React.FC<PricingProps> = ({ page='landing' }) => {
  const navigate = useNavigate();

  const handlePlanClick = (planName:string) => {
    
    // User is logged in and clicks on 'Free model Get Started button'
    let token = localStorage.getItem('token') || undefined;

    if (!token) {
      return navigate(`/signin?next=pricing&plan=${planName?.toLocaleLowerCase()}`);
    }
    
    let url = `${BASE_URL}api/polar-checkout?plan=${planName?.toLowerCase()}`;

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
    });
  }
  return (
    <div className={`w-full ${page == 'landing' ? 'py-20' : 'mb-10'} bg-white`} id='pricing'>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {
          page == 'landing' && (
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 text-center">Pricing</h2>
          )
        }
        <p className={`text-lg text-gray-500 ${page == 'landing' ? 'mb-12' : 'mb-6'} text-center`}>Choose the right plan for your needs.</p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.popular
                  ? 'border-black shadow-xl'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-4 py-2 rounded-bl-2xl flex items-center gap-1 z-10 shadow-lg">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-semibold">Most Popular</span>
                </div>
              )}

              {/* Card Content */}
              <div className={`p-8 h-full bg-gradient-to-br ${plan.gradient} relative`}>
                {/* Plan Name & Icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-xl ${plan.popular ? 'bg-white/20' : 'bg-black/5'}`}>
                    {plan.popular ? (
                      <Zap className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-black'}`} />
                    ) : (
                      <Star className="w-6 h-6 text-black" />
                    )}
                  </div>
                  <h3 className={`text-2xl font-bold ${plan.popular ? 'text-white' : 'text-black'}`}>
                    {plan.name}
                  </h3>
                </div>

                {/* Description */}
                <p className={`text-base mb-6 ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-black'}`}>
                      {plan.price}
                    </span>
                    {plan.priceSubtext && (
                      <span className={`text-lg ${plan.popular ? 'text-gray-300' : 'text-gray-500'}`}>
                        {plan.priceSubtext}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className={`p-1 rounded-full mt-0.5 ${
                        plan.popular ? 'bg-white/20' : 'bg-black/10'
                      }`}>
                        <Check className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-black'}`} />
                      </div>
                      <span className={`text-sm leading-relaxed ${
                        plan.popular ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanClick(plan.name)}
                  className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    plan.popular
                      ? 'bg-white text-black hover:bg-gray-100 shadow-lg'
                      : 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>

              {/* Subtle Pattern Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute inset-0 opacity-5 ${
                  plan.popular 
                    ? 'bg-[radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] bg-[length:20px_20px]'
                    : 'bg-[radial-gradient(circle_at_50%_50%,black_1px,transparent_1px)] bg-[length:20px_20px]'
                }`} />
              </div>
            </div>
          ))}
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        </div> */}
      </div>
    </div>
  );
};

export default Pricing;
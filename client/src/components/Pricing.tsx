import React from 'react';
import { useNavigate } from 'react-router-dom';

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
  return (
    <div className="w-full py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10 text-center">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-lg flex flex-col items-center transition-transform duration-200 hover:scale-[1.02] ${plan.highlight ? 'border-blue-600 shadow-blue-100' : ''}`}
            >
              <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? 'text-blue-600' : 'text-gray-900'}`}>{plan.name}</h3>
              <div className="text-3xl font-extrabold mb-6">{plan.price}</div>
              <ul className="mb-8 w-full">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center mb-3 text-gray-700">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/signin')}
                className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${plan.highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
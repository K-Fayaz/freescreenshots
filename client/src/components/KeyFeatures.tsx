import React from 'react';
import { FileTextIcon } from "../Icons/FileText";
import { UserIcon } from "../Icons/User";
import { AtSignIcon } from '../Icons/Mention';
import { LinkIcon } from "../Icons/Link";
import { ArrowBigUpIcon } from "../Icons/Project";
import { ChartBarDecreasingIcon } from "../Icons/ChartBar";
import { useNavigate } from 'react-router-dom';

const KeyFeatures = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: <FileTextIcon className="text-blue-600" />,
      title: "Multi-Platform Support",
      description: "Create beautiful screenshots from X (Twitter), Threads, and Peerlist with consistent formatting and styling."
    },
    {
      icon: <UserIcon className="text-purple-600" />,
      title: "Profile Screenshots",
      description: "Capture and share professional profile cards with all your achievements and social media presence."
    },
    {
      icon: <AtSignIcon className="text-green-600" />,
      title: "Thread & Conversation Capture",
      description: "Screenshot entire conversations, threads, and quoted posts with full context and formatting."
    },
    {
      icon: <LinkIcon className="text-orange-500" />,
      title: "Rich Media Support",
      description: "Handle images, videos, polls, articles, and link embeds with perfect formatting and display."
    },
    {
      icon: <ArrowBigUpIcon className="text-indigo-600" />,
      title: "Professional Quality",
      description: "High-resolution screenshots with clean typography, proper spacing, and professional appearance."
    },
    {
      icon: <ChartBarDecreasingIcon className="text-red-500" />,
      title: "Instant Download",
      description: "Generate and download screenshots instantly with no watermarks or quality loss."
    }
  ];

  return (
    <div className="w-full py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Key Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create stunning social media screenshots for any platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <div className="w-6 h-6">
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to create amazing screenshots?
            </h3>
            <p className="text-gray-600 mb-6">
              Start capturing your social media content in beautiful, shareable formats
            </p>
            <button onClick={() => navigate('/signin')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyFeatures; 
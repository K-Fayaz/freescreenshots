import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import axios from "axios";
import BASE_URL from '@/config';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const queryParams = new URLSearchParams(location.search);
  const nextUrl = queryParams.get("next");
  const chosenPlan = queryParams.get('plan');
  const redirectUrl = queryParams.get('redirect');

  const errorMessageMap: Record<string, string> = {
    'invalid_callback': 'Invalid callback from X. Please try logging in again.',
    'invalid_state': 'Session expired or invalid state. Please try again.',
    'user_exists': 'An account with this X account already exists. Please log in.',
    'user_not_found': 'No account found for this X account. Please sign up first.',
    'oauth_failed': 'X login failed. Please try again.',
    'login_failed': 'Google login failed. Please try again.',
    'signup_failed': 'Google signup failed. Please try again.',
    // Add more mappings as needed
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    const message = params.get('message');
    const token = params.get('token');
    const success = params.get('success');
    const id = params.get('id');
    const next = params.get('next');
    const plan = params.get('plan');
    const redirect = params.get('redirect');
    console.log("redirect 1: ",redirect)
    // const email = params.get('email');
    
    // Handle Google OAuth success callback
    if (success === 'true' && token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', id || '');
  
      if (next && next=='pricing') {
        setTimeout(() => {
          window.location.href = `/screenshot?display=${next}${plan ? `&plan=${plan?.toLowerCase()}`: ''}`;
        },100);
        return;
      }
      else if (next) {
        setTimeout(() => {
          window.location.href = `/screenshot?url=${next}`
        }, 100);
        return;
      } else if (redirect) {
        setTimeout(() => {
          window.location.href = `${redirect}`;
        });
        return;
      }

      setTimeout(() => {
        window.location.href = '/screenshot';
      }, 100);
      return;
    }
    
    // Handle error messages
    if (status === 'false' && message) {
      const friendly = errorMessageMap[message] || 'Login failed. Please try again.';
      setError(friendly);
    }
  }, [location.search, navigate]);

  const handleGoogleSignIn = () => {
    // Determine the correct endpoint based on login/signup mode
    // const endpoint = isLogin ? 'login' : `signup?timezone=${userTimezone}`;
    let url = `${BASE_URL}api/auth/google/signin?next=${nextUrl || ''}${chosenPlan ? `&plan=${chosenPlan}`:''}${redirectUrl ? `&redirect=${redirectUrl}`:''}`;

    // For Google OAuth, we redirect directly to the Google auth URL
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Brand Section */}
        {/* <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to ZapShots
          </h1>
          <p className="text-gray-600">
            Create stunning social media screenshots with custom branding
          </p>
        </div> */}

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Get Started
            </h2>
            <p className="text-gray-600">
              Sign in to create beautiful screenshots
            </p>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-md active:scale-95"
          >
            <FcGoogle className="w-6 h-6" />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 
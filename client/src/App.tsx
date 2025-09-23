import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Screenshot from './pages/Screenshot';
import LandingPage from './pages/LandingPage';
import LandingPageTwo from './pages/LandingPageTwo';
import AuthPage from './components/AuthPage';
import ThreadsVideoDownloader from './pages/ThreadsVideoDownloader';
import TwitterVideoDownloader from './pages/TwitterVideoDownloader';
import RedditVideoDownloader from './pages/RedditVideoDownloader';
// import TwitterBannerMaker from './pages/TwitterBannerMaker';
import { ToastProvider } from './components/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import FakePost from './pages/FakePosts';
import Gallery from './pages/Gallery';
import PricingPage from './pages/Pricing';
import NotFound from './pages/NotFound';

function App() {
  const token = localStorage.getItem('token') || null;
  // console.log("token is : ",token);
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPageTwo />} />
          <Route path="/signin" element={<AuthPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route element={<ProtectedRoute  isAuthenticated={token ? true : false } />}>
            <Route path="/screenshot" element={<Screenshot />} />
          </Route>
          
          <Route element={<ProtectedRoute  isAuthenticated={token ? true : false } next={'/threads-video-downloader'} />}>
            <Route path="/threads-video-downloader" element={<ThreadsVideoDownloader />} />
          </Route>

          <Route element={<ProtectedRoute  isAuthenticated={token ? true : false } next={'/twitter-video-downloader'} />}>
            <Route path="/twitter-video-downloader" element={<TwitterVideoDownloader />} />
          </Route>

          <Route element={<ProtectedRoute  isAuthenticated={token ? true : false } next={'/reddit-video-downloader'} />}>
            <Route path="/reddit-video-downloader" element={<RedditVideoDownloader />} />
          </Route>

          <Route element={<ProtectedRoute  isAuthenticated={token ? true : false } next={'/fake-posts-generator'} />}>
            <Route path="/fake-posts-generator" element={<FakePost />} />
          </Route>

          <Route path="/pricing" element={<PricingPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Screenshot from './pages/Screenshot';
import LandingPage from './pages/LandingPage';
import AuthPage from './components/AuthPage';
import ThreadsVideoDownloader from './pages/ThreadsVideoDownloader';
import TwitterVideoDownloader from './pages/TwitterVideoDownloader';
// import TwitterBannerMaker from './pages/TwitterBannerMaker';
import { ToastProvider } from './components/ToastContext';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/screenshot" element={<Screenshot />} />
          <Route path="/signin" element={<AuthPage />} />
          <Route path="/threads-video-downloader" element={<ThreadsVideoDownloader />} />
          <Route path="/twitter-video-downloader" element={<TwitterVideoDownloader />} />
          {/* <Route path="/twitter-banner-maker" element={<TwitterBannerMaker />} /> */}
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
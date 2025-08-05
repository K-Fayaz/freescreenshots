import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Screenshot from './pages/Screenshot';
import LandingPage from './pages/LandingPage';
import AuthPage from './components/AuthPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/screenshot" element={<Screenshot />} />
        <Route path="/signin" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
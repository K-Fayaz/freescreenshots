import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Screenshot from './pages/Screenshot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Screenshot />} />
      </Routes>
    </Router>
  );
}

export default App;
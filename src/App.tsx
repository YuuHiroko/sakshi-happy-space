import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import CelebratePage from './pages/celebrate'; // New import
import './styles/birthday.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/celebrate" element={<CelebratePage />} />
        {/* Add other routes here if needed */}
      </Routes>
    </Router>
  );
};

export default App;

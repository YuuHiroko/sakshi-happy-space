
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import WishesPage from './pages/WishesPage';
import GalleryPage from './pages/GalleryPage';
import MusicPage from './pages/MusicPage';
import MemoriesPage from './pages/MemoriesPage';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/wishes" element={<WishesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/music" element={<MusicPage />} />
            <Route path="/memories" element={<MemoriesPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

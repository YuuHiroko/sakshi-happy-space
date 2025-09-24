import React, { useState, useEffect, useMemo } from 'react';
import BirthdayHeader from '@/components/BirthdayHeader';
import ConfettiWrapper from '@/components/ConfettiWrapper';
import SuggestionsList from '@/components/SuggestionsList';
import PlaylistEmbed from '@/components/PlaylistEmbed';
import MemoryWall from '@/components/MemoryWall';
import WishCollection from '@/components/WishCollection';
import Testimonials from '@/components/Testimonials';
import PhotoBooth from '@/components/PhotoBooth';
import GuestBook from '@/components/GuestBook';
import { memories } from '@/data/memories';
import { testimonials } from '@/data/testimonials';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const suggestions = [
  {
    id: 'message',
    emoji: '✍️',
    title: 'Write a Wish',
    caption: 'Send your heartfelt birthday wishes to Sakshi!',
    url: '#wishes',
  },
  {
    id: 'guestbook',
    emoji: '📖',
    title: 'Sign the Guest Book',
    caption: 'Leave a message for Sakshi and the family!',
    url: '#guestbook',
  },
  {
    id: 'gallery',
    imageSrc: 'https://images.unsplash.com/photo-1522335765-bb4e6d3ce032?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJpcnRoZGF5JTIwcGFydHl8ZW58MHx8MHx8fDA%3D',
    title: 'View Memory Wall',
    caption: 'Relive cherished memories and special moments.',
    url: '#memory-wall',
  },
  {
    id: 'photo-booth',
    emoji: '📸',
    title: '3D Photo Booth',
    caption: 'Explore a 3D gallery of special moments.',
    url: '#photo-booth',
  },
  {
    id: 'music',
    emoji: '🎶',
    title: 'Enjoy the Playlist',
    caption: "Listen to Sakshi's favorite tunes for a celebratory mood.",
    url: '#birthday-playlist',
  },
  {
    id: 'testimonials',
    imageSrc: 'https://images.unsplash.com/photo-1517409287515-58e6e5a0046b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmlydGhkYXklMjBtZW1vcnllc3xlbnwwfHwwfHw%3D',
    title: 'What People Say',
    caption: 'See what friends and family have to say about Sakshi.',
    url: '#testimonials',
  },
];

const CelebratePage: React.FC = () => {
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTriggerConfetti(true);
    }, 1000);

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const spotifyEmbedUrl = "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator";
  const spotifyFallbackImageUrl = "https://i.scdn.co/image/ab67706c0000bebb4d2843d8c1c0c6e8e8e8e8e8";
  const spotifyFallbackLinkUrl = "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M";

  return (
    <ConfettiWrapper trigger={triggerConfetti} triggerOnMount={true} particleCount={300} durationMs={7000}>
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white relative`}>
        <main>
          <BirthdayHeader 
            name="Sakshi"
            age={25} 
            subtitle="A universe of love, just for you! ✨"
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />

          <motion.section 
            id="things-to-do"
            className="py-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <SuggestionsList items={suggestions} />
          </motion.section>

          <motion.section
            id="memory-wall"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <MemoryWall memories={memories} />
          </motion.section>

          <motion.section 
            id="photo-booth"
            className="py-16 bg-gray-100 dark:bg-gray-800"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">3D Photo Booth</h2>
                <PhotoBooth />
            </div>
          </motion.section>

          <motion.section 
            id="wishes"
            className="py-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-4">Leave a Wish</h2>
              <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12">Share your heartfelt birthday wishes for Sakshi! Your messages will make her special day even more memorable.</p>
              <WishCollection storageKey="sakshi-birthday-wishes" />
            </div>
          </motion.section>

          <motion.section 
            id="guestbook"
            className="py-16 bg-gray-100 dark:bg-gray-800"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <GuestBook />
          </motion.section>

          <motion.section 
            id="testimonials"
            className="py-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">What People Say</h2>
                <Testimonials testimonials={testimonials} />
            </div>
          </motion.section>

          <motion.section 
            id="birthday-playlist"
            className="py-16 bg-gray-100 dark:bg-gray-800"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: .8 }}
          >
            <PlaylistEmbed 
              title="Sakshi's Celebration Mix"
              description="Groove to the tunes curated just for Sakshi's special day!"
              embedUrl={spotifyEmbedUrl}
              fallbackImageUrl={spotifyFallbackImageUrl}
              fallbackLinkUrl={fallbackLinkUrl}
            />
          </motion.section>

          <footer className="relative py-10 text-center bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 mt-12">
            <div className="relative z-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white text-lg font-medium"
              >
                Made with 💖 by Munchkin
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4"
              >
                <div className="inline-block animate-bounce">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </footer>
        </main>

        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-pink-500/80 text-white p-3 rounded-full shadow-lg backdrop-blur-sm border border-white/20"
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 50 }}
              whileHover={{ scale: 1.1, backgroundColor: '#ec4899' }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <ArrowUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </ConfettiWrapper>
  );
};

export default CelebratePage;

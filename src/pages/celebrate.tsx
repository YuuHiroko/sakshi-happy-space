import React, { useState, useEffect, useMemo } from 'react';
import BirthdayHeader from '@/components/BirthdayHeader';
import ConfettiWrapper from '@/components/ConfettiWrapper';
import SuggestionsList from '@/components/SuggestionsList';
import PlaylistEmbed from '@/components/PlaylistEmbed';
import { motion } from 'framer-motion';

// Example Data for SuggestionsList
const suggestions = [
  {
    id: 'message',
    emoji: '✍️',
    title: 'Write a Wish',
    caption: 'Send your heartfelt birthday wishes to Sakshi!',
    url: '#wishes', // Link to a potential wishes section
  },
  {
    id: 'gallery',
    imageSrc: 'https://images.unsplash.com/photo-1522335765-bb4e6d3ce032?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJpcnRoZGF5JTIwcGFydHl8ZW58MHx8MHx8fDA%3D',
    title: 'View Photo Gallery',
    caption: 'Relive cherished memories and special moments.',
    url: '#gallery', // Link to a potential photo gallery section
  },
  {
    id: 'music',
    emoji: '🎶',
    title: 'Enjoy the Playlist',
    caption: "Listen to Sakshi's favorite tunes for a celebratory mood.",
    url: '#music', // Link to a potential music section
  },
  {
    id: 'memories',
    imageSrc: 'https://images.unsplash.com/photo-1517409287515-58e6e5a0046b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmlydGhkYXklMjBtZW1vcnllc3xlbnwwfHwwfHw%3D',
    title: 'Share a Memory',
    caption: 'Recall a fond memory you shared with Sakshi.',
    url: '#testimonials', // Link to a potential testimonials section
  },
];

const CelebratePage: React.FC = () => {
  const [triggerConfetti, setTriggerConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti after a short delay on mount
    const timer = setTimeout(() => {
      setTriggerConfetti(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const spotifyEmbedUrl = useMemo(() => {
    // Replace with your actual Spotify playlist embed URL
    // Example: "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator"
    return "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator"; 
  }, []);

  const spotifyFallbackImageUrl = useMemo(() => {
    // Replace with a suitable fallback image URL for the playlist
    return "https://i.scdn.co/image/ab67706c0000bebb4d2843d8c1c0c6e8e8e8e8e8"; 
  }, []);

  const spotifyFallbackLinkUrl = useMemo(() => {
    // Replace with the actual link to the Spotify playlist
    return "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M";
  }, []);

  return (
    <ConfettiWrapper trigger={triggerConfetti} triggerOnMount={true} particleCount={300} durationMs={7000}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white relative">
        {/* Main Content */}
        <main>
          <BirthdayHeader 
            name="Sakshi"
            age={25} // Optional age
            subtitle="A universe of love, just for you! ✨"
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
            id="birthday-playlist"
            className="py-16 bg-gray-100 dark:bg-gray-800"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <PlaylistEmbed 
              title="Sakshi's Celebration Mix"
              description="Groove to the tunes curated just for Sakshi's special day!"
              embedUrl={spotifyEmbedUrl}
              fallbackImageUrl={spotifyFallbackImageUrl}
              fallbackLinkUrl={spotifyFallbackLinkUrl}
            />
          </motion.section>

          {/* Example of other sections could go here */}
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
      </div>
    </ConfettiWrapper>
  );
};

export default CelebratePage;

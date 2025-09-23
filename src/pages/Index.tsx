
import { useState, useEffect } from 'react';
import Section from '@/components/Section';
import Header from '@/components/Header';
import PhotoGallery from '@/components/PhotoGallery';
import Timeline from '@/components/Timeline';
import Testimonials from '@/components/Testimonials';
import Loader from '@/components/Loader';
import WishCollection from '@/components/WishCollection';
import MusicVisualizer from '@/components/MusicVisualizer';
import BirthdayScene3D from '@/components/3d/BirthdayScene3D';
import FixedNavbar from '@/components/FixedNavbar';
import { particlesConfig, darkParticlesConfig } from '@/utils/particlesConfig';
import { motion, AnimatePresence } from 'framer-motion';

// Import Particles.js directly in the component
declare global {
  interface Window {
    particlesJS: (elementId: string, config: object) => void;
  }
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [show3DScene, setShow3DScene] = useState(true); // Default to 3D mode
  const [currentSection, setCurrentSection] = useState('3d');

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    
    // Reinitialize particles with new config
    if (window.particlesJS) {
      window.particlesJS('particles-js', newMode ? darkParticlesConfig : particlesConfig);
    }
  };

  // Load Particles.js script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
    script.async = true;
    
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS('particles-js', isDarkMode ? darkParticlesConfig : particlesConfig);
      }
    };
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, [isDarkMode]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Birthday photos for Sakshi
  const photos = [
    { src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop', alt: 'Birthday celebration', title: 'Birthday Joy' },
    { src: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=600&fit=crop', alt: 'Happy moments', title: 'Sweet Memories' },
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop', alt: 'Celebration time', title: 'Party Time' },
    { src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop', alt: 'Birthday cake', title: 'Cake Moments' },
    { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=600&fit=crop', alt: 'Birthday balloons', title: 'Balloon Fun' },
    { src: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=600&fit=crop', alt: 'Special day', title: 'Special Day' },
  ];

  const timelineEvents = [
    { year: 'Year 1', title: 'The Beginning', description: 'First steps into this beautiful world!' },
    { year: 'Year 10', title: 'Academic Achievement', description: 'Won her first award in school.' },
    { year: 'Year 15', title: 'High School Success', description: 'Graduated with honors from high school.' },
    { year: 'Year 18', title: 'College Journey', description: 'Started her college journey with a bright future ahead.' },
    { year: 'Year 22', title: 'Career Milestone', description: 'Landed her dream job and began a successful career.' },
  ];

  const testimonials = [
    { quote: "Sakshi is amazing! She brings joy to everyone around her.", author: "Friend 1" },
    { quote: "She lights up every room she enters! Her kindness is contagious.", author: "Friend 2" },
    { quote: "The most supportive person I know. Always there when you need her.", author: "Family Member" },
    { quote: "Her creativity and passion inspire me every day. Simply extraordinary!", author: "Colleague" },
    { quote: "A true friend with a heart of gold. The world needs more people like her.", author: "Childhood Friend" },
  ];

  const handleSectionChange = (section: string) => {
    console.log('Changing section to:', section);
    setCurrentSection(section);
    
    // If switching to 3D, show the 3D scene
    if (section === '3d') {
      setShow3DScene(true);
    } else {
      // If switching to any other section, hide the 3D scene
      setShow3DScene(false);
    }
  };

  const toggle3DScene = () => {
    const newShow3D = !show3DScene;
    setShow3DScene(newShow3D);
    setCurrentSection(newShow3D ? '3d' : 'about');
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case '3d':
        return null; // 3D scene is handled separately
      case 'about':
        return (
          <Section id="about" title="About Sakshi" className="animate-fade-in">
            <p className="text-lg leading-relaxed">
              Sakshi is my elder sissy who is the bestest sissy in the entire world. She brings happiness and joy wherever she goes! Her kindness and warmth touch everyone around her.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              With her charming personality and contagious laughter, she creates memorable moments that we all cherish. This space is dedicated to celebrating all the beautiful aspects of her life.
            </p>
            
            <motion.div 
              className="mt-8 flex justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-sakshi-purple to-sakshi-blue rounded-full blur-lg opacity-50 animate-pulse-gentle"></div>
                <img 
                  src="https://source.unsplash.com/random/300x300?panda" 
                  alt="Sakshi" 
                  className="relative w-48 h-48 rounded-full object-cover border-4 border-white shadow-xl"
                />
              </div>
            </motion.div>
          </Section>
        );
      case 'gallery':
        return (
          <Section id="gallery" title="Photo Gallery">
            <p className="text-lg leading-relaxed mb-6">
              A collection of cherished moments from Sakshi's life journey. Each photo tells a unique story of joy, achievement, and connection.
            </p>
            <PhotoGallery photos={photos} />
          </Section>
        );
      case 'timeline':
        return (
          <Section id="timeline" title="Sakshi's Timeline">
            <p className="text-lg leading-relaxed mb-6">
              A journey through the significant milestones and moments that have shaped Sakshi's life story.
            </p>
            <Timeline events={timelineEvents} />
          </Section>
        );
      case 'testimonials':
        return (
          <Section id="testimonials" title="What People Say">
            <p className="text-lg leading-relaxed mb-6">
              Hear from the people whose lives have been touched by Sakshi's presence and kindness.
            </p>
            <Testimonials testimonials={testimonials} />
          </Section>
        );
      case 'wishes':
        return (
          <Section id="wishes" title="Birthday Wishes">
            <p className="text-lg leading-relaxed mb-6">
              Share your heartfelt birthday wishes for Sakshi! Your messages will make her special day even more memorable.
            </p>
            <WishCollection />
          </Section>
        );
      case 'music':
        return (
          <Section id="music" title="Birthday Music Experience">
            <p className="text-lg leading-relaxed mb-6">
              Enjoy Sakshi's birthday playlist with an amazing 3D music visualizer! Watch the colors dance to the rhythm.
            </p>
            <MusicVisualizer />
            
            <div className="mt-8 relative overflow-hidden rounded-2xl shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-sakshi-purple to-sakshi-blue opacity-20 z-10 pointer-events-none"></div>
              <iframe
                src="https://www.youtube.com/embed/sPHRoZFnEkU"
                loading="lazy"
                title="Sakshi's Favorite Music"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-video rounded-2xl"
              />
            </div>
          </Section>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Loader */}
      <Loader isLoading={isLoading} />
      
      {/* Fixed Navigation */}
      <FixedNavbar 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        show3DScene={show3DScene}
        onToggle3D={toggle3DScene}
      />
      
      {/* 3D Birthday Scene */}
      <AnimatePresence>
        {show3DScene && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40"
          >
            <BirthdayScene3D photos={photos} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      {!show3DScene && (
        <motion.main 
          className="min-h-screen"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderCurrentSection()}
        </motion.main>
      )}
      
      {/* Footer - Only show when not in 3D mode */}
      {!show3DScene && (
        <footer className="relative py-10 text-center bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600">
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
      )}
    </div>
  );
};

export default Index;

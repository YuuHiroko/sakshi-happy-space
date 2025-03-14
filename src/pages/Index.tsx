
import { useState, useEffect } from 'react';
import Section from '@/components/Section';
import Header from '@/components/Header';
import PhotoGallery from '@/components/PhotoGallery';
import Timeline from '@/components/Timeline';
import Testimonials from '@/components/Testimonials';
import Loader from '@/components/Loader';
import { particlesConfig, darkParticlesConfig } from '@/utils/particlesConfig';
import { motion } from 'framer-motion';

// Import Particles.js directly in the component
declare global {
  interface Window {
    particlesJS: any;
  }
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

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

  // Mock data for demonstration
  const photos = [
    { src: 'https://source.unsplash.com/random/600x600?portrait', alt: 'Travel memory' },
    { src: 'https://source.unsplash.com/random/600x600?family', alt: 'Family memory' },
    { src: 'https://source.unsplash.com/random/600x600?friends', alt: 'Friends memory' },
    { src: 'https://source.unsplash.com/random/600x600?celebration', alt: 'Celebration memory' },
    { src: 'https://source.unsplash.com/random/600x600?vacation', alt: 'Vacation memory' },
    { src: 'https://source.unsplash.com/random/600x600?party', alt: 'Party memory' },
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
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-sakshi-dark text-white' : 'bg-sakshi-light text-gray-800'}`}>
      {/* Loader */}
      <Loader isLoading={isLoading} />
      
      {/* Particles Background */}
      <div id="particles-js" className="parallax-bg"></div>
      
      {/* Header */}
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Main Content */}
      <main className="pt-48 pb-20">
        {/* About Section */}
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
                src="https://source.unsplash.com/random/300x300?portrait" 
                alt="Sakshi" 
                className="relative w-48 h-48 rounded-full object-cover border-4 border-white shadow-xl"
              />
            </div>
          </motion.div>
        </Section>
        
        {/* Photo Gallery Section */}
        <Section id="gallery" title="Photo Gallery">
          <p className="text-lg leading-relaxed mb-6">
            A collection of cherished moments from Sakshi's life journey. Each photo tells a unique story of joy, achievement, and connection.
          </p>
          <PhotoGallery photos={photos} />
        </Section>
        
        {/* Achievements Section */}
        <Section id="achievements" title="Achievements">
          <p className="text-lg leading-relaxed">
            Sakshi has achieved so much in life! Her dedication and perseverance have led to numerous accomplishments that we're incredibly proud of.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <motion.div 
              className="glass-card p-6 border border-sakshi-purple/10"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-sakshi-purple to-sakshi-blue rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Academic Excellence</h3>
              <p>Consistently achieved top grades and received recognition for outstanding academic performance.</p>
            </motion.div>
            
            <motion.div 
              className="glass-card p-6 border border-sakshi-purple/10"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-sakshi-purple to-sakshi-blue rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Success</h3>
              <p>Excelled in her career path, earning promotions and establishing herself as a respected professional.</p>
            </motion.div>
            
            <motion.div 
              className="glass-card p-6 border border-sakshi-purple/10"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-sakshi-purple to-sakshi-blue rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Leadership Skills</h3>
              <p>Demonstrated exceptional leadership abilities, guiding teams and projects to success.</p>
            </motion.div>
            
            <motion.div 
              className="glass-card p-6 border border-sakshi-purple/10"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-sakshi-purple to-sakshi-blue rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Impact</h3>
              <p>Made significant contributions to community initiatives, helping create positive change.</p>
            </motion.div>
          </div>
        </Section>
        
        {/* Timeline Section */}
        <Section id="timeline" title="Sakshi's Timeline">
          <p className="text-lg leading-relaxed mb-6">
            A journey through the significant milestones and moments that have shaped Sakshi's life story.
          </p>
          <Timeline events={timelineEvents} />
        </Section>
        
        {/* Testimonials Section */}
        <Section id="testimonials" title="What People Say">
          <p className="text-lg leading-relaxed mb-6">
            Hear from the people whose lives have been touched by Sakshi's presence and kindness.
          </p>
          <Testimonials testimonials={testimonials} />
        </Section>
        
        {/* Music Section */}
        <Section id="music" title="Music Playlist">
          <p className="text-lg leading-relaxed mb-6">
            Here's a special music playlist curated for Sakshi. These songs reflect her vibrant personality and beautiful spirit.
          </p>
          
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
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
      </main>
      
      {/* Footer */}
      <footer className="relative py-10 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-sakshi-purple to-sakshi-blue opacity-90 z-0"></div>
        <div className="relative z-10">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-lg"
          >
            Made with love by Munchkin
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4"
          >
            <div className="inline-block animate-float">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor" />
              </svg>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

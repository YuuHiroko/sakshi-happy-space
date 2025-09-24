import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Switch } from "@/components/ui/switch";
import { Sun, Moon, Home, Camera, Clock, MessageSquare, Heart, Music, Sparkles } from "lucide-react";

interface FixedNavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentSection: string;
  onSectionChange: (section: string) => void;
  show3DScene: boolean;
  onToggle3D: () => void;
}

const NAV_ITEMS = [
  { id: '3d', label: '3D World', icon: Sparkles },
  { id: 'about', label: 'About', icon: Home },
  { id: 'gallery', label: 'Gallery', icon: Camera },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'testimonials', label: 'Stories', icon: MessageSquare },
  { id: 'wishes', label: 'Wishes', icon: Heart },
  { id: 'music', label: 'Music', icon: Music },
];

const FixedNavbar: React.FC<FixedNavbarProps> = ({ 
  isDarkMode, 
  toggleDarkMode, 
  currentSection, 
  onSectionChange,
  show3DScene,
  onToggle3D
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMobileMenuOpen(false);
    
    if (sectionId !== '3d') {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const renderNavItems = (isMobile: boolean = false) => {
    return NAV_ITEMS.map(({ id, label, icon: Icon }) => (
      <motion.button
        key={id}
        onClick={() => handleSectionClick(id)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          currentSection === id
            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        } ${isMobile ? 'w-full justify-start text-left' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon size={isMobile ? 18 : 16} />
        <span className={isMobile ? 'font-medium' : ''}>{label}</span>
      </motion.button>
    ));
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-white/20 dark:border-gray-700/50' 
            : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl">🎂</div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Sakshi's World
              </h1>
            </motion.div>

            <div className="hidden md:flex items-center space-x-1">
              {renderNavItems()}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
                {isDarkMode ? <Moon size={14} className="text-blue-400" /> : <Sun size={14} className="text-yellow-500" />}
                <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={toggleDarkMode} className="scale-75" />
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700"
        >
          <div className="px-4 py-2 space-y-1">
            {renderNavItems(true)}
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
};

export default FixedNavbar;

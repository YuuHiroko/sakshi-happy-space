
import { useState, useEffect } from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ isDarkMode, toggleDarkMode }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${
      scrolled 
        ? 'py-4 bg-white/10 dark:bg-blue-900/20 backdrop-blur-lg shadow-lg' 
        : 'py-10 bg-transparent'
      } fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out px-6 md:px-10`}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-dancing text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] dark:text-blue-100 dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        >
          Welcome to Sakshi's World
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg md:text-xl text-white/90 mb-6 drop-shadow-md dark:text-blue-200 dark:drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
        >
          🎂 A magical 3D birthday experience filled with love, memories, and happiness 🎉
        </motion.p>
        
        {/* Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mb-6"
        >
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            {['about', 'gallery', 'timeline', 'testimonials', 'wishes', 'music'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="px-4 py-2 bg-white/20 dark:bg-blue-900/30 backdrop-blur-md rounded-full text-white hover:bg-white/30 dark:hover:bg-blue-900/40 transition-all duration-300 capitalize"
              >
                {section === 'wishes' ? '💝 Wishes' : section === 'music' ? '🎵 Music' : section}
              </a>
            ))}
          </div>
        </motion.nav>
        
        <div className="flex items-center space-x-2 bg-white/20 dark:bg-blue-900/30 backdrop-blur-md px-4 py-2 rounded-full shadow-md">
          {isDarkMode ? (
            <Moon size={16} className="text-blue-200 mr-1" />
          ) : (
            <Sun size={16} className="text-white mr-1" />
          )}
          <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={toggleDarkMode} />
          <Label htmlFor="dark-mode" className="text-white drop-shadow-sm dark:text-blue-100">Dark Mode</Label>
        </div>
      </div>
    </header>
  );
};

export default Header;

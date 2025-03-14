
import { useState, useEffect } from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

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
    <header className={`${scrolled ? 'py-4 bg-white/10 backdrop-blur-lg shadow-lg' : 'py-10 bg-transparent'} fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out px-6 md:px-10`}>
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-dancing text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-2"
        >
          Welcome to Sakshi's World
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg md:text-xl text-white/90 mb-6"
        >
          A space filled with love, memories, and happiness
        </motion.p>
        
        <div className="flex items-center space-x-2">
          <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={toggleDarkMode} />
          <Label htmlFor="dark-mode" className="text-white">Dark Mode</Label>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface BirthdayHeaderProps {
  name: string;
  age?: number;
  subtitle?: string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const BirthdayHeader: React.FC<BirthdayHeaderProps> = ({ name, age, subtitle, isDarkMode, toggleDarkMode }) => {
  return (
    <header className="relative py-16 md:py-24 text-center bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-red-900/20 px-4">
      <div className="absolute top-4 right-4">
        <motion.button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-black/10 dark:bg-white/10 text-gray-800 dark:text-gray-200 border border-black/20 dark:border-white/20"
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isDarkMode ? 'moon' : 'sun'}
              initial={{ y: -20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 leading-tight \
                     bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-800 bg-clip-text text-transparent \
                     drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_4px_10px_rgba(255,255,255,0.05)]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          aria-label={`Happy Birthday ${name}`}
        >
          Happy Birthday {name} {age ? `(${age})` : ''}!
        </motion.h1>
        {subtitle && (
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </header>
  );
};

export default BirthdayHeader;

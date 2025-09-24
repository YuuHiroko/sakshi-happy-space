import React from 'react';
import { motion } from 'framer-motion';

interface BirthdayHeaderProps {
  name: string;
  age?: number;
  subtitle?: string;
}

const BirthdayHeader: React.FC<BirthdayHeaderProps> = ({ name, age, subtitle }) => {
  return (
    <header className="py-16 md:py-24 text-center bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-red-900/20 px-4">
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

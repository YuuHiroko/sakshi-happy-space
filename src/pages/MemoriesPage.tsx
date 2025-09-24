
import React from 'react';
import { motion } from 'framer-motion';

const memories = [
  {
    year: "2021",
    title: "Our First Trip",
    description: "Remember that time we went to the mountains? It was an unforgettable experience, filled with laughter and adventure.",
  },
  {
    year: "2022",
    title: "The Concert",
    description: "We saw our favorite band live! The energy of the crowd and the music was just incredible.",
  },
  {
    year: "2023",
    title: "A New Beginning",
    description: "This was the year of big changes and new opportunities. We faced every challenge together and came out stronger.",
  },
];

const MemoriesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">A Walk Down Memory Lane</h2>
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gray-300 dark:bg-gray-600"></div>
        {memories.map((memory, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`relative mb-8 flex items-center w-full ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
              <div className={`p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800`}>
                <p className="font-bold text-lg mb-1">{memory.title}</p>
                <p className="text-gray-600 dark:text-gray-300">{memory.description}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">{memory.year}</p>
              </div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-400 dark:bg-gray-500 rounded-full z-10"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MemoriesPage;

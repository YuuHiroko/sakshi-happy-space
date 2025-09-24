import React from 'react';
import { motion } from 'framer-motion';

interface SuggestionItem {
  id: string;
  emoji?: string;
  imageSrc?: string;
  title: string;
  caption: string;
  url?: string;
}

interface SuggestionsListProps {
  items: SuggestionItem[];
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ items }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-center mb-10 
                   bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Things You Can Do!
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.2 }}
          >
            {item.imageSrc ? (
              <div className="mb-4 w-32 h-32 flex items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 shadow-md">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="128"
                  height="128"
                />
              </div>
            ) : (
              <div className="mb-4 text-6xl" role="img" aria-label={item.title}>
                {item.emoji}
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-base flex-grow">
              {item.caption}
            </p>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white 
                           bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                aria-label={`Learn more about ${item.title}`}
              >
                Explore
                <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SuggestionsList;

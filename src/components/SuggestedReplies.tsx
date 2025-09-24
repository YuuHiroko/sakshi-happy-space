import React from 'react';
import { motion } from 'framer-motion';

interface SuggestedRepliesProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

const SuggestedReplies: React.FC<SuggestedRepliesProps> = ({ suggestions, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {suggestion}
        </motion.button>
      ))}
    </div>
  );
};

export default SuggestedReplies;

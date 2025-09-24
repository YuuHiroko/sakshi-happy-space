import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Memory } from '@/data/memories';

interface MemoryWallProps {
  memories: Memory[];
}

const MemoryWall: React.FC<MemoryWallProps> = ({ memories }) => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const openMemory = (memory: Memory) => {
    setSelectedMemory(memory);
  };

  const closeMemory = () => {
    setSelectedMemory(null);
  };

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    memories.forEach(memory => {
      memory.tags.forEach(tag => tags.add(tag));
    });
    return ['All', ...Array.from(tags)];
  }, [memories]);

  const filteredMemories = useMemo(() => {
    if (!selectedTag || selectedTag === 'All') {
      return memories;
    }
    return memories.filter(memory => memory.tags.includes(selectedTag));
  }, [memories, selectedTag]);

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-6">Memory Wall</h2>
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {allTags.map(tag => (
          <motion.button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${selectedTag === tag ? 'bg-pink-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tag}
          </motion.button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredMemories.map((memory, index) => (
          <motion.div
            key={memory.id}
            className="relative aspect-square rounded-lg overflow-hidden shadow-lg cursor-pointer"
            layoutId={`memory-${memory.id}`}
            onClick={() => openMemory(memory)}
            initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 20 - 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.05, rotate: Math.random() * 6 - 3, zIndex: 10 }}
          >
            <img src={memory.imageUrl} alt={memory.caption} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
              <p className="text-white text-sm font-semibold">{memory.author}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMemory}
          >
            <motion.div
              className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden max-w-lg w-full shadow-2xl"
              layoutId={`memory-${selectedMemory.id}`}
            >
              <motion.img
                src={selectedMemory.imageUrl}
                alt={selectedMemory.caption}
                className="w-full h-auto object-contain max-h-[70vh]"
              />
              <div className="p-6">
                <motion.p className="text-lg mb-2">{selectedMemory.caption}</motion.p>
                <motion.p className="text-sm text-gray-500 dark:text-gray-400">
                  - {selectedMemory.author}, {selectedMemory.date}
                </motion.p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedMemory.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.button
                onClick={closeMemory}
                className="absolute top-4 right-4 text-white text-3xl z-60"
                whileHover={{ scale: 1.2 }}
             >
                &times;
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryWall;

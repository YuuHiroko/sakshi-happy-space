import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Camera, MessageCircle, Plus, X } from 'lucide-react';

interface Memory {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
  category: 'birthday' | 'friendship' | 'achievement' | 'fun' | 'family';
  likes: number;
  comments: string[];
}

const MemoryWall = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  // Sample memories data
  const sampleMemories: Memory[] = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop',
      title: 'Birthday Celebration 2023',
      description: 'The most amazing birthday party with all our favorite people!',
      date: '2023-09-15',
      category: 'birthday',
      likes: 24,
      comments: ['Best party ever!', 'So much fun!', 'Love this memory!']
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=400&fit=crop',
      title: 'Graduation Day',
      description: 'Celebrating academic achievements and new beginnings!',
      date: '2023-06-20',
      category: 'achievement',
      likes: 18,
      comments: ['So proud!', 'Congratulations!']
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      title: 'Fun Day Out',
      description: 'Exploring new places and making wonderful memories together.',
      date: '2023-08-10',
      category: 'fun',
      likes: 15,
      comments: ['What a day!', 'Love these adventures!']
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      title: 'Family Gathering',
      description: 'Quality time with the people who matter most.',
      date: '2023-07-04',
      category: 'family',
      likes: 32,
      comments: ['Family is everything!', 'Beautiful moments!', 'Love you all!']
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop',
      title: 'Best Friends Forever',
      description: 'Friendship goals achieved with the most amazing people!',
      date: '2023-05-25',
      category: 'friendship',
      likes: 28,
      comments: ['Friendship goals!', 'Love you guys!', 'Best friends ever!']
    },
    {
      id: '6',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=400&fit=crop',
      title: 'Special Moments',
      description: 'Those little moments that make life so beautiful and meaningful.',
      date: '2023-04-12',
      category: 'fun',
      likes: 21,
      comments: ['So beautiful!', 'Perfect moment!']
    }
  ];

  useEffect(() => {
    setMemories(sampleMemories);
  }, []);

  const categories = [
    { id: 'all', label: 'All Memories', icon: '🌟' },
    { id: 'birthday', label: 'Birthdays', icon: '🎂' },
    { id: 'friendship', label: 'Friendship', icon: '👫' },
    { id: 'achievement', label: 'Achievements', icon: '🏆' },
    { id: 'fun', label: 'Fun Times', icon: '🎉' },
    { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' }
  ];

  const filteredMemories = filter === 'all' 
    ? memories 
    : memories.filter(memory => memory.category === filter);

  const handleLike = (memoryId: string) => {
    setMemories(prev => prev.map(memory => 
      memory.id === memoryId 
        ? { ...memory, likes: memory.likes + 1 }
        : memory
    ));
  };

  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
          Memory Wall
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          A collection of beautiful moments and cherished memories 📸
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === category.id
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                : 'bg-white/20 dark:bg-gray-800/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-800/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </motion.button>
        ))}
      </div>

      {/* Memory Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        <AnimatePresence>
          {filteredMemories.map((memory, index) => (
            <motion.div
              key={memory.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedMemory(memory)}
            >
              <div className="glass-card overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white">
                    {categories.find(cat => cat.id === memory.category)?.icon} {memory.category}
                  </div>
                  
                  {/* Overlay content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-lg mb-1">{memory.title}</h3>
                    <p className="text-sm opacity-90 line-clamp-2">{memory.description}</p>
                  </div>
                </div>
                
                {/* Memory stats */}
                <div className="p-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{new Date(memory.date).toLocaleDateString()}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{memory.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{memory.comments.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Memory Detail Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-2xl w-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="aspect-video overflow-hidden">
                <img
                  src={selectedMemory.image}
                  alt={selectedMemory.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{selectedMemory.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedMemory.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">
                    {new Date(selectedMemory.date).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleLike(selectedMemory.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full hover:shadow-lg transition-all duration-300"
                  >
                    <Heart className="w-4 h-4" />
                    <span>{selectedMemory.likes}</span>
                  </button>
                </div>
                
                {/* Comments */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Comments ({selectedMemory.comments.length})</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {selectedMemory.comments.map((comment, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                          <p className="text-sm">{comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryWall;
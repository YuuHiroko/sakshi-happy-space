import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Star, Sparkles, Camera, Music, Cake, Gift } from 'lucide-react';

interface Wish {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
  category: WishCategory;
}

type WishCategory = 'birthday' | 'memory' | 'future' | 'appreciation' | 'fun' | 'love' | 'adventure';

interface WishCategoryInfo {
  icon: any;
  color: string;
  gradient: string;
  name: string;
  avatar: string;
}

const wishCategories: Record<WishCategory, WishCategoryInfo> = {
  birthday: { icon: Cake, color: 'text-pink-500', gradient: 'from-pink-500 to-rose-400', name: 'Birthday', avatar: '🎂' },
  memory: { icon: Camera, color: 'text-purple-500', gradient: 'from-purple-500 to-indigo-400', name: 'Memory', avatar: '📸' },
  future: { icon: Star, color: 'text-blue-500', gradient: 'from-blue-500 to-cyan-400', name: 'Future', avatar: '✨' },
  appreciation: { icon: Heart, color: 'text-red-500', gradient: 'from-red-500 to-pink-400', name: 'Appreciation', avatar: '❤️' },
  fun: { icon: Music, color: 'text-green-500', gradient: 'from-green-500 to-emerald-400', name: 'Fun', avatar: '🎉' },
  love: { icon: Sparkles, color: 'text-yellow-500', gradient: 'from-yellow-500 to-orange-400', name: 'Love', avatar: '💕' },
  adventure: { icon: Gift, color: 'text-indigo-500', gradient: 'from-indigo-500 to-purple-400', name: 'Adventure', avatar: '🌟' }
};

const predefinedWishes: Omit<Wish, 'id' | 'timestamp'>[] = [
  { text: "Happy Birthday Sakshi! 🎂 May your special day be filled with joy, laughter, and all your favorite things!", author: "Birthday Bot", category: 'birthday' },
  { text: "Remember that amazing time we laughed until our stomachs hurt? Here's to making many more beautiful memories! 💫", author: "Memory Keeper", category: 'memory' },
  { text: "This year is going to be your year! I can feel all the amazing opportunities coming your way ✨", author: "Future Visionary", category: 'future' },
  { text: "Thank you for being such an incredible person. Your kindness and warmth light up every room you enter 💖", author: "Grateful Friend", category: 'appreciation' },
  { text: "Let's celebrate with music, dancing, and all the silly things that make life beautiful! 🎵", author: "Fun Lover", category: 'fun' },
  { text: "You deserve all the love in the world today and every day. You're absolutely wonderful! 💕", author: "Love Ambassador", category: 'love' },
  { text: "Here's to new adventures, exciting journeys, and discovering amazing things about yourself! 🌟", author: "Adventure Guide", category: 'adventure' }
];

const WishCollection = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [newWish, setNewWish] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<WishCategory>('birthday');
  const [showForm, setShowForm] = useState(false);

  // Load wishes from localStorage on component mount
  useEffect(() => {
    const savedWishes = localStorage.getItem('sakshi-birthday-wishes');
    if (savedWishes) {
      const parsedWishes = JSON.parse(savedWishes).map((wish: any) => ({
        ...wish,
        timestamp: new Date(wish.timestamp)
      }));
      setWishes(parsedWishes);
    } else {
      // Initialize with predefined wishes if none exist
      const initialWishes = predefinedWishes.map(wish => ({
        ...wish,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date()
      }));
      setWishes(initialWishes);
    }
  }, []);

  // Save wishes to localStorage whenever wishes change
  useEffect(() => {
    localStorage.setItem('sakshi-birthday-wishes', JSON.stringify(wishes));
  }, [wishes]);

  const addWish = () => {
    if (newWish.trim() && authorName.trim()) {
      const wish: Wish = {
        id: Date.now().toString(),
        text: newWish.trim(),
        author: authorName.trim(),
        timestamp: new Date(),
        category: selectedCategory
      };
      
      setWishes(prev => [wish, ...prev]);
      setNewWish('');
      setAuthorName('');
      setShowForm(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addWish();
    }
  };

  const groupedWishes = wishes.reduce((acc, wish) => {
    if (!acc[wish.category]) acc[wish.category] = [];
    acc[wish.category].push(wish);
    return acc;
  }, {} as Record<WishCategory, Wish[]>);

  return (
    <div className="relative">
      {/* Enhanced Add Wish Button */}
      <motion.button
        onClick={() => setShowForm(!showForm)}
        className="mb-8 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto backdrop-blur-sm border border-white/20 group"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          animate={{ rotate: showForm ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Heart className="w-6 h-6 group-hover:animate-pulse" />
        </motion.div>
        <span className="text-lg">Add Your Birthday Wish</span>
        <Star className="w-6 h-6 group-hover:animate-spin" />
      </motion.button>

      {/* Enhanced Wish Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            className="mb-8 p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl"
          >
            <div className="space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-white font-medium mb-4 text-lg">Choose a category:</label>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {Object.entries(wishCategories).map(([key, category]) => {
                    const Icon = category.icon;
                    return (
                      <motion.button
                        key={key}
                        type="button"
                        onClick={() => setSelectedCategory(key as WishCategory)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          selectedCategory === key
                            ? `bg-gradient-to-br ${category.gradient} border-white text-white shadow-lg`
                            : 'bg-white/10 border-white/30 text-white/70 hover:bg-white/20'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-2xl">{category.avatar}</span>
                          <Icon className="w-4 h-4" />
                          <span className="text-xs font-medium">{category.name}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <input
                type="text"
                placeholder="Your name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent text-lg"
                onKeyPress={handleKeyPress}
              />
              <textarea
                placeholder="Write your birthday wish for Sakshi..."
                value={newWish}
                onChange={(e) => setNewWish(e.target.value)}
                className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent resize-none h-32 text-lg"
                onKeyPress={handleKeyPress}
              />
              <div className="flex gap-4 justify-end">
                <motion.button
                  onClick={() => setShowForm(false)}
                  className="px-8 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors text-lg font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={addWish}
                  disabled={!newWish.trim() || !authorName.trim()}
                  className={`px-8 py-3 bg-gradient-to-r ${wishCategories[selectedCategory].gradient} text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 text-lg font-medium`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  Send Wish
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7-Slot Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {wishes.slice(0, 7).map((wish, index) => {
            const category = wishCategories[wish.category];
            const Icon = category.icon;
            
            return (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className={`group relative p-6 bg-gradient-to-br ${category.gradient}/20 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/30 to-transparent rounded-full transform translate-x-8 -translate-y-8" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/20 to-transparent rounded-full transform -translate-x-4 translate-y-4" />
                </div>

                {/* Category Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                    <span className="text-xl">{category.avatar}</span>
                  </div>
                  <div>
                    <span className={`text-sm font-medium ${category.color} opacity-90`}>
                      {category.name}
                    </span>
                  </div>
                </div>

                {/* Wish Content */}
                <div className="relative z-10">
                  <blockquote className="text-white leading-relaxed mb-4 text-lg font-medium">
                    "{wish.text}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${category.color}`} />
                      <span className="text-white/90 font-semibold">
                        {wish.author}
                      </span>
                    </div>
                    <span className="text-white/60 text-sm">
                      {wish.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Floating Stars */}
                <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-60 transition-opacity">
                  <Star className="w-5 h-5 text-yellow-300 animate-pulse" />
                </div>
                
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {wishes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-20 text-white/70"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-20 h-20 mx-auto mb-6 text-pink-300" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">No wishes yet!</h3>
            <p className="text-xl">Be the first to wish Sakshi a happy birthday! 🎉</p>
          </motion.div>
        )}
      </div>

      {/* Show More Button */}
      {wishes.length > 7 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <motion.button
            className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All {wishes.length} Wishes ✨
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default WishCollection;
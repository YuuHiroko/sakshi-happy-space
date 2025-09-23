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
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    try {
      const savedWishes = localStorage.getItem('sakshi-birthday-wishes');
      if (savedWishes) {
        const parsedWishes = JSON.parse(savedWishes).map((wish: any) => ({
          ...wish,
          timestamp: new Date(wish.timestamp)
        }));
        setWishes(parsedWishes);
      } else {
        const initialWishes = predefinedWishes.map(wish => ({
          ...wish,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date()
        }));
        setWishes(initialWishes);
      }
    } catch (error) {
      console.error("Failed to load wishes from localStorage:", error);
      const initialWishes = predefinedWishes.map(wish => ({
        ...wish,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date()
      }));
      setWishes(initialWishes);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('sakshi-birthday-wishes', JSON.stringify(wishes));
    } catch (error) {
      console.error("Failed to save wishes to localStorage:", error);
    }
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

  const displayedWishes = showAll ? wishes : wishes.slice(0, 7);

  return (
    <div className="relative font-sans">
      <motion.button
        onClick={() => setShowForm(!showForm)}
        className="mb-10 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full font-bold shadow-2xl hover:shadow-3xl transition-all duration-400 flex items-center gap-4 mx-auto backdrop-blur-md border-2 border-white/30 group"
        whileHover={{ scale: 1.08, y: -4 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
      >
        <motion.div animate={{ rotate: showForm ? 225 : 0 }} transition={{ duration: 0.4 }}>
          <Heart className="w-7 h-7 group-hover:animate-pulse" />
        </motion.div>
        <span className="text-xl">Add Your Birthday Wish</span>
        <Star className="w-7 h-7 group-hover:animate-spin-slow" />
      </motion.button>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -35, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -35, scale: 0.9 }}
            className="mb-12 p-8 bg-black/20 backdrop-blur-xl rounded-3xl border-2 border-white/20 shadow-2xl"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-4 text-xl tracking-wide">Choose a Category:</label>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {Object.entries(wishCategories).map(([key, category]) => {
                    const Icon = category.icon;
                    return (
                      <motion.button
                        key={key}
                        type="button"
                        onClick={() => setSelectedCategory(key as WishCategory)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 text-center ${
                          selectedCategory === key
                            ? `bg-gradient-to-br ${category.gradient} border-white/50 text-white shadow-xl`
                            : 'bg-white/10 border-white/30 text-white/80 hover:bg-white/20 hover:border-white/40'
                        }`}
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                      >
                        <span className="text-3xl">{category.avatar}</span>
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-bold tracking-wide">{category.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <input
                type="text"
                placeholder="Your Name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-md rounded-xl border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-3 focus:ring-pink-400 focus:border-transparent text-lg"
                onKeyPress={handleKeyPress}
              />
              <textarea
                placeholder="Write your beautiful wish for Sakshi..."
                value={newWish}
                onChange={(e) => setNewWish(e.target.value)}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-md rounded-xl border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-3 focus:ring-pink-400 focus:border-transparent resize-none h-36 text-lg"
                onKeyPress={handleKeyPress}
              />
              <div className="flex gap-4 justify-end pt-2">
                <motion.button
                  onClick={() => setShowForm(false)}
                  className="px-8 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors text-lg font-semibold"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={addWish}
                  disabled={!newWish.trim() || !authorName.trim()}
                  className={`px-8 py-3 bg-gradient-to-r ${wishCategories[selectedCategory].gradient} text-white rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-3 text-lg font-semibold`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Send className="w-5 h-5" />
                  Send Your Wish
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence>
          {displayedWishes.map((wish, index) => {
            const category = wishCategories[wish.category];
            const Icon = category.icon;
            
            return (
              <motion.div
                key={wish.id}
                layout
                initial={{ opacity: 0, y: 60, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -60, scale: 0.85 }}
                transition={{ 
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 90,
                  damping: 12
                }}
                className={`group relative p-7 bg-black/20 backdrop-blur-xl rounded-3xl border-2 border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden`}
                whileHover={{ 
                  scale: 1.04,
                  y: -8,
                  transition: { duration: 0.25 }
                }}
              >
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-400">
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${category.gradient} rounded-full transform translate-x-12 -translate-y-12 blur-2xl`} />
                  <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr ${category.gradient} rounded-full transform -translate-x-8 translate-y-8 blur-2xl`} />
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <div className={`w-14 h-14 bg-gradient-to-br ${category.gradient} rounded-full flex items-center justify-center shadow-lg border-2 border-white/30`}>
                    <span className="text-2xl">{category.avatar}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white tracking-wide">{category.name}</h4>
                  </div>
                </div>

                <div className="relative z-10">
                  <blockquote className="text-white/90 leading-relaxed mb-5 text-lg">
                    "{wish.text}"
                  </blockquote>
                  <div className="flex items-center justify-between text-white/80">
                    <div className="flex items-center gap-2 font-semibold">
                      <Icon className={`w-5 h-5 ${category.color}`} />
                      <span>{wish.author}</span>
                    </div>
                    <span className="text-sm">{wish.timestamp.toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="absolute top-5 right-5 opacity-50 group-hover:opacity-80 transition-opacity">
                  <Sparkles className="w-6 h-6 text-yellow-200 animate-pulse-slow" />
                </div>
                
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {wishes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-24 text-white/70"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.08, 1],
                rotate: [0, 4, -4, 0]
              }}
              transition={{ 
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-24 h-24 mx-auto mb-8 text-pink-300/80" />
            </motion.div>
            <h3 className="text-3xl font-bold mb-3">No Wishes Yet!</h3>
            <p className="text-xl">Be the first to share a beautiful wish with Sakshi! 🎉</p>
          </motion.div>
        )}
      </div>

      {wishes.length > 7 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="px-10 py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl border-2 border-white/20 hover:bg-white/20 transition-all duration-300 font-semibold text-lg"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAll ? "Show Less" : `View All ${wishes.length} Wishes ✨`}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default WishCollection;
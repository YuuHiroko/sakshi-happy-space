import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Star } from 'lucide-react';

interface Wish {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
}

const WishCollection = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [newWish, setNewWish] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Load wishes from localStorage on component mount
  useEffect(() => {
    const savedWishes = localStorage.getItem('sakshi-birthday-wishes');
    if (savedWishes) {
      setWishes(JSON.parse(savedWishes));
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
        timestamp: new Date()
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

  return (
    <div className="relative">
      {/* Add Wish Button */}
      <motion.button
        onClick={() => setShowForm(!showForm)}
        className="mb-8 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Heart className="w-5 h-5" />
        Add Your Birthday Wish
        <Star className="w-5 h-5" />
      </motion.button>

      {/* Wish Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="mb-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl"
          >
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                onKeyPress={handleKeyPress}
              />
              <textarea
                placeholder="Write your birthday wish for Sakshi..."
                value={newWish}
                onChange={(e) => setNewWish(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent resize-none h-24"
                onKeyPress={handleKeyPress}
              />
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addWish}
                  disabled={!newWish.trim() || !authorName.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Wish
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wishes Display */}
      <div className="space-y-4">
        <AnimatePresence>
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-gradient-to-r from-pink-100/20 to-purple-100/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-lg leading-relaxed mb-3 text-white">
                    "{wish.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-pink-200 font-medium">
                      — {wish.author}
                    </p>
                    <p className="text-white/60 text-sm">
                      {wish.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-2 right-2 opacity-20">
                <Star className="w-6 h-6 text-yellow-300" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {wishes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-white/70"
          >
            <Heart className="w-16 h-16 mx-auto mb-4 text-pink-300" />
            <p className="text-xl">No wishes yet!</p>
            <p className="text-lg mt-2">Be the first to wish Sakshi a happy birthday! 🎉</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WishCollection;
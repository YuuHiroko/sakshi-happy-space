import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedLoaderProps {
  isLoading: boolean;
}

const EnhancedLoader = ({ isLoading }: EnhancedLoaderProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-sakshi-purple/95 via-sakshi-blue/95 to-indigo-900/95 dark:from-blue-900/98 dark:via-indigo-900/98 dark:to-purple-900/98 backdrop-blur-lg"
        >
          <motion.div 
            className="flex flex-col items-center max-w-md mx-auto text-center px-6"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            {/* Enhanced Spinner */}
            <div className="relative mb-8">
              {/* Outer rotating ring */}
              <motion.div 
                className="h-24 w-24 rounded-full border-4 border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <div className="h-full w-full rounded-full bg-gradient-to-br from-sakshi-purple/20 to-sakshi-blue/20 dark:from-blue-900/40 dark:to-indigo-900/40" />
              </motion.div>
              
              {/* Inner pulsing core */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 shadow-2xl" />
              </motion.div>

              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    x: [0, Math.cos(i * Math.PI / 4) * 60],
                    y: [0, Math.sin(i * Math.PI / 4) * 60],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>

            {/* Enhanced Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-4"
            >
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 dark:from-blue-200 dark:via-indigo-200 dark:to-purple-200"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Loading Sakshi's World...
              </motion.h2>
              
              <motion.div className="flex items-center justify-center gap-2">
                {['🎂', '🎉', '✨', '🎈', '💫'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-2"
              >
                <p className="text-white/90 dark:text-blue-100/90 text-lg font-medium">
                  Preparing something amazing for you
                </p>
                
                {/* Loading progress bar */}
                <div className="w-64 h-2 bg-white/20 dark:bg-blue-900/40 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />
                </div>
                
                <motion.p
                  className="text-white/70 dark:text-blue-200/70 text-sm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Crafting magical birthday experiences ✨
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnhancedLoader;

import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  isLoading: boolean;
}

const Loader = ({ isLoading }: LoaderProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-sakshi-purple/90 to-sakshi-blue/90 dark:from-blue-900/95 dark:to-indigo-900/95 backdrop-blur-sm"
        >
          <motion.div 
            className="flex flex-col items-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="relative">
              <div className="h-20 w-20 rounded-full border-4 border-t-sakshi-purple border-r-sakshi-blue border-b-sakshi-purple border-l-sakshi-blue dark:border-t-blue-400 dark:border-r-indigo-500 dark:border-b-blue-400 dark:border-l-indigo-500 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="h-10 w-10 rounded-full bg-white dark:bg-blue-200"
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                ></motion.div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <motion.p 
                className="text-white text-xl font-dancing drop-shadow-lg dark:text-blue-100 dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              >
                Loading Sakshi's World...
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-white/80 dark:text-blue-200/90 text-sm mt-2"
              >
                Preparing something amazing for you
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;

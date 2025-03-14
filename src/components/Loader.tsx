
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  isLoading: boolean;
}

const Loader = ({ isLoading }: LoaderProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-sakshi-purple/90 to-sakshi-blue/90 backdrop-blur-sm"
        >
          <motion.div 
            className="flex flex-col items-center"
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-t-sakshi-purple border-r-sakshi-blue border-b-sakshi-purple border-l-sakshi-blue animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="h-8 w-8 rounded-full bg-white"
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                ></motion.div>
              </div>
            </div>
            <motion.p 
              className="mt-4 text-white text-xl font-dancing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Loading Sakshi's World...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;

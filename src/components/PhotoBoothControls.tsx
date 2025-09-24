import React from 'react';
import { motion } from 'framer-motion';
import { Grid, Globe, Wind, Eye, EyeOff } from 'lucide-react';

interface PhotoBoothControlsProps {
  displayMode: 'grid' | 'sphere' | 'helix';
  setDisplayMode: (mode: 'grid' | 'sphere' | 'helix') => void;
  showCaptions: boolean;
  setShowCaptions: (show: boolean) => void;
}

const PhotoBoothControls: React.FC<PhotoBoothControlsProps> = ({ displayMode, setDisplayMode, showCaptions, setShowCaptions }) => {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-4 bg-black/50 backdrop-blur-sm p-2 rounded-full">
      <motion.button
        onClick={() => setDisplayMode('grid')}
        className={`p-2 rounded-full ${displayMode === 'grid' ? 'bg-pink-500' : 'bg-gray-700'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Grid size={20} />
      </motion.button>
      <motion.button
        onClick={() => setDisplayMode('sphere')}
        className={`p-2 rounded-full ${displayMode === 'sphere' ? 'bg-pink-500' : 'bg-gray-700'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Globe size={20} />
      </motion.button>
      <motion.button
        onClick={() => setDisplayMode('helix')}
        className={`p-2 rounded-full ${displayMode === 'helix' ? 'bg-pink-500' : 'bg-gray-700'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Wind size={20} />
      </motion.button>
      <div className="w-px bg-gray-600"></div>
      <motion.button
        onClick={() => setShowCaptions(!showCaptions)}
        className="p-2 rounded-full bg-gray-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {showCaptions ? <Eye size={20} /> : <EyeOff size={20} />}
      </motion.button>
    </div>
  );
};

export default PhotoBoothControls;

import React from 'react';
import { motion } from 'framer-motion';

interface PlaylistEmbedProps {
  embedUrl?: string; // Spotify embed URL
  fallbackImageUrl?: string;
  fallbackLinkUrl?: string;
  title: string;
  description?: string;
}

const PlaylistEmbed: React.FC<PlaylistEmbedProps> = ({
  embedUrl,
  fallbackImageUrl,
  fallbackLinkUrl,
  title,
  description,
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <motion.div
      className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 rounded-xl shadow-xl max-w-4xl mx-auto my-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 
                     bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          {description}
        </p>
      )}

      {embedUrl ? (
        <div className="relative overflow-hidden w-full aspect-video rounded-xl shadow-2xl">
          <iframe
            src={embedUrl}
            width="100%"
            height="380"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={title}
            className="border-0"
          ></iframe>
        </div>
      ) : (fallbackImageUrl && fallbackLinkUrl) ? (
        <motion.a
          href={fallbackLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative w-full aspect-video rounded-xl shadow-2xl overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label={`Listen to ${title} on Spotify`}
        >
          <img
            src={fallbackImageUrl}
            alt={`Fallback for ${title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/30 transition-colors">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p className="absolute bottom-4 left-4 text-white text-lg font-semibold bg-black/60 px-3 py-1 rounded-md">
            Listen on Spotify
          </p>
        </motion.a>
      ) : (
        <div className="p-6 text-center text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <p>No playlist available right now, but here's some good vibes!</p>
        </div>
      )}
    </motion.div>
  );
};

export default PlaylistEmbed;

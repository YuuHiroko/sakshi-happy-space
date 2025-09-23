import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Photo {
  src: string;
  alt: string;
  title?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

const PhotoCard: React.FC<{ photo: Photo; onClick: (photo: Photo) => void; isMobile: boolean; }> = React.memo(({ photo, onClick, isMobile }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className="photo-card aspect-square cursor-pointer group relative overflow-hidden rounded-xl shadow-lg"
      whileHover={!isMobile ? { y: -5, scale: 1.02 } : {}}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(photo)}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {photo.title && (
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-semibold text-sm">{photo.title}</h3>
        </div>
      )}
    </motion.div>
  );
});

const PhotoModal: React.FC<{ photo: Photo; onClose: () => void; }> = ({ photo, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
      >
        <X size={24} />
      </button>
      <img
        src={photo.src}
        alt={photo.alt}
        className="w-full h-full object-contain"
      />
      {photo.title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <h3 className="text-white text-xl font-semibold">{photo.title}</h3>
        </div>
      )}
    </motion.div>
  </motion.div>
);

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        controls.start('visible');
      }
    }, { threshold: 0.1 });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const handlePhotoClick = useCallback((photo: Photo) => setSelectedPhoto(photo), []);
  const closeModal = useCallback(() => setSelectedPhoto(null), []);

  return (
    <>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8"
      >
        {photos.map((photo, index) => (
          <PhotoCard key={index} photo={photo} onClick={handlePhotoClick} isMobile={isMobile} />
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedPhoto && <PhotoModal photo={selectedPhoto} onClose={closeModal} />}
      </AnimatePresence>
    </>
  );
};

export default PhotoGallery;

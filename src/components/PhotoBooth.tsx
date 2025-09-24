import { useState, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import PhotoCard from './PhotoCard';
import PhotoBoothControls from './PhotoBoothControls';
import { photos as carouselPhotos } from '@/data/photos';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import usePhotoPositions from '@/hooks/usePhotoPositions';

const PhotoBooth = () => {
  const [isGalleryActive, setIsGalleryActive] = useState(false);
  const [displayMode, setDisplayMode] = useState<'grid' | 'sphere' | 'helix'>('grid');
  const [showCaptions, setShowCaptions] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const photoPositions = usePhotoPositions(carouselPhotos, displayMode);

  const handleStartGallery = () => {
    setIsGalleryActive(true);
  };

  const photoBoothComponent = useMemo(() => {
    if (isMobile) {
        return (
          <div className="grid grid-cols-2 gap-4 p-4">
            {carouselPhotos.map((photo, index) => (
                <motion.div 
                    key={index} 
                    className="w-full h-auto rounded-lg overflow-hidden shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                </motion.div>
            ))}
          </div>
        );
    }
    
    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }} style={{ height: '100%', width: '100%' }}>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
                {photoPositions.map((pos, i) => (
                  <PhotoCard
                    key={i}
                    imageUrl={carouselPhotos[i].src}
                    caption={carouselPhotos[i].alt}
                    position={[pos[0], pos[1], pos[2]]}
                    rotation={[0, 0, 0]} // Initial rotation, can be adjusted
                    showCaption={showCaptions}
                  />
                ))}
            </Suspense>
            <OrbitControls 
                enableZoom={!isMobile} 
                enablePan={!isMobile} 
                minDistance={3} 
                maxDistance={20} 
            />
        </Canvas>
    )
  }, [isMobile, displayMode, showCaptions, photoPositions]);

  return (
    <div className="relative w-full h-[600px] bg-black rounded-2xl overflow-hidden border-4 border-purple-500/50 shadow-2xl">
        {!isGalleryActive && (
            <motion.div 
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md"
                initial={{ opacity: 0 }}   
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <h3 className="text-3xl font-bold text-white mb-4">3D Photo Booth</h3>
                <p className="text-lg text-white/80 mb-8 max-w-md text-center">
                    Take a spin through some of our favorite memories in 3D.
                </p>
                <motion.button
                    onClick={handleStartGallery}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold shadow-lg"
                    whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(236, 72, 153, 0.7)'}}
                    whileTap={{ scale: 0.9 }}
                >
                    Enter the Gallery
                </motion.button>
            </motion.div>
        )}

        {isGalleryActive && photoBoothComponent}

        {isGalleryActive && !isMobile && (
          <PhotoBoothControls
            displayMode={displayMode}
            setDisplayMode={setDisplayMode}
            showCaptions={showCaptions}
            setShowCaptions={setShowCaptions}
          />
        )}
    </div>
  );
};

export default PhotoBooth;

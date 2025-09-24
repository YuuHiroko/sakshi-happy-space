import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader, Mesh, BoxGeometry, MeshBasicMaterial, Group } from 'three';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';

interface PhotoCarousel3DProps {
  photos: Array<{ src: string; alt: string; title?: string }>;
  position: [number, number, number];
  radius: number;
  scale: number;
  isMobile: boolean;
  onPhotosViewed: () => void;
  isActive: boolean;
}

const PhotoCarousel3D = ({ photos, position, radius, scale, isMobile, onPhotosViewed, isActive }: PhotoCarousel3DProps) => {
  const textures = useLoader(TextureLoader, photos.map(p => p.src));
  const carouselRef = useRef<Group>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [allPhotosViewed, setAllPhotosViewed] = useState(false);

  useFrame(() => {
    if (carouselRef.current && isActive && !allPhotosViewed) {
      carouselRef.current.rotation.y += 0.005; // Auto-rotate slowly when active
    }
  });

  const handlePhotoClick = useCallback(() => {
    if (!isActive) return;
    const nextIndex = (currentPhotoIndex + 1) % photos.length;
    setCurrentPhotoIndex(nextIndex);
    if (nextIndex === 0 && !allPhotosViewed) {
      // User has cycled through all photos at least once
      setAllPhotosViewed(true);
      onPhotosViewed();
    }
  }, [currentPhotoIndex, photos.length, onPhotosViewed, isActive, allPhotosViewed]);

  const photoCubes = useMemo(() => {
    const angleStep = (2 * Math.PI) / textures.length;
    return textures.map((texture, index) => {
      const angle = angleStep * index;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      const y = position[1];

      const geometry = new BoxGeometry(2, 2, 0.1);
      const material = new MeshBasicMaterial({ map: texture });
      const cube = new Mesh(geometry, material);

      cube.position.set(x, y, z);
      cube.lookAt(0, y, 0);

      return cube;
    });
  }, [textures, radius, position]);

  useEffect(() => {
    if (!isActive) {
      setCurrentPhotoIndex(0);
      setAllPhotosViewed(false);
    }
  }, [isActive]);

  return (
    <group position={position} scale={[scale, scale, scale]} ref={carouselRef}>
      {photoCubes.map((cube, index) => (
        <primitive 
          key={index} 
          object={cube} 
          onClick={handlePhotoClick}
          onPointerOver={(e) => { if(isActive) e.stopPropagation(); document.body.style.cursor = isActive ? 'pointer' : 'auto'; } }
          onPointerOut={() => { document.body.style.cursor = 'auto'; } }
          scale={currentPhotoIndex === index && isActive ? 1.1 : 1}
        />
      ))}
      {isActive && (
        <Html position={[0, isMobile ? 3.5 : 4, 0]}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-white text-center p-3 rounded-lg bg-black/50 backdrop-blur-sm max-w-[200px]"
          >
            <p className="font-bold text-lg mb-1">{photos[currentPhotoIndex]?.title}</p>
            <p className="text-sm">Click photos to view next!</p>
          </motion.div>
        </Html>
      )}
    </group>
  );
};

export default PhotoCarousel3D;
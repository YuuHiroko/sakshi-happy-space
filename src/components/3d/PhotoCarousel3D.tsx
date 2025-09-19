import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text, Image } from '@react-three/drei';
import { Group } from 'three';

interface Photo {
  src: string;
  alt: string;
  title?: string;
}

interface PhotoCarousel3DProps {
  photos: Photo[];
  position?: [number, number, number];
  radius?: number;
}

const PhotoCarousel3D = ({ photos, position = [0, 0, 0], radius = 4 }: PhotoCarousel3DProps) => {
  const carouselRef = useRef<Group>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  useFrame((state, delta) => {
    if (carouselRef.current && isAutoRotating) {
      carouselRef.current.rotation.y += delta * 0.2;
    }
  });

  const handlePhotoClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoRotating(false);
    
    // Resume auto rotation after 3 seconds
    setTimeout(() => {
      setIsAutoRotating(true);
    }, 3000);
  };

  return (
    <group position={position}>
      <group ref={carouselRef}>
        {photos.map((photo, index) => {
          const angle = (index / photos.length) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const isActive = index === currentIndex;
          
          return (
            <group 
              key={index} 
              position={[x, 0, z]}
              rotation={[0, -angle + Math.PI, 0]}
            >
              {/* Photo frame */}
              <Box 
                args={[2.2, 2.8, 0.1]} 
                position={[0, 0, -0.05]}
                onClick={() => handlePhotoClick(index)}
              >
                <meshStandardMaterial 
                  color={isActive ? "#ffd700" : "#8B4513"} 
                  metalness={0.3}
                  roughness={0.4}
                />
              </Box>
              
              {/* Photo */}
              <Box 
                args={[2, 2.5, 0.02]} 
                position={[0, 0.1, 0]}
                onClick={() => handlePhotoClick(index)}
              >
                <meshStandardMaterial>
                  <Image 
                    url={photo.src} 
                    transparent
                    opacity={1}
                  />
                </meshStandardMaterial>
              </Box>
              
              {/* Photo title */}
              {photo.title && (
                <Text
                  position={[0, -1.6, 0.1]}
                  fontSize={0.2}
                  color={isActive ? "#ff1493" : "#333"}
                  anchorX="center"
                  anchorY="middle"
                  maxWidth={2}
                >
                  {photo.title}
                </Text>
              )}
              
              {/* Glow effect for active photo */}
              {isActive && (
                <Box args={[2.4, 3, 0.05]} position={[0, 0, -0.1]}>
                  <meshStandardMaterial 
                    color="#ffffff" 
                    emissive="#ffd700"
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.3}
                  />
                </Box>
              )}
            </group>
          );
        })}
      </group>
      
      {/* Carousel base */}
      <Box args={[radius * 2.5, 0.2, radius * 2.5]} position={[0, -2, 0]}>
        <meshStandardMaterial 
          color="#dda0dd" 
          metalness={0.1}
          roughness={0.8}
          transparent
          opacity={0.3}
        />
      </Box>
      
      {/* Center pillar */}
      <Box args={[0.3, 4, 0.3]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#8B4513" 
          metalness={0.2}
          roughness={0.6}
        />
      </Box>
      
      {/* Navigation instructions */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.3}
        color="#ff69b4"
        anchorX="center"
        anchorY="middle"
      >
        Click photos to focus
      </Text>
    </group>
  );
};

export default PhotoCarousel3D;
import { useRef, useState, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text, Image, Sparkles } from '@react-three/drei';
import { Group, Mesh } from 'three';
import { useSpring as useSpringAnimation, animated } from '@react-spring/three';

interface Photo {
  src: string;
  alt: string;
  title?: string;
}

interface PhotoItemProps {
  photo: Photo;
  position: [number, number, number];
  rotationY: number;
  isActive: boolean;
  onClick: () => void;
}

const PhotoItem = memo(({ photo, position, rotationY, isActive, onClick }: PhotoItemProps) => {
  const itemRef = useRef<Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scale, frameColor, emissiveIntensity } = useSpringAnimation({
    scale: isActive ? 1.2 : isHovered ? 1.1 : 1,
    frameColor: isActive ? "#ffd700" : isHovered ? "#ffffff" : "#a9a9a9",
    emissiveIntensity: isActive ? 0.6 : isHovered ? 0.3 : 0,
    config: { tension: 200, friction: 20 }
  });

  return (
    <animated.group
      ref={itemRef}
      position={position}
      rotation-y={rotationY}
      scale={scale}
      onClick={onClick}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <Box args={[2.2, 2.8, 0.1]} position={[0, 0, -0.05]}>
        <animated.meshStandardMaterial
          color={frameColor}
          metalness={0.5}
          roughness={0.3}
          emissive={frameColor}
          emissiveIntensity={emissiveIntensity}
          toneMapped={false}
        />
      </Box>

      <Image url={photo.src} scale={[2, 2.5, 1]} position={[0, 0.1, 0.01]} />
      
      {photo.title && (
        <Text
          position={[0, -1.6, 0.1]}
          fontSize={0.18}
          color={isActive ? "#ffffff" : "#eeeeee"}
          anchorX="center"
          maxWidth={2}
          outlineColor="#000000"
          outlineWidth={0.02}
        >
          {photo.title}
        </Text>
      )}

      {isActive && (
        <Sparkles 
          count={40}
          scale={3.5}
          size={8}
          speed={0.4}
          color="#ffd700"
        />
      )}
    </animated.group>
  );
});

interface PhotoCarousel3DProps {
  photos: Photo[];
  position?: [number, number, number];
  radius?: number;
  scale?: number;
  isMobile?: boolean;
}

const PhotoCarousel3D = ({ photos, position = [0, 0, 0], radius = 4, scale = 1, isMobile = false }: PhotoCarousel3DProps) => {
  const carouselRef = useRef<Group>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const targetRotation = useMemo(() => -currentIndex * (Math.PI * 2 / photos.length), [currentIndex, photos.length]);

  const { rotationY } = useSpringAnimation({
    rotationY: targetRotation,
    config: { tension: 120, friction: 30 },
  });

  const handlePhotoClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <group position={position} scale={scale}>
      <animated.group ref={carouselRef} rotation-y={rotationY}>
        {photos.map((photo, index) => {
          const angle = (index / photos.length) * Math.PI * 2;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          
          return (
            <PhotoItem
              key={index}
              photo={photo}
              position={[x, 0, z]}
              rotationY={-angle}
              isActive={index === currentIndex}
              onClick={() => handlePhotoClick(index)}
            />
          );
        })}
      </animated.group>
      
      <Box args={[radius * 2.5, 0.2, radius * 2.5]} position={[0, -2.2, 0]}>
        <meshStandardMaterial 
          color="#4a0b4a" 
          metalness={0.2}
          roughness={0.8}
          transparent
          opacity={0.5}
        />
      </Box>
      
      <Cylinder args={[0.2, 0.2, 4.5, 16]} position={[0, -0.05, 0]}>
        <meshStandardMaterial 
          color="#6a1b6a"
          metalness={0.4}
          roughness={0.5}
        />
      </Cylinder>
      
      <Text
        position={[0, 3, 0]}
        fontSize={isMobile ? 0.25 : 0.3}
        color="#ff99ff"
        anchorX="center"
        anchorY="middle"
        outlineColor="#000"
        outlineWidth={0.01}
      >
        Explore the Memories
      </Text>

      <Text
        position={[0, 2.6, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Click a photo to get a closer look
      </Text>
    </group>
  );
};

export default PhotoCarousel3D;
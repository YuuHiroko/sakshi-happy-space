import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Text } from '@react-three/drei';
import * as THREE from 'three';

interface PhotoCardProps {
  imageUrl: string;
  caption: string;
  position: [number, number, number];
  rotation: [number, number, number];
  showCaption: boolean;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ imageUrl, caption, position, rotation, showCaption }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (cardRef.current) {
      const scale = isHovered ? 1.2 : 1;
      cardRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <group
      ref={cardRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <Image url={imageUrl} scale={[2, 2]} />
      {showCaption && (
        <Text
          position={[0, -1.2, 0.1]}
          fontSize={0.2}
          color="#fff"
          anchorX="center"
          anchorY="top"
          maxWidth={1.8}
          textAlign="center"
        >
          {caption}
        </Text>
      )}
    </group>
  );
};

export default PhotoCard;

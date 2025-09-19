import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';
import { Group } from 'three';
import { useSpring as useSpringAnimation, animated } from '@react-spring/three';

interface GiftBoxProps {
  position?: [number, number, number];
  onOpen?: () => void;
  isOpen?: boolean;
}

const GiftBox = ({ position = [0, 0, 0], onOpen, isOpen = false }: GiftBoxProps) => {
  const boxRef = useRef<Group>(null);
  const lidRef = useRef<Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  // Animation for lid opening
  const { lidY, lidRotation } = useSpringAnimation({
    lidY: isOpen ? 2 : 0,
    lidRotation: isOpen ? Math.PI * 0.3 : 0,
    config: { tension: 120, friction: 14 }
  });

  // Hover animation
  const { scale } = useSpringAnimation({
    scale: isHovered ? 1.1 : 1,
    config: { tension: 300, friction: 10 }
  });

  useFrame((state) => {
    if (boxRef.current) {
      boxRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      if (!isOpen) {
        boxRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      }
    }
  });

  const handleClick = () => {
    if (!hasOpened && onOpen) {
      setHasOpened(true);
      onOpen();
    }
  };

  return (
    <animated.group 
      ref={boxRef} 
      position={position}
      scale={scale}
      onClick={handleClick}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {/* Gift box base */}
      <Box args={[2, 1.5, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#ff69b4" 
          metalness={0.1}
          roughness={0.3}
        />
      </Box>
      
      {/* Gift box lid */}
      <animated.group 
        ref={lidRef}
        position-y={lidY}
        rotation-x={lidRotation}
      >
        <Box args={[2.1, 0.3, 2.1]} position={[0, 0.9, 0]}>
          <meshStandardMaterial 
            color="#ff1493" 
            metalness={0.1}
            roughness={0.3}
          />
        </Box>
        
        {/* Ribbon horizontal */}
        <Box args={[2.2, 0.35, 0.3]} position={[0, 0.9, 0]}>
          <meshStandardMaterial 
            color="#ffd700" 
            metalness={0.3}
            roughness={0.2}
          />
        </Box>
        
        {/* Ribbon vertical */}
        <Box args={[0.3, 0.35, 2.2]} position={[0, 0.9, 0]}>
          <meshStandardMaterial 
            color="#ffd700" 
            metalness={0.3}
            roughness={0.2}
          />
        </Box>
        
        {/* Bow */}
        <group position={[0, 1.2, 0]}>
          {/* Bow left */}
          <Box args={[0.6, 0.3, 0.4]} position={[-0.3, 0, 0]} rotation={[0, 0, 0.3]}>
            <meshStandardMaterial 
              color="#ffd700" 
              metalness={0.3}
              roughness={0.2}
            />
          </Box>
          
          {/* Bow right */}
          <Box args={[0.6, 0.3, 0.4]} position={[0.3, 0, 0]} rotation={[0, 0, -0.3]}>
            <meshStandardMaterial 
              color="#ffd700" 
              metalness={0.3}
              roughness={0.2}
            />
          </Box>
          
          {/* Bow center */}
          <Cylinder args={[0.15, 0.15, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial 
              color="#ffb347" 
              metalness={0.3}
              roughness={0.2}
            />
          </Cylinder>
        </group>
      </animated.group>
      
      {/* Sparkles around the gift */}
      {!isOpen && (
        <group>
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 2;
            return (
              <Box 
                key={i}
                args={[0.1, 0.1, 0.1]} 
                position={[
                  Math.cos(angle) * radius,
                  Math.sin(angle * 2) * 0.5 + 1,
                  Math.sin(angle) * radius
                ]}
                rotation={[angle, angle, angle]}
              >
                <meshStandardMaterial 
                  color="#ffffff" 
                  emissive="#ffffff"
                  emissiveIntensity={0.5}
                />
              </Box>
            );
          })}
        </group>
      )}
    </animated.group>
  );
};

export default GiftBox;
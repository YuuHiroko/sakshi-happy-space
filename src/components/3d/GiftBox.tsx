import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sparkles } from '@react-three/drei';
import { Group } from 'three';
import { useSpring as useSpringAnimation, animated } from '@react-spring/three';

interface GiftBoxProps {
  position?: [number, number, number];
  onOpen?: () => void;
  isOpen?: boolean;
  scale?: number;
  isMobile?: boolean;
  isVisible: boolean;
}

const GiftBox = ({ position = [0, 0, 0], onOpen, isOpen = false, scale = 1, isMobile = false, isVisible }: GiftBoxProps) => {
  const boxRef = useRef<Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const { lidY, lidRotation } = useSpringAnimation({
    lidY: isOpen ? 2.5 : 0,
    lidRotation: isOpen ? Math.PI * 0.35 : 0,
    config: { tension: 150, friction: 20 }
  });

  useEffect(() => {
    if (isOpen) {
      setHasOpened(true);
    } else {
        setHasOpened(false); // Reset when closed
    }
  }, [isOpen]);

  useFrame((state) => {
    const { clock } = state;
    if (boxRef.current && !isOpen) {
      const pulse = Math.sin(clock.elapsedTime * 2.5) * 0.08 + 0.92;
      const hoverPulse = isHovered ? 1.15 : 1;
      boxRef.current.scale.set(scale * pulse * hoverPulse, scale * pulse * hoverPulse, scale * pulse * hoverPulse);
      boxRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 1.5) * 0.1;
    }
  });

  const handleClick = () => {
    if (!hasOpened && onOpen) {
      onOpen();
    }
  };

  if (!isVisible) return null;

  return (
    <group 
      ref={boxRef} 
      position={position}
      onClick={handleClick}
      onPointerOver={() => !isOpen && setIsHovered(true)}
      onPointerOut={() => !isOpen && setIsHovered(false)}
      scale={scale}
    >
      <Box args={[2.2, 1.6, 2.2]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#ff69b4" 
          metalness={0.2}
          roughness={0.4}
          emissive="#ff1493"
          emissiveIntensity={isHovered ? 0.3 : 0}
        />
      </Box>
      
      <animated.group 
        position-y={lidY}
        rotation-x={lidRotation}
      >
        <Box args={[2.3, 0.4, 2.3]} position={[0, 0.95, 0]}>
          <meshStandardMaterial color="#ff1493" metalness={0.2} roughness={0.4} />
        </Box>
        
        <Box args={[2.4, 0.45, 0.4]} position={[0, 0.95, 0]}>
          <meshStandardMaterial color="#ffd700" metalness={0.4} roughness={0.3} />
        </Box>
        
        <Box args={[0.4, 0.45, 2.4]} position={[0, 0.95, 0]}>
          <meshStandardMaterial color="#ffd700" metalness={0.4} roughness={0.3} />
        </Box>
        
        <group position={[0, 1.3, 0]}>
          <Box args={[0.7, 0.4, 0.5]} position={[-0.35, 0, 0]} rotation={[0, 0, 0.4]}>
            <meshStandardMaterial color="#ffd700" metalness={0.4} roughness={0.3} />
          </Box>
          
          <Box args={[0.7, 0.4, 0.5]} position={[0.35, 0, 0]} rotation={[0, 0, -0.4]}>
            <meshStandardMaterial color="#ffd700" metalness={0.4} roughness={0.3} />
          </Box>
          
          <Cylinder args={[0.18, 0.18, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#ffb347" metalness={0.4} roughness={0.3} />
          </Cylinder>
        </group>
      </animated.group>
      
      {!isOpen && (
        <Sparkles 
          count={isMobile ? 30 : 50}
          scale={isMobile ? 3 : 4}
          position={[0, 1, 0]}
          size={isMobile ? 5 : 7}
          speed={0.6}
          opacity={isHovered ? 1 : 0.7}
          color="#ffffff"
        />
      )}
    </group>
  );
};

export default GiftBox;
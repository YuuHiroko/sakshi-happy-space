import { useRef, useState, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Cylinder, Sphere, Sparkles } from '@react-three/drei';
import { Mesh, Group } from 'three';

interface CandleProps {
  position: [number, number, number];
  isLit: boolean;
  onBlow: () => void;
  isMobile?: boolean;
}

const Candle = ({ position, isLit, onBlow, isMobile = false }: CandleProps) => {
  const flameRef = useRef<Mesh>(null);
  const candleRef = useRef<Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    const { clock } = state;
    if (flameRef.current && isLit) {
      flameRef.current.scale.y = 1 + Math.sin(clock.elapsedTime * 8) * 0.15;
      flameRef.current.scale.x = 1 + Math.cos(clock.elapsedTime * 6) * 0.1;
    }
    if (candleRef.current && isLit) {
      const pulse = Math.sin(clock.elapsedTime * 2) * 0.05 + 0.95;
      if(isHovered) {
        candleRef.current.scale.set(pulse * 1.2, pulse * 1.2, pulse * 1.2);
      } else {
        candleRef.current.scale.set(pulse, pulse, pulse);
      }
    }
  });

  return (
    <group 
      ref={candleRef}
      position={position} 
      onClick={onBlow} 
      onPointerOver={() => isLit && setIsHovered(true)} 
      onPointerOut={() => setIsHovered(false)}
    >
      <Cylinder args={[0.06, 0.06, 0.9]} position={[0, 0.45, 0]}>
        <meshStandardMaterial color="#f4e4bc" emissive="#f4e4bc" emissiveIntensity={isHovered ? 0.2 : 0} />
      </Cylinder>
      
      <Cylinder args={[0.015, 0.015, 0.12]} position={[0, 0.96, 0]}>
        <meshStandardMaterial color="#4a2c1a" />
      </Cylinder>
      
      {isLit && (
        <group>
          <Sphere 
            ref={flameRef}
            args={[0.1, 8, 6]} 
            position={[0, 1.1, 0]}
          >
            <meshStandardMaterial 
              color="#ff6b35" 
              emissive="#ff4500" 
              emissiveIntensity={1.5}
              toneMapped={false}
            />
          </Sphere>
          <Sparkles 
            count={isMobile ? 10 : 20}
            scale={ isMobile ? 0.8 : 1}
            position={[0, 1.2, 0]}
            size={isMobile ? 4 : 6}
            speed={0.5}
            opacity={0.8}
            color="#ff6b35"
          />
        </group>
      )}
    </group>
  );
};

interface BirthdayCakeProps {
  position?: [number, number, number];
  onAllCandlesBlown?: () => void;
  scale?: number;
  isMobile?: boolean;
}

const BirthdayCake = ({ 
  position = [0, 0, 0], 
  onAllCandlesBlown, 
  scale = 1, 
  isMobile = false 
}: BirthdayCakeProps) => {
  const cakeRef = useRef<Group>(null);
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  const [allBlown, setAllBlown] = useState(false);
  
  useFrame((state) => {
    if (cakeRef.current) {
      cakeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  const blowCandle = useCallback((index: number) => {
    if(allBlown) return;
    setCandlesLit(prev => {
      const newCandlesLit = [...prev];
      newCandlesLit[index] = false;
      
      if (newCandlesLit.every(lit => !lit)) {
        setAllBlown(true);
        if(onAllCandlesBlown) {
          setTimeout(onAllCandlesBlown, 500);
        }
      }
      
      return newCandlesLit;
    });
  }, [onAllCandlesBlown, allBlown]);

  const candlePositions = useMemo(() => {
    const basePositions: [number, number, number][] = [
      [0, 0.4, 0],
      [-0.5, 0.4, 0.2],
      [0.5, 0.4, 0.2],
      [-0.3, 0.4, -0.4],
      [0.3, 0.4, -0.4],
    ];
    
    return isMobile ? basePositions.slice(0, 3) : basePositions;
  }, [isMobile]);

  return (
    <group ref={cakeRef} position={position} scale={scale}>
      <Cylinder args={[1.3, 1.3, 0.7]} position={[0, -0.35, 0]}>
        <meshStandardMaterial color="#a0522d" roughness={0.7} metalness={0.15} />
      </Cylinder>
      
      <Cylinder args={[1.1, 1.1, 0.5]} position={[0, 0.25, 0]}>
        <meshStandardMaterial color="#ffc0cb" roughness={0.6} metalness={0.1} />
      </Cylinder>
      
      <Cylinder args={[1.15, 1.15, 0.15]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </Cylinder>
      
      {candlePositions.map((pos, index) => (
        <Candle
          key={index}
          position={pos}
          isLit={candlesLit[index]}
          onBlow={() => blowCandle(index)}
          isMobile={isMobile}
        />
      ))}
      
      <Text
        position={[0, 1.8, 0]}
        fontSize={isMobile ? 0.3 : 0.35}
        color="#ff1493"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
        outlineWidth={0.02}
        outlineColor="#ffffff"
        rotation={[0, Math.PI, 0]} // Flipping text to be visible from front
      >
        Happy Birthday Sakshi!
      </Text>
    </group>
  );
};

export default BirthdayCake;
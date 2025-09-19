import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Cylinder, Sphere } from '@react-three/drei';
import { Mesh, Group } from 'three';

interface CandleProps {
  position: [number, number, number];
  isLit: boolean;
  onBlow: () => void;
}

const Candle = ({ position, isLit, onBlow }: CandleProps) => {
  const flameRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (flameRef.current && isLit) {
      flameRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.1;
      flameRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 6) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* Candle body */}
      <Cylinder args={[0.05, 0.05, 0.8]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color="#f4e4bc" />
      </Cylinder>
      
      {/* Wick */}
      <Cylinder args={[0.01, 0.01, 0.1]} position={[0, 0.85, 0]}>
        <meshStandardMaterial color="#2c1810" />
      </Cylinder>
      
      {/* Flame */}
      {isLit && (
        <Sphere 
          ref={flameRef}
          args={[0.08, 8, 6]} 
          position={[0, 0.95, 0]}
          onClick={onBlow}
        >
          <meshStandardMaterial 
            color="#ff6b35" 
            emissive="#ff4500" 
            emissiveIntensity={0.5}
          />
        </Sphere>
      )}
    </group>
  );
};

interface BirthdayCakeProps {
  position?: [number, number, number];
  onAllCandlesBlown?: () => void;
}

const BirthdayCake = ({ position = [0, 0, 0], onAllCandlesBlown }: BirthdayCakeProps) => {
  const cakeRef = useRef<Group>(null);
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  
  useFrame((state) => {
    if (cakeRef.current) {
      cakeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const blowCandle = (index: number) => {
    const newCandlesLit = [...candlesLit];
    newCandlesLit[index] = false;
    setCandlesLit(newCandlesLit);
    
    if (newCandlesLit.every(lit => !lit) && onAllCandlesBlown) {
      setTimeout(onAllCandlesBlown, 500);
    }
  };

  const candlePositions: [number, number, number][] = [
    [0, 0, 0],
    [-0.6, 0, 0.3],
    [0.6, 0, 0.3],
    [-0.3, 0, -0.5],
    [0.3, 0, -0.5],
  ];

  return (
    <group ref={cakeRef} position={position}>
      {/* Cake base */}
      <Cylinder args={[1.2, 1.2, 0.6]} position={[0, -0.3, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Cylinder>
      
      {/* Cake top layer */}
      <Cylinder args={[1, 1, 0.4]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#FFB6C1" />
      </Cylinder>
      
      {/* Frosting */}
      <Cylinder args={[1.05, 1.05, 0.1]} position={[0, 0.35, 0]}>
        <meshStandardMaterial color="#FFFFFF" />
      </Cylinder>
      
      {/* Candles */}
      {candlePositions.map((pos, index) => (
        <Candle
          key={index}
          position={pos}
          isLit={candlesLit[index]}
          onBlow={() => blowCandle(index)}
        />
      ))}
      
      {/* Happy Birthday text */}
      <Text
        position={[0, 1.8, 0]}
        fontSize={0.3}
        color="#ff1493"
        anchorX="center"
        anchorY="middle"
      >
        Happy Birthday Sakshi!
      </Text>
    </group>
  );
};

export default BirthdayCake;
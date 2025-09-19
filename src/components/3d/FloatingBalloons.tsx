import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import { Group, Vector3 } from 'three';

interface BalloonProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  floatSpeed?: number;
  floatRange?: number;
}

const Balloon = ({ position, color, scale = 1, floatSpeed = 1, floatRange = 0.5 }: BalloonProps) => {
  const balloonRef = useRef<Group>(null);
  const initialY = position[1];
  
  useFrame((state) => {
    if (balloonRef.current) {
      const time = state.clock.elapsedTime * floatSpeed;
      balloonRef.current.position.y = initialY + Math.sin(time) * floatRange;
      balloonRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group ref={balloonRef} position={position} scale={scale}>
      {/* Balloon */}
      <Sphere args={[0.8, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color={color} 
          metalness={0.1}
          roughness={0.2}
        />
      </Sphere>
      
      {/* Balloon highlight */}
      <Sphere args={[0.2, 8, 8]} position={[-0.3, 0.3, 0.3]}>
        <meshStandardMaterial 
          color="white" 
          transparent
          opacity={0.6}
        />
      </Sphere>
      
      {/* String */}
      <Cylinder args={[0.01, 0.01, 3]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#654321" />
      </Cylinder>
    </group>
  );
};

const FloatingBalloons = () => {
  const balloons = [
    { position: [-4, 3, -2] as [number, number, number], color: "#ff69b4", scale: 1.2, floatSpeed: 0.8 },
    { position: [4, 4, -1] as [number, number, number], color: "#87ceeb", scale: 1, floatSpeed: 1.2 },
    { position: [-6, 5, 1] as [number, number, number], color: "#98fb98", scale: 0.9, floatSpeed: 1.5 },
    { position: [6, 3.5, 2] as [number, number, number], color: "#ffd700", scale: 1.1, floatSpeed: 0.9 },
    { position: [-2, 6, -3] as [number, number, number], color: "#ff6347", scale: 0.8, floatSpeed: 1.3 },
    { position: [2, 5.5, 3] as [number, number, number], color: "#dda0dd", scale: 1, floatSpeed: 1.1 },
    { position: [-8, 4, 0] as [number, number, number], color: "#40e0d0", scale: 0.9, floatSpeed: 1.4 },
    { position: [8, 4.5, -1] as [number, number, number], color: "#ff1493", scale: 1.3, floatSpeed: 0.7 },
  ];

  return (
    <group>
      {balloons.map((balloon, index) => (
        <Balloon
          key={index}
          position={balloon.position}
          color={balloon.color}
          scale={balloon.scale}
          floatSpeed={balloon.floatSpeed}
          floatRange={0.8}
        />
      ))}
    </group>
  );
};

export default FloatingBalloons;
import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { Points as ThreePoints, BufferGeometry, Vector3, Color } from 'three';

interface ConfettiExplosionProps {
  trigger: boolean;
  position?: [number, number, number];
  count?: number;
}

const ConfettiExplosion = ({ trigger, position = [0, 0, 0], count = 200 }: ConfettiExplosionProps) => {
  const pointsRef = useRef<ThreePoints>(null);
  const [isExploding, setIsExploding] = useState(false);
  const [explosionTime, setExplosionTime] = useState(0);

  // Generate confetti particles
  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities: Vector3[] = [];
    
    const confettiColors = [
      new Color('#ff69b4'), // Hot pink
      new Color('#87ceeb'), // Sky blue
      new Color('#98fb98'), // Pale green
      new Color('#ffd700'), // Gold
      new Color('#ff6347'), // Tomato
      new Color('#dda0dd'), // Plum
      new Color('#40e0d0'), // Turquoise
      new Color('#ff1493'), // Deep pink
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Initial positions (all start from explosion center)
      positions[i3] = position[0];
      positions[i3 + 1] = position[1];
      positions[i3 + 2] = position[2];
      
      // Random colors
      const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      // Random velocities for explosion effect
      const velocity = new Vector3(
        (Math.random() - 0.5) * 10,
        Math.random() * 8 + 2,
        (Math.random() - 0.5) * 10
      );
      velocities.push(velocity);
    }
    
    return { positions, colors, velocities };
  }, [count, position]);

  useEffect(() => {
    if (trigger && !isExploding) {
      setIsExploding(true);
      setExplosionTime(0);
      
      // Reset positions to explosion center
      if (pointsRef.current) {
        const positionAttribute = pointsRef.current.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          positionAttribute.array[i3] = position[0];
          positionAttribute.array[i3 + 1] = position[1];
          positionAttribute.array[i3 + 2] = position[2];
        }
        positionAttribute.needsUpdate = true;
      }
      
      // Stop explosion after 5 seconds
      setTimeout(() => {
        setIsExploding(false);
      }, 5000);
    }
  }, [trigger, isExploding, count, position]);

  useFrame((state, delta) => {
    if (!isExploding || !pointsRef.current) return;
    
    setExplosionTime(prev => prev + delta);
    
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const gravity = -9.8;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const velocity = velocities[i];
      
      // Apply physics
      velocity.y += gravity * delta * 0.5; // Gravity
      velocity.x *= 0.98; // Air resistance
      velocity.z *= 0.98;
      
      // Update positions
      positionAttribute.array[i3] += velocity.x * delta;
      positionAttribute.array[i3 + 1] += velocity.y * delta;
      positionAttribute.array[i3 + 2] += velocity.z * delta;
      
      // Bounce off ground
      if (positionAttribute.array[i3 + 1] < -5) {
        positionAttribute.array[i3 + 1] = -5;
        velocity.y = Math.abs(velocity.y) * 0.6;
      }
    }
    
    positionAttribute.needsUpdate = true;
    
    // Rotate the entire system for more dynamic effect
    pointsRef.current.rotation.y += delta * 0.5;
  });

  if (!isExploding) return null;

  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </Points>
  );
};

export default ConfettiExplosion;
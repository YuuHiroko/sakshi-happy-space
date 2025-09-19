import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Sphere } from '@react-three/drei';
import { Group } from 'three';

interface CountdownUnit {
  value: number;
  label: string;
}

interface BirthdayCountdownProps {
  targetDate: Date;
  position?: [number, number, number];
}

const BirthdayCountdown = ({ targetDate, position = [0, 0, 0] }: BirthdayCountdownProps) => {
  const countdownRef = useRef<Group>(null);
  const [timeLeft, setTimeLeft] = useState<CountdownUnit[]>([]);
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft([
          { value: days, label: 'Days' },
          { value: hours, label: 'Hours' },
          { value: minutes, label: 'Minutes' },
          { value: seconds, label: 'Seconds' }
        ]);
        setIsToday(false);
      } else {
        setIsToday(true);
        setTimeLeft([]);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  useFrame((state) => {
    if (countdownRef.current) {
      countdownRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      countdownRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  if (isToday) {
    return (
      <group ref={countdownRef} position={position}>
        {/* Birthday celebration */}
        <Text
          position={[0, 2, 0]}
          fontSize={1}
          color="#ff1493"
          anchorX="center"
          anchorY="middle"
        >
          🎉 IT'S SAKSHI'S BIRTHDAY! 🎉
        </Text>
        
        {/* Celebration spheres */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 3;
          return (
            <Sphere 
              key={i}
              args={[0.2, 8, 8]} 
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 3) * 0.5,
                Math.sin(angle) * radius
              ]}
            >
              <meshStandardMaterial 
                color={`hsl(${i * 30}, 70%, 60%)`}
                emissive={`hsl(${i * 30}, 70%, 30%)`}
                emissiveIntensity={0.5}
              />
            </Sphere>
          );
        })}
      </group>
    );
  }

  return (
    <group ref={countdownRef} position={position}>
      {/* Title */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.5}
        color="#ff69b4"
        anchorX="center"
        anchorY="middle"
      >
        Countdown to Sakshi's Birthday
      </Text>
      
      {/* Countdown units */}
      {timeLeft.map((unit, index) => {
        const xPos = (index - 1.5) * 2.5;
        
        return (
          <group key={unit.label} position={[xPos, 0, 0]}>
            {/* Background box */}
            <Box args={[2, 2, 0.3]} position={[0, 0, -0.2]}>
              <meshStandardMaterial 
                color="#ff69b4" 
                metalness={0.1}
                roughness={0.3}
                transparent
                opacity={0.8}
              />
            </Box>
            
            {/* Number */}
            <Text
              position={[0, 0.3, 0]}
              fontSize={0.8}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {unit.value.toString().padStart(2, '0')}
            </Text>
            
            {/* Label */}
            <Text
              position={[0, -0.5, 0]}
              fontSize={0.3}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {unit.label}
            </Text>
            
            {/* Decorative elements */}
            <Sphere args={[0.1, 8, 8]} position={[-0.8, 0.8, 0.2]}>
              <meshStandardMaterial 
                color="#ffd700"
                emissive="#ffd700"
                emissiveIntensity={0.3}
              />
            </Sphere>
            
            <Sphere args={[0.1, 8, 8]} position={[0.8, -0.8, 0.2]}>
              <meshStandardMaterial 
                color="#87ceeb"
                emissive="#87ceeb"
                emissiveIntensity={0.3}
              />
            </Sphere>
          </group>
        );
      })}
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 6 + Math.sin(i) * 2;
        return (
          <Sphere 
            key={i}
            args={[0.05, 6, 6]} 
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 2,
              Math.sin(angle) * radius
            ]}
          >
            <meshStandardMaterial 
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.5}
              transparent
              opacity={0.7}
            />
          </Sphere>
        );
      })}
    </group>
  );
};

export default BirthdayCountdown;
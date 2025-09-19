import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import BirthdayCake from './BirthdayCake';
import FloatingBalloons from './FloatingBalloons';
import ConfettiExplosion from './ConfettiExplosion';
import GiftBox from './GiftBox';
import PhotoCarousel3D from './PhotoCarousel3D';
import BirthdayCountdown from './BirthdayCountdown';

interface BirthdayScene3DProps {
  photos: Array<{ src: string; alt: string; title?: string }>;
  birthdayDate?: Date;
}

const BirthdayScene3D = ({ photos, birthdayDate }: BirthdayScene3DProps) => {
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);

  const handleCandlesBlown = () => {
    setConfettiTrigger(true);
    setTimeout(() => setConfettiTrigger(false), 100);
  };

  const handleGiftOpen = () => {
    setGiftOpened(true);
    setConfettiTrigger(true);
    setTimeout(() => setConfettiTrigger(false), 100);
  };

  // Convert photos to include titles
  const photosWithTitles = photos.map((photo, index) => ({
    ...photo,
    title: `Memory ${index + 1}`
  }));

  // Default birthday date (you can customize this)
  const defaultBirthdayDate = birthdayDate || new Date(new Date().getFullYear(), 11, 25); // December 25th

  return (
    <div className="w-full h-screen relative">
      <Canvas shadows>
        <Suspense fallback={null}>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[0, 5, 15]} />
          
          {/* Controls */}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
            maxPolarAngle={Math.PI / 2}
          />
          
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[0, 10, 0]} intensity={0.5} color="#ff69b4" />
          <pointLight position={[-10, 5, -10]} intensity={0.3} color="#87ceeb" />
          <pointLight position={[10, 5, 10]} intensity={0.3} color="#98fb98" />
          
          {/* Environment */}
          <Environment preset="sunset" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          {/* 3D Components */}
          <BirthdayCake 
            position={[0, -2, 0]} 
            onAllCandlesBlown={handleCandlesBlown}
          />
          
          <FloatingBalloons />
          
          <GiftBox 
            position={[5, -1, 3]} 
            onOpen={handleGiftOpen}
            isOpen={giftOpened}
          />
          
          <PhotoCarousel3D 
            photos={photosWithTitles}
            position={[0, 2, -8]}
            radius={3}
          />
          
          <BirthdayCountdown 
            targetDate={defaultBirthdayDate}
            position={[-8, 3, 0]}
          />
          
          {/* Confetti */}
          <ConfettiExplosion 
            trigger={confettiTrigger}
            position={[0, 5, 0]}
            count={300}
          />
          
          {/* Ground */}
          <mesh receiveShadow position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial 
              color="#f0f8ff" 
              transparent 
              opacity={0.3}
            />
          </mesh>
        </Suspense>
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 text-white bg-black/30 backdrop-blur-sm rounded-lg p-4">
        <h3 className="text-lg font-bold mb-2">🎂 3D Birthday Experience</h3>
        <ul className="text-sm space-y-1">
          <li>🕯️ Click candles to blow them out</li>
          <li>🎁 Click the gift box to open it</li>
          <li>📸 Click photos in the carousel</li>
          <li>🖱️ Drag to rotate, scroll to zoom</li>
        </ul>
      </div>
      
      {/* Performance indicator */}
      <div className="absolute bottom-4 right-4 text-white bg-black/30 backdrop-blur-sm rounded-lg p-2 text-xs">
        3D Scene Active
      </div>
    </div>
  );
};

export default BirthdayScene3D;
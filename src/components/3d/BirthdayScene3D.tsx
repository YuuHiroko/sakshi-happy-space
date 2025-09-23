import { Suspense, useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Stars, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import BirthdayCake from './BirthdayCake';
import FloatingBalloons from './FloatingBalloons';
import ConfettiExplosion from './ConfettiExplosion';
import GiftBox from './GiftBox';

interface BirthdayScene3DProps {
  photos: Array<{ src: string; alt: string; title?: string }>;
  birthdayDate?: Date;
}

const BirthdayScene3D = ({ photos, birthdayDate }: BirthdayScene3DProps) => {
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const handleCandlesBlown = () => {
    setConfettiTrigger(true);
    setTimeout(() => setConfettiTrigger(false), 100);
  };

  const handleGiftOpen = () => {
    setGiftOpened(true);
    setConfettiTrigger(true);
    setTimeout(() => setConfettiTrigger(false), 100);
  };

  const photosWithTitles = useMemo(() => photos.map((photo, index) => ({
    ...photo,
    title: `Memory ${index + 1}`
  })), [photos]);

  return (
    <div className="w-full h-screen relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Canvas 
        shadows 
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={
          <Html center>
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading 3D Experience...</p>
            </div>
          </Html>
        }>
          <PerspectiveCamera 
            makeDefault 
            position={isMobile ? [0, 3, 12] : [0, 5, 15]} 
            fov={isMobile ? 75 : 60}
          />
          
          <OrbitControls 
            enablePan={!isMobile}
            enableZoom={true}
            enableRotate={true}
            minDistance={isMobile ? 8 : 5}
            maxDistance={isMobile ? 25 : 50}
            maxPolarAngle={Math.PI / 2}
            autoRotate={false}
            autoRotateSpeed={0.5}
            dampingFactor={0.05}
            enableDamping={true}
          />
          
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
          
          <Environment preset="sunset" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <BirthdayCake 
            position={[0, -2, 0]} 
            onAllCandlesBlown={handleCandlesBlown}
            scale={isMobile ? 0.8 : 1}
            isMobile={isMobile}
          />
          
          <FloatingBalloons isMobile={isMobile} />
          
          <GiftBox 
            position={isMobile ? [3, -1, 2] : [5, -1, 3]} 
            onOpen={handleGiftOpen}
            isOpen={giftOpened}
            scale={isMobile ? 0.8 : 1}
          />
          
          <Html position={isMobile ? [-4, 2, 0] : [-6, 3, 0]} transform occlude>
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-4 rounded-xl shadow-lg backdrop-blur-md border border-white/20">
              <h3 className="text-lg font-bold mb-2">🎂 Birthday Celebration!</h3>
              <p className="text-sm">Every day is special with Sakshi!</p>
              <div className="flex items-center justify-center mt-2">
                <div className="animate-bounce text-2xl">🎉</div>
              </div>
            </div>
          </Html>
          
          <ConfettiExplosion 
            trigger={confettiTrigger}
            position={[0, 5, 0]}
            count={isMobile ? 150 : 300}
          />
          
          <mesh receiveShadow position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial 
              color="#1a1a2e" 
              transparent 
              opacity={0.2}
            />
          </mesh>
        </Suspense>
      </Canvas>
      
      {showInstructions && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`absolute ${isMobile ? 'top-2 left-2 right-2' : 'top-4 left-4'} text-white bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/20`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold">🎂 3D Birthday Experience</h3>
            <button 
              onClick={() => setShowInstructions(false)}
              className="text-white/70 hover:text-white text-xl"
            >
              ×
            </button>
          </div>
          <ul className="text-sm space-y-1">
            <li>🕯️ {isMobile ? 'Tap' : 'Click'} candles to blow them out</li>
            <li>🎁 {isMobile ? 'Tap' : 'Click'} the gift box to open it</li>
            <li>{isMobile ? '👆 Touch to rotate, pinch to zoom' : '🖱️ Drag to rotate, scroll to zoom'}</li>
          </ul>
        </motion.div>
      )}
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          🎉 Happy Birthday Sakshi! 🎉
        </h1>
        <p className="text-lg md:text-xl text-white/90 drop-shadow-md">
          Welcome to your magical 3D birthday world!
        </p>
      </motion.div>
      
      <div className={`absolute ${isMobile ? 'bottom-2 right-2' : 'bottom-4 right-4'} text-white bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1 text-xs`}>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>3D Active</span>
        </div>
      </div>
    </div>
  );
};

export default BirthdayScene3D;

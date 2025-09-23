import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Stars, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import BirthdayCake from './BirthdayCake';
import FloatingBalloons from './FloatingBalloons';
import ConfettiExplosion from './ConfettiExplosion';
import GiftBox from './GiftBox';
import PhotoCarousel3D from './PhotoCarousel3D';

interface BirthdayScene3DProps {
  photos: Array<{ src: string; alt: string; title?: string }>;
  birthdayDate?: Date;
}

const EnhancedBirthdayScene3D = ({ photos, birthdayDate }: BirthdayScene3DProps) => {
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [instructionsPersistent, setInstructionsPersistent] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Auto-hide instructions after 8 seconds unless user wants them persistent
    const timer = setTimeout(() => {
      if (!instructionsPersistent) {
        setShowInstructions(false);
      }
    }, 8000);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, [instructionsPersistent]);

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
    title: photo.title || `Beautiful Memory ${index + 1}`
  }));

  return (
    <div className="w-full h-screen relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      <Canvas 
        shadows 
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        performance={{ min: 0.5 }}
        camera={{ position: isMobile ? [0, 3, 12] : [0, 5, 15], fov: isMobile ? 75 : 60 }}
      >
        <Suspense fallback={
          <Html center>
            <motion.div 
              className="text-white text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-pink-500 border-r-purple-500 border-b-blue-500 border-l-indigo-500 mx-auto mb-4"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="h-8 w-8 rounded-full bg-white"
                    animate={{ scale: [0.8, 1.2, 0.8] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                </div>
              </div>
              <motion.p 
                className="text-lg font-semibold"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Loading 3D Birthday Magic...
              </motion.p>
            </motion.div>
          </Html>
        }>
          {/* Enhanced Camera */}
          <PerspectiveCamera 
            makeDefault 
            position={isMobile ? [0, 3, 12] : [0, 5, 15]} 
            fov={isMobile ? 75 : 60}
          />
          
          {/* Enhanced Controls */}
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
            minAzimuthAngle={-Math.PI / 3}
            maxAzimuthAngle={Math.PI / 3}
          />
          
          {/* Enhanced Lighting */}
          <ambientLight intensity={0.5} color="#ffeaa7" />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          <pointLight position={[0, 10, 0]} intensity={0.8} color="#ff69b4" />
          <pointLight position={[-10, 5, -10]} intensity={0.4} color="#87ceeb" />
          <pointLight position={[10, 5, 10]} intensity={0.4} color="#98fb98" />
          <spotLight 
            position={[0, 15, 0]} 
            angle={0.5} 
            penumbra={0.5} 
            intensity={0.8} 
            color="#ffd700" 
            castShadow
          />
          
          {/* Environment with better HDR */}
          <Environment preset="city" environmentIntensity={0.6} />
          <Stars 
            radius={100} 
            depth={50} 
            count={8000} 
            factor={6} 
            saturation={0.2} 
            fade 
            speed={1.5} 
          />
          
          {/* Enhanced 3D Components */}
          <BirthdayCake 
            position={[0, -2, 0]} 
            onAllCandlesBlown={handleCandlesBlown}
            scale={isMobile ? 0.8 : 1.2}
            isMobile={isMobile}
          />
          
          <FloatingBalloons isMobile={isMobile} />
          
          <GiftBox 
            position={isMobile ? [3, -1, 2] : [5, -1, 3]} 
            onOpen={handleGiftOpen}
            isOpen={giftOpened}
            scale={isMobile ? 0.8 : 1.1}
          />
          
          <PhotoCarousel3D 
            photos={photosWithTitles}
            position={isMobile ? [0, 1, -6] : [0, 2, -8]}
            radius={isMobile ? 2 : 3.5}
            scale={isMobile ? 0.8 : 1.1}
          />
          
          {/* Enhanced Birthday Message */}
          <Html position={isMobile ? [-4, 2, 0] : [-6, 3, 0]} transform occlude>
            <motion.div 
              className="bg-gradient-to-r from-pink-500/90 via-purple-600/90 to-indigo-600/90 text-white px-8 py-6 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/30"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1, type: "spring", stiffness: 100 }}
            >
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                🎂 Birthday Celebration! 
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  🎉
                </motion.span>
              </h3>
              <p className="text-base mb-2">Every day is special with Sakshi!</p>
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-3xl"
                >
                  🎉
                </motion.div>
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    y: [0, -5, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  className="text-2xl"
                >
                  ✨
                </motion.div>
              </div>
            </motion.div>
          </Html>
          
          {/* Enhanced Confetti */}
          <ConfettiExplosion 
            trigger={confettiTrigger}
            position={[0, 8, 0]}
            count={isMobile ? 200 : 400}
          />
          
          {/* Enhanced Ground with reflection */}
          <mesh receiveShadow position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[150, 150]} />
            <meshStandardMaterial 
              color="#1a1a2e" 
              transparent 
              opacity={0.3}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
        </Suspense>
      </Canvas>
      
      {/* Enhanced Persistent Instructions Panel */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className={`absolute ${isMobile ? 'top-2 left-2 right-2' : 'top-4 left-4 max-w-sm'} text-white bg-black/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  🎂
                </motion.div>
                <h3 className="text-lg font-bold">3D Birthday Experience</h3>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => setInstructionsPersistent(!instructionsPersistent)}
                  className={`text-xs px-2 py-1 rounded-lg transition-colors ${
                    instructionsPersistent ? 'bg-pink-500 text-white' : 'bg-white/20 text-white/70'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Pin
                </motion.button>
                <button 
                  onClick={() => setShowInstructions(false)}
                  className="text-white/70 hover:text-white text-xl w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <motion.div 
                className="flex items-center gap-3 text-sm p-2 bg-white/10 rounded-lg"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <span className="text-lg">🕯️</span>
                <span>{isMobile ? 'Tap' : 'Click'} candles to blow them out</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 text-sm p-2 bg-white/10 rounded-lg"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <span className="text-lg">🎁</span>
                <span>{isMobile ? 'Tap' : 'Click'} the gift box to open it</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 text-sm p-2 bg-white/10 rounded-lg"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <span className="text-lg">📸</span>
                <span>{isMobile ? 'Tap' : 'Click'} photos in the carousel</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 text-sm p-2 bg-white/10 rounded-lg"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <span className="text-lg">{isMobile ? '👆' : '🖱️'}</span>
                <span>{isMobile ? 'Touch to rotate, pinch to zoom' : 'Drag to rotate, scroll to zoom'}</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Enhanced Welcome Message */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, type: "spring", stiffness: 100 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10"
      >
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-4 drop-shadow-2xl"
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🎉 Happy Birthday Sakshi! 🎉
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-white drop-shadow-lg"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Welcome to your magical 3D birthday world! ✨
        </motion.p>
      </motion.div>
      
      {/* Enhanced Performance & Accessibility Indicators */}
      <div className={`absolute ${isMobile ? 'bottom-2 right-2' : 'bottom-4 right-4'} flex flex-col gap-2`}>
        <div className="text-white bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2 text-xs flex items-center gap-2">
          <motion.div 
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <span>3D Active</span>
        </div>
        {!showInstructions && (
          <motion.button
            onClick={() => setShowInstructions(true)}
            className="text-white bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2 text-xs hover:bg-black/60 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Show Help
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default EnhancedBirthdayScene3D;
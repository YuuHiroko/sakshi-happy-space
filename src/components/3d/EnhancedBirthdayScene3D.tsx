import { Suspense, useState, useEffect, useCallback, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Stars, Html, useProgress } from '@react-three/drei';
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

const CustomLoader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <motion.div 
        className="text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="relative w-24 h-24 mx-auto mb-4">
          <motion.div 
            className="w-full h-full rounded-full border-8 border-t-pink-500 border-r-purple-500 border-b-blue-500 border-l-indigo-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl">
            {~~progress}% 
          </div>
        </div>
        <p className="text-xl font-semibold tracking-wider">Loading Birthday Magic...</p>
      </motion.div>
    </Html>
  );
};

const EnhancedBirthdayScene3D = ({ photos, birthdayDate }: BirthdayScene3DProps) => {
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [instructionsPinned, setInstructionsPinned] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const timer = setTimeout(() => {
      if (!instructionsPinned) {
        setShowInstructions(false);
      }
    }, 10000);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, [instructionsPinned]);

  const handleCandlesBlown = useCallback(() => {
    setConfettiTrigger(true);
    setTimeout(() => setConfettiTrigger(false), 200);
  }, []);

  const handleGiftOpen = useCallback(() => {
    if(!giftOpened) {
      setGiftOpened(true);
      setConfettiTrigger(true);
      setTimeout(() => setConfettiTrigger(false), 200);
    }
  }, [giftOpened]);

  const photosWithTitles = useMemo(() => photos.map((photo, index) => ({
    ...photo,
    title: photo.title || `Memory #${index + 1}`
  })), [photos]);

  return (
    <div className="w-full h-screen relative bg-gradient-to-br from-indigo-900 via-purple-900 to-black overflow-hidden">
      <Canvas 
        shadows 
        dpr={[1, 2]}
        performance={{ min: 0.5, max: 1 }}
      >
        <Suspense fallback={<CustomLoader />}>
          <PerspectiveCamera makeDefault position={isMobile ? [0, 4, 15] : [0, 6, 18]} fov={isMobile ? 70 : 50} />
          
          <OrbitControls 
            enablePan={!isMobile}
            enableZoom
            minDistance={isMobile ? 10 : 8}
            maxDistance={isMobile ? 30 : 40}
            maxPolarAngle={Math.PI / 2 - 0.1}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            autoRotate={!giftOpened} // Stop autorotate after interaction
            autoRotateSpeed={0.3}
            dampingFactor={0.05}
            enableDamping
          />
          
          <ambientLight intensity={0.6} color="#ffc0cb" />
          <directionalLight 
            position={[15, 20, 10]} 
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={60}
          />
          <pointLight position={[0, 10, 5]} intensity={1} color="#ff69b4" distance={30} decay={1.2} />
          <spotLight position={[0, 20, 0]} angle={0.6} penumbra={0.5} intensity={1.2} color="#ffd700" castShadow />
          
          <Environment preset="night" environmentIntensity={0.8} />
          <Stars radius={150} depth={60} count={10000} factor={8} saturation={0.5} fade speed={2} />
          
          <BirthdayCake 
            position={[0, -2.5, 0]} 
            onAllCandlesBlown={handleCandlesBlown}
            scale={isMobile ? 0.9 : 1.3}
            isMobile={isMobile}
          />
          
          <FloatingBalloons isMobile={isMobile} count={isMobile ? 15 : 25} />
          
          <GiftBox 
            position={isMobile ? [4, -1.5, 2] : [6, -1.5, 4]} 
            onOpen={handleGiftOpen}
            isOpen={giftOpened}
            scale={isMobile ? 0.9 : 1.2}
            isMobile={isMobile}
          />
          
          <PhotoCarousel3D 
            photos={photosWithTitles}
            position={isMobile ? [0, 1.5, -5] : [0, 2.5, -7]}
            radius={isMobile ? 3 : 4.5}
            scale={isMobile ? 0.9 : 1.2}
            isMobile={isMobile}
          />
          
          <ConfettiExplosion trigger={confettiTrigger} position={[0, 10, 0]} count={isMobile ? 250 : 500} />
          
          <mesh receiveShadow position={[0, -3.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial color="#1a0c24" transparent opacity={0.4} roughness={0.1} metalness={0.9} />
          </mesh>
        </Suspense>
      </Canvas>
      
      <AnimatePresence>
        {showInstructions && (
          <motion.div 
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -150 }}
            className={`absolute ${isMobile ? 'top-2 left-2 right-2' : 'top-4 left-4 max-w-md'} text-white bg-black/70 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20 shadow-2xl`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-3">🎂 3D Birthday World</h3>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => setInstructionsPinned(!instructionsPinned)}
                  className={`text-xs px-3 py-1 rounded-lg transition-colors ${instructionsPinned ? 'bg-pink-600 text-white' : 'bg-white/20 text-white/80'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {instructionsPinned ? 'Pinned' : 'Pin'}
                </motion.button>
                <button onClick={() => setShowInstructions(false)} className="text-white/80 hover:text-white text-2xl w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors">
                  ×
                </button>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p>Explore Sakshi's magical birthday scene!</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><span className="font-semibold">Rotate:</span> {isMobile ? 'Swipe' : 'Drag mouse'}</li>
                <li><span className="font-semibold">Zoom:</span> {isMobile ? 'Pinch' : 'Scroll'}</li>
                <li><span className="font-semibold">Interact:</span> Tap on the items below!</li>
              </ul>
              <div className="grid grid-cols-2 gap-3 pt-3">
                <motion.div whileHover={{ scale: 1.05, x: 4 }} className="flex items-center gap-3 p-2 bg-white/10 rounded-lg">🕯️ Blow Candles</motion.div>
                <motion.div whileHover={{ scale: 1.05, x: 4 }} className="flex items-center gap-3 p-2 bg-white/10 rounded-lg">🎁 Open Gift</motion.div>
                <motion.div whileHover={{ scale: 1.05, x: 4 }} className="flex items-center gap-3 p-2 bg-white/10 rounded-lg">📸 View Photos</motion.div>
                <motion.div whileHover={{ scale: 1.05, x: 4 }} className="flex items-center gap-3 p-2 bg-white/10 rounded-lg">🎈 Enjoy Balloons</motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1.5, type: "spring" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10"
      >
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-300 mb-4 drop-shadow-[0_5px_15px_rgba(255,255,255,0.2)]">
          Happy Birthday Sakshi!
        </h1>
        <p className="text-lg md:text-2xl text-white/90 drop-shadow-lg">A universe of love, just for you ✨</p>
      </motion.div>
      
      <div className={`absolute ${isMobile ? 'bottom-2 right-2' : 'bottom-4 right-4'} flex items-center gap-3`}>
        {!showInstructions && (
          <motion.button
            onClick={() => setShowInstructions(true)}
            className="text-white bg-black/50 backdrop-blur-md rounded-full p-3 text-xs hover:bg-black/70 transition-colors shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Show Help
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default EnhancedBirthdayScene3D;
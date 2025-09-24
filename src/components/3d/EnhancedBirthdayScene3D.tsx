import { Suspense, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Html, useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import BirthdayCake from './BirthdayCake';
import FloatingBalloons from './FloatingBalloons';
import ConfettiExplosion from './ConfettiExplosion';
import GiftBox from './GiftBox';
import PhotoCarousel3D from './PhotoCarousel3D';
import SceneLighting from './SceneLighting';
import SceneFloor from './SceneFloor';
import GuidedTour from './GuidedTour';

// Props for the BirthdayScene3D component
interface BirthdayScene3DProps {
  photos: Array<{ src: string; alt: string; title?: string }>;
  title: string;
  subtitle: string;
  isGiftOpen?: boolean;
  onGiftOpen?: () => void;
  areCandlesBlown?: boolean;
  onCandlesBlown?: () => void;
  isCakeCut?: boolean;
  onCakeCut?: () => void;
  arePhotosViewed?: boolean;
  onPhotosViewed?: () => void;
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

const EnhancedBirthdayScene3D = ({
  photos,
  title,
  subtitle,
  isGiftOpen = false,
  onGiftOpen,
  areCandlesBlown = false,
  onCandlesBlown,
  isCakeCut = false,
  onCakeCut,
  arePhotosViewed = false,
  onPhotosViewed,
}: BirthdayScene3DProps) => {
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [tourCompleted, setTourCompleted] = useState(false);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCandlesBlown = useCallback(() => {
    setConfettiTrigger(true);
    setTimeout(() => setConfettiTrigger(false), 200);
    if (onCandlesBlown) onCandlesBlown();
    if (controlsRef.current) {
        controlsRef.current.autoRotate = false;
    }
    if(!tourCompleted) setTourStep(2);
  }, [onCandlesBlown, tourCompleted]);

  const handleGiftOpen = useCallback(() => {
      if (onGiftOpen) onGiftOpen();
      setConfettiTrigger(true);
      setTimeout(() => setConfettiTrigger(false), 200);
      if(!tourCompleted) setTourStep(4);
  }, [onGiftOpen, tourCompleted]);

  const handleCakeCut = useCallback(() => {
    setConfettiTrigger(true);
    setTimeout(() => setConfettiTrigger(false), 200);
    if (onCakeCut) onCakeCut();
    if (controlsRef.current) {
        controlsRef.current.autoRotate = false;
    }
  }, [onCakeCut]);

  const handlePhotosViewed = useCallback(() => {
    if (onPhotosViewed) onPhotosViewed();
    if(!tourCompleted) setTourStep(3);
  }, [onPhotosViewed, tourCompleted]);

  const photosWithTitles = useMemo(() => photos.map((photo, index) => ({
    ...photo,
    title: photo.title || `Memory #${index + 1}`
  })), [photos]);

  const handleTourNext = () => {
    if (tourStep === 4) {
      setTourCompleted(true);
      setTourStep(5);
    } else {
      setTourStep(s => s + 1);
    }
  };

  const handleTourSkip = () => {
    setTourCompleted(true);
    setTourStep(5);
  };

  const enableOrbitControls = useMemo(() => tourCompleted, [tourCompleted]);
  const autoRotateControls = useMemo(() => !areCandlesBlown && !tourCompleted, [areCandlesBlown, tourCompleted]);

  const cameraPosition = useMemo(() => {
      if (tourStep === 1) return isMobile ? [0, 4, 15] : [0, 6, 18];
      if (tourStep === 2) return isMobile ? [0, 3, 10] : [0, 4, 12];
      if (tourStep === 3) return isMobile ? [2, 0, 8] : [4, 0, 10];
      return isMobile ? [0, 3, 10] : [0, 4, 12];
  }, [tourStep, isMobile]);

  return (
    <div className="w-full h-screen relative bg-gradient-to-br from-indigo-900 via-purple-900 to-black overflow-hidden">
      <Canvas
        shadows
        dpr={[1, 2]}
        performance={{ min: 0.5, max: 1 }}
      >
        <Suspense fallback={<CustomLoader />}>
          <PerspectiveCamera makeDefault position={cameraPosition} fov={isMobile ? 70 : 50} />

          <OrbitControls
            ref={controlsRef}
            enablePan={enableOrbitControls && !isMobile}
            enableZoom={enableOrbitControls}
            enabled={enableOrbitControls}
            minDistance={isMobile ? 10 : 8}
            maxDistance={isMobile ? 30 : 40}
            maxPolarAngle={Math.PI / 2 - 0.1}
            autoRotate={autoRotateControls}
            autoRotateSpeed={0.3}
            dampingFactor={0.05}
            enableDamping
          />

          <SceneLighting />

          <BirthdayCake
            position={[0, -2.5, 0]}
            onAllCandlesBlown={handleCandlesBlown}
            scale={isMobile ? 0.9 : 1.3}
            isMobile={isMobile}
            isVisible={!areCandlesBlown || isCakeCut}
            isCut={isCakeCut}
            canBlow={!areCandlesBlown}
            canCut={arePhotosViewed && !isCakeCut}
            onCakeCut={handleCakeCut}
          />

          <FloatingBalloons isMobile={isMobile} count={isMobile ? 15 : 25} />

          <GiftBox
              position={isMobile ? [4, -1.5, 2] : [6, -1.5, 4]}
              onOpen={handleGiftOpen}
              isOpen={isGiftOpen}
              scale={isMobile ? 0.9 : 1.2}
              isMobile={isMobile}
              isVisible={arePhotosViewed && !isGiftOpen}
            />

          <PhotoCarousel3D
              photos={photosWithTitles}
              position={isMobile ? [0, 1.5, -5] : [0, 2.5, -7]}
              radius={isMobile ? 3 : 4.5}
              scale={isMobile ? 0.9 : 1.2}
              isMobile={isMobile}
              onPhotosViewed={handlePhotosViewed}
              isActive={areCandlesBlown && !arePhotosViewed}
            />

          <ConfettiExplosion trigger={confettiTrigger} position={[0, 10, 0]} count={isMobile ? 250 : 500} />

          <SceneFloor />
        </Suspense>
      </Canvas>
      
      {!tourCompleted && (
        <GuidedTour 
          currentStep={tourStep} 
          onNext={handleTourNext} 
          onSkip={handleTourSkip} 
          isMobile={isMobile} 
        />
      )}
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1.5, type: "spring" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10"
      >
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-300 mb-4 drop-shadow-[0_5px_15px_rgba(255,255,255,0.2)]">
          {title}
        </h1>
        <p className="text-lg md:text-2xl text-white/90 drop-shadow-lg">{subtitle}</p>
      </motion.div>
    </div>
  );
};

export default EnhancedBirthdayScene3D;

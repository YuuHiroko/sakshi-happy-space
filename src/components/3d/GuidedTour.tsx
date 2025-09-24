import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, Mouse, Move, ZoomIn, ZoomOut, Pin, PinOff, X } from 'lucide-react';

interface TourStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  targetId?: string;
}

const tourSteps: TourStep[] = [
  { 
    title: 'Welcome to the 3D Birthday World!',
    description: 'Let\'s explore this magical space created just for Sakshi. Follow the steps to unlock all the surprises!',
    icon: <Hand size={24} className="text-yellow-300" /> 
  },
  {
    title: 'Blow Out the Candles',
    description: 'Find the birthday cake and click on the candles to make a wish!',
    icon: <Mouse size={24} className="text-blue-300" />
  },
  {
    title: 'Explore the Memories',
    description: 'A carousel of beautiful memories is waiting for you. Click to view them up close.',
    icon: <Move size={24} className="text-green-300" />
  },
  {
    title: 'Open Your Gift',
    description: 'There\'s a special gift just for you. Find it and click to reveal the surprise inside!',
    icon: <ZoomIn size={24} className="text-purple-300" />
  },
  {
    title: 'Enjoy the View!',
    description: 'Now you can freely explore the scene. Use your mouse to drag, pan, and zoom to see every detail.',
    icon: <ZoomOut size={24} className="text-pink-300" />
  }
];

interface GuidedTourProps {
  currentStep: number;
  onNext: () => void;
  onSkip: () => void;
  isMobile: boolean;
}

const GuidedTour: React.FC<GuidedTourProps> = ({ currentStep, onNext, onSkip, isMobile }) => {
  const [isPinned, setIsPinned] = useState(true);

  useEffect(() => {
    if (!isPinned && currentStep < tourSteps.length) {
      const timer = setTimeout(() => {
        onNext();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isPinned, onNext]);

  const step = tourSteps[currentStep];

  if (!step) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className={`absolute ${isMobile ? 'bottom-4 left-4 right-4' : 'bottom-8 left-1/2 -translate-x-1/2'} w-full max-w-md mx-auto z-50`}
      >
        <div className="bg-black/70 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-6 shadow-2xl text-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                {step.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg">{step.title}</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsPinned(!isPinned)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                {isPinned ? <Pin size={18} /> : <PinOff size={18} />}
              </button>
              <button onClick={onSkip} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>
          <p className="text-white/80 mb-5 pl-16 pr-4 text-sm leading-relaxed">{step.description}</p>

          <div className="flex items-center justify-between pl-16">
             <div className="flex items-center gap-2 text-xs text-white/50">
                {tourSteps.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i === currentStep ? 'bg-white' : 'bg-white/30'}`} />
                ))}
            </div>
            <motion.button
              onClick={onNext}
              className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full font-semibold text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GuidedTour;

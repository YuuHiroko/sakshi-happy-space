import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from "@/components/ui/switch"; // Assuming this is available
import { Sparkles, X } from "lucide-react";

interface ConfettiWrapperProps {
  triggerOnMount?: boolean;
  trigger?: boolean;
  particleCount?: number;
  durationMs?: number;
  children?: React.ReactNode;
}

const ConfettiWrapper: React.FC<ConfettiWrapperProps> = ({
  triggerOnMount = false,
  trigger = false,
  particleCount = 200,
  durationMs = 5000,
  children,
}) => {
  const [confetti, setConfetti] = useState<any>(null);
  const animationRef = useRef<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('animationsEnabled') !== 'false';
    }
    return true;
  });
  const [showConfettiToggle, setShowConfettiToggle] = useState(false);

  // Check for prefers-reduced-motion and mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    setIsMobile(window.innerWidth < 768);

    const handleMediaQueryChange = () => {
      if (mediaQuery.matches) {
        // If reduced motion is preferred, disable animations regardless of user toggle
        setAnimationsEnabled(false);
        localStorage.setItem('animationsEnabled', 'false');
      }
    };
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    window.addEventListener('resize', checkMobile);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Lazy load confetti library
  useEffect(() => {
    import('canvas-confetti')
      .then((module) => {
        setConfetti(() => module.default);
      })
      .catch((error) => console.error("Failed to load canvas-confetti", error));
  }, []);

  const fireConfetti = useCallback(() => {
    if (confetti && animationsEnabled) {
      const count = isMobile ? Math.min(particleCount, 100) : particleCount;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 1000,
        disableForReducedMotion: true,
      };

      confetti({
        ...defaults,
        particleCount: count,
        spread: 120,
        startVelocity: 60,
        scalar: isMobile ? 0.8 : 1,
      });

      // Secondary burst
      confetti({
        ...defaults,
        particleCount: count / 2,
        spread: 60,
        startVelocity: 40,
        scalar: isMobile ? 0.6 : 0.9,
        origin: { y: 0.5, x: 0.2 }
      });

      confetti({
        ...defaults,
        particleCount: count / 2,
        spread: 60,
        startVelocity: 40,
        scalar: isMobile ? 0.6 : 0.9,
        origin: { y: 0.5, x: 0.8 }
      });

      // Clear animation after durationMs
      animationRef.current = setTimeout(() => {
        if (confetti) {
          confetti.reset();
        }
      }, durationMs);
    }
  }, [confetti, animationsEnabled, isMobile, particleCount, durationMs]);

  // Trigger on mount
  useEffect(() => {
    if (triggerOnMount) {
      fireConfetti();
    }
    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
      if (confetti) confetti.reset();
    };
  }, [triggerOnMount, fireConfetti]);

  // External trigger
  useEffect(() => {
    if (trigger) {
      fireConfetti();
    }
  }, [trigger, fireConfetti]);

  const handleToggleAnimations = useCallback((checked: boolean) => {
    setAnimationsEnabled(checked);
    localStorage.setItem('animationsEnabled', String(checked));
    if (!checked && confetti) {
      confetti.reset(); // Stop any ongoing confetti if disabled
    }
  }, [confetti]);

  return (
    <div className="relative w-full h-full">
      {children}

      <AnimatePresence>
        {showConfettiToggle && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-4 right-4 z-[1001] bg-black/70 backdrop-blur-md text-white p-3 rounded-lg flex items-center space-x-3 shadow-lg"
          >
            <Sparkles size={18} />
            <span>Animations</span>
            <Switch
              checked={animationsEnabled}
              onCheckedChange={handleToggleAnimations}
              aria-label="Toggle animations"
            />
            <button
              onClick={() => setShowConfettiToggle(false)}
              className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close animations toggle"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!showConfettiToggle && (
        <motion.button
          onClick={() => setShowConfettiToggle(true)}
          className="fixed bottom-4 right-4 z-[1001] p-3 rounded-full bg-black/60 backdrop-blur-md text-white shadow-lg hover:bg-black/80 transition-colors"
          aria-label="Show animation settings"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <Sparkles size={20} />
        </motion.button>
      )}
    </div>
  );
};

export default ConfettiWrapper;

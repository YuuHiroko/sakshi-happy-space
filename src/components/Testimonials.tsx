import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const testimonialVariants: Variants = {
  enter: { opacity: 0, y: 20, scale: 0.95 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.95 },
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = React.memo(({ testimonial }) => (
  <div className="bg-white/30 dark:bg-blue-950/40 backdrop-blur-md py-8 px-10 rounded-2xl shadow-lg border border-white/20 dark:border-blue-800/20 w-full max-w-lg relative">
    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sakshi-purple to-sakshi-blue dark:from-blue-500 dark:to-indigo-600 rounded-full p-2 shadow-lg">
      <Quote size={24} className="text-white" />
    </div>
    <p className="text-xl italic mb-6 text-gray-800 dark:text-blue-100 drop-shadow-sm">{testimonial.quote}</p>
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      <p className="font-medium text-sakshi-purple dark:text-blue-300 inline-block px-4 py-1 bg-sakshi-purple/10 dark:bg-blue-900/50 rounded-full">
        {testimonial.author}
      </p>
    </motion.div>
  </div>
));

const CarouselNavigation: React.FC<{ count: number; current: number; onNavigate: (index: number) => void; }> = React.memo(({ count, current, onNavigate }) => (
  <div className="absolute -bottom-2 left-0 right-0 flex justify-center space-x-2">
    {Array.from({ length: count }).map((_, index) => (
      <Button
        key={index}
        onClick={() => onNavigate(index)}
        variant="ghost"
        size="sm"
        className={`w-2 h-2 p-0 rounded-full transition-all duration-300 ${
          index === current
            ? 'bg-sakshi-purple dark:bg-blue-400 w-8'
            : 'bg-sakshi-purple/30 dark:bg-blue-700/40'
        }`}
        aria-label={`Go to testimonial ${index + 1}`}
      />
    ))}
  </div>
));

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);

  const nextTestimonial = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(nextTestimonial, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length, nextTestimonial]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className="relative h-72 mt-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          variants={testimonialVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <TestimonialCard testimonial={testimonials[current]} />
        </motion.div>
      </AnimatePresence>

      {testimonials.length > 1 && (
        <CarouselNavigation
          count={testimonials.length}
          current={current}
          onNavigate={setCurrent}
        />
      )}
    </div>
  );
};

export default Testimonials;

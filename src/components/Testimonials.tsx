
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const variants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="relative h-72 mt-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <div className="bg-white/30 dark:bg-blue-950/40 backdrop-blur-md py-8 px-10 rounded-2xl shadow-lg border border-white/20 dark:border-blue-800/20 w-full max-w-lg relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sakshi-purple to-sakshi-blue dark:from-blue-500 dark:to-indigo-600 rounded-full p-2 shadow-lg">
              <Quote size={24} className="text-white" />
            </div>
            
            <p className="text-xl italic mb-6 text-gray-800 dark:text-blue-100 drop-shadow-sm">{testimonials[current].quote}</p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="font-medium text-sakshi-purple dark:text-blue-300 inline-block px-4 py-1 bg-sakshi-purple/10 dark:bg-blue-900/50 rounded-full">
                {testimonials[current].author}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute -bottom-2 left-0 right-0 flex justify-center space-x-2">
        {testimonials.map((_, index) => (
          <Button
            key={index}
            onClick={() => setCurrent(index)}
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
    </div>
  );
};

export default Testimonials;


import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

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
    <div className="relative h-60 mt-10">
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
          <div className="bg-white/30 dark:bg-black/30 backdrop-blur-md py-6 px-8 rounded-2xl shadow-lg border border-white/20 dark:border-white/10 w-full max-w-lg">
            <p className="text-xl italic mb-4 text-gray-800 dark:text-white">{testimonials[current].quote}</p>
            <p className="font-medium text-sakshi-purple dark:text-sakshi-blue">{testimonials[current].author}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2">
        {testimonials.map((_, index) => (
          <Button
            key={index}
            onClick={() => setCurrent(index)}
            variant="ghost"
            size="sm"
            className={`w-2 h-2 p-0 rounded-full transition-all duration-300 ${
              index === current 
                ? 'bg-sakshi-purple dark:bg-sakshi-blue w-6' 
                : 'bg-sakshi-purple/30 dark:bg-sakshi-blue/30'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;

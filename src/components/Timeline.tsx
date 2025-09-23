import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        controls.start('visible');
      }
    }, { threshold: 0.1 });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="relative mt-12 border-l-2 border-sakshi-blue/20 dark:border-sakshi-purple/20 ml-6"
    >
      {events.map((event, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="mb-10 ml-8 p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
        >
          <span className="absolute flex items-center justify-center w-10 h-10 bg-sakshi-blue rounded-full -left-5 ring-4 ring-white dark:ring-gray-900">
            <Calendar className="w-5 h-5 text-white" />
          </span>
          <div className="bg-gradient-to-r from-sakshi-purple/10 to-sakshi-blue/10 text-sakshi-purple inline-block py-1 px-3 rounded-full text-sm font-semibold mb-2">
            {event.year}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{event.title}</h3>
          <p className="text-base font-normal text-gray-600 dark:text-gray-300">{event.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Timeline;

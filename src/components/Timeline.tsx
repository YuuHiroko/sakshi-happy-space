
import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline = ({ events }: TimelineProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="mt-10 ml-4"
    >
      {events.map((event, index) => (
        <motion.div 
          key={index}
          variants={itemVariants as any}
          className="timeline-item"
        >
          <div className="bg-gradient-to-r from-sakshi-purple/10 to-sakshi-blue/10 text-sakshi-purple inline-block py-1 px-3 rounded-full text-sm mb-2">
            {event.year}
          </div>
          <h3 className="text-xl font-medium mb-1">{event.title}</h3>
          <p className="text-muted-foreground">{event.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Timeline;


import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface SectionProps {
  title: string;
  id: string;
  children: ReactNode;
  className?: string;
}

const Section = ({ title, id, children, className = '' }: SectionProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          controls.start('visible');
          setHasAnimated(true);
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
  }, [controls, hasAnimated]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants as any}
      className={`max-w-5xl mx-auto my-16 px-6 md:px-10 ${className}`}
    >
      <div className="glass-card p-8 md:p-10 hover:shadow-xl transition-all duration-300">
        <div className="inline-block mb-6">
          <span className="inline-block py-1 px-3 bg-gradient-to-r from-sakshi-purple/20 to-sakshi-blue/20 dark:from-blue-500/30 dark:to-indigo-600/30 text-sakshi-purple dark:text-blue-200 text-sm rounded-full mb-2 font-medium">
            ✨ {id}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sakshi-purple to-sakshi-blue dark:from-blue-300 dark:to-indigo-400 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        
        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-sakshi-purple dark:prose-headings:text-blue-300 prose-a:text-sakshi-blue dark:prose-a:text-blue-400">
          {children}
        </div>
      </div>
    </motion.section>
  );
};

export default Section;

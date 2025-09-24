import { motion } from 'framer-motion';
import { MessageSquareQuote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          className="relative p-8 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 dark:from-purple-800/20 dark:via-pink-800/20 dark:to-red-800/20 rounded-2xl shadow-lg border border-white/10 backdrop-blur-md"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.15, type: "spring", stiffness: 100, damping: 15 }}
          whileHover={{ 
            scale: 1.03,
            y: -5,
            boxShadow: "0px 15px 30px -10px rgba(0, 0, 0, 0.2)",
            transition: { duration: 0.3 }
          }}
        >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 text-purple-400/20 dark:text-purple-300/10">
                <MessageSquareQuote size={80} strokeWidth={1.5}/>
            </div>
            <div className="relative z-10">
                <p className="text-lg text-gray-800 dark:text-gray-200 mb-6 italic">"{testimonial.quote}"</p>
                <p className="text-md font-semibold text-right text-pink-600 dark:text-pink-400">- {testimonial.author}</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 dark:to-white/5 rounded-2xl pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
};

export default Testimonials;

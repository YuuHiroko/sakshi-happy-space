import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Gift, Heart } from 'lucide-react';

interface TimeUnit {
  value: number;
  label: string;
  icon: React.ReactNode;
}

const BirthdayCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([]);
  const [isToday, setIsToday] = useState(false);

  // Set birthday date (you can customize this)
  const birthdayDate = new Date('2024-12-31T00:00:00'); // Example date

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = birthdayDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft([
          { value: days, label: 'Days', icon: <Calendar className="w-6 h-6" /> },
          { value: hours, label: 'Hours', icon: <Clock className="w-6 h-6" /> },
          { value: minutes, label: 'Minutes', icon: <Gift className="w-6 h-6" /> },
          { value: seconds, label: 'Seconds', icon: <Heart className="w-6 h-6" /> }
        ]);
        setIsToday(false);
      } else {
        setIsToday(true);
        setTimeLeft([]);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [birthdayDate]);

  if (isToday) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-12"
      >
        <motion.h2
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
        >
          🎉 IT'S SAKSHI'S BIRTHDAY! 🎉
        </motion.h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Today is the special day! Let's celebrate! 🎂
        </p>
      </motion.div>
    );
  }

  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
          Countdown to Sakshi's Birthday
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Every second brings us closer to the celebration! 🎈
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {timeLeft.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="glass-card p-6 text-center hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon */}
              <div className="relative z-10 mb-4 flex justify-center text-pink-500 dark:text-pink-400">
                {unit.icon}
              </div>
              
              {/* Value */}
              <div className="relative z-10 text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                {unit.value.toString().padStart(2, '0')}
              </div>
              
              {/* Label */}
              <div className="relative z-10 text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                {unit.label}
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Motivational message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-8"
      >
        <p className="text-lg text-gray-600 dark:text-gray-300 italic">
          "The best birthdays are filled with love, laughter, and unforgettable memories!" ✨
        </p>
      </motion.div>
    </div>
  );
};

export default BirthdayCountdown;
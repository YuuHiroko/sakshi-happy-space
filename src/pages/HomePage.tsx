
import React from 'react';
import ShareButton from '../components/ShareButton';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">🎉 Happy Birthday, Sakshi! 🎂</h1>
      <p className="mt-4 text-lg sm:text-xl">Wishing you a day filled with joy and laughter!</p>
      <ShareButton />
    </div>
  );
};

export default HomePage;

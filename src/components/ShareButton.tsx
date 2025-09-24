
import React from 'react';

const ShareButton: React.FC = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Happy Birthday, Sakshi!',
        text: 'Check out this special birthday website for Sakshi!',
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
    >
      Share the Joy
    </button>
  );
};

export default ShareButton;

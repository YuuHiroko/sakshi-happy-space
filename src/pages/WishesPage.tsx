
import React, { useState } from 'react';

const initialWishes = [
  {
    author: "Priyanka",
    text: "Happy birthday, dear Sakshi! May your day be as beautiful and wonderful as you are. Wishing you all the happiness in the world.",
  },
  {
    author: "Rahul",
    text: "Wishing you the happiest of birthdays! May you always be surrounded by love, laughter, and endless joy.",
  },
  {
    author: "Amit",
    text: "Happy birthday to my amazing friend! May this year bring you new adventures, opportunities, and unforgettable memories.",
  },
  {
    author: "Sunita",
    text: "On your special day, I wish you all the best. May your dreams come true and your heart be filled with love and warmth.",
  },
];

const WishesPage: React.FC = () => {
  const [wishes, setWishes] = useState(initialWishes);
  const [newWish, setNewWish] = useState({ author: '', text: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewWish({ ...newWish, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWish.author && newWish.text) {
      setWishes([...wishes, newWish]);
      setNewWish({ author: '', text: '' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Birthday Wishes</h2>

      <div className="max-w-xl mx-auto mb-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Leave a Wish</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Your Name</label>
            <input
              type="text"
              id="author"
              name="author"
              value={newWish.author}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Your Wish</label>
            <textarea
              id="text"
              name="text"
              rows={4}
              value={newWish.text}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Submit Wish
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishes.map((wish, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{wish.text}</p>
            <p className="text-right font-semibold text-gray-800 dark:text-gray-200">- {wish.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishesPage;

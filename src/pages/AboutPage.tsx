
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">About This Project</h2>
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          This website was created as a special birthday gift to celebrate Sakshi. It's a collection of wishes, memories, and her favorite music, all in one place.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          The goal was to create a personalized and interactive experience that she can cherish for years to come. Every part of this website has been designed with her in mind, from the layout and colors to the content itself.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;

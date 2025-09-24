
import React, { useState, useEffect } from 'react';

const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://picsum.photos/v2/list?page=2&limit=9');
        const data = await response.json();
        setImages(data.map((img: any) => img.download_url));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Photo Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((imageUrl, index) => (
          <div key={index} className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden">
            <img src={imageUrl} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;

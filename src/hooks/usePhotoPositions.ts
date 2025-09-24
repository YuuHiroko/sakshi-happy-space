import { useMemo } from 'react';

const usePhotoPositions = (photos: any[], displayMode: 'grid' | 'sphere' | 'helix') => {
  const positions = useMemo(() => {
    switch (displayMode) {
      case 'grid':
        return photos.map((_, i) => {
          const x = (i % 4 - 1.5) * 2.5;
          const y = (Math.floor(i / 4) - 1.5) * 3;
          return [x, y, 0];
        });
      case 'sphere':
        return photos.map((_, i) => {
          const phi = Math.acos(-1 + (2 * i) / photos.length);
          const theta = Math.sqrt(photos.length * Math.PI) * phi;
          const x = 3 * Math.cos(theta) * Math.sin(phi);
          const y = 3 * Math.sin(theta) * Math.sin(phi);
          const z = 3 * Math.cos(phi);
          return [x, y, z];
        });
      case 'helix':
        return photos.map((_, i) => {
          const y = (i / photos.length - 0.5) * 8;
          const x = Math.sin(y * 2) * 2;
          const z = Math.cos(y * 2) * 2;
          return [x, y, z];
        });
      default:
        return [];
    }
  }, [photos, displayMode]);

  return positions;
};

export default usePhotoPositions;

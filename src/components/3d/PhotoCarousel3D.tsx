import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, Mesh, BoxGeometry, MeshBasicMaterial } from 'three';

interface PhotoCarousel3DProps {
  photos: Array<{ src: string; alt: string; title?: string }>;
  position: [number, number, number];
  radius: number;
  scale: number;
  isMobile: boolean;
}

const PhotoCarousel3D = ({ photos, position, radius, scale, isMobile }: PhotoCarousel3DProps) => {
  const textures = useLoader(TextureLoader, photos.map(p => p.src));

  const photoCubes = useMemo(() => {
    const angleStep = (2 * Math.PI) / textures.length;
    return textures.map((texture, index) => {
      const angle = angleStep * index;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      const y = position[1];

      const geometry = new BoxGeometry(2, 2, 0.1);
      const material = new MeshBasicMaterial({ map: texture });
      const cube = new Mesh(geometry, material);

      cube.position.set(x, y, z);
      cube.lookAt(0, y, 0);

      return cube;
    });
  }, [textures, radius, position]);

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {photoCubes.map((cube, index) => (
        <primitive key={index} object={cube} />
      ))}
    </group>
  );
};

export default PhotoCarousel3D;
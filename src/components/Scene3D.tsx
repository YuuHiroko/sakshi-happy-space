import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Cake3D from './Cake3D';
import Balloons3D from './Balloons3D';
import Confetti3D from './Confetti3D';
import PhotoCarousel3D from './PhotoCarousel3D';
import Countdown3D from './Countdown3D';
import MusicVisualizer3D from './MusicVisualizer3D';
import GiftBox3D from './GiftBox3D';

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 2, 7], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <Suspense fallback={null}>
        <Cake3D />
        <Balloons3D />
        <Confetti3D />
        <PhotoCarousel3D />
        <Countdown3D />
        <MusicVisualizer3D />
        <GiftBox3D />
      </Suspense>
    </Canvas>
  );
}
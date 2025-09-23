import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Cake3D from './Cake3D';
import Balloons3D from './Balloons3D';
import Confetti3D from './Confetti3D';
import PhotoCarousel3D from './PhotoCarousel3D';
import Countdown3D from './Countdown3D';
import MusicVisualizer3D from './MusicVisualizer3D';
import GiftBox from './3d/GiftBox';

export default function Scene3D() {
  return (
    <div className="w-full h-[60vh] rounded-xl overflow-hidden shadow-xl bg-white/40">
      <Canvas camera={{ position: [0, 2, 7], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <Suspense fallback={null}>
          <Cake3D />
          <Balloons3D />
          <Confetti3D />
          <PhotoCarousel3D />
          <Countdown3D />
          <MusicVisualizer3D />
          <GiftBox />
        </Suspense>
      </Canvas>
    </div>
  );
}
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

const barCount = 16;

export default function MusicVisualizer3D() {
  const bars = useRef<Mesh[]>([]);

  useFrame(({ clock }) => {
    bars.current.forEach((bar, i) => {
      if (bar) {
        bar.scale.y = 0.7 + Math.abs(Math.sin(clock.getElapsedTime() * 2 + i)) * 1.3;
      }
    });
  });

  return (
    <group position={[0, -1.2, 0]}>
      {Array.from({ length: barCount }).map((_, i) => (
        <mesh
          ref={el => (bars.current[i] = el!)}
          key={i}
          position={[(i - barCount / 2) * 0.12, 0, 0]}
        >
          <boxGeometry args={[0.1, 0.6, 0.1]} />
          <meshStandardMaterial color={['#ff8da7', '#f9d423', '#70e1f5'][i % 3]} />
        </mesh>
      ))}
    </group>
  );
}
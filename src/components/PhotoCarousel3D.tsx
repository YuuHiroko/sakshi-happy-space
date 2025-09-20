import { useFrame } from "@react-three/fiber";
import { useState } from "react";

const photos = [
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80",
  "https://images.unsplash.com/photo-1465101178521-cb2936c0b3c1?w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&q=80",
];

function CarouselPhoto({ url, position, rotation }: { url: string; position: [number, number, number]; rotation: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[0.6, 0.4]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[0.56, 0.36]} />
        <meshBasicMaterial color="#eee" />
      </mesh>
    </group>
  );
}

export default function PhotoCarousel3D() {
  const [angle, setAngle] = useState(0);

  useFrame(() => {
    setAngle((prev) => prev + 0.01);
  });

  return (
    <group position={[0, 1.2, 0]}>
      {photos.map((url, idx) => {
        const theta = (angle + (idx * Math.PI * 2) / photos.length);
        const x = Math.cos(theta) * 1.2;
        const z = Math.sin(theta) * 1.2;
        const rotation = [0, -theta + Math.PI / 2, 0] as [number, number, number];
        return (
          <CarouselPhoto key={url} position={[x, 0, z]} rotation={rotation} />
        );
      })}
    </group>
  );
}
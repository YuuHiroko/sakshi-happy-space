import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

const colors = ["#ff8da7", "#f9d423", "#70e1f5", "#9dffb0", "#fff"];
function Balloon({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y += Math.sin(clock.getElapsedTime() + position[0]) * 0.002;
    }
  });
  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, -0.18, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.14, 8]} />
        <meshStandardMaterial color="#999" />
      </mesh>
    </group>
  );
}

export default function Balloons3D() {
  const balloons = Array.from({ length: 8 }).map((_, i) => [
    Math.sin(i) * 1.7,
    1.2 + i * 0.1,
    Math.cos(i) * 1.7,
  ]);
  return (
    <group>
      {balloons.map((pos, i) => (
        <Balloon key={i} position={pos as [number, number, number]} color={colors[i % colors.length]} />
      ))}
    </group>
  );
}
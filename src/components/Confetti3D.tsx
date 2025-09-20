import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

const confettiColors = ["#ff8da7", "#f9d423", "#70e1f5", "#9dffb0", "#ffb6c1", "#fff"];
function ConfettiPiece({ color, position }: { color: string; position: [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y -= 0.01;
      ref.current.rotation.x += 0.02;
      ref.current.rotation.y += 0.01;
      if (ref.current.position.y < -0.5) ref.current.position.y = 1.5;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.04, 0.012, 0.001]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function Confetti3D() {
  const pieces = Array.from({ length: 200 }).map((_, i) => ({
    color: confettiColors[i % confettiColors.length],
    position: [
      (Math.random() - 0.5) * 3,
      Math.random() * 1.2 + 0.8,
      (Math.random() - 0.5) * 2,
    ] as [number, number, number],
  }));

  return (
    <group>
      {pieces.map((piece, i) => (
        <ConfettiPiece key={i} color={piece.color} position={piece.position} />
      ))}
    </group>
  );
}
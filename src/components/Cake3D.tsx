import { useMemo, useState } from "react";
import { useSpring, a } from "@react-spring/three";

function Candle({ position }: { position: [number, number, number] }) {
  const [lit, setLit] = useState(false);
  const { scale } = useSpring({ scale: lit ? 1.5 : 1 });
  return (
    <group position={position}>
      <mesh onClick={() => setLit(l => !l)}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
        <meshStandardMaterial color="#ffb347" />
      </mesh>
      {lit && (
        <a.mesh scale-y={scale} position={[0, 0.18, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial emissive="#ffa500" emissiveIntensity={0.8} color="#fffacd" />
        </a.mesh>
      )}
    </group>
  );
}

export default function Cake3D() {
  const candlePositions = useMemo(
    () => [
      [0.2, 0.22, 0],
      [-0.2, 0.22, 0],
      [0, 0.22, 0.2],
      [0, 0.22, -0.2],
    ],
    []
  );
  return (
    <group position={[0, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.55, 0.55, 0.22, 32]} />
        <meshStandardMaterial color="#fff0f5" />
      </mesh>
      <mesh position={[0, 0.11, 0]}>
        <cylinderGeometry args={[0.47, 0.47, 0.09, 32]} />
        <meshStandardMaterial color="#ffe4e1" />
      </mesh>
      {candlePositions.map((pos, i) => (
        <Candle key={i} position={pos as [number, number, number]} />
      ))}
      <mesh position={[0, 0.22, 0]}>
        <torusGeometry args={[0.48, 0.04, 16, 100]} />
        <meshStandardMaterial color="#ffb6c1" />
      </mesh>
    </group>
  );
}
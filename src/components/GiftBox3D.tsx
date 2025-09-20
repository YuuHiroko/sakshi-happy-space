import { useSpring, a } from "@react-spring/three";
import { useState } from "react";

export default function GiftBox3D() {
  const [open, setOpen] = useState(false);
  const { rotation } = useSpring({ rotation: open ? [Math.PI / 2.5, 0, 0] : [0, 0, 0] });

  return (
    <group position={[1.6, -0.3, 0]}>
      <mesh>
        <boxGeometry args={[0.38, 0.18, 0.38]} />
        <meshStandardMaterial color="#f9d423" />
      </mesh>
      <a.mesh
        position={[0, 0.13, 0]}
        rotation={rotation}
        onClick={() => setOpen(v => !v)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.4, 0.06, 0.4]} />
        <meshStandardMaterial color="#ff8da7" />
      </a.mesh>
      {open && (
        <mesh position={[0, 0.16, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial emissive="#fffacd" emissiveIntensity={1} color="#fff" />
        </mesh>
      )}
    </group>
  );
}
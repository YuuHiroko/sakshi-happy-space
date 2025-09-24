import { Environment, Stars } from '@react-three/drei';

const SceneLighting = () => {
  return (
    <>
      <ambientLight intensity={0.6} color="#ffc0cb" />
      <directionalLight
        position={[15, 20, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={60}
      />
      <pointLight position={[0, 10, 5]} intensity={1} color="#ff69b4" distance={30} decay={1.2} />
      <spotLight position={[0, 20, 0]} angle={0.6} penumbra={0.5} intensity={1.2} color="#ffd700" castShadow />

      <Environment preset="night" environmentIntensity={0.8} />
      <Stars radius={150} depth={60} count={10000} factor={8} saturation={0.5} fade speed={2} />
    </>
  );
};

export default SceneLighting;

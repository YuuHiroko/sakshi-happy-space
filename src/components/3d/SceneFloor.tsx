const SceneFloor = () => {
    return (
      <mesh receiveShadow position={[0, -3.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#1a0c24" transparent opacity={0.4} roughness={0.1} metalness={0.9} />
      </mesh>
    );
  };
  
  export default SceneFloor;
import React from 'react';
import { ContactShadows, Environment } from '@react-three/drei';

export function Lighting() {
  return (
    <>
      {/* Studio Ambient base */}
      <ambientLight intensity={0.8} />

      {/* Main Studio Key Light (warm neutral) */}
      <directionalLight
        position={[6, 8, 6]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0001}
      />

      {/* Rim light for metallic edges and silhouette separation */}
      <directionalLight position={[-6, 4, -4]} intensity={1.2} color="#f0f4ff" />

      {/* Soft bounce fill from floor */}
      <directionalLight position={[0, -4, 4]} intensity={0.4} color="#f5f5f7" />

      {/* Soft studio contact shadows on virtual ground */}
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.35}
        scale={20}
        blur={2.4}
        far={5}
        resolution={512}
        color="#18181b"
      />

      {/* Subtle Environment preset for realistic reflections */}
      <Environment preset="city" />
    </>
  );
}

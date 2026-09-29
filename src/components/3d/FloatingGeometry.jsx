import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function FloatingGeometry({ scrollProgress = 0 }) {
  const torusRef = useRef();
  const ringRef = useRef();
  const sphereRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.15 + scrollProgress * 2;
      torusRef.current.rotation.y = t * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.y = -t * 0.18 + scrollProgress * 1.5;
      ringRef.current.rotation.z = t * 0.08;
    }
    if (sphereRef.current) {
      sphereRef.current.position.y = -2.5 + Math.sin(t * 0.8) * 0.15;
    }
  });

  return (
    <group position={[0, -18, -2]}>
      {/* Large delicate architectural Mobius ring */}
      <mesh ref={torusRef} position={[-2, 1, -3]}>
        <torusGeometry args={[3.2, 0.04, 20, 100]} />
        <meshStandardMaterial
          color="#d4d4d8"
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Second kinetic counter-ring */}
      <mesh ref={ringRef} position={[2.5, -0.8, -4]}>
        <torusGeometry args={[2.5, 0.03, 16, 80]} />
        <meshStandardMaterial
          color="#a1a1aa"
          metalness={0.8}
          roughness={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Frosted translucent glass focal orb */}
      <mesh ref={sphereRef} position={[0, -2, -2]}>
        <sphereGeometry args={[0.9, 36, 36]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.9}
          roughness={0.15}
          thickness={0.8}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function PerfumeModel({ color = '#2b2a29', metalness = 0.4, roughness = 0.1, isHovered = false, floating = true }) {
  const group = useRef();

  useFrame((state) => {
    if (!group.current || !floating) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 1.5 + 5) * 0.04;
    group.current.rotation.y = Math.sin(t * 0.5) * 0.08;
  });

  return (
    <group ref={group} dispose={null} scale={1.3}>
      {/* Outer Thick Monolithic Glass Flacon */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.9, 1.25, 0.5]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.88}
          roughness={0.04}
          thickness={0.8}
          reflectivity={0.9}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Internal Perfume Liquid Core */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.7, 0.95, 0.35]} />
        <meshPhysicalMaterial
          color={color}
          transmission={0.65}
          roughness={0.1}
          reflectivity={0.8}
          envMapIntensity={2.0}
        />
      </mesh>

      {/* Internal Suction Tube */}
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.9, 16]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>

      {/* Atomizer Neck Collar (Brushed Metallic) */}
      <mesh position={[0, 0.67, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.1, 32]} />
        <meshStandardMaterial color="#d4d4d8" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Heavy Milled Aluminum Cap */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.5, 0.38, 0.4]} />
        <meshStandardMaterial color="#1f1f23" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Minimal Brand Seal Ring */}
      <mesh position={[0, 0.72, 0.2]}>
        <ringGeometry args={[0.05, 0.07, 32]} />
        <meshBasicMaterial color="#ffffff" opacity={0.7} transparent />
      </mesh>
    </group>
  );
}

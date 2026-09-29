import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function SunglassesModel({ color = '#222326', metalness = 0.6, roughness = 0.3, isHovered = false, floating = true }) {
  const group = useRef();

  useFrame((state) => {
    if (!group.current || !floating) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 1.6 + 1) * 0.04;
    group.current.rotation.x = Math.sin(t * 0.8) * 0.05;
  });

  return (
    <group ref={group} dispose={null} scale={1.2}>
      {/* Continuous Top Brow Bar */}
      <mesh position={[0, 0.28, 0]}>
        <boxGeometry args={[1.7, 0.05, 0.06]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>

      {/* Nose Bridge Inset */}
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[0.22, 0.03, 0.05]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>

      {/* Silicon Nose Pads */}
      <mesh position={[-0.1, 0.08, -0.05]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.7} roughness={0.3} thickness={0.1} />
      </mesh>
      <mesh position={[0.1, 0.08, -0.05]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.7} roughness={0.3} thickness={0.1} />
      </mesh>

      {/* Left Lens Frame */}
      <mesh position={[-0.48, 0.12, 0]}>
        <boxGeometry args={[0.66, 0.42, 0.04]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      {/* Left Lens Tinted Glass */}
      <mesh position={[-0.48, 0.12, 0.01]}>
        <boxGeometry args={[0.6, 0.36, 0.02]} />
        <meshPhysicalMaterial
          color="#18181b"
          roughness={0.08}
          metalness={0.1}
          transmission={0.65}
          thickness={0.2}
          reflectivity={0.9}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Right Lens Frame */}
      <mesh position={[0.48, 0.12, 0]}>
        <boxGeometry args={[0.66, 0.42, 0.04]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      {/* Right Lens Tinted Glass */}
      <mesh position={[0.48, 0.12, 0.01]}>
        <boxGeometry args={[0.6, 0.36, 0.02]} />
        <meshPhysicalMaterial
          color="#18181b"
          roughness={0.08}
          metalness={0.1}
          transmission={0.65}
          thickness={0.2}
          reflectivity={0.9}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Left Temple Arm extending back */}
      <mesh position={[-0.84, 0.24, -0.45]} rotation={[-0.05, 0.08, 0]}>
        <boxGeometry args={[0.04, 0.04, 0.9]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>

      {/* Right Temple Arm extending back */}
      <mesh position={[0.84, 0.24, -0.45]} rotation={[-0.05, -0.08, 0]}>
        <boxGeometry args={[0.04, 0.04, 0.9]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>

      {/* Micro Titanium Hinge Accents */}
      <mesh position={[-0.84, 0.26, -0.01]}>
        <cylinderGeometry args={[0.03, 0.03, 0.07, 16]} />
        <meshStandardMaterial color="#c0c0c4" metalness={0.98} roughness={0.1} />
      </mesh>
      <mesh position={[0.84, 0.26, -0.01]}>
        <cylinderGeometry args={[0.03, 0.03, 0.07, 16]} />
        <meshStandardMaterial color="#c0c0c4" metalness={0.98} roughness={0.1} />
      </mesh>
    </group>
  );
}

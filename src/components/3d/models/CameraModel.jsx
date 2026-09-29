import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function CameraModel({ color = '#111113', metalness = 0.7, roughness = 0.3, isHovered = false, floating = true }) {
  const group = useRef();

  useFrame((state) => {
    if (!group.current || !floating) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 1.35 + 2.5) * 0.04;
    group.current.rotation.y = Math.sin(t * 0.6) * 0.08;
  });

  return (
    <group ref={group} dispose={null} scale={1.2}>
      {/* Camera Body Core */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 0.85, 0.45]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>

      {/* Textured Vulcanite Leather Grip Wrap */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[1.405, 0.62, 0.455]} />
        <meshStandardMaterial color="#1a1a1c" roughness={0.88} metalness={0.1} />
      </mesh>

      {/* Top Plate Metal Accent */}
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[1.39, 0.06, 0.44]} />
        <meshStandardMaterial color="#d4d4d8" metalness={0.96} roughness={0.15} />
      </mesh>

      {/* Optical Viewfinder Window (Front) */}
      <mesh position={[0.42, 0.28, 0.23]}>
        <boxGeometry args={[0.2, 0.12, 0.02]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          transmission={0.8}
          roughness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {/* Rangefinder Focus Sensor Window */}
      <mesh position={[0.1, 0.28, 0.23]}>
        <circleGeometry args={[0.045, 16]} />
        <meshPhysicalMaterial color="#fbbf24" transmission={0.7} roughness={0.1} />
      </mesh>

      {/* Prime Lens Barrel Mount */}
      <mesh position={[-0.15, -0.04, 0.24]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.1, 36]} />
        <meshStandardMaterial color="#27272a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Lens Main Barrel Ring with Ridges */}
      <mesh position={[-0.15, -0.04, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.24, 36]} />
        <meshStandardMaterial color="#18181b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Front Glass Element with Multi-Coating Reflection */}
      <mesh position={[-0.15, -0.04, 0.52]}>
        <circleGeometry args={[0.28, 36]} />
        <meshPhysicalMaterial
          color="#a855f7"
          transmission={0.75}
          roughness={0.05}
          reflectivity={0.95}
          clearcoat={1}
        />
      </mesh>

      {/* Top Shutter Speed Dial */}
      <mesh position={[0.28, 0.49, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.08, 24]} />
        <meshStandardMaterial color="#52525b" metalness={0.95} roughness={0.2} />
      </mesh>

      {/* Top Shutter Release Button (Brass) */}
      <mesh position={[0.52, 0.49, 0.05]}>
        <cylinderGeometry args={[0.07, 0.07, 0.08, 24]} />
        <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

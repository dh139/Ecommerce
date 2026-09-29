import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function HeadphonesModel({ color = '#151517', metalness = 0.85, roughness = 0.25, isHovered = false, floating = true }) {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    if (floating) {
      // Gentle breathing levitation
      const t = state.clock.getElapsedTime();
      group.current.position.y = Math.sin(t * 1.4) * 0.05;
      group.current.rotation.y = Math.sin(t * 0.7) * 0.08;
    }
  });

  return (
    <group ref={group} dispose={null}>
      {/* Headband Outer Arch */}
      <mesh position={[0, 0.95, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.9, 0.045, 24, 64, Math.PI]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Headband Comfort Cushion (Inner curve) */}
      <mesh position={[0, 0.93, 0]}>
        <torusGeometry args={[0.85, 0.035, 20, 48, Math.PI * 0.75]} />
        <meshStandardMaterial
          color="#18181b"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Headband Adjustment Sliders */}
      {[-0.9, 0.9].map((x, i) => (
        <group key={`slider-${i}`} position={[x, 0.85, 0]}>
          <mesh rotation={[0, 0, x > 0 ? -0.2 : 0.2]}>
            <cylinderGeometry args={[0.055, 0.055, 0.2, 24]} />
            <meshStandardMaterial color="#888" metalness={0.95} roughness={0.15} />
          </mesh>
          <mesh position={[0, -0.12, 0]}>
            <boxGeometry args={[0.03, 0.16, 0.05]} />
            <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
          </mesh>
        </group>
      ))}

      {/* Left Earcup Assembly */}
      <group position={[-1.02, 0.5, 0]} rotation={[0.05, 0.1, -0.15]}>
        {/* Pivot Yoke Fork */}
        <mesh position={[0.05, 0.12, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <torusGeometry args={[0.32, 0.03, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#a0a0a4" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Outer Cup Shell */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.34, 0.32, 0.18, 48]} />
          <meshStandardMaterial
            color={color}
            metalness={metalness}
            roughness={roughness}
            envMapIntensity={1.8}
          />
        </mesh>

        {/* Outer Acoustic Concave Inset */}
        <mesh position={[-0.09, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.26, 0.29, 0.02, 48]} />
          <meshStandardMaterial color="#27272a" metalness={0.4} roughness={0.6} />
        </mesh>

        {/* Engraved Logo Ring */}
        <mesh position={[-0.101, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <ringGeometry args={[0.12, 0.14, 40]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>

        {/* Ear Cushion (Lambskin Memory Foam) */}
        <mesh position={[0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.24, 0.1, 24, 40]} />
          <meshStandardMaterial color="#1a1a1d" roughness={0.88} metalness={0.08} />
        </mesh>

        {/* Inner Speaker Grille Cloth */}
        <mesh position={[0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <circleGeometry args={[0.22, 32]} />
          <meshStandardMaterial color="#121214" roughness={0.95} />
        </mesh>

        {/* Subtle Status Micro-LED Dot */}
        <mesh position={[-0.08, -0.22, 0.08]}>
          <sphereGeometry args={[0.015, 12, 12]} />
          <meshBasicMaterial color="#4ade80" />
        </mesh>
      </group>

      {/* Right Earcup Assembly */}
      <group position={[1.02, 0.5, 0]} rotation={[0.05, -0.1, 0.15]}>
        {/* Pivot Yoke Fork */}
        <mesh position={[-0.05, 0.12, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.32, 0.03, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#a0a0a4" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Outer Cup Shell */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.32, 0.34, 0.18, 48]} />
          <meshStandardMaterial
            color={color}
            metalness={metalness}
            roughness={roughness}
            envMapIntensity={1.8}
          />
        </mesh>

        {/* Outer Acoustic Concave Inset */}
        <mesh position={[0.09, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.29, 0.26, 0.02, 48]} />
          <meshStandardMaterial color="#27272a" metalness={0.4} roughness={0.6} />
        </mesh>

        {/* Engraved Logo Ring */}
        <mesh position={[0.101, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <ringGeometry args={[0.12, 0.14, 40]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>

        {/* Ear Cushion */}
        <mesh position={[-0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.24, 0.1, 24, 40]} />
          <meshStandardMaterial color="#1a1a1d" roughness={0.88} metalness={0.08} />
        </mesh>

        {/* Inner Speaker Grille Cloth */}
        <mesh position={[-0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <circleGeometry args={[0.22, 32]} />
          <meshStandardMaterial color="#121214" roughness={0.95} />
        </mesh>
      </group>
    </group>
  );
}

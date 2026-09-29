import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function SneakerModel({ color = '#eae6df', metalness = 0.1, roughness = 0.6, isHovered = false, floating = true }) {
  const group = useRef();

  useFrame((state) => {
    if (!group.current || !floating) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 1.3 + 3) * 0.04;
    group.current.rotation.y = Math.sin(t * 0.7) * 0.1;
  });

  return (
    <group ref={group} dispose={null} scale={1.2}>
      {/* Upper Main Silhouette */}
      <mesh position={[0, 0.22, 0]} rotation={[0, 0, -0.05]}>
        <boxGeometry args={[1.6, 0.45, 0.68]} />
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </mesh>

      {/* Aerodynamic Toe Taper */}
      <mesh position={[0.7, 0.14, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.5, 0.28, 0.62]} />
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </mesh>

      {/* Sculpted Ankle Collar */}
      <mesh position={[-0.4, 0.52, 0]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.65, 0.35, 0.58]} />
        <meshStandardMaterial color="#27272a" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Tongue & Lacing Shield */}
      <mesh position={[0.1, 0.42, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.6, 0.12, 0.45]} />
        <meshStandardMaterial color="#18181b" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Parametric Lattice Midsole (Layered structural ribs) */}
      <group position={[0.05, -0.12, 0]}>
        {/* Main Sole Cushion Foundation */}
        <mesh>
          <boxGeometry args={[1.9, 0.22, 0.74]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.05} />
        </mesh>

        {/* 3D Lattice Ribs creating architectural depth */}
        {[-0.6, -0.3, 0.0, 0.3, 0.6].map((x, idx) => (
          <mesh key={`rib-${idx}`} position={[x, 0, 0]}>
            <boxGeometry args={[0.08, 0.24, 0.76]} />
            <meshStandardMaterial color="#18181b" roughness={0.5} metalness={0.3} />
          </mesh>
        ))}
      </group>

      {/* High-Abrasion Outsole Base */}
      <mesh position={[0.05, -0.26, 0]}>
        <boxGeometry args={[1.88, 0.06, 0.72]} />
        <meshStandardMaterial color="#0d0d0f" roughness={0.9} />
      </mesh>

      {/* Minimalist Geometric Heel Tab */}
      <mesh position={[-0.8, 0.48, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.06, 0.25, 0.16]} />
        <meshStandardMaterial color="#ef4444" roughness={0.5} />
      </mesh>
    </group>
  );
}

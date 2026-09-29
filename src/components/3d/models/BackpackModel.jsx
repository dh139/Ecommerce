import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function BackpackModel({ color = '#141416', metalness = 0.3, roughness = 0.7, isHovered = false, floating = true }) {
  const group = useRef();

  useFrame((state) => {
    if (!group.current || !floating) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 1.4 + 4) * 0.04;
    group.current.rotation.y = Math.sin(t * 0.65) * 0.08;
  });

  return (
    <group ref={group} dispose={null} scale={1.15}>
      {/* Main Geometric Shell */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.05, 1.45, 0.55]} />
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </mesh>

      {/* Aerodynamic Top Beveled Crown */}
      <mesh position={[0, 0.72, -0.05]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[1.02, 0.25, 0.48]} />
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </mesh>

      {/* Top Grab Handle */}
      <mesh position={[0, 0.9, -0.1]}>
        <boxGeometry args={[0.3, 0.06, 0.1]} />
        <meshStandardMaterial color="#27272a" roughness={0.8} />
      </mesh>

      {/* Front Architectural Inset Seam */}
      <mesh position={[0, 0, 0.28]}>
        <planeGeometry args={[0.02, 1.2]} />
        <meshBasicMaterial color="#09090b" />
      </mesh>

      {/* Magnetic Aluminum Clasp (Fidlock) */}
      <mesh position={[0, 0.35, 0.29]}>
        <boxGeometry args={[0.18, 0.1, 0.04]} />
        <meshStandardMaterial color="#c0c0c5" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.35, 0.31]}>
        <boxGeometry args={[0.08, 0.04, 0.02]} />
        <meshStandardMaterial color="#ef4444" roughness={0.3} />
      </mesh>

      {/* Shoulder Straps (rear) */}
      <mesh position={[-0.32, 0.1, -0.32]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[0.14, 1.1, 0.06]} />
        <meshStandardMaterial color="#1f1f23" roughness={0.85} />
      </mesh>
      <mesh position={[0.32, 0.1, -0.32]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[0.14, 1.1, 0.06]} />
        <meshStandardMaterial color="#1f1f23" roughness={0.85} />
      </mesh>
    </group>
  );
}

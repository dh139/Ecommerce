import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function WatchModel({ color = '#1c1c1f', metalness = 0.9, roughness = 0.18, isHovered = false, floating = true }) {
  const group = useRef();
  const secondHand = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    if (floating) {
      group.current.position.y = Math.sin(t * 1.5 + 2) * 0.04;
      group.current.rotation.y = Math.sin(t * 0.6) * 0.07;
    }
    if (secondHand.current) {
      secondHand.current.rotation.z = -t * 1.2;
    }
  });

  return (
    <group ref={group} dispose={null} scale={1.25}>
      {/* Watch Case Cylinder */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.16, 48]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} envMapIntensity={1.8} />
      </mesh>

      {/* Polished Chamfer Bezel Ring */}
      <mesh position={[0, 0, 0.08]} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.5, 0.55, 48]} />
        <meshStandardMaterial color="#d4d4d8" metalness={0.98} roughness={0.12} />
      </mesh>

      {/* Tactile Crown Dial at 3 o'clock */}
      <mesh position={[0.58, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.1, 24]} />
        <meshStandardMaterial color="#888" metalness={0.95} roughness={0.2} />
      </mesh>

      {/* Watch Dial Face */}
      <mesh position={[0, 0, 0.085]}>
        <circleGeometry args={[0.49, 48]} />
        <meshStandardMaterial color="#0f0f11" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Dial Hour Markers (12 minimal tick dashes) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * Math.PI) / 6;
        const r = 0.42;
        const isCardinal = i % 3 === 0;
        return (
          <mesh
            key={`tick-${i}`}
            position={[Math.sin(angle) * r, Math.cos(angle) * r, 0.088]}
            rotation={[0, 0, -angle]}
          >
            <planeGeometry args={[isCardinal ? 0.022 : 0.012, isCardinal ? 0.07 : 0.04]} />
            <meshBasicMaterial color={isCardinal ? '#ffffff' : '#71717a'} />
          </mesh>
        );
      })}

      {/* Hour Hand */}
      <mesh position={[0, 0.1, 0.091]} rotation={[0, 0, -0.8]}>
        <planeGeometry args={[0.025, 0.22]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Minute Hand */}
      <mesh position={[0, 0.15, 0.092]} rotation={[0, 0, 1.4]}>
        <planeGeometry args={[0.018, 0.32]} />
        <meshBasicMaterial color="#e4e4e7" />
      </mesh>

      {/* Second Hand (animating smoothly) */}
      <group ref={secondHand} position={[0, 0, 0.093]}>
        <mesh position={[0, 0.16, 0]}>
          <planeGeometry args={[0.008, 0.36]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
        <mesh position={[0, 0, 0.001]}>
          <circleGeometry args={[0.025, 16]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      </group>

      {/* Sapphire Crystal Lens Dome */}
      <mesh position={[0, 0, 0.095]}>
        <circleGeometry args={[0.5, 48]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.92}
          roughness={0.05}
          reflectivity={0.9}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Top Strap Segment */}
      <mesh position={[0, 0.72, -0.02]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.42, 0.6, 0.06]} />
        <meshStandardMaterial color="#1a1a1c" roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Bottom Strap Segment */}
      <mesh position={[0, -0.72, -0.02]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.42, 0.6, 0.06]} />
        <meshStandardMaterial color="#1a1a1c" roughness={0.85} metalness={0.05} />
      </mesh>
    </group>
  );
}

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function LampModel({ color = '#c9a65d', metalness = 0.85, roughness = 0.25, isHovered = false, floating = true }) {
  const group = useRef();
  const arm = useRef();

  useFrame((state) => {
    if (!group.current || !floating) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 1.2 + 1.5) * 0.04;
    if (arm.current) {
      arm.current.rotation.z = Math.sin(t * 0.9) * 0.06 - 0.2;
    }
  });

  return (
    <group ref={group} dispose={null} scale={1.2}>
      {/* Cylindrical Counterweight Base */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.14, 36]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>

      {/* Main Vertical Support Rod */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.0, 24]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>

      {/* Center Pivot Sphere Fulcrum */}
      <mesh position={[0, 0.45, 0]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Balanced Cantilever Arm (Moving subtly) */}
      <group ref={arm} position={[0, 0.45, 0]}>
        {/* Horizontal Slender Rod */}
        <mesh position={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 1.6, 24]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
        </mesh>

        {/* Counterweight Ball on short end */}
        <mesh position={[-0.6, 0, 0]}>
          <sphereGeometry args={[0.11, 24, 24]} />
          <meshStandardMaterial color="#1a1a1d" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Floating OLED Light Head on long end */}
        <mesh position={[0.9, -0.04, 0]}>
          <boxGeometry args={[0.42, 0.035, 0.14]} />
          <meshStandardMaterial color="#1a1a1d" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Diffused OLED Light Panel (Glow) */}
        <mesh position={[0.9, -0.06, 0]}>
          <boxGeometry args={[0.38, 0.01, 0.11]} />
          <meshStandardMaterial
            color="#fffbeb"
            emissive="#fef3c7"
            emissiveIntensity={2.5}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}

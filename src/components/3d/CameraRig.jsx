import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CameraRig({ scrollProgress = 0, isModalOpen = false }) {
  const currentPos = useRef(new THREE.Vector3(0, 0.3, 4.2));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.1, 0));

  useFrame((state, delta) => {
    // If modal is open, keep camera stable
    if (isModalOpen) return;

    const pointerX = state.pointer.x * 0.4;
    const pointerY = state.pointer.y * 0.3;

    // Define camera trajectory path based on normalized scroll progress (0 to 1)
    let targetX = pointerX;
    let targetY = 0.3 + pointerY * 0.5;
    let targetZ = 4.2;

    let lookX = pointerX * 0.5;
    let lookY = 0.1 + pointerY * 0.3;
    let lookZ = 0;

    if (scrollProgress < 0.20) {
      // 1. HERO PHASE
      const p = scrollProgress / 0.20;
      targetX = pointerX * (1 - p * 0.5);
      targetY = 0.3 - p * 0.2 + pointerY;
      targetZ = 4.2 - p * 0.8;
      lookX = 0;
      lookY = 0.1;
      lookZ = 0;
    } else if (scrollProgress < 0.42) {
      // 2. PRODUCT REVEAL PHASE (Swoop & focus on NOVA Arc)
      const p = (scrollProgress - 0.20) / 0.22;
      targetX = 1.4 * Math.sin(p * Math.PI) + pointerX * 0.7;
      targetY = 0.2 + Math.cos(p * Math.PI * 0.5) * 0.2 + pointerY;
      targetZ = 3.4 - p * 2.5;
      lookX = -0.3 * p;
      lookY = 0.1;
      lookZ = -1.2 * p;
    } else if (scrollProgress < 0.75) {
      // 3. SPATIAL COLLECTION SHOWROOM (Continuous dolly through 3D showroom)
      const p = (scrollProgress - 0.42) / 0.33;
      // Dolly along the Z axis from -3.0 to -16.5
      targetZ = -3.0 - p * 13.5;
      // Gentle lateral undulating motion as camera navigates through products
      targetX = Math.sin(p * Math.PI * 3) * 0.8 + pointerX * 0.6;
      targetY = 0.2 + Math.cos(p * Math.PI * 2) * 0.25 + pointerY;

      lookX = Math.sin(p * Math.PI * 3) * 0.3;
      lookY = targetY * 0.8;
      lookZ = targetZ - 4.5;
    } else if (scrollProgress < 0.88) {
      // 4. ABOUT / ATMOSPHERIC
      const p = (scrollProgress - 0.75) / 0.13;
      targetX = pointerX * 0.4;
      targetY = -0.2 + pointerY * 0.4;
      targetZ = -16.5 - p * 3.5;

      lookX = 0;
      lookY = -0.5;
      lookZ = -22.0;
    } else {
      // 5. FINAL CTA
      const p = Math.min(1, (scrollProgress - 0.88) / 0.12);
      targetX = pointerX * 0.3;
      targetY = 0.1 + pointerY * 0.2;
      targetZ = -20.0 - p * 1.5;

      lookX = 0;
      lookY = 0.0;
      lookZ = -24.5;
    }

    // Smooth Lerp camera position and orientation
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, 0.08);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, 0.08);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, 0.08);

    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, lookX, 0.08);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, lookY, 0.08);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, lookZ, 0.08);

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ModelRenderer } from './models/ModelRenderer';
import { SpatialArrangement } from './SpatialArrangement';
import { FloatingGeometry } from './FloatingGeometry';
import { PRODUCTS } from '../../data/products';
import { useShowroom } from '../../context/ShowroomContext';

export function HeroShowroomScene({ scrollProgress = 0 }) {
  const heroGroup = useRef();
  const revealGroup = useRef();
  const finalGroup = useRef();
  const { openProductModal } = useShowroom();

  const heroProduct = PRODUCTS[0]; // NOVA One
  const revealProduct = PRODUCTS[1]; // NOVA Arc
  const finalProduct = PRODUCTS[2]; // NOVA Time

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // 1. Hero Product (NOVA One) transform reacts to scroll
    if (heroGroup.current) {
      if (scrollProgress < 0.35) {
        const p = scrollProgress / 0.35;
        // Float away, elevate, and rotate
        heroGroup.current.position.y = 0.1 + Math.sin(t * 1.2) * 0.05 + p * 0.8;
        heroGroup.current.position.z = -p * 3.5;
        heroGroup.current.position.x = -p * 1.5;
        heroGroup.current.rotation.y = t * 0.3 + p * 1.5;
        heroGroup.current.rotation.x = 0.1 + p * 0.4;
        heroGroup.current.scale.setScalar(1.25 * (1 - p * 0.4));
      } else {
        // Move far out of view
        heroGroup.current.position.set(-10, 10, -20);
      }
    }

    // 2. Reveal Product (NOVA Arc) swoops in
    if (revealGroup.current) {
      if (scrollProgress >= 0.12 && scrollProgress <= 0.48) {
        const p = (scrollProgress - 0.12) / 0.36;
        // Slide in from right with rotation
        revealGroup.current.visible = true;
        const entryX = THREE.MathUtils.lerp(2.5, 0.0, Math.min(1, p * 2));
        revealGroup.current.position.x = entryX;
        revealGroup.current.position.y = 0.1 + Math.sin(t * 1.4) * 0.04;
        revealGroup.current.position.z = -1.5;
        revealGroup.current.rotation.y = -0.4 + p * 0.8 + Math.sin(t * 0.8) * 0.06;
        revealGroup.current.rotation.x = 0.1;
      } else if (scrollProgress < 0.12) {
        revealGroup.current.visible = false;
      } else {
        // Past section 2
        revealGroup.current.visible = false;
      }
    }

    // 3. Final Pedestal Product (NOVA Time)
    if (finalGroup.current) {
      if (scrollProgress > 0.85) {
        finalGroup.current.visible = true;
        finalGroup.current.rotation.y = t * 0.4;
        finalGroup.current.position.y = 0.2 + Math.sin(t * 1.2) * 0.04;
      } else {
        finalGroup.current.visible = false;
      }
    }
  });

  return (
    <>
      {/* SECTION 1: HERO PRODUCT (NOVA ONE) */}
      <group
        ref={heroGroup}
        position={[0, 0.1, 0]}
        onClick={() => openProductModal(heroProduct)}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <ModelRenderer
          productId={heroProduct.id}
          color={heroProduct.colors[0].hex}
          metalness={heroProduct.colors[0].metalness}
          roughness={heroProduct.colors[0].roughness}
          floating={false}
        />
      </group>

      {/* SECTION 2: PRODUCT REVEAL (NOVA ARC) */}
      <group
        ref={revealGroup}
        position={[0, 0.1, -1.5]}
        onClick={() => openProductModal(revealProduct)}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <ModelRenderer
          productId={revealProduct.id}
          color={revealProduct.colors[0].hex}
          metalness={revealProduct.colors[0].metalness}
          roughness={revealProduct.colors[0].roughness}
          floating={false}
        />
      </group>

      {/* SECTION 3: 3D SPATIAL COLLECTION */}
      <SpatialArrangement scrollProgress={scrollProgress} />

      {/* SECTION 4: ABOUT KINETIC BACKGROUND */}
      <FloatingGeometry scrollProgress={scrollProgress} />

      {/* SECTION 5: FINAL CTA PEDESTAL */}
      <group
        ref={finalGroup}
        position={[0, 0.2, -23.5]}
        onClick={() => openProductModal(finalProduct)}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <ModelRenderer
          productId={finalProduct.id}
          color={finalProduct.colors[0].hex}
          metalness={finalProduct.colors[0].metalness}
          roughness={finalProduct.colors[0].roughness}
          floating={false}
        />
        {/* Floating Halo Ring under the final piece */}
        <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 0.85, 48]} />
          <meshBasicMaterial color="#a1a1aa" opacity={0.4} transparent />
        </mesh>
      </group>
    </>
  );
}

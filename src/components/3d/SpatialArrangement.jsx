import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ModelRenderer } from './models/ModelRenderer';
import { PRODUCTS } from '../../data/products';
import { useShowroom } from '../../context/ShowroomContext';

function SpatialItem({ product, index, basePosition, baseRotation, scrollProgress }) {
  const group = useRef();
  const [hovered, setHovered] = useState(false);
  const { openProductModal, setHoveredProductId } = useShowroom();

  // Subtle target rotation/scale values for smooth lerp
  const currentScale = useRef(product.scale || 1);
  const currentRotY = useRef(baseRotation[1]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();

    // Floating bobbing motion
    const bob = Math.sin(t * 1.5 + index * 1.2) * 0.04;
    group.current.position.y = basePosition[1] + bob;

    // Hover effect lerp
    const targetScale = hovered ? (product.scale || 1) * 1.14 : (product.scale || 1);
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, 0.1);
    group.current.scale.setScalar(currentScale.current);

    // Subtle cursor tracking / slow continuous showroom spin
    const targetRotY = baseRotation[1] + (hovered ? state.pointer.x * 0.4 : Math.sin(t * 0.4 + index) * 0.2);
    currentRotY.current = THREE.MathUtils.lerp(currentRotY.current, targetRotY, 0.08);
    group.current.rotation.y = currentRotY.current;
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    setHoveredProductId(product.id);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    setHoveredProductId(null);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e) => {
    e.stopPropagation();
    openProductModal(product);
  };

  const activeColor = product.colors[0];

  return (
    <group
      ref={group}
      position={basePosition}
      rotation={baseRotation}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <ModelRenderer
        productId={product.id}
        color={activeColor.hex}
        metalness={activeColor.metalness}
        roughness={activeColor.roughness}
        isHovered={hovered}
        floating={false}
      />

      {/* Floating Spatial Label Pill */}
      <Html
        position={[0, -0.9, 0]}
        center
        distanceFactor={6}
        className="pointer-events-none select-none transition-all duration-300"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            openProductModal(product);
          }}
          className={`pointer-events-auto cursor-pointer rounded-full px-4 py-2 flex items-center gap-3 backdrop-blur-md transition-all duration-300 border ${
            hovered
              ? 'bg-[#121214] text-white border-transparent shadow-2xl scale-110'
              : 'bg-white/80 text-[#121214] border-black/10 shadow-sm opacity-80 hover:opacity-100'
          }`}
        >
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-semibold tracking-wider uppercase font-editorial">
              {product.name}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono-num font-medium">
              ${product.price}
            </span>
          </div>
          <span
            className={`text-[9px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider font-semibold ${
              hovered ? 'bg-white/20 text-white' : 'bg-black/5 text-zinc-600'
            }`}
          >
            Explore
          </span>
        </div>
      </Html>
    </group>
  );
}

export function SpatialArrangement({ scrollProgress = 0 }) {
  // Spatial coordinates tuned to create a dramatic showroom path
  const spatialProducts = [
    {
      ...PRODUCTS[1], // NOVA Arc
      coords: [-2.4, 0.2, -6.5],
      rotation: [0.1, 0.4, 0],
    },
    {
      ...PRODUCTS[2], // NOVA Time
      coords: [2.3, 0.5, -8.2],
      rotation: [0.2, -0.5, 0.1],
    },
    {
      ...PRODUCTS[3], // NOVA Air
      coords: [-1.8, -0.4, -10.5],
      rotation: [0.15, 0.7, -0.05],
    },
    {
      ...PRODUCTS[5], // NOVA Scent
      coords: [2.1, -0.2, -12.4],
      rotation: [-0.1, -0.3, 0.05],
    },
    {
      ...PRODUCTS[6], // NOVA Light
      coords: [-2.2, 0.3, -14.6],
      rotation: [0.1, 0.5, -0.1],
    },
    {
      ...PRODUCTS[7], // NOVA Cam
      coords: [1.9, 0.4, -16.8],
      rotation: [0.15, -0.4, 0.05],
    },
  ];

  return (
    <group position={[0, 0, 0]}>
      {spatialProducts.map((p, idx) => (
        <SpatialItem
          key={p.id}
          product={p}
          index={idx}
          basePosition={p.coords}
          baseRotation={p.rotation}
          scrollProgress={scrollProgress}
        />
      ))}
    </group>
  );
}

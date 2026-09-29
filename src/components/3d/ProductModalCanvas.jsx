import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import { ModelRenderer } from './models/ModelRenderer';

export function ProductModalCanvas({ product, selectedColor, isAdding = false }) {
  const modelGroup = useRef();

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0.4, 3.2], fov: 42 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 8, 5]} intensity={2.0} />
          <directionalLight position={[-5, 3, -3]} intensity={1.2} color="#f0f4ff" />
          <directionalLight position={[0, -3, 3]} intensity={0.5} />

          <group
            ref={modelGroup}
            scale={isAdding ? [1.15, 1.15, 1.15] : [1.1, 1.1, 1.1]}
            position={[0, 0, 0]}
          >
            <ModelRenderer
              productId={product.id}
              color={selectedColor.hex}
              metalness={selectedColor.metalness}
              roughness={selectedColor.roughness}
              floating={true}
            />
          </group>

          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.4}
            scale={8}
            blur={2.0}
            far={4}
            color="#18181b"
          />

          <Environment preset="city" />

          {/* Interactive 360 Rotation & Zoom */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={1.8}
            maxDistance={5.0}
            autoRotate={false}
            autoRotateSpeed={1.0}
            makeDefault
          />
        </Suspense>
      </Canvas>

      {/* Floating 360 Drag Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-black/5 text-[10px] uppercase font-mono tracking-widest text-zinc-500 shadow-sm flex items-center gap-2">
        <svg className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M16 21h5v-5" />
        </svg>
        <span>Drag to rotate 360° • Pinch / scroll to zoom</span>
      </div>
    </div>
  );
}

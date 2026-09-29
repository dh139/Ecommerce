import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Lighting } from './Lighting';
import { CameraRig } from './CameraRig';
import { HeroShowroomScene } from './HeroShowroomScene';
import { useShowroom } from '../../context/ShowroomContext';

export function StudioCanvas() {
  const { scrollProgress, selectedProduct } = useShowroom();

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0.3, 4.2], fov: 42, near: 0.1, far: 50 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="pointer-events-auto"
      >
        <Suspense fallback={null}>
          <Lighting />
          <CameraRig
            scrollProgress={scrollProgress}
            isModalOpen={!!selectedProduct}
          />
          <HeroShowroomScene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}

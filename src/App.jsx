import React from 'react';
import { CartProvider } from './context/CartContext';
import { ShowroomProvider } from './context/ShowroomContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Navbar } from './components/Navbar';
import { CinematicSection } from './components/CinematicSection';
import { ProductCollection } from './components/ProductCollection';
import { ProductDetail } from './components/ProductDetail';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Toast } from './components/Toast';

function FormaShowroom() {
  useSmoothScroll();

  return (
    <div className="relative min-h-screen bg-[#F5F5F3] text-[#0E0E10] font-sans selection:bg-[#0E0E10] selection:text-white overflow-x-hidden">
      {/* Subtle Cinematic Film Grain Overlay */}
      <div className="cinematic-grain" />

      {/* Desktop Custom Follower Cursor with VIEW state */}
      <CustomCursor />

      {/* Floating Notification Toast */}
      <Toast />

      {/* Luxury Minimalist Navigation */}
      <Navbar />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Full-Screen Immersive Product Detail Editorial Overlay */}
      <ProductDetail />

      {/* 01 to 04: Master Pinned Cinematic Stages (Hero, Move, Discover, Collection) */}
      <main>
        <CinematicSection />

        {/* 05: Editorial Product Collection */}
        <ProductCollection />
      </main>

      {/* 07: Minimalist Atelier Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <ShowroomProvider>
        <FormaShowroom />
      </ShowroomProvider>
    </CartProvider>
  );
}

import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';

export function AddToCartFlyer() {
  const { flyingObject } = useCart();
  const [targetCoords, setTargetCoords] = useState(null);

  useEffect(() => {
    if (!flyingObject) return;

    // Find the cart button element position
    const cartEl = document.getElementById('navbar-cart-button');
    if (cartEl) {
      const rect = cartEl.getBoundingClientRect();
      setTargetCoords({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  }, [flyingObject]);

  if (!flyingObject || !targetCoords) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <div
        className="absolute w-8 h-8 rounded-full shadow-2xl flex items-center justify-center animate-fly-to-cart"
        style={{
          '--start-x': `${flyingObject.startX}px`,
          '--start-y': `${flyingObject.startY}px`,
          '--target-x': `${targetCoords.x}px`,
          '--target-y': `${targetCoords.y}px`,
          backgroundColor: flyingObject.color || '#121214',
          border: '2px solid rgba(255,255,255,0.8)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
        }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
      </div>

      <style>{`
        @keyframes flyToCart {
          0% {
            transform: translate(var(--start-x), var(--start-y)) scale(1.4);
            opacity: 1;
          }
          40% {
            transform: translate(calc((var(--start-x) + var(--target-x)) / 2), calc(var(--start-y) - 120px)) scale(1.1);
            opacity: 0.9;
          }
          100% {
            transform: translate(var(--target-x), var(--target-y)) scale(0.3);
            opacity: 0.2;
          }
        }
        .animate-fly-to-cart {
          animation: flyToCart 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}

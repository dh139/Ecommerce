import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorLabel, setCursorLabel] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target;
      const productCard = target.closest('[data-cursor-label]');
      if (productCard) {
        setCursorLabel(productCard.getAttribute('data-cursor-label'));
        setIsHovered(true);
      } else if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.tagName === 'INPUT'
      ) {
        setIsHovered(true);
        setCursorLabel(null);
      } else {
        setIsHovered(false);
        setCursorLabel(null);
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden hidden md:block">
      {/* Follower Ring / Expanded View Circle */}
      <div
        className="fixed top-0 left-0 rounded-full border border-black/40 mix-blend-difference flex items-center justify-center transition-all duration-150 ease-out will-change-transform"
        style={{
          width: cursorLabel ? 56 : isHovered ? 40 : 24,
          height: cursorLabel ? 56 : isHovered ? 40 : 24,
          transform: `translate3d(${pos.x - (cursorLabel ? 28 : isHovered ? 20 : 12)}px, ${pos.y - (cursorLabel ? 28 : isHovered ? 20 : 12)}px, 0)`,
          backgroundColor: cursorLabel ? 'rgba(255,255,255,0.92)' : isHovered ? 'rgba(255,255,255,0.1)' : 'transparent',
          borderColor: cursorLabel ? 'transparent' : 'rgba(255,255,255,0.6)',
        }}
      >
        {cursorLabel && (
          <span className="text-[9px] font-mono-code font-bold tracking-widest text-black uppercase">
            {cursorLabel}
          </span>
        )}
      </div>

      {/* Center Precise Dot */}
      {!cursorLabel && (
        <div
          className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white mix-blend-difference will-change-transform"
          style={{
            transform: `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)`,
          }}
        />
      )}
    </div>
  );
}

import React, { useRef, useEffect, useState } from 'react';

export function CinematicVideo({
  src,
  poster,
  progress = 0,
  isActive = false,
  className = "",
  style = {}
}) {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const lastTimeRef = useRef(0);
  const targetProgressRef = useRef(progress);
  const currentProgressRef = useRef(progress);
  const rafIdRef = useRef(null);
  const isSeekingRef = useRef(false);

  // Keep target progress updated without triggering React re-renders
  useEffect(() => {
    targetProgressRef.current = Math.min(1, Math.max(0, progress));
  }, [progress]);

  // Handle video metadata loaded
  const handleLoadedMetadata = () => {
    setIsLoaded(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0.001;
    }
  };

  // Performant RAF scrubbing loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      video.play().catch(() => {});
      return;
    }

    const onSeeked = () => {
      isSeekingRef.current = false;
    };
    video.addEventListener('seeked', onSeeked);

    let isRunning = true;

    const tick = () => {
      if (!isRunning) return;

      if (isActive && video.duration && !isNaN(video.duration) && video.readyState >= 2) {
        // Damped interpolation to ensure buttery smooth movement
        const diff = targetProgressRef.current - currentProgressRef.current;
        currentProgressRef.current += diff * 0.12;

        const targetTime = currentProgressRef.current * video.duration;

        // Strict seek gate: only seek if the decoder has finished the previous seek
        if (!isSeekingRef.current && Math.abs(video.currentTime - targetTime) > 0.035) {
          isSeekingRef.current = true;
          video.currentTime = targetTime;
          lastTimeRef.current = targetTime;
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      isRunning = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      video.removeEventListener('seeked', onSeeked);
    };
  }, [isActive]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#0e0e10] ${className}`} style={style}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 will-change-transform"
      />

      {/* Subtle Fallback Poster while video buffers */}
      {!isLoaded && poster && (
        <img
          src={poster}
          alt="Cinematic Preview"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      )}

      {/* Subtle vignette shadow to blend video into warm architectural showroom */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/25 via-transparent to-black/15" />
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { FORMA_PRODUCTS } from '../data/products';
import { useShowroom } from '../context/ShowroomContext';

gsap.registerPlugin(ScrollTrigger);

export function CinematicSection() {
  const { openProductDetail } = useShowroom();

  const sectionRef = useRef(null);
  const viewportRef = useRef(null);

  // 4 Video Refs
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const video3Ref = useRef(null);
  const video4Ref = useRef(null);

  // Overlays
  const heroOverlayRef = useRef(null);
  const v2OverlayRef = useRef(null);
  const v3OverlayRef = useRef(null);
  const v4OverlayRef = useRef(null);
  const scrollPromptRef = useRef(null);

  // Chapter indicators
  const num1Ref = useRef(null);
  const num2Ref = useRef(null);
  const num3Ref = useRef(null);
  const num4Ref = useRef(null);
  const progressLineRef = useRef(null);

  // State refs for smooth 60fps scrubbing without React re-renders
  const masterProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const isPinnedRef = useRef(false);
  const rafIdRef = useRef(null);

  // Video target seek timestamps
  const targetTime1Ref = useRef(0);
  const targetTime2Ref = useRef(0);
  const targetTime3Ref = useRef(0);
  const targetTime4Ref = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    const v3 = video3Ref.current;
    const v4 = video4Ref.current;

    if (!section || !viewport || !v1 || !v2 || !v3 || !v4) return;

    // Initialize all 4 videos
    [v1, v2, v3, v4].forEach((v) => {
      v.muted = true;
      v.playsInline = true;
      v.pause();
    });

    // Ensure Video 01 is primed at frame 0.001
    const primeVideo = (v) => {
      if (v && v.readyState >= 1) {
        v.currentTime = 0.001;
      }
    };
    primeVideo(v1);

    const handleMetadata = () => {
      ScrollTrigger.refresh();
    };

    v1.addEventListener('loadedmetadata', handleMetadata);
    v2.addEventListener('loadedmetadata', handleMetadata);
    v3.addEventListener('loadedmetadata', handleMetadata);
    v4.addEventListener('loadedmetadata', handleMetadata);

    // Fast-seek catch-up listeners
    const onSeeked1 = () => {
      const target = targetTime1Ref.current;
      if (!v1.seeking && Math.abs(target - v1.currentTime) > 0.02) {
        v1.currentTime = target;
      }
    };
    const onSeeked2 = () => {
      const target = targetTime2Ref.current;
      if (!v2.seeking && Math.abs(target - v2.currentTime) > 0.02) {
        v2.currentTime = target;
      }
    };
    const onSeeked3 = () => {
      const target = targetTime3Ref.current;
      if (!v3.seeking && Math.abs(target - v3.currentTime) > 0.02) {
        v3.currentTime = target;
      }
    };
    const onSeeked4 = () => {
      const target = targetTime4Ref.current;
      if (!v4.seeking && Math.abs(target - v4.currentTime) > 0.02) {
        v4.currentTime = target;
      }
    };

    v1.addEventListener('seeked', onSeeked1);
    v2.addEventListener('seeked', onSeeked2);
    v3.addEventListener('seeked', onSeeked3);
    v4.addEventListener('seeked', onSeeked4);

    // High performance RAF render loop
    const renderLoop = () => {
      if (isPinnedRef.current) {
        const target = targetProgressRef.current;
        const current = masterProgressRef.current;
        const diff = target - current;

        if (Math.abs(diff) > 0.0005) {
          masterProgressRef.current += diff * 0.14;
        } else {
          masterProgressRef.current = target;
        }

        const p = Math.max(0, Math.min(1, masterProgressRef.current));

        // 1. LAYERED ZERO-DIP CROSSFADING
        // Video 1 (z-10) is solid underneath until Video 2 (z-11) is 100% solid.
        // Video 2 is solid underneath until Video 3 (z-12) is 100% solid.
        // Video 3 is solid underneath until Video 4 (z-13) is 100% solid.
        // NEVER a black dip or flash, whether scrolling forward or backward!
        let op1 = 0;
        let op2 = 0;
        let op3 = 0;
        let op4 = 0;

        // Video 1
        if (p < 0.28) {
          op1 = 1;
        } else {
          op1 = 0;
        }

        // Video 2 (layered over Video 1)
        if (p < 0.20) {
          op2 = 0;
        } else if (p >= 0.20 && p <= 0.28) {
          op2 = (p - 0.20) / 0.08;
        } else if (p > 0.28 && p < 0.53) {
          op2 = 1;
        } else {
          op2 = 0;
        }

        // Video 3 (layered over Video 2)
        if (p < 0.45) {
          op3 = 0;
        } else if (p >= 0.45 && p <= 0.53) {
          op3 = (p - 0.45) / 0.08;
        } else if (p > 0.53 && p < 0.78) {
          op3 = 1;
        } else {
          op3 = 0;
        }

        // Video 4 (layered over Video 3)
        if (p < 0.70) {
          op4 = 0;
        } else if (p >= 0.70 && p <= 0.78) {
          op4 = (p - 0.70) / 0.08;
        } else {
          op4 = 1;
        }

        v1.style.opacity = op1.toFixed(3);
        v2.style.opacity = op2.toFixed(3);
        v3.style.opacity = op3.toFixed(3);
        v4.style.opacity = op4.toFixed(3);

        // 2. TIMELINE SCRUBBING FOR EACH SEGMENT
        // Segment 1 (Video 1: Headphones)
        if (p <= 0.32 && v1.duration && !isNaN(v1.duration)) {
          const segP = Math.min(1, Math.max(0, p / 0.25));
          const targetTime = segP * v1.duration;
          targetTime1Ref.current = targetTime;
          const timeDiff = Math.abs(targetTime - v1.currentTime);
          if (!v1.seeking && timeDiff > 0.02) {
            v1.currentTime = targetTime;
          }
        }

        // Segment 2 (Video 2: Smartwatch)
        if (p >= 0.18 && p <= 0.58 && v2.duration && !isNaN(v2.duration)) {
          const segP = Math.min(1, Math.max(0, (p - 0.25) / 0.25));
          const targetTime = segP * v2.duration;
          targetTime2Ref.current = targetTime;
          const timeDiff = Math.abs(targetTime - v2.currentTime);
          if (!v2.seeking && timeDiff > 0.02) {
            v2.currentTime = targetTime;
          }
        }

        // Segment 3 (Video 3: Eyewear & Perfume)
        if (p >= 0.42 && p <= 0.82 && v3.duration && !isNaN(v3.duration)) {
          const segP = Math.min(1, Math.max(0, (p - 0.50) / 0.25));
          const targetTime = segP * v3.duration;
          targetTime3Ref.current = targetTime;
          const timeDiff = Math.abs(targetTime - v3.currentTime);
          if (!v3.seeking && timeDiff > 0.02) {
            v3.currentTime = targetTime;
          }
        }

        // Segment 4 (Video 4: Collection Reveal)
        if (p >= 0.68 && v4.duration && !isNaN(v4.duration)) {
          const segP = Math.min(1, Math.max(0, (p - 0.75) / 0.25));
          const targetTime = segP * v4.duration;
          targetTime4Ref.current = targetTime;
          const timeDiff = Math.abs(targetTime - v4.currentTime);
          if (!v4.seeking && timeDiff > 0.02) {
            v4.currentTime = targetTime;
          }
        }

        // 3. EDITORIAL OVERLAYS MOTION
        // Hero Overlay (Active 0.00 -> 0.16)
        if (heroOverlayRef.current) {
          const heroOp = Math.max(0, 1 - p / 0.14);
          heroOverlayRef.current.style.opacity = heroOp.toFixed(3);
          heroOverlayRef.current.style.transform = `translateY(${-p * 100}px)`;
          heroOverlayRef.current.style.pointerEvents = heroOp > 0.1 ? 'auto' : 'none';
        }

        // Section 02 Move Overlay (Active 0.26 -> 0.48)
        if (v2OverlayRef.current) {
          let v2Op = 0;
          if (p >= 0.25 && p <= 0.32) {
            v2Op = (p - 0.25) / 0.07;
          } else if (p > 0.32 && p < 0.44) {
            v2Op = 1;
          } else if (p >= 0.44 && p <= 0.50) {
            v2Op = 1 - (p - 0.44) / 0.06;
          }
          v2OverlayRef.current.style.opacity = v2Op.toFixed(3);
          v2OverlayRef.current.style.transform = `translateY(${(0.37 - p) * 45}px)`;
          v2OverlayRef.current.style.pointerEvents = v2Op > 0.1 ? 'auto' : 'none';
        }

        // Section 03 Discover Overlay (Active 0.51 -> 0.73)
        if (v3OverlayRef.current) {
          let v3Op = 0;
          if (p >= 0.50 && p <= 0.57) {
            v3Op = (p - 0.50) / 0.07;
          } else if (p > 0.57 && p < 0.68) {
            v3Op = 1;
          } else if (p >= 0.68 && p <= 0.75) {
            v3Op = 1 - (p - 0.68) / 0.07;
          }
          v3OverlayRef.current.style.opacity = v3Op.toFixed(3);
          v3OverlayRef.current.style.transform = `translateY(${(0.62 - p) * 45}px)`;
          v3OverlayRef.current.style.pointerEvents = v3Op > 0.1 ? 'auto' : 'none';
        }

        // Section 04 Collection Overlay (Active 0.76 -> 1.00)
        if (v4OverlayRef.current) {
          let v4Op = 0;
          if (p >= 0.75 && p <= 0.82) {
            v4Op = (p - 0.75) / 0.07;
          } else if (p > 0.82) {
            v4Op = 1;
          }
          v4OverlayRef.current.style.opacity = v4Op.toFixed(3);
          v4OverlayRef.current.style.transform = `translateY(${(0.88 - p) * 35}px)`;
          v4OverlayRef.current.style.pointerEvents = v4Op > 0.1 ? 'auto' : 'none';
        }

        // Scroll prompt at bottom right
        if (scrollPromptRef.current) {
          const promptOp = Math.max(0, 1 - p / 0.05);
          scrollPromptRef.current.style.opacity = promptOp.toFixed(3);
        }

        // Progress bar line
        if (progressLineRef.current) {
          progressLineRef.current.style.height = `${p * 100}%`;
        }

        // Chapter numeral indicators
        const activeSeg = p < 0.25 ? 1 : p < 0.50 ? 2 : p < 0.75 ? 3 : 4;
        if (num1Ref.current) {
          num1Ref.current.style.color = activeSeg === 1 ? '#FFFFFF' : 'rgba(255,255,255,0.35)';
          num1Ref.current.style.fontWeight = activeSeg === 1 ? '700' : '400';
        }
        if (num2Ref.current) {
          num2Ref.current.style.color = activeSeg === 2 ? '#FFFFFF' : 'rgba(255,255,255,0.35)';
          num2Ref.current.style.fontWeight = activeSeg === 2 ? '700' : '400';
        }
        if (num3Ref.current) {
          num3Ref.current.style.color = activeSeg === 3 ? '#FFFFFF' : 'rgba(255,255,255,0.35)';
          num3Ref.current.style.fontWeight = activeSeg === 3 ? '700' : '400';
        }
        if (num4Ref.current) {
          num4Ref.current.style.color = activeSeg === 4 ? '#FFFFFF' : 'rgba(255,255,255,0.35)';
          num4Ref.current.style.fontWeight = activeSeg === 4 ? '700' : '400';
        }
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    // ScrollTrigger pinning the viewport across the entire 450% journey
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=450%',
      pin: viewport,
      pinSpacing: true,
      scrub: 0.4,
      onToggle: (self) => {
        isPinnedRef.current = self.isActive;
      },
      onUpdate: (self) => {
        targetProgressRef.current = self.progress;
      },
    });

    return () => {
      st.kill();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      v1.removeEventListener('loadedmetadata', handleMetadata);
      v2.removeEventListener('loadedmetadata', handleMetadata);
      v3.removeEventListener('loadedmetadata', handleMetadata);
      v4.removeEventListener('loadedmetadata', handleMetadata);
      v1.removeEventListener('seeked', onSeeked1);
      v2.removeEventListener('seeked', onSeeked2);
      v3.removeEventListener('seeked', onSeeked3);
      v4.removeEventListener('seeked', onSeeked4);
    };
  }, []);

  const scrollToCollection = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-[#0E0E10]">
      {/* Pinned 100vw x 100vh Viewport */}
      <div
        ref={viewportRef}
        className="w-full h-screen overflow-hidden relative select-none bg-[#0E0E10]"
      >
        {/* ================= STACKED ZERO-DIP VIDEO LAYERS ================= */}
        {/* Video 1: Layer z-10 */}
        <video
          ref={video1Ref}
          src="/videos/forma-01.mp4"
          poster="/images/forma-arc.jpg"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none will-change-transform z-10"
          style={{ opacity: 1 }}
        />

        {/* Video 2: Layer z-11 (over Video 1) */}
        <video
          ref={video2Ref}
          src="/videos/forma-02.mp4"
          poster="/images/forma-time.jpg"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none will-change-transform z-11"
          style={{ opacity: 0 }}
        />

        {/* Video 3: Layer z-12 (over Video 2) */}
        <video
          ref={video3Ref}
          src="/videos/forma-03.mp4"
          poster="/images/forma-frame.jpg"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none will-change-transform z-12"
          style={{ opacity: 0 }}
        />

        {/* Video 4: Layer z-13 (over Video 3) */}
        <video
          ref={video4Ref}
          src="/videos/forma-04.mp4"
          poster="/images/forma-collection.jpg"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none will-change-transform z-13"
          style={{ opacity: 0 }}
        />

        {/* Ambient Top & Bottom Contrast Gradients */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/55 via-transparent to-black/45 z-20" />

        {/* ================= EDITORIAL OVERLAYS ================= */}

        {/* 01: HERO OVERLAY */}
        <div
          ref={heroOverlayRef}
          className="absolute inset-0 z-30 flex flex-col justify-between p-6 sm:p-12 md:p-16 pointer-events-none"
        >
          <div className="pt-24 sm:pt-28 max-w-7xl mx-auto w-full pointer-events-auto">
            <span className="text-[11px] font-mono-code uppercase tracking-[0.25em] text-white/80 block mb-2 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
              OBJECTS, DESIGNED DIFFERENTLY.
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-editorial uppercase tracking-tight text-white leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              FORMA
            </h1>
          </div>

          <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-4 pointer-events-auto">
            <div className="space-y-3">
              <p className="text-xs sm:text-sm text-white/85 font-light max-w-xs leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                "Designed objects for modern living."
              </p>
              <button
                onClick={scrollToCollection}
                className="px-6 py-3 rounded-full bg-white/90 hover:bg-white text-[#0E0E10] text-[11px] font-mono-code uppercase tracking-[0.18em] font-semibold backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-2xl"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <div
              ref={scrollPromptRef}
              className="flex items-center gap-2 text-white/70 text-[11px] font-mono-code uppercase tracking-widest drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]"
            >
              <span>SCROLL TO EXPLORE</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </div>
          </div>
        </div>

        {/* 02: MOVE OVERLAY (SMARTWATCH) */}
        <div
          ref={v2OverlayRef}
          className="absolute inset-0 z-30 flex items-center justify-end p-6 sm:p-14 md:p-20 pointer-events-none opacity-0"
        >
          <div className="blur-card-dark p-6 sm:p-8 rounded-2xl max-w-xs sm:max-w-sm text-left shadow-2xl border border-white/10 text-white pointer-events-auto transition-transform duration-500 hover:scale-[1.02]">
            <span className="text-[10px] font-mono-code uppercase tracking-[0.25em] text-white/50 block mb-1">
              FORMA / OBJECT 02
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial uppercase tracking-tight text-white">
              SMARTWATCH
            </h2>
            <p className="text-xs text-white/70 font-light mt-2 leading-relaxed">
              Cold-forged 316L steel with curved sapphire touch lens and organic telemetry.
            </p>
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-lg font-mono-code font-bold text-white">$249</span>
              <button
                onClick={() => openProductDetail(FORMA_PRODUCTS[1])}
                className="group text-[11px] font-mono-code uppercase tracking-wider text-white/90 hover:text-white flex items-center gap-1.5 font-semibold underline underline-offset-4"
              >
                <span>VIEW OBJECT</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* 03: DISCOVER OVERLAY (EYEWEAR & PERFUME) */}
        <div
          ref={v3OverlayRef}
          className="absolute inset-0 z-30 flex flex-col justify-between p-6 sm:p-14 md:p-20 pointer-events-none opacity-0"
        >
          <div className="max-w-xs sm:max-w-sm blur-card-dark p-6 rounded-2xl border border-white/10 text-white pointer-events-auto pt-24 sm:pt-6">
            <span className="text-[10px] font-mono-code uppercase tracking-[0.25em] text-white/50 block mb-1">
              OBJECT 03
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-editorial uppercase tracking-tight text-white">
              SCULPTURAL EYEWEAR
            </h3>
            <p className="text-xs text-white/70 font-light mt-1.5">
              Japanese beta-titanium browbar and polarized Zeiss UV400 mineral glass.
            </p>
            <button
              onClick={() => openProductDetail(FORMA_PRODUCTS[2])}
              className="mt-4 text-[11px] font-mono-code uppercase tracking-wider text-white/90 hover:text-white flex items-center gap-1.5 font-semibold underline underline-offset-4"
            >
              <span>VIEW OBJECT • $189</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="max-w-xs sm:max-w-sm self-end blur-card-dark p-6 rounded-2xl border border-white/10 text-white text-right pointer-events-auto">
            <span className="text-[10px] font-mono-code uppercase tracking-[0.25em] text-white/50 block mb-1">
              OBJECT 04
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-editorial uppercase tracking-tight text-white">
              ARCHIVE PERFUME
            </h3>
            <p className="text-xs text-white/70 font-light mt-1.5">
              32% pure extrait de parfum housed in a monolithic hand-cut dark glass flacon.
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => openProductDetail(FORMA_PRODUCTS[3])}
                className="text-[11px] font-mono-code uppercase tracking-wider text-white/90 hover:text-white flex items-center gap-1.5 font-semibold underline underline-offset-4"
              >
                <span>VIEW OBJECT • $160</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 04: COLLECTION REVEAL OVERLAY */}
        <div
          ref={v4OverlayRef}
          className="absolute inset-0 z-30 flex flex-col justify-between p-6 sm:p-12 md:p-16 pointer-events-none opacity-0"
        >
          <div className="pt-24 text-center max-w-xl mx-auto pointer-events-auto">
            <span className="text-[10px] font-mono-code uppercase tracking-[0.3em] text-white/60 block mb-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              ATELIER SERIES COMPLETE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-editorial uppercase tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              FORMA COLLECTION
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto pointer-events-auto">
            {[
              { label: 'HEADPHONES', id: 'forma-arc' },
              { label: 'WATCH', id: 'forma-time' },
              { label: 'EYEWEAR', id: 'forma-frame' },
              { label: 'PERFUME', id: 'forma-noir' },
              { label: 'SNEAKERS', id: 'forma-motion' },
              { label: 'BAG', id: 'forma-carry' },
            ].map((item) => {
              const product = FORMA_PRODUCTS.find((p) => p.id === item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => product && openProductDetail(product)}
                  className="px-5 py-2.5 rounded-full blur-card-dark text-[11px] font-mono-code uppercase tracking-[0.18em] text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/15 shadow-2xl flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-center pb-6 pointer-events-auto">
            <button
              onClick={scrollToCollection}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/90 hover:bg-white text-[#0E0E10] text-[11px] font-mono-code uppercase tracking-[0.18em] font-semibold shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>EXPLORE PRODUCTS</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </div>

        {/* ================= VERTICAL CHAPTER PROGRESS INDICATOR ================= */}
        <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-35 flex-col items-center gap-4 pointer-events-none">
          <div className="flex flex-col items-center gap-3 text-[10px] font-mono-code">
            <span ref={num1Ref} className="transition-colors duration-300 font-bold text-white">01</span>
            <span ref={num2Ref} className="transition-colors duration-300 text-white/35">02</span>
            <span ref={num3Ref} className="transition-colors duration-300 text-white/35">03</span>
            <span ref={num4Ref} className="transition-colors duration-300 text-white/35">04</span>
          </div>

          <div className="w-[1px] h-20 bg-white/20 relative overflow-hidden rounded-full">
            <div
              ref={progressLineRef}
              className="w-full bg-white transition-all duration-100 origin-top"
              style={{ height: '0%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

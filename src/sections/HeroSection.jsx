import React from 'react';
import { ArrowDown } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useShowroom } from '../context/ShowroomContext';

export function HeroSection() {
  const { openProductModal } = useShowroom();
  const heroProduct = PRODUCTS[0]; // NOVA One

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between px-6 sm:px-12 pt-28 pb-12 pointer-events-none"
    >
      {/* Top Tagline Row */}
      <div className="max-w-7xl mx-auto w-full flex justify-between items-start pt-6">
        <div className="flex flex-col">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-400">
            Catalog Series 01
          </span>
          <span className="text-xs uppercase tracking-widest font-semibold text-zinc-800 mt-1">
            Spatial Listening Instrument
          </span>
        </div>

        <div className="hidden sm:flex flex-col text-right">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-400">
            Showroom Edition
          </span>
          <span className="text-xs uppercase tracking-widest font-semibold text-zinc-800 mt-1">
            Berlin / Tokyo / NYC
          </span>
        </div>
      </div>

      {/* Main Hero Editorial Typography */}
      <div className="max-w-7xl mx-auto w-full my-auto pointer-events-auto">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.35em] font-mono text-zinc-500 font-medium block mb-3">
            Pure Acoustic Form
          </span>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-extrabold font-editorial tracking-tighter uppercase text-zinc-950 leading-[0.9]">
            Objects,
            <br />
            Elevated.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-zinc-600 font-normal max-w-md leading-relaxed">
            "Designed for the way you move." An experimental digital showroom dedicated to monolithic industrial artifacts.
          </p>

          {/* Interactive CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToSection('showroom')}
              className="px-8 py-4 rounded-full bg-[#121214] text-white text-xs uppercase tracking-[0.25em] font-semibold hover:bg-black transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <span>Explore Collection</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>

            <button
              onClick={() => openProductModal(heroProduct)}
              className="px-6 py-4 rounded-full bg-white/70 hover:bg-white border border-black/10 backdrop-blur-md text-xs uppercase tracking-[0.25em] font-semibold text-zinc-800 transition-all duration-300 hover:shadow hover:scale-105"
            >
              Inspect NOVA One • $389
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-widest border-t border-black/5 pt-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Interactive 3D Showroom Active</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span>Scroll to travel through space</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useShowroom } from '../context/ShowroomContext';

export function ShowroomGallerySection() {
  const { openProductModal, hoveredProductId } = useShowroom();

  return (
    <section id="showroom" className="relative min-h-[300vh] w-full pointer-events-none">
      {/* Sticky Top Showroom Indicator Bar */}
      <div className="sticky top-24 left-0 w-full px-6 sm:px-12 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-black/10 px-4 py-2 rounded-full shadow-sm">
            <Compass className="w-4 h-4 text-zinc-700 animate-spin" style={{ animationDuration: '20s' }} />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-700 font-medium">
              3D Digital Showroom • Spatial Flight
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-white/70 backdrop-blur-md border border-black/10 px-4 py-2 rounded-full shadow-sm text-[11px] font-mono text-zinc-500">
            <span>Hover or click any floating object to inspect</span>
          </div>
        </div>
      </div>

      {/* Floating Waypoint 1: Horology & Eyewear */}
      <div className="h-screen w-full flex items-center px-6 sm:px-12">
        <div className="max-w-7xl mx-auto w-full flex justify-start pointer-events-auto">
          <div className="max-w-md bg-white/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-black/10 shadow-lg">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400">
              Waypoint 01 // Optics & Time
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-editorial uppercase tracking-tight text-zinc-900 mt-1">
              Precision Form
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
              Objects calibrated for immediate sensory feedback. Cold-forged steel and polarized Zeiss optics.
            </p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openProductModal(PRODUCTS[1])}
                className="text-xs font-mono uppercase tracking-wider text-zinc-800 hover:text-black flex items-center gap-1 font-semibold underline underline-offset-4"
              >
                Inspect Arc <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-zinc-300">•</span>
              <button
                onClick={() => openProductModal(PRODUCTS[2])}
                className="text-xs font-mono uppercase tracking-wider text-zinc-800 hover:text-black flex items-center gap-1 font-semibold underline underline-offset-4"
              >
                Inspect Time <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Waypoint 2: Kinetics & Fragrance */}
      <div className="h-screen w-full flex items-center px-6 sm:px-12">
        <div className="max-w-7xl mx-auto w-full flex justify-end pointer-events-auto">
          <div className="max-w-md bg-white/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-black/10 shadow-lg text-right">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400">
              Waypoint 02 // Kinetics & Olfaction
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-editorial uppercase tracking-tight text-zinc-900 mt-1">
              Atmospheric Matter
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
              Parametric lattice damping paired with distilled cold stone essence in hand-milled crystal flacons.
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => openProductModal(PRODUCTS[3])}
                className="text-xs font-mono uppercase tracking-wider text-zinc-800 hover:text-black flex items-center gap-1 font-semibold underline underline-offset-4"
              >
                Inspect Air <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-zinc-300">•</span>
              <button
                onClick={() => openProductModal(PRODUCTS[5])}
                className="text-xs font-mono uppercase tracking-wider text-zinc-800 hover:text-black flex items-center gap-1 font-semibold underline underline-offset-4"
              >
                Inspect Scent <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Waypoint 3: Luminaires & Monochrome Optics */}
      <div className="h-screen w-full flex items-center px-6 sm:px-12">
        <div className="max-w-7xl mx-auto w-full flex justify-start pointer-events-auto">
          <div className="max-w-md bg-white/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-black/10 shadow-lg">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400">
              Waypoint 03 // Balance & Monochrome
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-editorial uppercase tracking-tight text-zinc-900 mt-1">
              Gravitational Light
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
              Counterweighted brass sculptures and pure monochrome rangefinder optics crafted without screen distraction.
            </p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openProductModal(PRODUCTS[6])}
                className="text-xs font-mono uppercase tracking-wider text-zinc-800 hover:text-black flex items-center gap-1 font-semibold underline underline-offset-4"
              >
                Inspect Light <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-zinc-300">•</span>
              <button
                onClick={() => openProductModal(PRODUCTS[7])}
                className="text-xs font-mono uppercase tracking-wider text-zinc-800 hover:text-black flex items-center gap-1 font-semibold underline underline-offset-4"
              >
                Inspect Cam <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

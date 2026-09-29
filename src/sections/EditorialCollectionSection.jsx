import React from 'react';
import { ArrowUpRight, Plus, Sliders, Shield } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useShowroom } from '../context/ShowroomContext';
import { useCart } from '../context/CartContext';

export function EditorialCollectionSection() {
  const { openProductModal } = useShowroom();
  const { addToCart } = useCart();

  const pack = PRODUCTS.find((p) => p.id === 'nova-pack');
  const scent = PRODUCTS.find((p) => p.id === 'nova-scent');
  const air = PRODUCTS.find((p) => p.id === 'nova-air');
  const light = PRODUCTS.find((p) => p.id === 'nova-light');
  const cam = PRODUCTS.find((p) => p.id === 'nova-cam');

  return (
    <section id="collection" className="relative w-full py-32 px-6 sm:px-12 bg-[#f4f4f6]/90 backdrop-blur-xl border-t border-black/5 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 pb-8 border-b border-black/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400 block mb-2">
              Curated Artifacts • Edition 2026
            </span>
            <h2 className="text-5xl sm:text-7xl font-extrabold font-editorial uppercase tracking-tight text-zinc-950">
              The Collection
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-zinc-500 max-w-sm font-normal leading-relaxed">
            Every object is sculpted to eliminate visual friction. Monolithic silhouettes, tactile materials, and architectural integrity.
          </p>
        </div>

        {/* EDITORIAL ITEM 1: ASYMMETRIC SPREAD (LEFT FOCUS - NOVA PACK) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-36">
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-black/5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-6 left-6 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
              Object No. 05 // Carry
            </div>
            {/* Visual Editorial Graphic Representation */}
            <div className="h-80 sm:h-96 flex items-center justify-center my-6 relative">
              <div className="w-56 h-72 rounded-2xl bg-gradient-to-br from-[#1c1c1f] to-[#2c2d30] shadow-2xl flex flex-col items-center justify-between p-6 transform group-hover:scale-105 transition-transform duration-500">
                <div className="w-full flex justify-between text-white/50 text-[10px] font-mono">
                  <span>CORDURA VX21</span>
                  <span>IPX5</span>
                </div>
                <div className="w-12 h-6 rounded bg-zinc-700/60 border border-white/20 flex items-center justify-center">
                  <div className="w-3 h-1 bg-red-400 rounded-full" />
                </div>
                <div className="text-center text-white/70 text-xs font-mono tracking-wider">
                  NOVA PACK • 22L
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end pt-4 border-t border-black/5">
              <div>
                <h3 className="text-2xl font-bold font-editorial text-zinc-950 uppercase">
                  {pack.name}
                </h3>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">{pack.subtitle}</p>
              </div>
              <span className="text-xl font-mono-num font-bold text-zinc-900">${pack.price}</span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
              Architectural Transit
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold font-editorial text-zinc-950 leading-tight">
              Structured Volume for Daily Commutes
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              {pack.description}
            </p>
            <div className="space-y-3 pt-4 border-t border-black/5 text-xs">
              <div className="flex justify-between py-1 border-b border-black/5 font-mono">
                <span className="text-zinc-400">Closure</span>
                <span className="font-semibold text-zinc-800">Magnetic Fidlock V-Buckles</span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/5 font-mono">
                <span className="text-zinc-400">Storage</span>
                <span className="font-semibold text-zinc-800">Suspended 16" Sleeve</span>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button
                onClick={() => openProductModal(pack)}
                className="px-6 py-3 rounded-full bg-[#121214] text-white text-xs uppercase tracking-widest font-semibold hover:bg-black transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Inspect in 3D</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => addToCart(pack, pack.colors[0], 1, e.currentTarget.getBoundingClientRect())}
                className="px-6 py-3 rounded-full border border-black/20 bg-white hover:bg-zinc-50 text-zinc-900 text-xs uppercase tracking-widest font-semibold transition-all hover:scale-105"
              >
                Quick Add
              </button>
            </div>
          </div>
        </div>

        {/* EDITORIAL ITEM 2: REVERSED ASYMMETRIC (RIGHT FOCUS - NOVA SCENT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-36">
          <div className="lg:col-span-5 space-y-6 lg:order-1 order-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
              Olfactory Architecture
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold font-editorial text-zinc-950 leading-tight">
              Cold Stone, Smoke & Wet Cedar
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              {scent.description}
            </p>
            <div className="p-4 rounded-2xl bg-white/70 border border-black/5 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-zinc-700">
                <span className="text-zinc-400">Concentration</span>
                <span className="font-semibold">30% Extrait de Parfum</span>
              </div>
              <div className="flex justify-between text-zinc-700">
                <span className="text-zinc-400">Flacon Vessel</span>
                <span className="font-semibold">Hand-cut Flint Glass (410g)</span>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button
                onClick={() => openProductModal(scent)}
                className="px-6 py-3 rounded-full bg-[#121214] text-white text-xs uppercase tracking-widest font-semibold hover:bg-black transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Inspect in 3D</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => addToCart(scent, scent.colors[0], 1, e.currentTarget.getBoundingClientRect())}
                className="px-6 py-3 rounded-full border border-black/20 bg-white hover:bg-zinc-50 text-zinc-900 text-xs uppercase tracking-widest font-semibold transition-all hover:scale-105"
              >
                Acquire • ${scent.price}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-black/5 shadow-xl relative overflow-hidden group lg:order-2 order-1">
            <div className="absolute top-6 left-6 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
              Object No. 06 // Fragrance
            </div>
            <div className="h-80 sm:h-96 flex items-center justify-center my-6 relative">
              <div className="w-48 h-64 rounded-2xl bg-gradient-to-t from-[#201d1b] via-[#3d332d] to-[#1c1a19] shadow-2xl flex flex-col items-center justify-between p-6 transform group-hover:scale-105 transition-transform duration-500">
                <div className="w-16 h-8 rounded-lg bg-zinc-800 border border-white/20" />
                <div className="text-center">
                  <div className="text-xs uppercase tracking-[0.3em] font-editorial text-white/90 font-bold">
                    NOVA SCENT
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono mt-1">EXTRAIT DE PARFUM</div>
                </div>
                <div className="w-full text-center text-white/40 text-[9px] font-mono">
                  100ML / 3.4 FL OZ
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end pt-4 border-t border-black/5">
              <div>
                <h3 className="text-2xl font-bold font-editorial text-zinc-950 uppercase">
                  {scent.name}
                </h3>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">{scent.subtitle}</p>
              </div>
              <span className="text-xl font-mono-num font-bold text-zinc-900">${scent.price}</span>
            </div>
          </div>
        </div>

        {/* EDITORIAL ITEM 3: CENTER STANDALONE SHOWCASE (NOVA AIR) */}
        <div className="mb-36 text-center">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-16 border border-black/5 shadow-2xl relative overflow-hidden group">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-400 block mb-2">
              Object No. 04 // Kinetic Footwear
            </span>
            <h3 className="text-4xl sm:text-6xl font-extrabold font-editorial uppercase text-zinc-950 tracking-tight">
              NOVA Air
            </h3>
            <p className="text-base sm:text-lg italic font-serif text-zinc-500 max-w-lg mx-auto mt-2">
              "Parametrically 3D-lattice sculpted midsole with zero-waste mono-filament."
            </p>

            {/* Standalone floating graphic representation */}
            <div className="h-72 sm:h-80 flex items-center justify-center my-8">
              <div className="w-80 h-36 rounded-3xl bg-[#1e1e22] text-white flex items-center justify-between px-8 shadow-2xl transform group-hover:-translate-y-2 group-hover:rotate-1 transition-all duration-500">
                <div className="text-left font-mono text-xs">
                  <div className="text-zinc-400">TOPOLOGY OPTIMIZED</div>
                  <div className="text-lg font-bold font-editorial">CARBON LATTICE</div>
                </div>
                <div className="text-right font-mono text-xs">
                  <div className="text-zinc-400">NET WEIGHT</div>
                  <div className="text-lg font-bold font-editorial">260 GRAMS</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-black/5">
              <span className="text-2xl font-mono-num font-bold text-zinc-900 mr-2">
                ${air.price}
              </span>
              <button
                onClick={() => openProductModal(air)}
                className="px-8 py-3.5 rounded-full bg-[#121214] text-white text-xs uppercase tracking-widest font-semibold hover:bg-black transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Interactive 3D Inspection</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => addToCart(air, air.colors[0], 1, e.currentTarget.getBoundingClientRect())}
                className="px-6 py-3.5 rounded-full border border-black/20 bg-white hover:bg-zinc-50 text-zinc-900 text-xs uppercase tracking-widest font-semibold transition-all hover:scale-105"
              >
                Direct Acquire
              </button>
            </div>
          </div>
        </div>

        {/* EDITORIAL ITEM 4: TWIN COMPOSITION (NOVA LIGHT & NOVA CAM) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* NOVA Light */}
          <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-lg flex flex-col justify-between group hover:shadow-xl transition-shadow">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                  Object No. 07 // Living
                </span>
                <span className="text-sm font-mono-num font-bold text-zinc-900">${light.price}</span>
              </div>
              <h4 className="text-2xl font-bold font-editorial uppercase text-zinc-950 mt-4">
                {light.name}
              </h4>
              <p className="text-xs text-zinc-500 font-serif italic mt-1">{light.tagline}</p>
              <p className="text-xs text-zinc-600 mt-4 leading-relaxed">{light.description}</p>
            </div>
            <div className="pt-6 mt-6 border-t border-black/5 flex justify-between items-center">
              <span className="text-[11px] font-mono text-zinc-500">{light.material}</span>
              <button
                onClick={() => openProductModal(light)}
                className="p-3 rounded-full bg-zinc-100 hover:bg-black hover:text-white transition-all group-hover:scale-110"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* NOVA Cam */}
          <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-lg flex flex-col justify-between group hover:shadow-xl transition-shadow">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                  Object No. 08 // Optics
                </span>
                <span className="text-sm font-mono-num font-bold text-zinc-900">${cam.price}</span>
              </div>
              <h4 className="text-2xl font-bold font-editorial uppercase text-zinc-950 mt-4">
                {cam.name}
              </h4>
              <p className="text-xs text-zinc-500 font-serif italic mt-1">{cam.tagline}</p>
              <p className="text-xs text-zinc-600 mt-4 leading-relaxed">{cam.description}</p>
            </div>
            <div className="pt-6 mt-6 border-t border-black/5 flex justify-between items-center">
              <span className="text-[11px] font-mono text-zinc-500">{cam.material}</span>
              <button
                onClick={() => openProductModal(cam)}
                className="p-3 rounded-full bg-zinc-100 hover:bg-black hover:text-white transition-all group-hover:scale-110"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

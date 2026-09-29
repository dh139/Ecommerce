import React from 'react';
import { ArrowRight, Eye, Shield } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useShowroom } from '../context/ShowroomContext';

export function ProductRevealSection() {
  const { openProductModal } = useShowroom();
  const revealProduct = PRODUCTS[1]; // NOVA Arc

  return (
    <section className="relative min-h-[140vh] w-full flex items-center px-6 sm:px-12 pointer-events-none">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-24">
        {/* Floating Spatial UI attached to 3D object coordinate */}
        <div className="lg:col-span-6 lg:col-start-7 pointer-events-auto">
          <div className="bg-white/60 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-black/10 shadow-2xl max-w-lg ml-auto transition-transform duration-500 hover:scale-[1.01]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500">
                New Object Reveal
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold font-editorial uppercase text-zinc-950 tracking-tight">
              NOVA Arc
            </h2>

            <p className="text-base sm:text-lg italic font-serif text-zinc-600 mt-2">
              "Form follows movement."
            </p>

            <p className="text-sm text-zinc-600 leading-relaxed mt-4">
              Laser-milled beta-titanium browbar with precision Zeiss mineral glass. Engineered to balance weightlessly against the temporal bone without pressure points.
            </p>

            <div className="flex items-baseline justify-between pt-6 mt-6 border-t border-black/5">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-mono">
                  MSRP Direct
                </span>
                <span className="text-3xl font-mono-num font-bold text-zinc-950">
                  ${revealProduct.price}
                </span>
              </div>

              <button
                onClick={() => openProductModal(revealProduct)}
                className="px-6 py-3.5 rounded-full bg-[#121214] hover:bg-black text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>View Product</span>
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Micro-Specs Pill */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-black/5 text-[10px] font-mono text-zinc-500 text-center">
              <div className="p-2 rounded-lg bg-black/[0.02]">
                <div className="font-semibold text-zinc-800">22g</div>
                <div>Ultralight</div>
              </div>
              <div className="p-2 rounded-lg bg-black/[0.02]">
                <div className="font-semibold text-zinc-800">Zeiss</div>
                <div>UV400 Optics</div>
              </div>
              <div className="p-2 rounded-lg bg-black/[0.02]">
                <div className="font-semibold text-zinc-800">Grade 5</div>
                <div>Beta-Ti</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

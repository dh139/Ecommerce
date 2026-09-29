import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useShowroom } from '../context/ShowroomContext';

export function FinalCTASection() {
  const { openProductModal } = useShowroom();
  const finalProduct = PRODUCTS[2]; // NOVA Time

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between items-center text-center px-6 sm:px-12 py-24 pointer-events-none z-10">
      <div className="w-full" />

      {/* Center Final Brand Statement */}
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <span className="text-xs uppercase tracking-[0.35em] font-mono text-zinc-400 block mb-4">
          Showroom Conclusion
        </span>
        <h2 className="text-6xl sm:text-8xl lg:text-9xl font-black font-editorial uppercase tracking-tight text-zinc-950 leading-[0.9]">
          NOVA
        </h2>
        <p className="text-lg sm:text-2xl font-editorial uppercase tracking-widest text-zinc-600 mt-4">
          Objects, elevated.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection('collection')}
            className="px-8 py-4 rounded-full bg-[#121214] text-white text-xs uppercase tracking-[0.25em] font-semibold hover:bg-black transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
          >
            Explore The Collection
          </button>
          <button
            onClick={() => openProductModal(finalProduct)}
            className="px-6 py-4 rounded-full bg-white/80 hover:bg-white border border-black/10 backdrop-blur-md text-xs uppercase tracking-[0.25em] font-semibold text-zinc-800 transition-all duration-300 hover:shadow hover:scale-105"
          >
            Inspect NOVA Time
          </button>
        </div>
      </div>

      {/* Return to Top Pill */}
      <div className="w-full flex justify-center pointer-events-auto pt-12">
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 hover:bg-white border border-black/10 backdrop-blur-md text-xs font-mono uppercase tracking-widest text-zinc-600 transition-all hover:scale-105"
        >
          <span>Return to Entry</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
}

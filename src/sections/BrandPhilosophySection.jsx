import React from 'react';

export function BrandPhilosophySection() {
  return (
    <section id="philosophy" className="relative min-h-screen w-full flex items-center justify-center px-6 sm:px-12 py-32 pointer-events-none z-10">
      <div className="max-w-5xl mx-auto text-center pointer-events-auto">
        <span className="text-xs uppercase tracking-[0.4em] font-mono text-zinc-400 block mb-8">
          The NOVA Manifesto
        </span>

        {/* Large Statement Typography */}
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black font-editorial uppercase tracking-tight text-zinc-950 leading-[1.0] text-balance">
          We design objects that deserve to be experienced.
        </h2>

        <p className="mt-12 text-base sm:text-xl text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed">
          Not disposable consumer electronics. We treat everyday utilitarian devices as architectural monuments—sculpted in honest raw materials, devoid of unnecessary noise.
        </p>

        {/* Manifesto Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-12 border-t border-black/10 text-left">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">01 // Material Purity</span>
            <h4 className="text-lg font-bold font-editorial text-zinc-900">Cold-Milled Monoliths</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Every curve is milled from solid billets of aerospace titanium, virgin aluminum, or heavy flint crystal.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">02 // Spatial Tactility</span>
            <h4 className="text-lg font-bold font-editorial text-zinc-900">Gravitational Balance</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Counterweights, continuous titanium browbars, and friction pivots engineered for effortless equilibrium.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">03 // Longevity</span>
            <h4 className="text-lg font-bold font-editorial text-zinc-900">Zero Planned Obsolescence</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Modular battery cells, screwless serviceable joints, and firmware designed to last decades, not seasons.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

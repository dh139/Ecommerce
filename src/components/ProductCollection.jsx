import React from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { FORMA_PRODUCTS } from '../data/products';
import { useShowroom } from '../context/ShowroomContext';
import { useCart } from '../context/CartContext';

function ProductCard({ product, className = "", aspect = "aspect-[4/3]", priority = false }) {
  const { openProductDetail } = useShowroom();
  const { addToCart } = useCart();

  return (
    <div
      onClick={() => openProductDetail(product)}
      className={`group relative flex flex-col justify-between cursor-pointer select-none bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-1.5 ${className}`}
      data-cursor-label="VIEW"
    >
      {/* Top Metadata */}
      <div className="flex items-center justify-between text-xs font-mono-code uppercase tracking-wider text-zinc-400 pb-4">
        <span>{product.categoryLabel}</span>
        <span className="font-bold text-zinc-900">${product.price}</span>
      </div>

      {/* Visual Image Presentation with subtle hover zoom */}
      <div className={`relative w-full ${aspect} my-4 overflow-hidden rounded-2xl bg-[#f0f0ee]`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading={priority ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.04] transition-colors duration-500" />
      </div>

      {/* Bottom Typography & CTAs */}
      <div className="pt-4 border-t border-black/[0.05] flex items-end justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold font-editorial uppercase tracking-tight text-zinc-900 group-hover:translate-x-1 transition-transform duration-300">
            {product.name}
          </h3>
          <p className="text-xs text-zinc-500 font-light mt-0.5 max-w-xs line-clamp-1">
            {product.tagline}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            aria-label={`Add ${product.name} to cart`}
            className="p-2.5 rounded-full border border-black/10 bg-white hover:bg-black hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>

          <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono-code uppercase tracking-widest text-zinc-800 font-semibold group-hover:underline underline-offset-4">
            <span>View</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCollection() {
  const arc = FORMA_PRODUCTS[0];
  const time = FORMA_PRODUCTS[1];
  const frame = FORMA_PRODUCTS[2];
  const noir = FORMA_PRODUCTS[3];
  const motion = FORMA_PRODUCTS[4];
  const carry = FORMA_PRODUCTS[5];

  return (
    <section id="products" className="relative w-full py-32 px-6 sm:px-12 md:px-16 bg-[#F5F5F3] z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-black/10">
          <div>
            <span className="text-[11px] font-mono-code uppercase tracking-[0.3em] text-zinc-400 block mb-2">
              Architectural Catalog // 05
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-editorial uppercase tracking-tight text-zinc-950">
              The Collection
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs sm:text-sm text-zinc-600 max-w-sm font-light leading-relaxed">
            Engineered objects stripped of superfluous ornamentation. Sculpted from honest titanium, cold-forged stainless steel, and mineral glass.
          </p>
        </div>

        {/* Spatial Editorial Layout */}
        <div className="space-y-12">
          {/* Row 1: Large Hero Product Spread (FORMA ARC) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <ProductCard
              product={arc}
              className="lg:col-span-8"
              aspect="aspect-[16/9]"
              priority={true}
            />

            {/* Editorial Manifesto Callout */}
            <div className="lg:col-span-4 rounded-3xl p-8 sm:p-10 bg-[#FAF9F6] border border-black/[0.06] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-[0.25em] text-zinc-400 block mb-3">
                  Philosophy / 01
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-editorial uppercase text-zinc-900 leading-tight">
                  Acoustic Purity in Single Monoliths
                </h3>
                <p className="text-xs text-zinc-600 mt-4 leading-relaxed font-light">
                  "We believe personal audio instruments should occupy space with the gravitas of modern architecture. No exposed screws. No visible seams."
                </p>
              </div>

              <div className="pt-6 border-t border-black/5 text-[11px] font-mono-code text-zinc-500">
                CNC-Milled Billet Aluminum • 42h Battery
              </div>
            </div>
          </div>

          {/* Row 2: Staggered Twin Composition (TIME & FRAME) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <ProductCard
              product={time}
              aspect="aspect-[4/3]"
            />
            <ProductCard
              product={frame}
              aspect="aspect-[4/3]"
            />
          </div>

          {/* Row 3: Reversed Large Feature (FORMA NOIR) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-4 rounded-3xl p-8 sm:p-10 bg-[#FAF9F6] border border-black/[0.06] flex flex-col justify-between order-2 lg:order-1">
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-[0.25em] text-zinc-400 block mb-3">
                  Olfaction / 02
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-editorial uppercase text-zinc-900 leading-tight">
                  Cold Stone & Smoky Cedar
                </h3>
                <p className="text-xs text-zinc-600 mt-4 leading-relaxed font-light">
                  Housed in hand-polished flint glass. Formulated in Grasse with a 32% high oil concentration designed to warm directly with pulse temperature.
                </p>
              </div>

              <div className="pt-6 border-t border-black/5 text-[11px] font-mono-code text-zinc-500">
                100ml / 3.4 FL OZ • Hand-Cut Glass Flacon
              </div>
            </div>

            <ProductCard
              product={noir}
              className="lg:col-span-8 order-1 lg:order-2"
              aspect="aspect-[16/9]"
            />
          </div>

          {/* Row 4: Lifestyle Physical Artifacts (MOTION & CARRY) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <ProductCard
              product={motion}
              aspect="aspect-[4/3]"
            />
            <ProductCard
              product={carry}
              aspect="aspect-[4/3]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

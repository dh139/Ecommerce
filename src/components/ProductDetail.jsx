import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Minus, Check, ArrowRight, Shield, Truck, RotateCcw } from 'lucide-react';
import { useShowroom } from '../context/ShowroomContext';
import { useCart } from '../context/CartContext';

export function ProductDetail() {
  const { activeProductDetail, closeProductDetail } = useShowroom();
  const { addToCart, setIsCartOpen } = useCart();

  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const scrollContentRef = useRef(null);

  useEffect(() => {
    if (activeProductDetail?.colors?.length) {
      setSelectedColor(activeProductDetail.colors[0]);
    }
    setQuantity(1);
    setIsAdded(false);
  }, [activeProductDetail]);

  // Handle Lenis pause and body lock when modal is open
  useEffect(() => {
    if (activeProductDetail) {
      if (window.__lenis) {
        window.__lenis.stop();
      }
      const prevBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        if (window.__lenis) {
          window.__lenis.start();
        }
        document.body.style.overflow = prevBodyOverflow;
      };
    }
  }, [activeProductDetail]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeProductDetail();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeProductDetail]);

  if (!activeProductDetail) return null;

  const handleAdd = () => {
    setIsAdded(true);
    addToCart(activeProductDetail, selectedColor, quantity);
    setTimeout(() => {
      setIsAdded(false);
      setIsCartOpen(true);
    }, 600);
  };

  // Enable mouse wheel scrolling across the entire modal surface
  const handleModalWheel = (e) => {
    e.stopPropagation();
    if (scrollContentRef.current && window.innerWidth >= 1024) {
      scrollContentRef.current.scrollTop += e.deltaY;
    }
  };

  return (
    <div 
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto"
    >
      {/* Darkened backdrop */}
      <div
        onClick={closeProductDetail}
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Responsive Centered Modal Dialog */}
      <div 
        data-lenis-prevent="true"
        onWheel={handleModalWheel}
        className="relative w-full max-w-5xl max-h-[92vh] sm:max-h-[90vh] bg-[#FAF9F6] rounded-3xl shadow-2xl border border-black/10 flex flex-col z-10 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        
        {/* Modal Top Bar */}
        <div className="flex-shrink-0 px-6 sm:px-8 py-4 border-b border-black/[0.06] flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2.5">
            <span className="text-base sm:text-lg font-bold font-editorial uppercase tracking-widest text-zinc-950">
              FORMA
            </span>
            <span className="text-zinc-300">/</span>
            <span className="text-[11px] font-mono-code uppercase tracking-wider text-zinc-500">
              {activeProductDetail.categoryLabel}
            </span>
          </div>

          <button
            onClick={closeProductDetail}
            className="p-2 rounded-full bg-white hover:bg-black hover:text-white border border-black/10 transition-all duration-200 hover:scale-105 active:scale-95 text-zinc-700 shadow-sm cursor-pointer"
            aria-label="Close Product View"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Split Content */}
        <div 
          data-lenis-prevent="true"
          className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto lg:overflow-hidden"
        >
          
          {/* LEFT: Product Visual */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex items-center justify-center bg-[#F2F1ED] border-b lg:border-b-0 lg:border-r border-black/[0.06] flex-shrink-0">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-black/[0.06] bg-[#ECECE9] group">
              <img
                src={activeProductDetail.image}
                alt={activeProductDetail.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full blur-card-dark text-[9px] font-mono-code uppercase tracking-widest text-white/90 border border-white/15">
                Atelier Allocation
              </div>
            </div>
          </div>

          {/* RIGHT: Product Information & Controls */}
          <div 
            ref={scrollContentRef}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between lg:overflow-y-auto overscroll-contain space-y-6 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-black/40"
          >
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-[0.25em] text-zinc-400 block mb-1">
                  Object Designation // {activeProductDetail.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-editorial uppercase tracking-tight text-zinc-950">
                  {activeProductDetail.name}
                </h2>
                <p className="text-xs sm:text-sm font-serif italic text-zinc-600 mt-1">
                  "{activeProductDetail.tagline}"
                </p>
              </div>

              {/* Price */}
              <div className="text-2xl font-mono-code font-bold text-zinc-950 pb-3 border-b border-black/[0.06]">
                ${activeProductDetail.price}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
                {activeProductDetail.description}
              </p>

              {/* Specifications Table */}
              <div className="space-y-2 pt-3 border-t border-black/[0.06] text-xs font-mono-code">
                <div className="flex justify-between py-1 border-b border-black/[0.04]">
                  <span className="text-zinc-400 uppercase">Material</span>
                  <span className="font-semibold text-zinc-900 text-right">{activeProductDetail.material}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-black/[0.04]">
                  <span className="text-zinc-400 uppercase">Dimensions</span>
                  <span className="font-semibold text-zinc-900">{activeProductDetail.dimensions}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-black/[0.04]">
                  <span className="text-zinc-400 uppercase">Net Weight</span>
                  <span className="font-semibold text-zinc-900">{activeProductDetail.weight}</span>
                </div>
                {activeProductDetail.specs?.slice(0, 2).map((s, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-black/[0.04]">
                    <span className="text-zinc-400 uppercase">{s.label}</span>
                    <span className="font-semibold text-zinc-900 text-right">{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Color Finish Selector */}
              {activeProductDetail.colors?.length > 0 && (
                <div className="pt-3 border-t border-black/[0.06]">
                  <div className="flex items-center justify-between text-xs font-mono-code uppercase mb-2">
                    <span className="text-zinc-400">Finish:</span>
                    <span className="font-bold text-zinc-900">{selectedColor?.name}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {activeProductDetail.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        aria-label={c.name}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border transition-all duration-200 flex items-center justify-center ${
                          selectedColor?.name === c.name
                            ? 'border-black ring-2 ring-black/20 scale-110'
                            : 'border-black/10 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {selectedColor?.name === c.name && (
                          <Check className={`w-3.5 h-3.5 ${c.hex === '#e7e5e0' || c.hex === '#e5e2da' ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-mono-code uppercase text-zinc-400">Quantity</span>
                <div className="flex items-center border border-black/10 rounded-full px-2.5 py-0.5 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:text-black text-zinc-400 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-7 text-center text-xs font-mono-code font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:text-black text-zinc-400 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons & Trust Signals */}
            <div className="pt-4 border-t border-black/[0.06] space-y-3">
              <button
                onClick={handleAdd}
                disabled={isAdded}
                className="w-full py-3.5 rounded-full bg-[#0E0E10] hover:bg-black text-white text-xs font-mono-code uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {isAdded ? (
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Reserved In Collection</span>
                  </div>
                ) : (
                  <>
                    <span>Add To Cart • ${activeProductDetail.price * quantity}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="grid grid-cols-3 gap-2 pt-1 text-[9px] font-mono-code text-zinc-400 text-center">
                <div className="p-2 rounded-lg bg-white border border-black/[0.04] flex flex-col items-center gap-0.5">
                  <Truck className="w-3 h-3 text-zinc-700" />
                  <span>Express Courier</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-black/[0.04] flex flex-col items-center gap-0.5">
                  <Shield className="w-3 h-3 text-zinc-700" />
                  <span>2-Yr Warranty</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-black/[0.04] flex flex-col items-center gap-0.5">
                  <RotateCcw className="w-3 h-3 text-zinc-700" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

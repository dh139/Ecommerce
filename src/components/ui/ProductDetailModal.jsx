import React, { useState } from 'react';
import { X, Plus, Minus, Check, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useShowroom } from '../../context/ShowroomContext';
import { useCart } from '../../context/CartContext';
import { ProductModalCanvas } from '../3d/ProductModalCanvas';

export function ProductDetailModal() {
  const { selectedProduct, closeProductModal } = useShowroom();
  const { addToCart, setIsCartOpen } = useCart();

  if (!selectedProduct) return null;

  const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'specs'
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    const btnRect = e.currentTarget.getBoundingClientRect();
    setIsAdding(true);

    addToCart(selectedProduct, selectedColor, quantity, btnRect);

    setTimeout(() => {
      setIsAdding(false);
    }, 700);
  };

  const handleBuyNow = (e) => {
    handleAddToCart(e);
    setTimeout(() => {
      setIsCartOpen(true);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto lg:overflow-hidden flex items-center justify-center p-3 sm:p-6 lg:p-12 animate-in fade-in duration-300">
      {/* Darkened blur backdrop */}
      <div
        onClick={closeProductModal}
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity"
      />

      {/* Main Modal Container */}
      <div className="relative w-full max-w-6xl h-full max-h-[92vh] bg-[#fbfbfd]/95 backdrop-blur-2xl rounded-3xl border border-black/10 shadow-2xl flex flex-col lg:flex-row overflow-hidden z-10 animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-5 right-5 z-30 p-2.5 rounded-full bg-white/80 hover:bg-white text-zinc-700 hover:text-black border border-black/10 shadow-sm transition-all duration-200 hover:scale-105"
          aria-label="Close Product View"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: 3D INTERACTIVE CANVAS */}
        <div className="w-full lg:w-3/5 h-[340px] sm:h-[420px] lg:h-full relative bg-gradient-to-b from-white/60 to-zinc-100/60 border-b lg:border-b-0 lg:border-r border-black/5 flex items-center justify-center">
          <ProductModalCanvas
            product={selectedProduct}
            selectedColor={selectedColor}
            isAdding={isAdding}
          />
        </div>

        {/* RIGHT COLUMN: EDITORIAL PRODUCT DETAILS & COMMERCE CONTROLS */}
        <div className="w-full lg:w-2/5 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Category & Badge */}
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2">
              <span>{selectedProduct.category}</span>
              <span className="text-zinc-600 font-semibold">Available for Dispatch</span>
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-zinc-900 tracking-tight">
              {selectedProduct.name}
            </h2>
            <p className="text-sm font-medium text-zinc-500 mt-1">
              {selectedProduct.subtitle}
            </p>

            {/* Price */}
            <div className="text-2xl font-mono-num font-semibold text-zinc-900 mt-4 pb-4 border-b border-black/5">
              ${selectedProduct.price}
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-6 mt-4 border-b border-black/5 text-xs uppercase tracking-wider font-semibold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2.5 transition-colors relative ${
                  activeTab === 'overview'
                    ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black'
                    : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2.5 transition-colors relative ${
                  activeTab === 'specs'
                    ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black'
                    : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                Engineering Specs
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'overview' ? (
              <div className="mt-4 space-y-4">
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {selectedProduct.description}
                </p>
                <blockquote className="border-l-2 border-black/20 pl-3 py-1 text-xs italic text-zinc-500">
                  "{selectedProduct.story}"
                </blockquote>
              </div>
            ) : (
              <div className="mt-4 space-y-2.5 text-xs">
                {selectedProduct.specs.map((s, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-black/5">
                    <span className="text-zinc-400 font-mono uppercase">{s.label}</span>
                    <span className="font-medium text-zinc-800">{s.value}</span>
                  </div>
                ))}
                <div className="flex justify-between py-1 border-b border-black/5">
                  <span className="text-zinc-400 font-mono uppercase">Materials</span>
                  <span className="font-medium text-zinc-800">{selectedProduct.material}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-400 font-mono uppercase">Weight</span>
                  <span className="font-medium text-zinc-800">{selectedProduct.weight}</span>
                </div>
              </div>
            )}

            {/* COLOR SELECTOR */}
            <div className="mt-6 pt-5 border-t border-black/5">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-semibold uppercase tracking-wider text-zinc-800">
                  Finish / Color:
                </span>
                <span className="font-mono text-zinc-500">{selectedColor.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 ${
                      selectedColor.name === color.name
                        ? 'border-black ring-2 ring-black/20 scale-110'
                        : 'border-black/10 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                  >
                    {selectedColor.name === color.name && (
                      <Check
                        className={`w-4 h-4 ${
                          color.hex === '#eae6df' || color.hex === '#e8e6e1' || color.hex === '#f0f2f5'
                            ? 'text-black'
                            : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY SELECTOR */}
            <div className="mt-5 flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-800">
                Quantity:
              </span>
              <div className="flex items-center border border-black/10 rounded-full px-3 py-1 bg-white/70">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:text-black text-zinc-400 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-mono font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:text-black text-zinc-400 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS & TRUST SIGNALS */}
          <div className="mt-8 pt-5 border-t border-black/5 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full py-3.5 rounded-xl border border-black/20 bg-white/80 hover:bg-black hover:text-white text-zinc-900 font-semibold uppercase tracking-widest text-xs transition-all duration-300 shadow-sm active:scale-[0.98]"
              >
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-xl bg-[#121214] hover:bg-black text-white font-semibold uppercase tracking-widest text-xs transition-all duration-300 shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Acquire Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-zinc-400 text-center font-mono">
              <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-black/[0.02]">
                <Truck className="w-3.5 h-3.5 text-zinc-600" />
                <span>Express Courier</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-black/[0.02]">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
                <span>2-Year Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-black/[0.02]">
                <RefreshCw className="w-3.5 h-3.5 text-zinc-600" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    cartCount,
    subtotal,
    updateQuantity,
    removeFromCart,
    isCheckingOut,
    checkoutSuccess,
    setCheckoutSuccess,
    handleCheckout
  } = useCart();

  useEffect(() => {
    if (isCartOpen) {
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
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div 
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Darkened Blurred Backdrop */}
      <div
        onClick={() => {
          if (!isCheckingOut) {
            setIsCartOpen(false);
            setCheckoutSuccess(false);
          }
        }}
        className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Slide-over Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          data-lenis-prevent="true"
          className="w-screen max-w-md bg-[#FAF9F6] border-l border-black/10 shadow-2xl flex flex-col justify-between p-6 sm:p-8 animate-in slide-in-from-right duration-300"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-black/[0.08]">
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold font-editorial uppercase tracking-widest text-zinc-950">
                  Cart
                </span>
                <span className="text-xs font-mono-code text-zinc-500 bg-zinc-200/70 px-2.5 py-0.5 rounded-full">
                  {cartCount} {cartCount === 1 ? 'Object' : 'Objects'}
                </span>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setCheckoutSuccess(false);
                }}
                className="p-2 rounded-full hover:bg-black/5 text-zinc-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Checkout Success Screen */}
            {checkoutSuccess ? (
              <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-editorial uppercase text-zinc-900">
                  Allocation Secured
                </h3>
                <p className="text-xs text-zinc-500 max-w-xs leading-relaxed font-light">
                  Your objects have been scheduled for private white-glove courier dispatch from our Zurich atelier.
                </p>
                <button
                  onClick={() => {
                    setCheckoutSuccess(false);
                    setIsCartOpen(false);
                  }}
                  className="mt-6 px-6 py-3 rounded-full bg-[#0E0E10] text-white text-xs font-mono-code uppercase tracking-widest font-semibold hover:bg-black transition-colors"
                >
                  Return to Showroom
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-28 text-center space-y-3">
                <p className="text-zinc-400 font-editorial text-lg uppercase tracking-wide">
                  Your reserve is empty
                </p>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto font-light">
                  Explore the showroom to discover elevated industrial objects.
                </p>
              </div>
            ) : (
              /* Items List */
              <div 
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                className="divide-y divide-black/[0.06] max-h-[52vh] overflow-y-auto pr-1 mt-4 [scrollbar-width:thin]"
              >
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover bg-zinc-200"
                      />
                      <div>
                        <h4 className="text-sm font-bold font-editorial uppercase tracking-tight text-zinc-950">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono-code mt-0.5">
                          <span>{item.color}</span>
                          <span>•</span>
                          <span>${item.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-black/10 rounded-full px-2 py-0.5 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.color, -1)}
                          className="p-1 hover:text-black text-zinc-400"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono-code font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.color, 1)}
                          className="p-1 hover:text-black text-zinc-400"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.color)}
                        className="text-zinc-400 hover:text-red-500 p-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Footer */}
          {!checkoutSuccess && cartItems.length > 0 && (
            <div className="border-t border-black/[0.08] pt-6 space-y-4">
              <div className="space-y-1 text-xs font-mono-code text-zinc-500">
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-zinc-900 font-semibold">Complimentary White Glove</span>
                </div>
                <div className="flex justify-between">
                  <span>Atelier Duties</span>
                  <span className="text-zinc-900 font-semibold">Included</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-base font-bold pt-2 border-t border-black/[0.04]">
                <span className="font-editorial uppercase tracking-wider text-zinc-900">Subtotal</span>
                <span className="font-mono-code text-2xl text-zinc-950">${subtotal}</span>
              </div>

              <button
                disabled={isCheckingOut}
                onClick={handleCheckout}
                className="w-full py-4 rounded-full bg-[#0E0E10] text-white flex items-center justify-center gap-3 font-mono-code font-bold uppercase tracking-[0.25em] text-xs hover:bg-black transition-all duration-300 shadow-xl disabled:opacity-60 active:scale-[0.99]"
              >
                {isCheckingOut ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Securing Objects...</span>
                  </div>
                ) : (
                  <>
                    <span>Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 font-mono-code uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Encrypted 256-bit Atelier Escrow</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

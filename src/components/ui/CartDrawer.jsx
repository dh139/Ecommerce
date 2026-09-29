import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

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
    orderSuccess,
    setOrderSuccess,
    handleCheckout,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Frosted Backdrop */}
      <div
        onClick={() => {
          if (!isCheckingOut) {
            setIsCartOpen(false);
            setOrderSuccess(false);
          }
        }}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Floating Side Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fafafa]/95 backdrop-blur-2xl border-l border-black/10 shadow-2xl flex flex-col justify-between p-6 sm:p-8 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-black/10">
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold uppercase tracking-widest font-editorial">
                  Cart
                </span>
                <span className="text-xs font-mono text-zinc-500 bg-zinc-200/80 px-2 py-0.5 rounded-full">
                  {cartCount} {cartCount === 1 ? 'Object' : 'Objects'}
                </span>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setOrderSuccess(false);
                }}
                className="p-2 rounded-full hover:bg-black/5 text-zinc-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Order Success State */}
            {orderSuccess ? (
              <div className="py-16 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-editorial">Acquisition Confirmed</h3>
                <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
                  Your order has been reserved in our climate-controlled vault. Dispatched via express courier.
                </p>
                <button
                  onClick={() => {
                    setOrderSuccess(false);
                    setIsCartOpen(false);
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#121214] text-white text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors"
                >
                  Return to Showroom
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              /* Empty State */
              <div className="py-24 text-center space-y-4">
                <p className="text-zinc-400 font-editorial text-lg">Your collection is empty.</p>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Explore our digital showroom to discover elevated industrial objects.
                </p>
              </div>
            ) : (
              /* Items List */
              <div className="divide-y divide-black/5 max-h-[50vh] overflow-y-auto pr-1 mt-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Color dot badge */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border border-black/10 shadow-inner"
                        style={{ backgroundColor: item.colorHex || '#222' }}
                      />
                      <div>
                        <h4 className="text-sm font-semibold tracking-wide font-editorial">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono mt-0.5">
                          <span>{item.color}</span>
                          <span>•</span>
                          <span>${item.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity adjuster */}
                      <div className="flex items-center border border-black/10 rounded-full px-2 py-0.5 bg-white/60">
                        <button
                          onClick={() => updateQuantity(item.id, item.color, -1)}
                          className="p-1 hover:text-black text-zinc-400"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.color, 1)}
                          className="p-1 hover:text-black text-zinc-400"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id, item.color)}
                        className="text-zinc-400 hover:text-red-500 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {!orderSuccess && cartItems.length > 0 && (
            <div className="border-t border-black/10 pt-6 space-y-4">
              <div className="space-y-1.5 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono text-zinc-900 font-medium">Complimentary Courier</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes Included</span>
                  <span className="font-mono text-zinc-900 font-medium">$0.00</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-base font-bold pt-2 border-t border-black/5">
                <span className="font-editorial uppercase tracking-wider">Subtotal</span>
                <span className="font-mono-num text-xl text-zinc-900">${subtotal}</span>
              </div>

              <button
                disabled={isCheckingOut}
                onClick={handleCheckout}
                className="w-full py-4 rounded-xl bg-[#121214] text-white flex items-center justify-center gap-3 font-semibold uppercase tracking-widest text-xs hover:bg-black transition-all duration-300 shadow-xl disabled:opacity-60 active:scale-[0.99]"
              >
                {isCheckingOut ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Securing Objects...</span>
                  </div>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Encrypted 256-bit White-Glove Escrow</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

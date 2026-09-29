import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useShowroom } from '../context/ShowroomContext';
import { FORMA_PRODUCTS } from '../data/products';

export function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { openProductDetail, searchOpen, setSearchOpen } = useShowroom();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const filteredProducts = searchQuery.trim()
    ? FORMA_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      {/* 
        Fixed Navbar strictly transparent over the video 
        Grid layout guarantees genuine centering of center nav links
      */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 sm:px-12 md:px-16 py-6 sm:py-8 pointer-events-none transition-all duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 items-center">
          
          {/* LEFT: Brand Logo */}
          <div className="flex items-center justify-start pointer-events-auto">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 tracking-[0.22em] font-editorial text-xl sm:text-2xl font-black uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:scale-105"
            >
              <span>FORMA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block mb-1 group-hover:scale-150 transition-transform" />
            </a>
          </div>

          {/* CENTER: Genuinely centered desktop navigation */}
          <nav className="hidden md:flex items-center justify-center gap-10 text-[12px] font-mono-code uppercase tracking-[0.22em] font-medium text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] pointer-events-auto">
            <button
              onClick={() => scrollToSection('products')}
              className="hover:text-white/70 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all"
            >
              Shop
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="hover:text-white/70 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all"
            >
              Collection
            </button>
            <button
              onClick={() => scrollToSection('footer')}
              className="hover:text-white/70 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all"
            >
              About
            </button>
          </nav>

          {/* RIGHT: Search & Cart & Mobile Toggle */}
          <div className="flex items-center justify-end gap-6 sm:gap-8 pointer-events-auto">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search Collection"
              className="flex items-center gap-2 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] hover:text-white/70 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline text-[11px] font-mono-code uppercase tracking-[0.18em] font-medium">
                Search
              </span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Cart"
              className="flex items-center gap-2 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] hover:text-white/70 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-[11px] font-mono-code uppercase tracking-[0.18em] font-bold">
                Cart {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] p-1"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0E0E10] text-white flex flex-col justify-between p-8 sm:p-12 md:hidden animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <span className="text-xl font-bold font-editorial uppercase tracking-widest">
              FORMA •
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-8 my-auto">
            <span className="text-[10px] font-mono-code uppercase tracking-[0.3em] text-white/40">
              Menu Navigation
            </span>
            <button
              onClick={() => scrollToSection('products')}
              className="text-left text-4xl font-editorial font-bold tracking-tight uppercase hover:text-zinc-400 transition-colors"
            >
              Shop Collection
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="text-left text-4xl font-editorial font-bold tracking-tight uppercase hover:text-zinc-400 transition-colors"
            >
              Architectural Objects
            </button>
            <button
              onClick={() => scrollToSection('footer')}
              className="text-left text-4xl font-editorial font-bold tracking-tight uppercase hover:text-zinc-400 transition-colors"
            >
              About FORMA
            </button>
          </div>

          <div className="border-t border-white/10 pt-6 flex justify-between text-[11px] font-mono-code text-white/50 uppercase">
            <span>Objects, designed differently.</span>
            <span>Edition 2026</span>
          </div>
        </div>
      )}

      {/* Search Overlay Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-24 px-4">
          <div className="bg-[#FAF9F6] w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-4">
              <div className="flex items-center gap-3 w-full">
                <Search className="w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search audio, horology, eyewear, flacon..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full text-base sm:text-lg outline-none bg-transparent placeholder:text-zinc-400 text-zinc-900 font-sans"
                />
              </div>
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-1.5 rounded-full hover:bg-zinc-200 text-zinc-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-2">
              {(searchQuery.trim() ? filteredProducts : FORMA_PRODUCTS).map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    openProductDetail(p);
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="group flex items-center justify-between p-3 rounded-2xl hover:bg-black/[0.04] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded-xl object-cover bg-zinc-200"
                    />
                    <div>
                      <h4 className="text-sm font-bold font-editorial uppercase tracking-tight text-zinc-900">
                        {p.name}
                      </h4>
                      <p className="text-xs text-zinc-500 font-light">{p.categoryLabel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono-code font-bold text-zinc-900">
                      ${p.price}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

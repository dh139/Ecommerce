import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowUpRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useShowroom } from '../../context/ShowroomContext';
import { PRODUCTS } from '../../data/products';

export function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { openProductModal } = useShowroom();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const filteredProducts = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-5 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2 tracking-[0.25em] font-editorial text-xl md:text-2xl font-bold uppercase transition-transform duration-300 hover:scale-105"
          >
            <span>NOVA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#121214] inline-block mb-1 group-hover:scale-150 transition-transform"></span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-10 text-[13px] uppercase tracking-widest font-medium text-zinc-600">
            <button
              onClick={() => scrollToSection('showroom')}
              className="hover:text-black transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full after:transition-all"
            >
              Shop
            </button>
            <button
              onClick={() => scrollToSection('collection')}
              className="hover:text-black transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full after:transition-all"
            >
              Collection
            </button>
            <button
              onClick={() => scrollToSection('philosophy')}
              className="hover:text-black transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full after:transition-all"
            >
              About
            </button>
          </nav>

          {/* Right Action Icons (Search, Cart, Mobile Toggle) */}
          <div className="flex items-center gap-5 md:gap-7">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search Catalog"
              className="flex items-center gap-2 text-zinc-700 hover:text-black transition-colors group p-1"
            >
              <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="hidden lg:inline text-[11px] uppercase tracking-widest font-medium text-zinc-500">
                Search
              </span>
            </button>

            {/* Cart Button */}
            <button
              id="navbar-cart-button"
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
              className="relative flex items-center gap-2 bg-white/80 hover:bg-white border border-black/10 px-4 py-2 rounded-full backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4 text-zinc-800" />
              <span className="text-[12px] uppercase tracking-widest font-semibold text-zinc-800">
                Cart
              </span>
              <span className="w-5 h-5 rounded-full bg-[#121214] text-white text-[11px] font-mono-num font-medium flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/70 backdrop-blur-md border border-black/10 text-zinc-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#f7f7f9] flex flex-col justify-between px-8 py-24 md:hidden animate-in fade-in duration-300">
          <div className="flex flex-col gap-8">
            <span className="text-[11px] uppercase tracking-[0.3em] text-zinc-400 font-mono">
              Navigation
            </span>
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left text-4xl font-editorial font-bold tracking-tight text-zinc-900 hover:translate-x-2 transition-transform"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('showroom')}
              className="text-left text-4xl font-editorial font-bold tracking-tight text-zinc-900 hover:translate-x-2 transition-transform"
            >
              Shop Showroom
            </button>
            <button
              onClick={() => scrollToSection('collection')}
              className="text-left text-4xl font-editorial font-bold tracking-tight text-zinc-900 hover:translate-x-2 transition-transform"
            >
              Collection
            </button>
            <button
              onClick={() => scrollToSection('philosophy')}
              className="text-left text-4xl font-editorial font-bold tracking-tight text-zinc-900 hover:translate-x-2 transition-transform"
            >
              About NOVA
            </button>
          </div>

          <div className="border-t border-black/10 pt-6 flex justify-between items-center text-xs tracking-widest uppercase text-zinc-500">
            <span>Objects, elevated.</span>
            <span>Est. 2026</span>
          </div>
        </div>
      )}

      {/* Search Overlay Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-start justify-center pt-24 px-4">
          <div className="bg-[#ffffff] w-full max-w-2xl rounded-2xl p-6 shadow-2xl border border-black/10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-4">
              <div className="flex items-center gap-3 w-full">
                <Search className="w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search objects, audio, eyewear, horology..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full text-lg outline-none bg-transparent placeholder:text-zinc-400 text-zinc-900"
                />
              </div>
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-1 rounded-full hover:bg-zinc-100 text-zinc-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results or Suggested List */}
            <div className="max-h-80 overflow-y-auto space-y-3">
              {(searchQuery.trim() ? filteredProducts : PRODUCTS.slice(0, 4)).map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    openProductModal(product);
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="group flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-zinc-100 flex items-center justify-center text-xs font-mono font-medium text-zinc-700">
                      {product.category[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold tracking-wide font-editorial">
                        {product.name}
                      </h4>
                      <p className="text-xs text-zinc-500">{product.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono-num font-semibold text-zinc-900">
                      ${product.price}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ))}

              {searchQuery.trim() && filteredProducts.length === 0 && (
                <div className="text-center py-8 text-zinc-400 text-sm">
                  No objects found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

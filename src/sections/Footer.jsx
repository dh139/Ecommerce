import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[#101012] text-white pt-24 pb-12 px-6 sm:px-12 z-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Manifesto & Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold font-editorial uppercase tracking-[0.2em]">
                NOVA
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block mb-1" />
            </div>
            <p className="text-sm text-zinc-400 font-light max-w-sm leading-relaxed">
              Industrial atelier dedicated to timeless tactile instruments. Engineered with zero unnecessary ornamentation.
            </p>

            <form onSubmit={handleSubmit} className="pt-2 max-w-md">
              <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-2">
                Private Register Allocation
              </label>
              <div className="flex items-center border border-white/20 rounded-full p-1 bg-white/5 focus-within:border-white transition-colors">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-transparent px-4 py-2 text-xs w-full outline-none text-white placeholder:text-zinc-500 font-sans"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <span className="text-[10px] text-emerald-400 font-mono mt-1 block">
                  Invitation recorded. We will notify you for Drop 02.
                </span>
              )}
            </form>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
            <div className="space-y-3">
              <span className="text-zinc-500 uppercase tracking-widest block text-[10px]">Showroom</span>
              <ul className="space-y-2 text-zinc-400">
                <li><a href="#hero" className="hover:text-white transition-colors">NOVA One — Audio</a></li>
                <li><a href="#showroom" className="hover:text-white transition-colors">NOVA Arc — Eyewear</a></li>
                <li><a href="#showroom" className="hover:text-white transition-colors">NOVA Time — Horology</a></li>
                <li><a href="#collection" className="hover:text-white transition-colors">NOVA Air — Footwear</a></li>
                <li><a href="#collection" className="hover:text-white transition-colors">NOVA Pack — Carry</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-zinc-500 uppercase tracking-widest block text-[10px]">Atelier</span>
              <ul className="space-y-2 text-zinc-400">
                <li><a href="#philosophy" className="hover:text-white transition-colors">Philosophy</a></li>
                <li><a href="#philosophy" className="hover:text-white transition-colors">Materials Journal</a></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Acoustic Lab</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Bespoke Inquiries</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Retail Spaces</span></li>
              </ul>
            </div>

            <div className="space-y-3 col-span-2 sm:col-span-1">
              <span className="text-zinc-500 uppercase tracking-widest block text-[10px]">Service</span>
              <ul className="space-y-2 text-zinc-400">
                <li><span className="hover:text-white transition-colors cursor-pointer">White Glove Shipping</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">2-Year Atelier Warranty</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Serial Verification</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Disassembly Guides</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-4">
          <div className="flex items-center gap-6">
            <span>© 2026 NOVA Atelier Corp.</span>
            <span>Objects, elevated.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Atelier</span>
            <span className="hover:text-white cursor-pointer transition-colors">System Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

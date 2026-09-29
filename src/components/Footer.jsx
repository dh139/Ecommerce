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
    <footer id="footer" className="relative bg-[#0E0E10] text-white pt-28 pb-14 px-6 sm:px-12 md:px-16 z-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-white/10">
          {/* Brand Manifesto & Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black font-editorial uppercase tracking-[0.25em]">
                FORMA
              </span>
              <span className="w-2 h-2 rounded-full bg-white inline-block mb-1" />
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-sm leading-relaxed">
              Objects, designed differently. An experimental digital showroom presenting limited allocations of architectural industrial design.
            </p>

            <form onSubmit={handleSubmit} className="pt-2 max-w-md">
              <label className="block text-[10px] font-mono-code uppercase tracking-[0.25em] text-zinc-400 mb-2">
                Private Register Allocation
              </label>
              <div className="flex items-center border border-white/20 rounded-full p-1 bg-white/5 focus-within:border-white transition-colors">
                <input
                  type="email"
                  placeholder="Enter email for Drop 02 invitations"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-transparent px-4 py-2 text-xs w-full outline-none text-white placeholder:text-zinc-500 font-sans"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="p-2.5 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <span className="text-[10px] text-emerald-400 font-mono-code mt-1.5 block">
                  Invitation recorded. We will notify you for Series 02 allocation.
                </span>
              )}
            </form>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono-code">
            <div className="space-y-3">
              <span className="text-zinc-500 uppercase tracking-widest block text-[10px]">Showroom</span>
              <ul className="space-y-2 text-zinc-400">
                <li><a href="#products" className="hover:text-white transition-colors">FORMA ARC — Audio</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">FORMA TIME — Horology</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">FORMA FRAME — Eyewear</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">FORMA NOIR — Fragrance</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">FORMA MOTION — Footwear</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">FORMA CARRY — Carry</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-zinc-500 uppercase tracking-widest block text-[10px]">Studio Coordinates</span>
              <ul className="space-y-2 text-zinc-400">
                <li><span>Zurich • Atelier Hauptsitz</span></li>
                <li><span>Tokyo • Aoyama Gallery</span></li>
                <li><span>Milan • Via della Spiga</span></li>
                <li><span>Bespoke Engineering</span></li>
                <li><span>Materials Laboratory</span></li>
              </ul>
            </div>

            <div className="space-y-3 col-span-2 sm:col-span-1">
              <span className="text-zinc-500 uppercase tracking-widest block text-[10px]">Client Services</span>
              <ul className="space-y-2 text-zinc-400">
                <li><span>White-Glove Courier</span></li>
                <li><span>2-Year Atelier Warranty</span></li>
                <li><span>Cryptographic Authenticity</span></li>
                <li><span>Repair & Servicing</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-code text-zinc-500 gap-4">
          <div className="flex items-center gap-6">
            <span>© 2026 FORMA Atelier Corp.</span>
            <span>Objects, designed differently.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Charter</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Atelier</span>
            <span className="hover:text-white cursor-pointer transition-colors">Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

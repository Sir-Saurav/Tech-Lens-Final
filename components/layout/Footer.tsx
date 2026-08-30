import Link from 'next/link';
import { Focus, Play, Share2, Globe, ExternalLink } from 'lucide-react';

const channels = [
  { name: 'Gadget Verse', url: '#' },
  { name: 'Tech Space', url: '#' },
  { name: 'Gadget Bits', url: '#' },
  { name: 'Gadget Adda', url: '#' },
  { name: 'Tech Buddie', url: '#' },
  { name: 'Tech States', url: '#' },
  { name: 'Lyrics Tope', url: '#' },
];

const categories = [
  { name: 'Smartphones', slug: 'smartphones' },
  { name: 'Laptops', slug: 'laptops' },
  { name: 'Audio', slug: 'audio' },
  { name: 'Cameras', slug: 'cameras' },
  { name: 'Tablets', slug: 'tablets' },
  { name: 'Smartwatches', slug: 'smartwatches' },
  { name: 'Gaming', slug: 'gaming' },
  { name: 'TVs', slug: 'tvs' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#070c18] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="p-1.5 bg-cyan-500/10 rounded-lg">
                <Focus className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="font-bold text-xl">
                Tech<span className="text-cyan-400">Lens</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Honest reviews. Real opinions. Smart choices. We aggregate real user reviews from across the web so you can buy with confidence.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors" aria-label="YouTube">
                <Play className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors" aria-label="Twitter">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors" aria-label="Instagram">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2.5">
              {categories.map(cat => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* YouTube Channels */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Our Channels</h3>
            <ul className="space-y-2.5">
              {channels.map(ch => (
                <li key={ch.name}>
                  <a
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors group"
                  >
                    <Play className="w-3.5 h-3.5 text-red-500/60 group-hover:text-red-400 transition-colors" />
                    {ch.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">TechLens</h3>
            <ul className="space-y-2.5 mb-6">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'How We Review', href: '/about#methodology' },
                { label: 'Contact', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Affiliate Disclosure', href: '/disclosure' },
              ].map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/10">
              <p className="text-xs text-gray-500 leading-relaxed">
                <span className="text-cyan-400 font-medium">Affiliate Disclosure:</span> TechLens earns from qualifying Amazon purchases. This never affects our review scores.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} TechLens. All rights reserved. Domain: techlens.store
          </p>
          <p className="text-xs text-gray-600">
            Prices updated daily · Reviews from real users · No paid placements
          </p>
        </div>
      </div>
    </footer>
  );
}

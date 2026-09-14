import Link from 'next/link';
import { CATEGORIES } from '@/lib/data';

const channels = [
  { name: 'Gadget Verse', url: 'https://youtube.com/@GadgetVerse' },
  { name: 'Tech Space', url: 'https://youtube.com/@TechSpace' },
  { name: 'Gadget Bits', url: 'https://youtube.com/@GadgetBits' },
  { name: 'Gadget Adda', url: 'https://youtube.com/@GadgetAdda' },
  { name: 'Tech Buddie', url: 'https://youtube.com/@TechBuddie' },
  { name: 'Tech States', url: 'https://youtube.com/@TechStates' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#DDE1E6] bg-[#FFFFFF] mt-24 text-sm text-[#5C5C5C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Mission */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <div className="w-7 h-7 rounded bg-[#1A1A1A] flex items-center justify-center text-white">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <line x1="12" y1="3" x2="12" y2="7" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <line x1="3" y1="12" x2="7" y2="12" />
                  <line x1="17" y1="12" x2="21" y2="12" />
                  <circle cx="12" cy="12" r="3" fill="#2A6B4A" stroke="none" />
                </svg>
              </div>
              <span className="font-bold text-lg text-[#1A1A1A]">
                Gadget<span className="text-[#2D5986]">Lens</span>
              </span>
            </Link>
            <p className="text-sm text-[#5C5C5C] leading-relaxed mb-6">
              Independent consumer electronics evaluations, reproducible benchmark testing, and multi-platform opinion synthesis.
            </p>
            <div className="font-mono text-xs text-[#858585] tracking-tight">
              DOMAIN: gadgetlens.store
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-sm text-[#5C5C5C] hover:text-[#2D5986] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Video Channels */}
          <div>
            <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">
              Review Channels
            </h3>
            <ul className="space-y-2">
              {channels.map((ch) => (
                <li key={ch.name}>
                  <a
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#5C5C5C] hover:text-[#2D5986] transition-colors flex items-center gap-1.5"
                  >
                    <span>{ch.name}</span>
                    <span className="text-xs text-[#858585]">↗</span>
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/channels"
                  className="text-xs font-semibold text-[#2D5986] hover:underline"
                >
                  View all network channels →
                </Link>
              </li>
            </ul>
          </div>

          {/* Standards & Disclosure */}
          <div>
            <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">
              Standards
            </h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/about" className="text-sm text-[#5C5C5C] hover:text-[#2D5986] transition-colors">
                  About GadgetLens
                </Link>
              </li>
              <li>
                <Link href="/about#methodology" className="text-sm text-[#5C5C5C] hover:text-[#2D5986] transition-colors">
                  Testing Methodology
                </Link>
              </li>
              <li>
                <Link href="/disclosure" className="text-sm text-[#5C5C5C] hover:text-[#2D5986] transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-[#5C5C5C] hover:text-[#2D5986] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>

            <div className="p-3 bg-[#F5F6F4] border border-[#DDE1E6] rounded text-xs text-[#5C5C5C] leading-relaxed">
              <span className="font-semibold text-[#1A1A1A]">Editorial Independence:</span> GadgetLens is reader-supported. We may earn an affiliate commission when you purchase through our links. This does not alter our testing protocols or scores.
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#DDE1E6] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#858585]">
          <p>© {new Date().getFullYear()} GadgetLens. All rights reserved.</p>
          <p>Standardized measurement protocols · Real user sentiment analysis · Zero sponsored scores</p>
        </div>
      </div>
    </footer>
  );
}

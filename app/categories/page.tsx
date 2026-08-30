import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Smartphone, Laptop, Headphones, Camera, Tablet, Watch, Gamepad2, Tv, Home, Zap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Browse by Category | TechLens',
  description: 'Browse tech product reviews by category — smartphones, laptops, audio, cameras, tablets, smartwatches, gaming, TVs and more.',
};

const CATEGORIES = [
  { name: 'Smartphones', slug: 'smartphones', icon: Smartphone, count: 120, desc: 'Flagship phones, mid-range picks, budget buys', color: 'cyan' },
  { name: 'Laptops', slug: 'laptops', icon: Laptop, count: 85, desc: 'MacBooks, Windows ultrabooks, gaming laptops', color: 'blue' },
  { name: 'Audio', slug: 'audio', icon: Headphones, count: 64, desc: 'Headphones, earbuds, speakers, soundbars', color: 'purple' },
  { name: 'Cameras', slug: 'cameras', icon: Camera, count: 42, desc: 'DSLRs, mirrorless, action cams, point-and-shoot', color: 'pink' },
  { name: 'Tablets', slug: 'tablets', icon: Tablet, count: 38, desc: 'iPads, Android tablets, e-readers', color: 'indigo' },
  { name: 'Smartwatches', slug: 'smartwatches', icon: Watch, count: 55, desc: 'Apple Watch, Galaxy Watch, fitness trackers', color: 'green' },
  { name: 'Gaming', slug: 'gaming', icon: Gamepad2, count: 71, desc: 'Consoles, gaming PCs, controllers, accessories', color: 'red' },
  { name: 'TVs', slug: 'tvs', icon: Tv, count: 29, desc: 'OLED, QLED, 4K, 8K smart TVs', color: 'yellow' },
  { name: 'Smart Home', slug: 'smart-home', icon: Home, count: 33, desc: 'Smart speakers, routers, security cameras', color: 'orange' },
  { name: 'Accessories', slug: 'accessories', icon: Zap, count: 88, desc: 'Chargers, cases, cables, power banks', color: 'teal' },
];

const colorMap: Record<string, string> = {
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:border-cyan-500/40',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:border-blue-500/40',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:border-purple-500/40',
  pink: 'bg-pink-500/10 text-pink-400 border-pink-500/20 hover:border-pink-500/40',
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:border-indigo-500/40',
  green: 'bg-green-500/10 text-green-400 border-green-500/20 hover:border-green-500/40',
  red: 'bg-red-500/10 text-red-400 border-red-500/20 hover:border-red-500/40',
  yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:border-yellow-500/40',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20 hover:border-orange-500/40',
  teal: 'bg-teal-500/10 text-teal-400 border-teal-500/20 hover:border-teal-500/40',
};

export default function CategoriesPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">All Categories</p>
          <h1 className="text-3xl font-bold text-white">Browse by Category</h1>
          <p className="text-gray-400 mt-1">
            {CATEGORIES.reduce((a, c) => a + c.count, 0)}+ products reviewed across {CATEGORIES.length} categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CATEGORIES.map(cat => {
            const colors = colorMap[cat.color] || colorMap.cyan;
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className={`group relative p-6 rounded-2xl border bg-[#111827] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${colors}`}
              >
                <div className={`inline-flex p-3 rounded-xl mb-4 ${colors.split(' ').slice(0, 2).join(' ')}`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <h2 className="font-bold text-white text-lg mb-1 group-hover:text-current transition-colors">{cat.name}</h2>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">{cat.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400">{cat.count}+ reviews</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    Browse →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

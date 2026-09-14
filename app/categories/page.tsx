import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Smartphone, Laptop, Headphones, Camera, Tablet, Watch, Gamepad2, Tv, ArrowRight, Layers
} from 'lucide-react';
import { CATEGORIES, ALL_PRODUCTS } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Categories | GadgetLens',
  description: 'Browse comprehensive hardware reviews across 8 primary lab categories — tested for real-world reliability and value.',
};

const ICON_MAP: Record<string, typeof Smartphone> = {
  smartphones: Smartphone,
  laptops: Laptop,
  audio: Headphones,
  cameras: Camera,
  tablets: Tablet,
  smartwatches: Watch,
  gaming: Gamepad2,
  tvs: Tv,
};

export default function CategoriesPage() {
  return (
    <div className="pt-28 pb-20 bg-[#F5F6F4] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="border-b border-[#DDE1E6] pb-8 mb-10">
          <div className="flex items-center gap-2 font-mono text-xs text-[#2D5986] uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Coverage Index</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight mb-3">
            Hardware Categories
          </h1>
          <p className="text-sm sm:text-base text-[#4B5563] max-w-2xl leading-relaxed">
            All reviews adhere to structured measurement protocols with calibrated instrumentation and verified purchase tracking.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map(cat => {
            const Icon = ICON_MAP[cat.slug] || Layers;
            const liveCount = ALL_PRODUCTS.filter(
              p => p.category.toLowerCase() === cat.name.toLowerCase()
            ).length;

            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group p-6 bg-white border border-[#DDE1E6] rounded-xl hover:border-[#2D5986] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F5F6F4] border border-[#DDE1E6] flex items-center justify-center text-[#2D5986] group-hover:bg-[#2D5986] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-medium text-[#4B5563] bg-[#F5F6F4] px-2 py-0.5 rounded border border-[#DDE1E6]">
                      {liveCount} {liveCount === 1 ? 'review' : 'reviews'}
                    </span>
                  </div>

                  <h2 className="font-serif text-lg font-bold text-[#111827] group-hover:text-[#2D5986] transition-colors mb-2">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-[#4B5563] leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#F5F6F4] font-mono text-xs text-[#2D5986] font-medium">
                  <span>Browse lab tests</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { SlidersHorizontal, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import type { Product } from '@/types';

// Mock products for display until DB populated
const MOCK_PRODUCTS: Product[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  asin: `B0MOCK${String(i).padStart(4, '0')}`,
  slug: `product-review-${i + 1}`,
  title: [
    'Apple iPhone 16 Pro Max 256GB', 'Samsung Galaxy S25 Ultra', 'Sony WH-1000XM5 Headphones',
    'MacBook Pro 14" M4 Pro', 'Google Pixel 9 Pro 256GB', 'Apple iPad Pro M4 11"',
    'OnePlus 13 256GB', 'Bose QuietComfort 45', 'Dell XPS 15 Intel Ultra 9',
    'Samsung Galaxy Tab S10+', 'Apple Watch Series 10 46mm', 'Sony Alpha A6700 Camera',
  ][i],
  brand: ['Apple', 'Samsung', 'Sony', 'Apple', 'Google', 'Apple', 'OnePlus', 'Bose', 'Dell', 'Samsung', 'Apple', 'Sony'][i],
  category: ['Smartphones', 'Smartphones', 'Audio', 'Laptops', 'Smartphones', 'Tablets', 'Smartphones', 'Audio', 'Laptops', 'Tablets', 'Smartwatches', 'Cameras'][i],
  price: [134900, 129999, 26990, 198900, 109999, 99900, 69999, 24990, 189900, 89999, 41900, 129990][i],
  currency: 'INR',
  rating: [4.7, 4.6, 4.8, 4.9, 4.5, 4.7, 4.4, 4.6, 4.3, 4.5, 4.4, 4.7][i],
  reviewCount: [2847, 1923, 5621, 934, 1124, 762, 1456, 3214, 589, 876, 1203, 445][i],
  thumbnail: [
    'https://m.media-amazon.com/images/I/81JxBZJ8hML._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71p-M3sPhhL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61vVJMkphtL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71an9eiBxpL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71a4MI0TVNL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71SjXBRUBNL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71JFncLqMZL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61CGHv6kmWL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71UjZFUFwML._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/81cYFpDUkiL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71M3h7CGPML._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71T1BK6vfCL._SL1500_.jpg',
  ][i],
  images: [],
  verdictScore: [9.2, 9.0, 9.5, 9.6, 8.8, 9.1, 8.5, 8.9, 8.2, 8.6, 8.4, 9.0][i],
  verdictPros: ['Great feature', 'Excellent build', 'Top performance'],
  verdictCons: ['Expensive', 'Limited features'],
  features: [], inStock: true, isFeatured: i < 4, isPublished: true,
  affiliateUrl: '#',
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  updatedAt: new Date().toISOString(),
}));

const CATEGORIES = ['All', 'Smartphones', 'Laptops', 'Audio', 'Cameras', 'Tablets', 'Smartwatches', 'Gaming', 'TVs'];
const SORTS = [
  { value: 'newest', label: 'Latest' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
  { value: 'score', label: 'TechLens Score' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

interface SearchParams {
  category?: string;
  sort?: string;
  minRating?: string;
  search?: string;
}

export const metadata = {
  title: 'All Tech Reviews | TechLens',
  description: 'Browse honest tech product reviews across smartphones, laptops, audio, cameras and more. Real user opinions from Amazon, Reddit and YouTube.',
};

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const activeCategory = params.category || 'All';
  const activeSort = params.sort || 'newest';

  const filtered = MOCK_PRODUCTS.filter(p =>
    activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">All Reviews</h1>
          <p className="text-gray-400 mt-1">{filtered.length} products reviewed with real user opinions</p>
        </div>

        {/* Category filter pills */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-6">
          {CATEGORIES.map(cat => (
            <Link
              key={cat}
              href={cat === 'All' ? '/products' : `/products?category=${cat}`}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/8'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Sort bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <SlidersHorizontal className="w-4 h-4" />
            <span>{filtered.length} results</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort:</span>
            <div className="flex gap-1 overflow-x-auto hide-scrollbar">
              {SORTS.map(s => (
                <Link
                  key={s.value}
                  href={`/products?category=${activeCategory}&sort=${s.value}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    activeSort === s.value
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        {/* Load more */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-sm font-medium transition-all">
            Load More <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

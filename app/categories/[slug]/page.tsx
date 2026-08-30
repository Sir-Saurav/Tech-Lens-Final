import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import type { Product } from '@/types';

// Shared mock products for category pages
const ALL_PRODUCTS: Product[] = [
  { id: '1', asin: 'B0CHX2FQKJ', slug: 'apple-iphone-16-pro-max-review', title: 'Apple iPhone 16 Pro Max 256GB – Black Titanium', brand: 'Apple', category: 'Smartphones', price: 134900, currency: 'INR', rating: 4.7, reviewCount: 2847, thumbnail: 'https://m.media-amazon.com/images/I/81JxBZJ8hML._SL1500_.jpg', images: [], verdictScore: 9.2, verdictPros: [], verdictCons: [], features: [], inStock: true, isFeatured: true, isPublished: true, affiliateUrl: '#', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', asin: 'B0CMDWC436', slug: 'samsung-galaxy-s25-ultra-review', title: 'Samsung Galaxy S25 Ultra 256GB', brand: 'Samsung', category: 'Smartphones', price: 129999, currency: 'INR', rating: 4.6, reviewCount: 1923, thumbnail: 'https://m.media-amazon.com/images/I/71p-M3sPhhL._SL1500_.jpg', images: [], verdictScore: 9.0, verdictPros: [], verdictCons: [], features: [], inStock: true, isFeatured: true, isPublished: true, affiliateUrl: '#', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '3', asin: 'B09XS7JWHH', slug: 'sony-wh-1000xm5-review', title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', brand: 'Sony', category: 'Audio', price: 26990, currency: 'INR', rating: 4.8, reviewCount: 5621, thumbnail: 'https://m.media-amazon.com/images/I/61vVJMkphtL._SL1500_.jpg', images: [], verdictScore: 9.5, verdictPros: [], verdictCons: [], features: [], inStock: true, isFeatured: true, isPublished: true, affiliateUrl: '#', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '4', asin: 'B0CM5HZFNC', slug: 'macbook-pro-m4-review', title: 'Apple MacBook Pro 14" M4 Pro – Space Black', brand: 'Apple', category: 'Laptops', price: 198900, currency: 'INR', rating: 4.9, reviewCount: 934, thumbnail: 'https://m.media-amazon.com/images/I/71an9eiBxpL._SL1500_.jpg', images: [], verdictScore: 9.6, verdictPros: [], verdictCons: [], features: [], inStock: true, isFeatured: true, isPublished: true, affiliateUrl: '#', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '5', asin: 'B0D3J6L2ZL', slug: 'google-pixel-9-pro-review', title: 'Google Pixel 9 Pro 256GB – Obsidian', brand: 'Google', category: 'Smartphones', price: 109999, currency: 'INR', rating: 4.5, reviewCount: 1124, thumbnail: 'https://m.media-amazon.com/images/I/71a4MI0TVNL._SL1500_.jpg', images: [], verdictScore: 8.8, verdictPros: [], verdictCons: [], features: [], inStock: true, isFeatured: false, isPublished: true, affiliateUrl: '#', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '6', asin: 'B0BDGXZS1Z', slug: 'ipad-pro-m4-review', title: 'Apple iPad Pro M4 11-inch WiFi 256GB', brand: 'Apple', category: 'Tablets', price: 99900, currency: 'INR', rating: 4.7, reviewCount: 762, thumbnail: 'https://m.media-amazon.com/images/I/71SjXBRUBNL._SL1500_.jpg', images: [], verdictScore: 9.1, verdictPros: [], verdictCons: [], features: [], inStock: true, isFeatured: false, isPublished: true, affiliateUrl: '#', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const CATEGORY_NAMES: Record<string, string> = {
  smartphones: 'Smartphones',
  laptops: 'Laptops',
  audio: 'Audio',
  cameras: 'Cameras',
  tablets: 'Tablets',
  smartwatches: 'Smartwatches',
  gaming: 'Gaming',
  tvs: 'TVs',
  'smart-home': 'Smart Home',
  accessories: 'Accessories',
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = CATEGORY_NAMES[slug] || slug;
  return {
    title: `Best ${name} Reviews | TechLens`,
    description: `Honest ${name} reviews powered by real user opinions from Amazon, Reddit and YouTube. Find the best ${name.toLowerCase()} for your budget.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryName = CATEGORY_NAMES[slug] || slug;
  const products = ALL_PRODUCTS.filter(p =>
    p.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/categories" className="hover:text-cyan-400 transition-colors">Categories</Link>
          <span>›</span>
          <span className="text-gray-300">{categoryName}</span>
        </nav>

        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">Category</p>
            <h1 className="text-3xl font-bold text-white">Best {categoryName}</h1>
            <p className="text-gray-400 mt-1">{products.length > 0 ? `${products.length} products reviewed` : 'Reviews coming soon'}</p>
          </div>
          <Link href="/products" className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
            All categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">No reviews yet in this category</p>
            <p className="text-gray-600 text-sm mb-6">We&apos;re adding reviews daily. Check back soon!</p>
            <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 rounded-xl text-sm font-medium transition-all">
              Browse All Reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

import Link from 'next/link';
import type { Metadata } from 'next';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { ALL_PRODUCTS, CATEGORIES } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Tested Gear & Benchmarked Products | GadgetLens',
  description: 'Search our database of independently evaluated laptops, smartphones, headphones, cameras, and tablets. Filter by category, price, and GadgetLens Score.',
};

const SORTS = [
  { value: 'score', label: 'Score: High to Low' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

interface SearchParams {
  category?: string;
  sort?: string;
  search?: string;
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const activeCategory = params.category || 'All';
  const activeSort = params.sort || 'score';
  const search = (params.search || '').toLowerCase();

  let products = ALL_PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = !search || p.title.toLowerCase().includes(search) || p.brand?.toLowerCase().includes(search) || p.description?.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  if (activeSort === 'score') {
    products = [...products].sort((a, b) => (b.verdictScore || 0) - (a.verdictScore || 0));
  } else if (activeSort === 'price_asc') {
    products = [...products].sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (activeSort === 'price_desc') {
    products = [...products].sort((a, b) => (b.price || 0) - (a.price || 0));
  }

  return (
    <div className="pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#5C5C5C] mb-6 font-mono">
          <Link href="/" className="hover:text-[#2D5986]">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1A1A1A]">Evaluated Gear</span>
        </nav>

        {/* Header */}
        <div className="border-b border-[#DDE1E6] pb-6 mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Tested Hardware Catalog
          </h1>
          <p className="text-sm text-[#5C5C5C] mt-1">
            Showing {products.length} {products.length === 1 ? 'product' : 'products'} with complete benchmark logs, verified flaws, and owner consensus.
          </p>
        </div>

        {/* Category filter pills */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-6">
          <Link
            href="/products"
            className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-colors border ${
              activeCategory === 'All'
                ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                : 'bg-white text-[#5C5C5C] hover:text-[#1A1A1A] border-[#DDE1E6] hover:bg-[#F5F6F4]'
            }`}
          >
            All Categories ({ALL_PRODUCTS.length})
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.name}`}
              className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-colors border ${
                activeCategory.toLowerCase() === cat.name.toLowerCase()
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-white text-[#5C5C5C] hover:text-[#1A1A1A] border-[#DDE1E6] hover:bg-[#F5F6F4]'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Sort & Count Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 px-4 bg-white border border-[#DDE1E6] rounded mb-8 text-xs">
          <div className="flex items-center gap-2 text-[#5C5C5C] font-mono">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Found {products.length} items</span>
            {search && <span className="text-[#2D5986]">matching &quot;{search}&quot;</span>}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#5C5C5C] font-medium font-mono">Sort by:</span>
            <div className="flex gap-1">
              {SORTS.map((s) => (
                <Link
                  key={s.value}
                  href={`/products?category=${activeCategory}&sort=${s.value}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                  className={`px-2.5 py-1 rounded text-xs transition-colors ${
                    activeSort === s.value
                      ? 'bg-[#EEF4FA] text-[#2D5986] font-bold border border-[#CBDDF0]'
                      : 'text-[#5C5C5C] hover:text-[#1A1A1A]'
                  }`}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white border border-[#DDE1E6] rounded">
            <p className="text-sm font-semibold text-[#1A1A1A]">No tested devices found matching your filter criteria.</p>
            <p className="text-xs text-[#5C5C5C] mt-1">Try resetting the category filter or searching for a different hardware model.</p>
            <Link
              href="/products"
              className="inline-block mt-4 px-4 py-2 bg-[#2D5986] text-white text-xs font-semibold rounded hover:bg-[#224569]"
            >
              Reset Filters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

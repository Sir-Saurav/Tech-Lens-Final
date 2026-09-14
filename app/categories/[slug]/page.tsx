import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, ChevronRight, Layers, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { CATEGORIES, ALL_PRODUCTS } from '@/lib/data';

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: 'Category Not Found | GadgetLens',
    };
  }

  return {
    title: `${category.name} Reviews & Lab Tests | GadgetLens`,
    description: `Independent tests and comparative benchmarks for ${category.name.toLowerCase()}. ${category.description}`,
    alternates: {
      canonical: `https://gadgetlens.store/categories/${slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const products = ALL_PRODUCTS.filter(
    (p) => p.category.toLowerCase() === category.name.toLowerCase()
  );

  return (
    <div className="pt-28 pb-20 bg-[#F5F6F4] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 font-mono text-xs text-[#4B5563] mb-6">
          <Link href="/" className="hover:text-[#2D5986] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#DDE1E6]" />
          <Link href="/categories" className="hover:text-[#2D5986] transition-colors">Categories</Link>
          <ChevronRight className="w-3 h-3 text-[#DDE1E6]" />
          <span className="text-[#111827] font-semibold">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="border-b border-[#DDE1E6] pb-8 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#2D5986] uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Category Lab Report</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-[#4B5563] mt-2 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#4B5563] bg-white px-3 py-1.5 rounded-lg border border-[#DDE1E6]">
              {products.length} {products.length === 1 ? 'Tested Unit' : 'Tested Units'}
            </span>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[#2D5986] hover:underline"
            >
              <span>All catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Products Grid or Empty State */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#DDE1E6] rounded-xl p-12 text-center max-w-2xl mx-auto my-8">
            <div className="w-12 h-12 rounded-full bg-[#F5F6F4] border border-[#DDE1E6] flex items-center justify-center mx-auto mb-4 text-[#4B5563]">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#111827] mb-2">
              Tests in Progress for {category.name}
            </h2>
            <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
              Our lab currently has units for this category undergoing endurance and audio/display calibration. New structured reviews publish every Friday.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2D5986] text-white text-xs font-semibold rounded-lg hover:bg-[#1f4061] transition-colors"
              >
                Browse All Reviews <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/categories"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-[#111827] text-xs font-semibold rounded-lg border border-[#DDE1E6] hover:border-[#2D5986] transition-colors"
              >
                Other Categories
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

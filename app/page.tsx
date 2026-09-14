import Link from 'next/link';
import { ArrowRight, ShieldCheck, Scale, CheckCircle2, Play, ExternalLink } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import VideoCard from '@/components/ui/VideoCard';
import NewsletterForm from '@/components/ui/NewsletterForm';
import { ALL_PRODUCTS, ALL_VIDEOS, CATEGORIES } from '@/lib/data';

export default function HomePage() {
  const featuredProducts = ALL_PRODUCTS.filter((p) => p.isFeatured);
  const latestProducts = ALL_PRODUCTS;
  const latestVideos = ALL_VIDEOS.slice(0, 3);

  return (
    <div className="pb-20">
      {/* ── EDITORIAL HERO (Asymmetrical, Trust-focused, No gradient blobs) ── */}
      <section className="border-b border-[#DDE1E6] bg-white pt-12 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Main Editorial Lead */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#F5F6F4] border border-[#DDE1E6] rounded text-xs font-mono font-medium text-[#5C5C5C] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#2A6B4A]" />
                Independent Testing & Verified Consensus · No Sponsored Reviews
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight leading-[1.08] mb-6">
                Hardware tested to its limits. Flaws documented without compromise.
              </h1>

              <p className="text-base sm:text-lg text-[#5C5C5C] leading-relaxed max-w-2xl mb-8">
                GadgetLens combines standardized lab measurements with multi-platform verified user sentiment from Amazon and community repair records. We cut through marketing claims so you can purchase with certainty.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#2D5986] text-white text-sm font-semibold rounded transition-colors"
                >
                  Browse Tested Gear <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about#methodology"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F5F6F4] hover:bg-[#EEF4FA] border border-[#DDE1E6] text-[#1A1A1A] hover:text-[#2D5986] text-sm font-semibold rounded transition-colors"
                >
                  Our Scoring Methodology
                </Link>
              </div>
            </div>

            {/* Right Side Testing Protocol Summary Panel */}
            <div className="lg:col-span-4 bg-[#F5F6F4] border border-[#DDE1E6] rounded p-6">
              <div className="text-xs font-mono font-bold text-[#2D5986] uppercase tracking-wider mb-2">
                Standard Protocol
              </div>
              <h2 className="font-display text-xl font-bold text-[#1A1A1A] mb-3">
                The GadgetLens Testing Mandate
              </h2>
              <ul className="space-y-3 text-xs text-[#5C5C5C]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2A6B4A] shrink-0 mt-0.5" />
                  <span><strong>Zero Zero-Con Reviews:</strong> Every product page must document verifiable shortcomings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2A6B4A] shrink-0 mt-0.5" />
                  <span><strong>Audited Battery Tests:</strong> 150-nit automated scripts replace anecdotal runtime claims.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2A6B4A] shrink-0 mt-0.5" />
                  <span><strong>Decoupled Revenue:</strong> Test engineers do not access affiliate metrics or commercial terms.</span>
                </li>
              </ul>
              <div className="mt-5 pt-4 border-t border-[#DDE1E6] flex items-center justify-between text-xs font-mono text-[#858585]">
                <span>Status: Fully Independent</span>
                <span className="text-[#2A6B4A] font-bold">100% Ad-Free Verdicts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY BAR ── */}
      <section className="border-b border-[#DDE1E6] bg-[#FFFFFF] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar text-xs">
            <span className="font-bold text-[#1A1A1A] uppercase tracking-wider mr-2 shrink-0 font-mono">
              Categories:
            </span>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="px-3 py-1.5 rounded border border-[#DDE1E6] bg-[#F5F6F4] hover:bg-[#EEF4FA] hover:border-[#2D5986] text-[#5C5C5C] hover:text-[#2D5986] font-medium whitespace-nowrap transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITOR'S PICKS ── */}
      <section className="pt-14 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8 border-b border-[#DDE1E6] pb-4">
          <div>
            <div className="text-xs font-mono font-bold text-[#2A6B4A] uppercase tracking-wider mb-1">
              Tested & Verified
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              Editor&apos;s Tested Selections
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#2D5986] hover:underline uppercase tracking-wider font-mono"
          >
            All Products ({ALL_PRODUCTS.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── HOW GADGETLENS WORKS (Structured Data Process) ── */}
      <section className="my-10 bg-white border-y border-[#DDE1E6] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-mono font-bold text-[#2D5986] uppercase tracking-wider mb-1">
              Transparent Workflow
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              How the GadgetLens Score is Built
            </h2>
            <p className="text-sm text-[#5C5C5C] mt-2">
              Every score on our site derives from reproducible measurements and aggregated verified user consensus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F5F6F4] border border-[#DDE1E6] rounded">
              <div className="font-mono text-xs font-bold text-[#2D5986] mb-2">STAGE 01</div>
              <h3 className="font-display text-lg font-bold text-[#1A1A1A] mb-2">Hardware Benchmarking</h3>
              <p className="text-xs text-[#5C5C5C] leading-relaxed">
                Standardized measurements for sustained thermal throttling, panel color calibration (Delta-E), and automated 150-nit web browsing battery discharge tests.
              </p>
            </div>

            <div className="p-6 bg-[#F5F6F4] border border-[#DDE1E6] rounded">
              <div className="font-mono text-xs font-bold text-[#2D5986] mb-2">STAGE 02</div>
              <h3 className="font-display text-lg font-bold text-[#1A1A1A] mb-2">Multi-Source Verification</h3>
              <p className="text-xs text-[#5C5C5C] leading-relaxed">
                We cross-examine verified owner reports from Amazon, Reddit hardware threads, and technician teardowns to catch batch defects that short-term reviews overlook.
              </p>
            </div>

            <div className="p-6 bg-[#F5F6F4] border border-[#DDE1E6] rounded">
              <div className="font-mono text-xs font-bold text-[#2D5986] mb-2">STAGE 03</div>
              <h3 className="font-display text-lg font-bold text-[#1A1A1A] mb-2">Unbiased Verdict Scoring</h3>
              <p className="text-xs text-[#5C5C5C] leading-relaxed">
                Weighted composite scores are finalized with mandatory pros and cons sections, clear &quot;Who Should Skip It&quot; guidance, and zero promotional interference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL RECENT REVIEWS ── */}
      <section className="pt-8 pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8 border-b border-[#DDE1E6] pb-4">
          <div>
            <div className="text-xs font-mono font-bold text-[#2D5986] uppercase tracking-wider mb-1">
              Catalog Index
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              Recent Detailed Reviews
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#2D5986] hover:underline uppercase tracking-wider font-mono"
          >
            View full index <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── VIDEO CHANNEL NETWORK HIGHLIGHT ── */}
      <section className="my-6 bg-white border-y border-[#DDE1E6] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8 border-b border-[#DDE1E6] pb-4">
            <div>
              <div className="text-xs font-mono font-bold text-red-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 fill-red-700 text-red-700" />
                Network Video Tests
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                From Our Channel Network
              </h2>
            </div>
            <Link
              href="/videos"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#2D5986] hover:underline uppercase tracking-wider font-mono"
            >
              All Video Reviews <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestVideos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CALLOUT ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-center">
        <div className="p-8 sm:p-10 bg-white border border-[#DDE1E6] rounded">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3">
            Weekly Test Bench Updates
          </h2>
          <p className="text-sm text-[#5C5C5C] max-w-xl mx-auto mb-6 leading-relaxed">
            Direct lab benchmark results, updated defect notices, and verified buyer advice delivered straight to your inbox. No sponsored fluff.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}


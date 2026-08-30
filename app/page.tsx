import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Shield, Globe, Zap, Star, CheckCircle,
  Smartphone, Laptop, Headphones, Camera, Tablet, Watch, Gamepad2, Tv,
  Play, TrendingUp, Users, Package
} from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import VideoCard from '@/components/ui/VideoCard';
import NewsletterForm from '@/components/ui/NewsletterForm';
import type { Product, Video } from '@/types';

// ── Mock data (replaces DB until populated) ────────────────────────────────

const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1', asin: 'B0CHX2FQKJ', slug: 'apple-iphone-16-pro-max-review',
    title: 'Apple iPhone 16 Pro Max 256GB – Black Titanium',
    brand: 'Apple', category: 'Smartphones', price: 134900, originalPrice: 139900, currency: 'INR',
    rating: 4.7, reviewCount: 2847, thumbnail: 'https://m.media-amazon.com/images/I/81JxBZJ8hML._SL1500_.jpg',
    images: [], verdictScore: 9.2, verdictSummary: 'The best iPhone ever made.',
    verdictPros: ['Best-in-class camera', 'Titanium build', 'A18 Pro chip'],
    verdictCons: ['Expensive', 'No major design change'],
    features: [], inStock: true, isFeatured: true, isPublished: true,
    affiliateUrl: '#', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: '2', asin: 'B0CMDWC436', slug: 'samsung-galaxy-s25-ultra-review',
    title: 'Samsung Galaxy S25 Ultra 256GB – Titanium Black',
    brand: 'Samsung', category: 'Smartphones', price: 129999, currency: 'INR',
    rating: 4.6, reviewCount: 1923, thumbnail: 'https://m.media-amazon.com/images/I/71p-M3sPhhL._SL1500_.jpg',
    images: [], verdictScore: 9.0, verdictSummary: 'Android at its absolute peak.',
    verdictPros: ['S Pen included', '200MP camera', 'Snapdragon 8 Elite'],
    verdictCons: ['Heavy', 'Very expensive'],
    features: [], inStock: true, isFeatured: true, isPublished: true,
    affiliateUrl: '#', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: '3', asin: 'B09XS7JWHH', slug: 'sony-wh-1000xm5-review',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    brand: 'Sony', category: 'Audio', price: 26990, originalPrice: 34990, currency: 'INR',
    rating: 4.8, reviewCount: 5621, thumbnail: 'https://m.media-amazon.com/images/I/61vVJMkphtL._SL1500_.jpg',
    images: [], verdictScore: 9.5, verdictSummary: 'The gold standard in ANC headphones.',
    verdictPros: ['Industry-best ANC', '30hr battery', 'Foldable design'],
    verdictCons: ['No IP rating', 'Expensive'],
    features: [], inStock: true, isFeatured: true, isPublished: true,
    affiliateUrl: '#', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: '4', asin: 'B0CM5HZFNC', slug: 'macbook-pro-m4-review',
    title: 'Apple MacBook Pro 14" M4 Pro – Space Black',
    brand: 'Apple', category: 'Laptops', price: 198900, currency: 'INR',
    rating: 4.9, reviewCount: 934, thumbnail: 'https://m.media-amazon.com/images/I/71an9eiBxpL._SL1500_.jpg',
    images: [], verdictScore: 9.6, verdictSummary: 'The most powerful laptop money can buy.',
    verdictPros: ['Insane M4 Pro performance', '22hr battery', 'Liquid Retina XDR'],
    verdictCons: ['Very expensive', 'Limited ports'],
    features: [], inStock: true, isFeatured: true, isPublished: true,
    affiliateUrl: '#', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
];

const LATEST_REVIEWS: Product[] = [
  ...FEATURED_PRODUCTS,
  {
    id: '5', asin: 'B0D3J6L2ZL', slug: 'google-pixel-9-pro-review',
    title: 'Google Pixel 9 Pro 256GB – Obsidian',
    brand: 'Google', category: 'Smartphones', price: 109999, currency: 'INR',
    rating: 4.5, reviewCount: 1124, thumbnail: 'https://m.media-amazon.com/images/I/71a4MI0TVNL._SL1500_.jpg',
    images: [], verdictScore: 8.8, verdictSummary: 'The AI-first smartphone.',
    verdictPros: ['Best AI features', 'Pure Android', 'Great cameras'],
    verdictCons: ['Tensor heat issues', 'No telephoto parity'],
    features: [], inStock: true, isFeatured: false, isPublished: true,
    affiliateUrl: '#', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: '6', asin: 'B0BDGXZS1Z', slug: 'ipad-pro-m4-review',
    title: 'Apple iPad Pro M4 11-inch WiFi 256GB',
    brand: 'Apple', category: 'Tablets', price: 99900, currency: 'INR',
    rating: 4.7, reviewCount: 762, thumbnail: 'https://m.media-amazon.com/images/I/71SjXBRUBNL._SL1500_.jpg',
    images: [], verdictScore: 9.1, verdictSummary: 'The thinnest, most powerful iPad ever.',
    verdictPros: ['Ultra-thin design', 'M4 chip', 'OLED display'],
    verdictCons: ['Expensive accessories', 'No USB-A'],
    features: [], inStock: true, isFeatured: false, isPublished: true,
    affiliateUrl: '#', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
];

const MOCK_VIDEOS: Video[] = [
  { id: '1', youtubeId: 'dQw4w9WgXcQ', title: 'iPhone 16 Pro Max Full Review – Is It Worth ₹1.35 Lakh?', channelName: 'Gadget Verse', channelId: '', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', publishedAt: '2025-01-15T00:00:00Z', viewCount: 245000, duration: '18:32', tags: [], isPublished: true, createdAt: new Date().toISOString() },
  { id: '2', youtubeId: 'oHg5SJYRHA0', title: 'Samsung S25 Ultra vs iPhone 16 Pro Max – The Ultimate Battle', channelName: 'Tech Space', channelId: '', thumbnail: 'https://img.youtube.com/vi/oHg5SJYRHA0/maxresdefault.jpg', publishedAt: '2025-01-20T00:00:00Z', viewCount: 189000, duration: '22:14', tags: [], isPublished: true, createdAt: new Date().toISOString() },
  { id: '3', youtubeId: 'y6120QOlsfU', title: 'Sony WH-1000XM5 – Best Headphones of 2025?', channelName: 'Gadget Bits', channelId: '', thumbnail: 'https://img.youtube.com/vi/y6120QOlsfU/maxresdefault.jpg', publishedAt: '2025-01-10T00:00:00Z', viewCount: 98000, duration: '14:45', tags: [], isPublished: true, createdAt: new Date().toISOString() },
  { id: '4', youtubeId: 'rokGy0huYEA', title: 'MacBook Pro M4 Pro – 2 Months Later Honest Review', channelName: 'Gadget Adda', channelId: '', thumbnail: 'https://img.youtube.com/vi/rokGy0huYEA/maxresdefault.jpg', publishedAt: '2025-01-25T00:00:00Z', viewCount: 134000, duration: '19:08', tags: [], isPublished: true, createdAt: new Date().toISOString() },
  { id: '5', youtubeId: '6_b6zVHhBt4', title: 'Top 5 Budget Smartphones Under ₹20,000 in 2025', channelName: 'Tech Buddie', channelId: '', thumbnail: 'https://img.youtube.com/vi/6_b6zVHhBt4/maxresdefault.jpg', publishedAt: '2025-01-28T00:00:00Z', viewCount: 67000, duration: '12:30', tags: [], isPublished: true, createdAt: new Date().toISOString() },
  { id: '6', youtubeId: 'hY7m5jjJ9mM', title: 'Google Pixel 9 Pro – 3 Months Real World Usage Review', channelName: 'Tech States', channelId: '', thumbnail: 'https://img.youtube.com/vi/hY7m5jjJ9mM/maxresdefault.jpg', publishedAt: '2025-02-01T00:00:00Z', viewCount: 52000, duration: '16:20', tags: [], isPublished: true, createdAt: new Date().toISOString() },
];

const CATEGORIES = [
  { name: 'Smartphones', slug: 'smartphones', icon: Smartphone, count: '120+' },
  { name: 'Laptops', slug: 'laptops', icon: Laptop, count: '85+' },
  { name: 'Audio', slug: 'audio', icon: Headphones, count: '64+' },
  { name: 'Cameras', slug: 'cameras', icon: Camera, count: '42+' },
  { name: 'Tablets', slug: 'tablets', icon: Tablet, count: '38+' },
  { name: 'Smartwatches', slug: 'smartwatches', icon: Watch, count: '55+' },
  { name: 'Gaming', slug: 'gaming', icon: Gamepad2, count: '71+' },
  { name: 'TVs', slug: 'tvs', icon: Tv, count: '29+' },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
        {/* Background blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/6 rounded-full blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
          <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: '6s' }} />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8">
              <Shield className="w-4 h-4" />
              No Paid Reviews · No AI Fluff · Real User Opinions
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-6">
              <span className="text-white">Honest Reviews.</span>
              <br />
              <span className="gradient-text">Real Opinions.</span>
              <br />
              <span className="text-white">Smart Choices.</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl">
              We aggregate real user reviews from <span className="text-white">Amazon, Reddit, YouTube</span> and across the web — then synthesize them into clear, honest verdicts. No marketing speak. No paid placements.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <Link
                href="/products"
                className="flex items-center gap-2 px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl transition-colors shadow-lg shadow-cyan-500/20"
              >
                Browse Reviews <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/videos"
                className="flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-semibold rounded-xl transition-all"
              >
                <Play className="w-4 h-4 text-red-400" /> Watch Videos
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {[
                { icon: Package, value: '500+', label: 'Products Reviewed' },
                { icon: Users, value: '50K+', label: 'User Opinions Analyzed' },
                { icon: TrendingUp, value: '7', label: 'YouTube Channels' },
                { icon: Star, value: '4.8★', label: 'Avg Accuracy Score' },
              ].map(stat => (
                <div key={stat.label} className="flex items-center gap-3">
                  <stat.icon className="w-5 h-5 text-cyan-400/60" />
                  <div>
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY PILLS ─────────────────────────────────────────────────── */}
      <section className="border-y border-white/5 bg-[#0d1526]/50 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Browse:</span>
            {CATEGORIES.map(cat => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-400 border border-white/8 hover:border-cyan-500/25 text-sm text-gray-400 whitespace-nowrap transition-all"
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED / EDITOR'S PICKS ───────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">Handpicked</p>
              <h2 className="text-3xl font-bold text-white">Editor&apos;s Picks</h2>
            </div>
            <Link href="/products?sort=rating" className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
              See all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURED_PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0d1526]/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">Transparent Process</p>
            <h2 className="text-3xl font-bold text-white">How TechLens Works</h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">We never write reviews ourselves. We let real users speak — and we organize what they say.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01', icon: Package, title: 'We Fetch Product Data',
                desc: "We scrape Amazon daily for product specs, images, and pricing — so information is always current and accurate. No manual data entry.",
                color: 'cyan',
              },
              {
                step: '02', icon: Globe, title: 'We Gather Real Opinions',
                desc: "We pull reviews from Amazon, Reddit discussions, YouTube comments, and tech forums — giving you a 360° view of what real users think worldwide.",
                color: 'indigo',
              },
              {
                step: '03', icon: Zap, title: 'We Synthesize the Verdict',
                desc: "Our AI reads all the reviews, identifies patterns, highlights key pros/cons, and gives you a clear TechLens score — backed by evidence, not opinion.",
                color: 'purple',
              },
            ].map(item => (
              <div key={item.step} className="relative p-6 bg-[#111827] border border-white/8 rounded-2xl overflow-hidden group hover:border-white/15 transition-colors">
                <div className={`absolute top-4 right-4 text-6xl font-black text-${item.color}-500/5 select-none`}>{item.step}</div>
                <div className={`inline-flex p-3 rounded-xl bg-${item.color}-500/10 mb-4`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST REVIEWS ─────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">Fresh & Updated Daily</p>
              <h2 className="text-3xl font-bold text-white">Latest Reviews</h2>
            </div>
            <Link href="/products" className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LATEST_REVIEWS.slice(0, 6).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="mt-10 text-center">
            <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-sm font-medium transition-all">
              Load More Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FROM OUR CHANNELS ──────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0d1526]/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5" /> YouTube
              </p>
              <h2 className="text-3xl font-bold text-white">From Our Channels</h2>
              <p className="text-gray-400 mt-1 text-sm">Watch reviews from Gadget Verse, Tech Space, Gadget Bits & more</p>
            </div>
            <Link href="/videos" className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
              All videos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MOCK_VIDEOS.map(v => <VideoCard key={v.id} video={v} />)}
          </div>
        </div>
      </section>

      {/* ── WHY TRUST TECHLENS ─────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0d1526] to-[#111827] border border-white/8 rounded-3xl p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">Our Promise</p>
                <h2 className="text-3xl font-bold text-white mb-4">Why Trust TechLens?</h2>
                <p className="text-gray-400 leading-relaxed">
                  We built TechLens because we were tired of review sites that were either paid for, copy-pasted specs, or too technical to be useful. TechLens is different.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, title: 'Zero Paid Reviews', desc: 'No brand has ever paid us for a positive review. Our scores are based purely on user data.' },
                  { icon: Globe, title: 'Multi-Source Opinions', desc: 'We pull from Amazon, Reddit, Play, and forums — not just one place.' },
                  { icon: Zap, title: 'Updated Daily', desc: 'Prices refresh every 6 hours. New reviews get added automatically.' },
                  { icon: CheckCircle, title: 'Verdict, Not Opinion', desc: 'Our TechLens score is a synthesis of real user sentiment, not our personal bias.' },
                ].map(item => (
                  <div key={item.title} className="flex gap-3 p-4 bg-white/3 rounded-xl border border-white/5">
                    <item.icon className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ─────────────────────────────────────────────────── */}
      <section className="py-12 bg-[#0d1526]/50 border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Get Weekly Tech Picks</h2>
          <p className="text-gray-400 mb-6 text-sm">Top reviewed products, channel highlights, and buying guides every week. No spam.</p>
          <NewsletterForm />
          <p className="text-xs text-gray-600 mt-3">By subscribing you agree to our Privacy Policy. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  );
}


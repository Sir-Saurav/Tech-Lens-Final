import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShoppingCart, ExternalLink, ChevronRight, Check, X, Shield, Star } from 'lucide-react';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';
import VideoCard from '@/components/ui/VideoCard';
import ProductCard from '@/components/ui/ProductCard';
import ReviewTabs from './ReviewTabs';
import type { Product, Review, Video } from '@/types';
import { formatPrice, getScoreColor, getScoreBg } from '@/lib/utils';

// ── Mock product data for iPhone 16 Pro Max ───────────────────────────────

const MOCK_PRODUCT: Product = {
  id: '1', asin: 'B0CHX2FQKJ', slug: 'apple-iphone-16-pro-max-review',
  title: 'Apple iPhone 16 Pro Max 256GB – Black Titanium',
  brand: 'Apple', category: 'Smartphones',
  price: 134900, originalPrice: 139900, currency: 'INR',
  rating: 4.7, reviewCount: 2847,
  thumbnail: 'https://m.media-amazon.com/images/I/81JxBZJ8hML._SL1500_.jpg',
  images: [
    'https://m.media-amazon.com/images/I/81JxBZJ8hML._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61eDXs9JCNL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71Mj7RVMJNL._SL1500_.jpg',
  ],
  description: 'The most advanced iPhone ever, featuring the A18 Pro chip, titanium design, 5x optical zoom camera system, and Action button.',
  specs: {
    'Display': '6.9-inch Super Retina XDR OLED, 2868×1320, 460 ppi',
    'Chip': 'A18 Pro (3nm)',
    'Rear Cameras': '48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto',
    'Front Camera': '12MP TrueDepth',
    'Battery': '4685 mAh, Up to 33hr video playback',
    'Storage': '256GB / 512GB / 1TB',
    'OS': 'iOS 18',
    'Build': 'Titanium frame, textured matte glass back',
    'Weight': '227g',
    'Water Resistance': 'IP68 (6m for 30 min)',
    'Connectivity': '5G, Wi-Fi 7, Bluetooth 5.3, NFC',
    'Charging': '27W MagSafe, 25W Qi2, 15W USB-C',
  },
  features: [
    'A18 Pro chip with 6-core GPU', '48MP Fusion camera with 4K120fps Dolby Vision',
    'Camera Control button', 'Action button', 'Titanium design',
    'iOS 18 with Apple Intelligence', '5x optical zoom Tetraprism camera',
  ],
  affiliateUrl: '#',
  amazonUrl: 'https://www.amazon.in/dp/B0CHX2FQKJ',
  inStock: true,
  verdictScore: 9.2,
  verdictSummary: 'Real users consistently praise the iPhone 16 Pro Max for its exceptional camera system and A18 Pro performance, but note the high price. Battery life improvements over the 15 Pro Max are appreciated. The Camera Control button is seen as gimmicky by most users but appreciated by photographers.',
  verdictPros: [
    'A18 Pro chip is blazing fast for any task',
    '5x telephoto camera is genuinely impressive for zoom shots',
    'Battery life is the best ever in an iPhone',
    'Titanium build feels premium and lighter than expected',
    'iOS 18 Apple Intelligence features actually useful',
  ],
  verdictCons: [
    'Price of ₹1.35 lakh is very hard to justify over the 15 Pro Max',
    'Camera Control button feels half-baked in current software',
    'Same design for 4th year in a row',
    'No major display upgrade over 15 Pro Max',
  ],
  isFeatured: true, isPublished: true,
  createdAt: '2025-01-15T00:00:00Z', updatedAt: new Date().toISOString(),
};

const MOCK_REVIEWS: Review[] = [
  { id: '1', productId: '1', source: 'AMAZON', authorName: 'Rahul Sharma', authorLocation: 'Mumbai, India', rating: 5, title: 'Best iPhone Ever — Worth Every Rupee', body: 'Been using this for 3 months now. The camera is absolutely insane, especially the 5x zoom. Took it to Ladakh and the photos came out better than my old DSLR in certain conditions. Battery easily lasts me a full day with heavy usage. The titanium build feels incredibly solid. Only complaint is the price, but if you can afford it, there\'s nothing better right now.', isVerified: true, sentimentScore: 0.9, sourceDate: '2025-02-10T00:00:00Z', createdAt: '2025-02-10T00:00:00Z', isHelpful: 245 },
  { id: '2', productId: '1', source: 'AMAZON', authorName: 'Priya Mehta', authorLocation: 'Bangalore, India', rating: 4, title: 'Great phone, but not a huge upgrade from 15 Pro Max', body: 'Upgraded from iPhone 15 Pro Max. Honestly the differences are incremental. Camera is slightly better in low light. Battery is better. A18 Pro is faster but I never felt the 15 was slow. The Camera Control button I never use. If you have the 15 Pro Max, skip this. But if coming from older phones, this is absolutely the best.', isVerified: true, sentimentScore: 0.6, sourceDate: '2025-01-28T00:00:00Z', createdAt: '2025-01-28T00:00:00Z', isHelpful: 189 },
  { id: '3', productId: '1', source: 'REDDIT', authorName: 'u/TechEnthusiast_np', authorLocation: 'Nepal', rating: 5, title: 'After 2 months — my honest take', body: 'Bought this from Dubai gray market. The camera is genuinely the best I\'ve ever used on any phone. Video recording at 4K120fps is a game changer if you make content. Apple Intelligence features are still limited in Nepal since we\'re not in a supported country yet, which is frustrating. But the base phone experience is flawless.', isVerified: false, sentimentScore: 0.75, sourceDate: '2025-02-15T00:00:00Z', createdAt: '2025-02-15T00:00:00Z', isHelpful: 134 },
  { id: '4', productId: '1', source: 'REDDIT', authorName: 'u/GadgetReviewIndia', authorLocation: 'Delhi, India', rating: 3, title: 'Overpriced for what you get', body: 'The iPhone 16 Pro Max is undeniably excellent hardware but at ₹1.35L, I expected more. The same form factor for 4 years now is tiring. No RCS in India still (though that\'s a carrier issue). The Camera Control button is an afterthought. The display has no upgrade. Compare this to what Samsung offers at similar price and it\'s a hard sell unless you\'re in the Apple ecosystem.', isVerified: false, sentimentScore: -0.1, sourceDate: '2025-02-20T00:00:00Z', createdAt: '2025-02-20T00:00:00Z', isHelpful: 98 },
  { id: '5', productId: '1', source: 'YOUTUBE', authorName: 'Aditya Kumar', authorLocation: 'Pune, India', rating: 5, title: 'YouTube comment on Gadget Verse review', body: 'I bought this after watching the full review and I completely agree. The camera is the main reason to buy this phone. Everything else is just excellent software experience. Compared to my old Pixel 7, this feels like a 5-year jump in camera quality.', isVerified: false, sentimentScore: 0.85, sourceDate: '2025-01-20T00:00:00Z', createdAt: '2025-01-20T00:00:00Z', isHelpful: 45 },
  { id: '6', productId: '1', source: 'EXPERT', authorName: 'TechLens Editorial', rating: 5, title: 'Expert Analysis: The definitive flagship', body: 'From a pure hardware standpoint, the iPhone 16 Pro Max is the most refined and capable smartphone Apple has ever shipped. The A18 Pro\'s Neural Engine powers genuinely useful AI features, the camera system excels in every scenario we tested, and the titanium build quality is exceptional. For users who can afford it and are within the Apple ecosystem, it is the clear recommendation.', isVerified: true, sentimentScore: 0.9, createdAt: '2025-01-15T00:00:00Z', isHelpful: 312 },
];

const MOCK_VIDEOS: Video[] = [
  { id: '1', youtubeId: 'dQw4w9WgXcQ', title: 'iPhone 16 Pro Max Full Review – Is It Worth ₹1.35 Lakh?', channelName: 'Gadget Verse', channelId: '', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', publishedAt: '2025-01-15T00:00:00Z', viewCount: 245000, duration: '18:32', tags: [], isPublished: true, createdAt: new Date().toISOString() },
  { id: '2', youtubeId: 'oHg5SJYRHA0', title: 'iPhone 16 Pro Max vs S25 Ultra Camera Test', channelName: 'Tech Space', channelId: '', thumbnail: 'https://img.youtube.com/vi/oHg5SJYRHA0/maxresdefault.jpg', publishedAt: '2025-01-20T00:00:00Z', viewCount: 189000, duration: '22:14', tags: [], isPublished: true, createdAt: new Date().toISOString() },
  { id: '3', youtubeId: 'y6120QOlsfU', title: 'iPhone 16 Pro Max – 2 Months Real Usage Review', channelName: 'Gadget Adda', channelId: '', thumbnail: 'https://img.youtube.com/vi/y6120QOlsfU/maxresdefault.jpg', publishedAt: '2025-02-10T00:00:00Z', viewCount: 98000, duration: '14:45', tags: [], isPublished: true, createdAt: new Date().toISOString() },
];

const RELATED: Product[] = [
  { id: '2', asin: 'B0CMDWC436', slug: 'samsung-galaxy-s25-ultra-review', title: 'Samsung Galaxy S25 Ultra 256GB', brand: 'Samsung', category: 'Smartphones', price: 129999, currency: 'INR', rating: 4.6, reviewCount: 1923, thumbnail: 'https://m.media-amazon.com/images/I/71p-M3sPhhL._SL1500_.jpg', images: [], verdictScore: 9.0, verdictPros: [], verdictCons: [], features: [], inStock: true, isFeatured: true, isPublished: true, affiliateUrl: '#', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '5', asin: 'B0D3J6L2ZL', slug: 'google-pixel-9-pro-review', title: 'Google Pixel 9 Pro 256GB', brand: 'Google', category: 'Smartphones', price: 109999, currency: 'INR', rating: 4.5, reviewCount: 1124, thumbnail: 'https://m.media-amazon.com/images/I/71a4MI0TVNL._SL1500_.jpg', images: [], verdictScore: 8.8, verdictPros: [], verdictCons: [], features: [], inStock: true, isFeatured: false, isPublished: true, affiliateUrl: '#', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = MOCK_PRODUCT; // Replace with DB fetch
  return {
    title: `${product.title} Review — TechLens`,
    description: product.verdictSummary || `Honest review of ${product.title} with real user opinions from Amazon, Reddit and YouTube.`,
    openGraph: {
      title: `${product.title} — TechLens Review`,
      description: product.verdictSummary || '',
      images: product.thumbnail ? [{ url: product.thumbnail }] : [],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ProductReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = MOCK_PRODUCT; // Replace with: await fetch(`/api/products/${slug}`)
  const scoreColor = getScoreColor(product.verdictScore || 0);
  const scoreBg = getScoreBg(product.verdictScore || 0);

  // Schema.org JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    brand: { '@type': 'Brand', name: product.brand },
    image: product.images,
    description: product.description,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: product.affiliateUrl,
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    review: MOCK_REVIEWS.slice(0, 3).map(r => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.authorName },
      datePublished: r.sourceDate,
      reviewRating: r.rating ? { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 } : undefined,
      reviewBody: r.body,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6 mt-4">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/products" className="hover:text-cyan-400 transition-colors">Reviews</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">{product.category}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-400 truncate max-w-xs">{product.brand}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-8">

              {/* Product Hero */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image */}
                <div className="relative aspect-square bg-[#0d1526] rounded-2xl overflow-hidden border border-white/8">
                  {product.thumbnail && (
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between">
                  <div>
                    {product.brand && (
                      <Link href={`/products?search=${product.brand}`} className="text-sm text-cyan-400 hover:text-cyan-300 font-medium">
                        {product.brand}
                      </Link>
                    )}
                    <h1 className="text-2xl font-bold text-white mt-1 leading-tight">{product.title}</h1>

                    <div className="mt-3 flex items-center gap-3 flex-wrap">
                      {product.rating && (
                        <StarRating rating={product.rating} count={product.reviewCount} size="md" />
                      )}
                      {product.verdictScore && (
                        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-sm font-bold ${scoreBg}`}>
                          <Shield className="w-3.5 h-3.5" />
                          <span className={scoreColor}>{product.verdictScore}/10</span>
                          <span className="text-gray-500 font-normal text-xs">TechLens</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      {product.price ? (
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-cyan-400">{formatPrice(product.price, product.currency)}</span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-gray-500 line-through text-sm">{formatPrice(product.originalPrice, product.currency)}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">Price not available</span>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Price updated daily from Amazon</p>
                    </div>

                    {/* Quick specs */}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {Object.entries(product.specs || {}).slice(0, 4).map(([k, v]) => (
                        <div key={k} className="bg-white/3 border border-white/5 rounded-lg p-2.5">
                          <div className="text-xs text-gray-500">{k}</div>
                          <div className="text-xs font-medium text-white mt-0.5 line-clamp-2">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2.5">
                    {product.affiliateUrl && (
                      <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="flex items-center justify-center gap-2 bg-[#ff9900] hover:bg-[#ffaa20] text-black font-bold py-3.5 rounded-xl transition-colors text-sm"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Buy on Amazon
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <a href="#reviews" className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 py-3 rounded-xl text-sm font-medium transition-all">
                      <Star className="w-4 h-4" /> Read {product.reviewCount?.toLocaleString()} Reviews
                    </a>
                  </div>
                </div>
              </div>

              {/* TechLens Verdict */}
              {product.verdictSummary && (
                <div className="relative p-6 rounded-2xl overflow-hidden border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-indigo-500/5">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/3 to-transparent" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-1.5 bg-cyan-500/15 rounded-lg">
                        <Shield className="w-4 h-4 text-cyan-400" />
                      </div>
                      <h2 className="font-bold text-white">TechLens Verdict</h2>
                      {product.verdictScore && (
                        <span className={`ml-auto text-2xl font-black ${scoreColor}`}>
                          {product.verdictScore}<span className="text-sm font-normal text-gray-500">/10</span>
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-5">{product.verdictSummary}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">What Users Love</h3>
                        <ul className="space-y-1.5">
                          {product.verdictPros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                              <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">What Users Dislike</h3>
                        <ul className="space-y-1.5">
                          {product.verdictCons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                              <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews */}
              <div id="reviews">
                <ReviewTabs reviews={MOCK_REVIEWS} />
              </div>

              {/* Related Videos */}
              <div>
                <h2 className="text-xl font-bold text-white mb-5">Watch Before You Buy</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {MOCK_VIDEOS.map(v => <VideoCard key={v.id} video={v} />)}
                </div>
              </div>

              {/* Full Specs */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Full Specifications</h2>
                  <div className="bg-[#111827] border border-white/8 rounded-2xl overflow-hidden">
                    {Object.entries(product.specs).map(([key, value], i) => (
                      <div key={key} className={`flex items-start gap-4 px-5 py-3.5 ${i % 2 === 0 ? 'bg-white/2' : ''} border-b border-white/5 last:border-0`}>
                        <span className="text-gray-400 text-sm w-40 shrink-0">{key}</span>
                        <span className="text-white text-sm flex-1">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Products */}
              <div>
                <h2 className="text-xl font-bold text-white mb-5">Compare Alternatives</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {RELATED.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            </div>

            {/* ── STICKY SIDEBAR ───────────────────────────────────────────── */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-4">
                {/* Price card */}
                <div className="bg-[#111827] border border-white/8 rounded-2xl p-5">
                  {product.thumbnail && (
                    <div className="relative aspect-square bg-[#0d1526] rounded-xl overflow-hidden mb-4">
                      <Image src={product.thumbnail} alt={product.title} fill className="object-contain p-4" sizes="300px" />
                    </div>
                  )}

                  {product.verdictScore && (
                    <div className={`flex items-center justify-center gap-2 p-3 rounded-xl mb-4 border ${scoreBg}`}>
                      <Shield className={`w-4 h-4 ${scoreColor}`} />
                      <span className={`text-2xl font-black ${scoreColor}`}>{product.verdictScore}</span>
                      <span className="text-gray-500 text-sm">/10 TechLens Score</span>
                    </div>
                  )}

                  {product.price && (
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-cyan-400">{formatPrice(product.price, product.currency)}</div>
                      <p className="text-xs text-gray-500 mt-1">Updated daily from Amazon</p>
                    </div>
                  )}

                  {product.affiliateUrl && (
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex items-center justify-center gap-2 w-full bg-[#ff9900] hover:bg-[#ffaa20] text-black font-bold py-3.5 rounded-xl transition-colors mb-3"
                    >
                      <ShoppingCart className="w-4 h-4" /> Buy on Amazon
                    </a>
                  )}

                  {product.verdictSummary && (
                    <p className="text-xs text-gray-500 text-center leading-relaxed">{product.verdictSummary.slice(0, 120)}…</p>
                  )}
                </div>

                {/* Share */}
                <div className="bg-[#111827] border border-white/8 rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-white mb-3">Share This Review</h3>
                  <div className="flex gap-2">
                    {['Twitter', 'Facebook', 'WhatsApp'].map(s => (
                      <button key={s} className="flex-1 text-xs bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white py-2 rounded-lg transition-colors">{s}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

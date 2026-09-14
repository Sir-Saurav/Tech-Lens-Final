import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';
import { cn, formatPrice, getScoreColor, getScoreBg, truncate } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const score = product.verdictScore ?? 8.5;
  const scoreColor = getScoreColor(score);
  const scoreBg = getScoreBg(score);

  return (
    <article
      className={cn(
        'group relative bg-white border border-[#DDE1E6] rounded flex flex-col justify-between overflow-hidden transition-all duration-200 hover:border-[#BCC3CC] hover:shadow-sm',
        className
      )}
    >
      <div>
        {/* Image & Score Header */}
        <div className="relative aspect-[4/3] bg-[#F5F6F4] border-b border-[#DDE1E6] p-4 flex items-center justify-center">
          <Link href={`/products/${product.slug}`} className="relative w-full h-full block">
            {product.thumbnail ? (
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingCart className="w-10 h-10 text-[#858585]" />
              </div>
            )}
          </Link>

          {/* Brand Tag */}
          {product.brand && (
            <div className="absolute top-3 left-3 bg-white/90 border border-[#DDE1E6] px-2 py-0.5 rounded text-[11px] font-semibold text-[#5C5C5C] uppercase tracking-wider">
              {product.brand}
            </div>
          )}

          {/* GadgetLens Score Badge */}
          <div
            className={cn(
              'absolute top-3 right-3 px-2 py-1 rounded border font-mono text-xs font-bold flex items-center gap-1 shadow-sm',
              scoreBg
            )}
          >
            <span className="text-[10px] text-[#5C5C5C] font-normal uppercase">Score</span>
            <span className={scoreColor}>{score.toFixed(1)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#2D5986] mb-1">
            {product.category}
          </div>

          <Link href={`/products/${product.slug}`}>
            <h3 className="font-semibold text-base text-[#1A1A1A] leading-snug hover:text-[#2D5986] transition-colors line-clamp-2">
              {truncate(product.title, 75)}
            </h3>
          </Link>

          {product.verdictSummary && (
            <p className="mt-2 text-xs text-[#5C5C5C] line-clamp-2 leading-relaxed">
              {product.verdictSummary}
            </p>
          )}

          {/* Price & Amazon Data */}
          <div className="mt-3 pt-3 border-t border-[#DDE1E6] flex items-center justify-between">
            <div>
              {product.price ? (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-bold font-mono text-[#1A1A1A]">
                    {formatPrice(product.price, product.currency)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xs text-[#858585] line-through font-mono">
                      {formatPrice(product.originalPrice, product.currency)}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-xs text-[#858585]">Check listing price</span>
              )}
            </div>

            {product.rating && (
              <div className="text-[11px] font-mono text-[#5C5C5C] bg-[#F5F6F4] px-1.5 py-0.5 rounded border border-[#DDE1E6]">
                ★ {product.rating.toFixed(1)} ({product.reviewCount?.toLocaleString() || 0})
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <Link
          href={`/products/${product.slug}`}
          className="text-center py-2 px-3 border border-[#DDE1E6] bg-[#F5F6F4] hover:bg-[#EEF4FA] hover:border-[#2D5986] text-[#1A1A1A] hover:text-[#2D5986] text-xs font-semibold rounded transition-colors"
        >
          Full Review
        </Link>
        <a
          href={product.affiliateUrl || `https://www.amazon.in/dp/${product.asin}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex items-center justify-center gap-1 py-2 px-3 bg-[#1A1A1A] hover:bg-[#2D5986] text-white text-xs font-semibold rounded transition-colors"
        >
          <span>Amazon</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </article>
  );
}

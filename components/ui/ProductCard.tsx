import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';
import StarRating from './StarRating';
import Badge from './Badge';
import { cn, formatPrice, getScoreColor, getScoreBg, truncate } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const scoreColor = product.verdictScore ? getScoreColor(product.verdictScore) : 'text-gray-400';
  const scoreBg = product.verdictScore ? getScoreBg(product.verdictScore) : 'bg-gray-500/10 border-gray-500/20';

  return (
    <div
      className={cn(
        'group relative bg-[#111827] border border-white/8 rounded-2xl overflow-hidden',
        'hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300',
        className
      )}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0d1526]">
        <Link href={`/products/${product.slug}`}>
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-gray-600" />
            </div>
          )}
        </Link>

        {/* TechLens Score */}
        {product.verdictScore && (
          <div className={cn('absolute top-3 right-3 px-2.5 py-1 rounded-xl text-xs font-bold border', scoreBg)}>
            <span className={scoreColor}>{product.verdictScore.toFixed(1)}</span>
            <span className="text-gray-500 ml-0.5 font-normal">/10</span>
          </div>
        )}

        {/* Brand */}
        {product.brand && (
          <div className="absolute top-3 left-3">
            <Badge variant="muted" className="text-xs">{product.brand}</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs text-cyan-400/70 uppercase tracking-wider font-medium">{product.category}</span>

        {/* Title */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1 font-semibold text-white text-sm leading-snug hover:text-cyan-400 transition-colors line-clamp-2">
            {truncate(product.title, 80)}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="mt-2">
            <StarRating
              rating={product.rating}
              count={product.reviewCount}
              size="sm"
            />
          </div>
        )}

        {/* Price */}
        <div className="mt-3 flex items-center gap-2">
          {product.price ? (
            <>
              <span className="text-lg font-bold text-cyan-400">
                {formatPrice(product.price, product.currency)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-500 line-through">
                  {formatPrice(product.originalPrice, product.currency)}
                </span>
              )}
            </>
          ) : (
            <span className="text-sm text-gray-500">Price not available</span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-col gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="block text-center bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 border border-cyan-500/20 hover:border-cyan-500/40 text-sm font-medium py-2 rounded-xl transition-all duration-200"
          >
            Read Full Review
          </Link>
          {product.affiliateUrl && (
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center justify-center gap-1.5 text-center bg-[#ff9900] hover:bg-[#ffaa20] text-black text-xs font-semibold py-2 rounded-xl transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Buy on Amazon
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

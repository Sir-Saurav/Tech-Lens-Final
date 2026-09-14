import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

export default function StarRating({ rating, count, size = 'md', showNumber = true, className }: StarRatingProps) {
  const sizes = { sm: 'w-3 h-3', md: 'w-3.5 h-3.5', lg: 'w-4 h-4' };
  const textSizes = { sm: 'text-xs', md: 'text-xs', lg: 'text-sm' };
  const starSize = sizes[size];
  const textSize = textSizes[size];

  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating);
    const partial = !filled && i < rating;
    const pct = partial ? Math.round((rating - Math.floor(rating)) * 100) : 0;

    return (
      <span key={i} className="relative inline-block">
        {/* Background star (empty) */}
        <svg className={cn(starSize, 'text-[#DDE1E6]')} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        {/* Foreground star (filled/partial) */}
        {(filled || partial) && (
          <span
            className="absolute inset-0 overflow-hidden"
            style={{ width: filled ? '100%' : `${pct}%` }}
          >
            <svg className={cn(starSize, 'text-[#D97706]')} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </span>
        )}
      </span>
    );
  });

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">{stars}</div>
      {showNumber && (
        <span className={cn('font-mono font-medium text-[#1A1A1A]', textSize)}>{rating.toFixed(1)}</span>
      )}
      {count !== undefined && (
        <span className={cn('font-mono text-[#5C5C5C]', textSize)}>({count.toLocaleString()})</span>
      )}
    </div>
  );
}

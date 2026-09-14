'use client';

import { useState } from 'react';
import { ThumbsUp, MapPin, ExternalLink } from 'lucide-react';
import type { Review } from '@/types';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';
import { getSourceLabel, formatDate, formatNumber } from '@/lib/utils';

const TABS = ['All', 'AMAZON', 'REDDIT', 'EXPERT'] as const;
type Tab = typeof TABS[number];

const sourceVariantMap: Record<string, 'amazon' | 'reddit' | 'youtube' | 'expert' | 'muted'> = {
  AMAZON: 'amazon',
  REDDIT: 'reddit',
  YOUTUBE: 'youtube',
  EXPERT: 'expert',
};

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.body.length > 300;
  const displayBody = isLong && !expanded ? review.body.slice(0, 300) + '…' : review.body;

  const initials = review.authorName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="p-5 bg-white border border-[#DDE1E6] rounded">
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar */}
        <div className="w-8 h-8 bg-[#1A1A1A] text-white rounded flex items-center justify-center text-xs font-mono font-bold shrink-0">
          {initials || 'U'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#1A1A1A] text-sm">{review.authorName}</span>
            {review.authorLocation && (
              <span className="flex items-center gap-1 text-xs text-[#5C5C5C] font-mono">
                <MapPin className="w-3 h-3" />
                {review.authorLocation}
              </span>
            )}
            {review.isVerified && (
              <span className="text-[11px] text-[#2A6B4A] font-semibold bg-[#EBF5EE] border border-[#C3E0CE] px-1.5 py-0.2 rounded">
                ✓ Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge variant={sourceVariantMap[review.source] || 'muted'} className="text-[11px]">
              {getSourceLabel(review.source)}
            </Badge>
            {review.rating && <StarRating rating={review.rating} size="sm" showNumber={false} />}
            {review.sourceDate && (
              <span className="text-xs text-[#858585] font-mono">{formatDate(review.sourceDate)}</span>
            )}
          </div>
        </div>
      </div>

      {review.title && (
        <h4 className="font-bold text-[#1A1A1A] text-sm mb-2">{review.title}</h4>
      )}
      <p className="text-[#5C5C5C] text-sm leading-relaxed">{displayBody}</p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[#2D5986] hover:underline text-xs mt-2 font-semibold"
        >
          {expanded ? 'Show less' : 'Read full text'}
        </button>
      )}

      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#DDE1E6]">
        {review.isHelpful > 0 && (
          <span className="flex items-center gap-1.5 text-xs text-[#858585] font-mono">
            <ThumbsUp className="w-3.5 h-3.5 text-[#5C5C5C]" />
            {formatNumber(review.isHelpful)} readers found helpful
          </span>
        )}
        {review.sourceUrl && (
          <a
            href={review.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-[#2D5986] hover:underline ml-auto font-mono"
          >
            Source <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}

export default function ReviewTabs({ reviews }: { reviews: Review[] }) {
  const [activeTab, setActiveTab] = useState<Tab>('All');

  const filtered = reviews.filter((r) => activeTab === 'All' || r.source === activeTab);
  const counts: Record<Tab, number> = {
    All: reviews.length,
    AMAZON: reviews.filter((r) => r.source === 'AMAZON').length,
    REDDIT: reviews.filter((r) => r.source === 'REDDIT').length,
    EXPERT: reviews.filter((r) => r.source === 'EXPERT').length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3 border-b border-[#DDE1E6] pb-3">
        <h3 className="font-display text-xl font-bold text-[#1A1A1A]">
          Verified Opinions & Consensus
        </h3>
        <span className="text-xs text-[#5C5C5C] font-mono">
          {reviews.length} source records analyzed
        </span>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-colors border ${
              activeTab === tab
                ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                : 'bg-white text-[#5C5C5C] hover:text-[#1A1A1A] border-[#DDE1E6] hover:bg-[#F5F6F4]'
            }`}
          >
            {tab === 'All' ? 'All Sources' : getSourceLabel(tab)}
            <span className="opacity-75 font-mono text-[11px]">({counts[tab] || 0})</span>
          </button>
        ))}
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((review) => <ReviewCard key={review.id} review={review} />)
        ) : (
          <div className="p-8 text-center bg-white border border-[#DDE1E6] rounded text-xs text-[#5C5C5C]">
            No review items recorded for this filter category.
          </div>
        )}
      </div>
    </div>
  );
}

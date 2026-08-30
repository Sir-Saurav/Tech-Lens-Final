'use client';

import { useState } from 'react';
import { ThumbsUp, MapPin, Star, ExternalLink } from 'lucide-react';
import type { Review } from '@/types';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';
import { getSourceLabel, formatDate, formatNumber } from '@/lib/utils';

const TABS = ['All', 'AMAZON', 'REDDIT', 'YOUTUBE', 'EXPERT'] as const;
type Tab = typeof TABS[number];

const sourceVariantMap: Record<string, 'amazon' | 'reddit' | 'youtube' | 'expert' | 'muted'> = {
  AMAZON: 'amazon', REDDIT: 'reddit', YOUTUBE: 'youtube', EXPERT: 'expert',
};

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.body.length > 300;
  const displayBody = isLong && !expanded ? review.body.slice(0, 300) + '…' : review.body;

  // Generate avatar color from name
  const colors = ['bg-cyan-500', 'bg-indigo-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500'];
  const colorIndex = review.authorName.charCodeAt(0) % colors.length;
  const initials = review.authorName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className="p-5 bg-[#111827] border border-white/8 rounded-xl hover:border-white/12 transition-colors">
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar */}
        <div className={`w-9 h-9 ${colors[colorIndex]} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-white text-sm">{review.authorName}</span>
            {review.authorLocation && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="w-3 h-3" />{review.authorLocation}
              </span>
            )}
            {review.isVerified && (
              <span className="text-xs text-green-400 font-medium">✓ Verified Purchase</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge variant={sourceVariantMap[review.source] || 'muted'} className="text-xs">
              {getSourceLabel(review.source)}
            </Badge>
            {review.rating && <StarRating rating={review.rating} size="sm" showNumber={false} />}
            {review.sourceDate && <span className="text-xs text-gray-500">{formatDate(review.sourceDate)}</span>}
          </div>
        </div>
      </div>

      {review.title && (
        <h4 className="font-semibold text-white text-sm mb-2">{review.title}</h4>
      )}
      <p className="text-gray-300 text-sm leading-relaxed">{displayBody}</p>
      {isLong && (
        <button onClick={() => setExpanded(!expanded)} className="text-cyan-400 hover:text-cyan-300 text-xs mt-2 transition-colors">
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}

      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5">
        {review.isHelpful > 0 && (
          <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors">
            <ThumbsUp className="w-3.5 h-3.5" />
            Helpful ({formatNumber(review.isHelpful)})
          </button>
        )}
        {review.sourceUrl && (
          <a href={review.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gray-500 hover:text-cyan-400 transition-colors ml-auto">
            Source <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}

export default function ReviewTabs({ reviews }: { reviews: Review[] }) {
  const [activeTab, setActiveTab] = useState<Tab>('All');
  const [sort, setSort] = useState('helpful');

  const filtered = reviews.filter(r => activeTab === 'All' || r.source === activeTab);
  const counts: Record<Tab, number> = {
    All: reviews.length,
    AMAZON: reviews.filter(r => r.source === 'AMAZON').length,
    REDDIT: reviews.filter(r => r.source === 'REDDIT').length,
    YOUTUBE: reviews.filter(r => r.source === 'YOUTUBE').length,
    EXPERT: reviews.filter(r => r.source === 'EXPERT').length,
  };

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'helpful') return b.isHelpful - a.isHelpful;
    if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sort === 'highest') return (b.rating || 0) - (a.rating || 0);
    if (sort === 'lowest') return (a.rating || 0) - (b.rating || 0);
    return 0;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-xl font-bold text-white">User Reviews & Opinions</h2>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="text-xs bg-white/5 border border-white/10 text-gray-400 rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500"
        >
          <option value="helpful">Most Helpful</option>
          <option value="newest">Most Recent</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-5">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25'
                : 'bg-white/5 text-gray-400 hover:text-white border border-transparent'
            }`}
          >
            {tab === 'All' ? 'All Reviews' : getSourceLabel(tab)}
            <span className="text-xs opacity-60">({counts[tab]})</span>
          </button>
        ))}
      </div>

      {/* Sentiment overview */}
      <div className="bg-[#111827] border border-white/8 rounded-xl p-4 mb-5">
        <div className="flex items-center gap-4 mb-3 flex-wrap">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white font-bold">4.7</span>
            <span className="text-gray-400 text-sm">/ 5 overall</span>
          </div>
          <div className="text-xs text-gray-500">{reviews.length} total opinions analyzed</div>
        </div>
        <div className="flex gap-1 h-2 rounded-full overflow-hidden">
          <div className="bg-cyan-500 rounded-l-full" style={{ width: '72%' }} title="Positive" />
          <div className="bg-gray-500" style={{ width: '18%' }} title="Neutral" />
          <div className="bg-red-500 rounded-r-full" style={{ width: '10%' }} title="Negative" />
        </div>
        <div className="flex gap-4 mt-2 text-xs text-gray-500">
          <span><span className="text-cyan-400">72%</span> Positive</span>
          <span><span className="text-gray-400">18%</span> Neutral</span>
          <span><span className="text-red-400">10%</span> Negative</span>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {sorted.map(review => <ReviewCard key={review.id} review={review} />)}
      </div>
    </div>
  );
}

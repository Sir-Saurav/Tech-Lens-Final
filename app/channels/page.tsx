import Link from 'next/link';
import type { Metadata } from 'next';
import { Play, ExternalLink, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our YouTube Channels | TechLens',
  description: 'Watch tech reviews on Gadget Verse, Tech Space, Gadget Bits, Gadget Adda, Tech Buddie, Tech States and Lyrics Tope — 7 channels covering everything in tech.',
};

const CHANNELS = [
  {
    name: 'Gadget Verse',
    slug: 'gadget-verse',
    handle: '@GadgetVerse',
    description: 'Deep-dive reviews and unboxings of the latest flagship smartphones, laptops and gadgets. Premium production quality.',
    focus: ['Flagship Smartphones', 'Premium Laptops', 'Camera Reviews'],
    color: 'cyan',
    subscribers: '125K',
    videos: '340+',
  },
  {
    name: 'Tech Space',
    slug: 'tech-space',
    handle: '@TechSpace',
    description: 'Comparison videos, buying guides and tech news. The best place to decide between two products.',
    focus: ['Comparisons', 'Buying Guides', 'Tech News'],
    color: 'blue',
    subscribers: '89K',
    videos: '280+',
  },
  {
    name: 'Gadget Bits',
    slug: 'gadget-bits',
    handle: '@GadgetBits',
    description: 'Short, punchy reviews and quick takes on new products. Get the verdict in under 10 minutes.',
    focus: ['Quick Reviews', 'Accessories', 'Value Picks'],
    color: 'purple',
    subscribers: '67K',
    videos: '510+',
  },
  {
    name: 'Gadget Adda',
    slug: 'gadget-adda',
    handle: '@GadgetAdda',
    description: 'Long-term usage reviews and real-world tests. We use products for months before giving a verdict.',
    focus: ['Long-term Reviews', 'Real-world Tests', 'Durability'],
    color: 'green',
    subscribers: '54K',
    videos: '195+',
  },
  {
    name: 'Tech Buddie',
    slug: 'tech-buddie',
    handle: '@TechBuddie',
    description: 'Budget tech reviews for the price-conscious buyer. The best products under every budget tier.',
    focus: ['Budget Phones', 'Value Laptops', 'Under ₹20K'],
    color: 'orange',
    subscribers: '42K',
    videos: '220+',
  },
  {
    name: 'Tech States',
    slug: 'tech-states',
    handle: '@TechStates',
    description: 'Tech reviews with a focus on the South Asian market — Nepal, India, Bangladesh. Local availability, pricing, and import info.',
    focus: ['Nepal Market', 'Local Pricing', 'Import Guide'],
    color: 'pink',
    subscribers: '31K',
    videos: '175+',
  },
  {
    name: 'Lyrics Tope',
    slug: 'lyrics-tope',
    handle: '@LyricsTope',
    description: 'Your go-to channel for the latest Nepali and Hindi song lyrics. Music reviews and lyric breakdowns.',
    focus: ['Nepali Songs', 'Hindi Lyrics', 'Music Reviews'],
    color: 'yellow',
    subscribers: '210K',
    videos: '800+',
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  cyan:   { bg: 'bg-cyan-500/8',   text: 'text-cyan-400',   border: 'border-cyan-500/20',   badge: 'bg-cyan-500/15 text-cyan-400' },
  blue:   { bg: 'bg-blue-500/8',   text: 'text-blue-400',   border: 'border-blue-500/20',   badge: 'bg-blue-500/15 text-blue-400' },
  purple: { bg: 'bg-purple-500/8', text: 'text-purple-400', border: 'border-purple-500/20', badge: 'bg-purple-500/15 text-purple-400' },
  green:  { bg: 'bg-green-500/8',  text: 'text-green-400',  border: 'border-green-500/20',  badge: 'bg-green-500/15 text-green-400' },
  orange: { bg: 'bg-orange-500/8', text: 'text-orange-400', border: 'border-orange-500/20', badge: 'bg-orange-500/15 text-orange-400' },
  pink:   { bg: 'bg-pink-500/8',   text: 'text-pink-400',   border: 'border-pink-500/20',   badge: 'bg-pink-500/15 text-pink-400' },
  yellow: { bg: 'bg-yellow-500/8', text: 'text-yellow-400', border: 'border-yellow-500/20', badge: 'bg-yellow-500/15 text-yellow-400' },
};

export default function ChannelsPage() {
  const totalSubs = CHANNELS.reduce((a, c) => a + parseInt(c.subscribers.replace('K', '000').replace('+', '')), 0);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-6">
            <Play className="w-4 h-4" />
            7 Active YouTube Channels
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Our Review Channels</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            From quick takes to deep dives — our 7 channels cover every product category and budget. Combined {(totalSubs / 1000).toFixed(0)}K+ subscribers and growing.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
          {[
            { value: '7', label: 'Active Channels' },
            { value: '618K+', label: 'Total Subscribers' },
            { value: '2,500+', label: 'Videos Published' },
          ].map(stat => (
            <div key={stat.label} className="text-center p-4 bg-white/3 border border-white/8 rounded-xl">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Channels grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CHANNELS.map(ch => {
            const c = colorMap[ch.color] || colorMap.cyan;
            return (
              <div key={ch.slug} className={`p-6 rounded-2xl border ${c.bg} ${c.border} bg-[#111827] hover:border-opacity-50 transition-all group`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center`}>
                      <Play className={`w-6 h-6 ${c.text}`} />
                    </div>
                    <div>
                      <h2 className="font-bold text-white text-lg leading-tight">{ch.name}</h2>
                      <span className={`text-xs ${c.text}`}>{ch.handle}</span>
                    </div>
                  </div>
                  <a
                    href={`https://youtube.com/${ch.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${c.badge} border ${c.border} hover:opacity-80 transition-opacity`}
                  >
                    <Play className="w-3 h-3" fill="currentColor" /> Subscribe
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed mb-4">{ch.description}</p>

                {/* Focus tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {ch.focus.map(f => (
                    <span key={f} className={`text-xs px-2 py-1 rounded-full ${c.badge}`}>{f}</span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Users className="w-3.5 h-3.5" />
                    {ch.subscribers} subscribers
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Play className="w-3.5 h-3.5" />
                    {ch.videos} videos
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center p-8 bg-gradient-to-r from-cyan-500/5 to-indigo-500/5 border border-white/8 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-2">Watch Our Latest Videos</h2>
          <p className="text-gray-400 text-sm mb-5">All videos from all 7 channels in one place, filterable by channel</p>
          <Link href="/videos" className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl text-sm transition-colors">
            <Play className="w-4 h-4" /> Browse All Videos
          </Link>
        </div>
      </div>
    </div>
  );
}


import Link from 'next/link';
import type { Metadata } from 'next';
import { Play, ExternalLink, Users, Tv, Radio, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Network Channels | GadgetLens',
  description: 'Our specialized video desks across 7 YouTube channels covering flagship hardware, lab comparisons, long-term testing, and local market analysis.',
  alternates: {
    canonical: 'https://gadgetlens.store/channels',
  },
};

const CHANNELS = [
  {
    name: 'Gadget Verse',
    slug: 'gadget-verse',
    handle: '@GadgetVerse',
    description: 'Deep-dive hardware testing and unboxings of flagship smartphones, creator laptops, and premium audio gear.',
    focus: ['Flagship Smartphones', 'Creator Laptops', 'Camera Analysis'],
    subscribers: '125K',
    videos: '340+',
  },
  {
    name: 'Tech Space',
    slug: 'tech-space',
    handle: '@TechSpace',
    description: 'Side-by-side comparative benchmarks, buyer decision flowcharts, and hardware teardowns.',
    focus: ['Comparisons', 'Buying Guides', 'Hardware Benchmarks'],
    subscribers: '89K',
    videos: '280+',
  },
  {
    name: 'Gadget Bits',
    slug: 'gadget-bits',
    handle: '@GadgetBits',
    description: 'Concise lab verdicts and rapid-fire acoustic tests for high-volume audio peripherals and daily accessories.',
    focus: ['Quick Verdicts', 'Peripherals', 'ANC Audio'],
    subscribers: '67K',
    videos: '510+',
  },
  {
    name: 'Gadget Adda',
    slug: 'gadget-adda',
    handle: '@GadgetAdda',
    description: 'Long-term stress tests and 6-month endurance evaluations before issuing final reliability ratings.',
    focus: ['Long-term Tests', 'Durability', 'Battery Wear'],
    subscribers: '54K',
    videos: '195+',
  },
  {
    name: 'Tech Buddie',
    slug: 'tech-buddie',
    handle: '@TechBuddie',
    description: 'Budget performance metrics and value optimization across entry-level and midrange consumer electronics.',
    focus: ['Value Hardware', 'Budget Displays', 'Midrange SoCs'],
    subscribers: '42K',
    videos: '220+',
  },
  {
    name: 'Tech States',
    slug: 'tech-states',
    handle: '@TechStates',
    description: 'Regional hardware availability, import tariffs, and localized retail pricing comparisons for South Asia.',
    focus: ['Regional Availability', 'Import Guides', 'Local Pricing'],
    subscribers: '31K',
    videos: '175+',
  },
  {
    name: 'Lyrics Tope',
    slug: 'lyrics-tope',
    handle: '@LyricsTope',
    description: 'Acoustic vocal tracking, music mastering analysis, and studio production equipment breakdowns.',
    focus: ['Acoustics', 'Studio Sound', 'Mastering Trackers'],
    subscribers: '210K',
    videos: '800+',
  },
];

export default function ChannelsPage() {
  return (
    <div className="pt-28 pb-20 bg-[#F5F6F4] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="border-b border-[#DDE1E6] pb-8 mb-10">
          <div className="flex items-center gap-2 font-mono text-xs text-[#2D5986] uppercase tracking-wider mb-2">
            <Radio className="w-3.5 h-3.5" />
            <span>Video Desks</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight mb-3">
            GadgetLens Channel Network
          </h1>
          <p className="text-sm sm:text-base text-[#4B5563] max-w-2xl leading-relaxed">
            Seven dedicated production desks producing lab teardowns, side-by-side sensor tests, and long-term durability evaluations.
          </p>
        </div>

        {/* Aggregate Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10 max-w-3xl">
          {[
            { value: '7', label: 'Dedicated Desks' },
            { value: '618K+', label: 'Combined Audience' },
            { value: '2,500+', label: 'Published Lab Dispatches' },
          ].map((stat) => (
            <div key={stat.label} className="p-4 bg-white border border-[#DDE1E6] rounded-xl text-center">
              <div className="font-mono text-2xl font-bold text-[#111827]">{stat.value}</div>
              <div className="font-mono text-xs text-[#4B5563] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {CHANNELS.map((ch) => (
            <div
              key={ch.slug}
              className="p-6 bg-white border border-[#DDE1E6] rounded-xl hover:border-[#2D5986] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-[#F5F6F4] border border-[#DDE1E6] flex items-center justify-center text-[#2D5986]">
                      <Tv className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-serif text-lg font-bold text-[#111827]">{ch.name}</h2>
                      <span className="font-mono text-xs text-[#2D5986]">{ch.handle}</span>
                    </div>
                  </div>
                  <a
                    href={`https://youtube.com/${ch.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F6F4] text-[#111827] hover:bg-[#2D5986] hover:text-white border border-[#DDE1E6] rounded-lg text-xs font-semibold transition-colors"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Channel</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                  {ch.description}
                </p>

                {/* Focus Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {ch.focus.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] px-2 py-0.5 bg-[#F5F6F4] text-[#4B5563] border border-[#DDE1E6] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Channel Stats Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#F5F6F4] font-mono text-xs text-[#4B5563]">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#2D5986]" />
                  <span>{ch.subscribers} subscribers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-[#2D5986]" />
                  <span>{ch.videos} uploads</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Browse Video Archive CTA */}
        <div className="p-8 bg-white border border-[#DDE1E6] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#111827] mb-1">
              Browse All Video Teardowns
            </h2>
            <p className="text-xs text-[#4B5563]">
              Filter bench tests and camera shootouts across all 7 channels in one library.
            </p>
          </div>
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2D5986] hover:bg-[#1f4061] text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            <span>Open Video Desk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}


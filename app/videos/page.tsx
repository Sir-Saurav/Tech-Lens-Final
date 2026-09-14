import Link from 'next/link';
import type { Metadata } from 'next';
import { Video as VideoIcon, Tv } from 'lucide-react';
import VideoCard from '@/components/ui/VideoCard';
import { ALL_VIDEOS } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Video Teardowns & Tests | GadgetLens',
  description: 'Visual lab tests, camera sensor comparisons, and long-term durability teardowns from the GadgetLens channel network.',
  alternates: {
    canonical: 'https://gadgetlens.store/videos',
  },
};

const CHANNELS = [
  'All',
  'Gadget Verse',
  'Tech Space',
  'Gadget Bits',
  'Gadget Adda',
  'Tech Buddie',
  'Tech States',
];

export default async function VideosPage({
  searchParams,
}: {
  searchParams: Promise<{ channel?: string }>;
}) {
  const params = await searchParams;
  const activeChannel = params.channel || 'All';

  const filtered = activeChannel === 'All'
    ? ALL_VIDEOS
    : ALL_VIDEOS.filter((v) => v.channelName.toLowerCase() === activeChannel.toLowerCase());

  return (
    <div className="pt-28 pb-20 bg-[#F5F6F4] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="border-b border-[#DDE1E6] pb-8 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#2D5986] uppercase tracking-wider mb-2">
              <VideoIcon className="w-3.5 h-3.5" />
              <span>Broadcast Network</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
              Lab Video Teardowns
            </h1>
            <p className="text-sm sm:text-base text-[#4B5563] mt-2 max-w-2xl leading-relaxed">
              Extended bench tests, acoustic samples, and side-by-side camera sensor captures produced across our video desk.
            </p>
          </div>

          <Link
            href="/channels"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#2D5986] bg-white px-3.5 py-2 rounded-lg border border-[#DDE1E6] hover:border-[#2D5986] transition-colors self-start md:self-auto"
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Channel Directory</span>
          </Link>
        </div>

        {/* Channel Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {CHANNELS.map((ch) => {
            const isActive = activeChannel.toLowerCase() === ch.toLowerCase();
            return (
              <Link
                key={ch}
                href={ch === 'All' ? '/videos' : `/videos?channel=${encodeURIComponent(ch)}`}
                className={`font-mono text-xs px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors border ${
                  isActive
                    ? 'bg-[#2D5986] text-white border-[#2D5986] font-semibold shadow-sm'
                    : 'bg-white text-[#4B5563] border-[#DDE1E6] hover:border-[#2D5986] hover:text-[#111827]'
                }`}
              >
                {ch}
              </Link>
            );
          })}
        </div>

        {/* Video Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#DDE1E6] rounded-xl p-12 text-center max-w-md mx-auto my-12">
            <p className="font-serif text-lg font-bold text-[#111827] mb-2">No videos found for this channel</p>
            <p className="text-xs text-[#4B5563] mb-6">Explore the rest of our video desk catalog.</p>
            <Link
              href="/videos"
              className="inline-flex items-center justify-center px-4 py-2 bg-[#2D5986] text-white text-xs font-semibold rounded-lg hover:bg-[#1f4061] transition-colors"
            >
              Reset Filter
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

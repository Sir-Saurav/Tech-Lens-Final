import type { Metadata } from 'next';
import VideoCard from '@/components/ui/VideoCard';
import type { Video } from '@/types';

export const metadata: Metadata = {
  title: 'Tech Review Videos | TechLens',
  description: 'Watch in-depth tech product review videos from Gadget Verse, Tech Space, Gadget Bits, Gadget Adda, Tech Buddie, Tech States and more.',
};

const ALL_CHANNELS = ['All', 'Gadget Verse', 'Tech Space', 'Gadget Bits', 'Gadget Adda', 'Tech Buddie', 'Tech States'];

const MOCK_VIDEOS: Video[] = [
  { id: '1', youtubeId: 'dQw4w9WgXcQ', title: 'iPhone 16 Pro Max Full Review – Is It Worth ₹1.35 Lakh?', channelName: 'Gadget Verse', channelId: '', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', publishedAt: '2025-02-01T00:00:00Z', viewCount: 245000, duration: '18:32', tags: [], isPublished: true, createdAt: new Date().toISOString() },
  { id: '2', youtubeId: 'oHg5SJYRHA0', title: 'Samsung S25 Ultra vs iPhone 16 Pro Max – Which Should You Buy?', channelName: 'Tech Space', channelId: '', thumbnail: 'https://img.youtube.com/vi/oHg5SJYRHA0/maxresdefault.jpg', publishedAt: '2025-01-28T00:00:00Z', viewCount: 189000, duration: '22:14', tags: [], isPublished: true, createdAt: new Date().toISOString() },
  { id: '3', youtubeId: 'y6120QOlsfU', title: 'Sony WH-1000XM5 – Best ANC Headphones of 2025?', channelName: 'Gadget Bits', channelId: '', thumbnail: 'https://img.youtube.com/vi/y6120QOlsfU/maxresdefault.jpg', publishedAt: '2025-01-25T00:00:00Z', viewCount: 98000, duration: '14:45', tags: [], isPublished: true, createdAt: new Date().toISOString() },
  { id: '4', youtubeId: 'rokGy0huYEA', title: 'MacBook Pro M4 Pro – 2 Months Later – Honest Review', channelName: 'Gadget Adda', channelId: '', thumbnail: 'https://img.youtube.com/vi/rokGy0huYEA/maxresdefault.jpg', publishedAt: '2025-01-22T00:00:00Z', viewCount: 134000, duration: '19:08', tags: [], isPublished: true, createdAt: new Date().toISOString() },
  { id: '5', youtubeId: '6_b6zVHhBt4', title: 'Top 5 Budget Phones Under ₹20,000 in 2025', channelName: 'Tech Buddie', channelId: '', thumbnail: 'https://img.youtube.com/vi/6_b6zVHhBt4/maxresdefault.jpg', publishedAt: '2025-01-18T00:00:00Z', viewCount: 67000, duration: '12:30', tags: [], isPublished: true, createdAt: new Date().toISOString() },
  { id: '6', youtubeId: 'hY7m5jjJ9mM', title: 'Google Pixel 9 Pro Real World Camera Test in Nepal', channelName: 'Tech States', channelId: '', thumbnail: 'https://img.youtube.com/vi/hY7m5jjJ9mM/maxresdefault.jpg', publishedAt: '2025-01-15T00:00:00Z', viewCount: 52000, duration: '16:20', tags: [], isPublished: true, createdAt: new Date().toISOString() },
  { id: '7', youtubeId: 'dQw4w9WgXcQ', title: 'OnePlus 13 Long Term Review – 3 Month Update', channelName: 'Gadget Verse', channelId: '', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', publishedAt: '2025-01-10T00:00:00Z', viewCount: 78000, duration: '15:44', tags: [], isPublished: true, createdAt: new Date().toISOString() },
  { id: '8', youtubeId: 'oHg5SJYRHA0', title: 'Best Laptops Under ₹80,000 in 2025', channelName: 'Tech Space', channelId: '', thumbnail: 'https://img.youtube.com/vi/oHg5SJYRHA0/hqdefault.jpg', publishedAt: '2025-01-05T00:00:00Z', viewCount: 112000, duration: '20:55', tags: [], isPublished: true, createdAt: new Date().toISOString() },
  { id: '9', youtubeId: 'y6120QOlsfU', title: 'Apple Watch Series 10 vs Galaxy Watch 7', channelName: 'Gadget Bits', channelId: '', thumbnail: 'https://img.youtube.com/vi/y6120QOlsfU/hqdefault.jpg', publishedAt: '2025-01-01T00:00:00Z', viewCount: 43000, duration: '11:28', tags: [], isPublished: true, createdAt: new Date().toISOString() },
];

export default async function VideosPage({
  searchParams,
}: {
  searchParams: Promise<{ channel?: string }>;
}) {
  const params = await searchParams;
  const activeChannel = params.channel || 'All';

  const filtered = activeChannel === 'All'
    ? MOCK_VIDEOS
    : MOCK_VIDEOS.filter(v => v.channelName === activeChannel);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-1">7 YouTube Channels</p>
          <h1 className="text-3xl font-bold text-white">Review Videos</h1>
          <p className="text-gray-400 mt-1">In-depth video reviews from our channels — watch before you buy</p>
        </div>

        {/* Channel filter */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-8">
          {ALL_CHANNELS.map(ch => (
            <a
              key={ch}
              href={ch === 'All' ? '/videos' : `/videos?channel=${encodeURIComponent(ch)}`}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeChannel === ch
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/8'
              }`}
            >
              {ch}
            </a>
          ))}
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(v => <VideoCard key={v.id} video={v} />)}
        </div>
      </div>
    </div>
  );
}

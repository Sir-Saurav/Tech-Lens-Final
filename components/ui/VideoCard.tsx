import Image from 'next/image';
import { Play, Eye, Clock } from 'lucide-react';
import type { Video } from '@/types';
import { cn, formatNumber, formatDate, truncate } from '@/lib/utils';

interface VideoCardProps {
  video: Video;
  className?: string;
}

const channelColors: Record<string, string> = {
  'Gadget Verse': 'bg-cyan-500/15 text-cyan-400',
  'Tech Space': 'bg-blue-500/15 text-blue-400',
  'Gadget Bits': 'bg-purple-500/15 text-purple-400',
  'Gadget Adda': 'bg-green-500/15 text-green-400',
  'Tech Buddie': 'bg-orange-500/15 text-orange-400',
  'Tech States': 'bg-pink-500/15 text-pink-400',
  'Lyrics Tope': 'bg-yellow-500/15 text-yellow-400',
};

export default function VideoCard({ video, className }: VideoCardProps) {
  const channelColor = channelColors[video.channelName] || 'bg-gray-500/15 text-gray-400';
  const ytUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;
  const thumbnail = video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <div className={cn('group bg-[#111827] border border-white/8 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-300', className)}>
      {/* Thumbnail */}
      <a href={ytUrl} target="_blank" rel="noopener noreferrer" className="block relative aspect-video overflow-hidden bg-[#0d1526]">
        <Image
          src={thumbnail}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/40">
            <Play className="w-6 h-6 text-white ml-1" fill="white" />
          </div>
        </div>
        {/* Duration badge */}
        {video.duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-mono">
            {video.duration}
          </span>
        )}
      </a>

      {/* Content */}
      <div className="p-4">
        {/* Channel badge */}
        <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mb-2', channelColor)}>
          <Play className="w-3 h-3" />
          {video.channelName}
        </span>

        {/* Title */}
        <a href={ytUrl} target="_blank" rel="noopener noreferrer">
          <h3 className="font-semibold text-white text-sm leading-snug hover:text-cyan-400 transition-colors line-clamp-2">
            {truncate(video.title, 80)}
          </h3>
        </a>

        {/* Meta */}
        <div className="mt-2.5 flex items-center gap-3 text-xs text-gray-500">
          {video.viewCount && (
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatNumber(video.viewCount)} views
            </span>
          )}
          {video.publishedAt && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(video.publishedAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}


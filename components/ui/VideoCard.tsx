import Image from 'next/image';
import { Play, Eye, Clock } from 'lucide-react';
import type { Video } from '@/types';
import { cn, formatNumber, formatDate, truncate } from '@/lib/utils';

interface VideoCardProps {
  video: Video;
  className?: string;
}

export default function VideoCard({ video, className }: VideoCardProps) {
  const ytUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;
  const thumbnail = video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <div className={cn('group bg-white border border-[#DDE1E6] rounded overflow-hidden hover:border-[#BCC3CC] transition-all duration-200', className)}>
      {/* Thumbnail */}
      <a href={ytUrl} target="_blank" rel="noopener noreferrer" className="block relative aspect-video overflow-hidden bg-[#F5F6F4]">
        <Image
          src={thumbnail}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-md">
            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
          </div>
        </div>
        {/* Duration badge */}
        {video.duration && (
          <span className="absolute bottom-2 right-2 bg-black/85 text-white text-[11px] px-1.5 py-0.5 rounded font-mono">
            {video.duration}
          </span>
        )}
      </a>

      {/* Content */}
      <div className="p-4">
        {/* Channel badge */}
        <div className="text-[11px] font-semibold text-[#2D5986] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
          {video.channelName}
        </div>

        {/* Title */}
        <a href={ytUrl} target="_blank" rel="noopener noreferrer">
          <h3 className="font-semibold text-[#1A1A1A] text-sm leading-snug hover:text-[#2D5986] transition-colors line-clamp-2">
            {truncate(video.title, 80)}
          </h3>
        </a>

        {/* Meta */}
        <div className="mt-3 flex items-center gap-3 text-xs text-[#5C5C5C] font-mono border-t border-[#DDE1E6] pt-2">
          {video.viewCount && (
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-[#858585]" />
              {formatNumber(video.viewCount)} views
            </span>
          )}
          {video.publishedAt && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#858585]" />
              {formatDate(video.publishedAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}


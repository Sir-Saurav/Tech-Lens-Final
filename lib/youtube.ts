import axios from 'axios';
import type { YouTubeVideo } from '@/types';

const YT_API_KEY = process.env.YOUTUBE_API_KEY!;
const YT_BASE = 'https://www.googleapis.com/youtube/v3';

// ── All 7 Channels ───────────────────────────────────────────────────────────

export const CHANNELS: Record<string, string | undefined> = {
  'Gadget Verse': process.env.CHANNEL_GADGET_VERSE,
  'Tech Space': process.env.CHANNEL_TECH_SPACE,
  'Gadget Bits': process.env.CHANNEL_GADGET_BITS,
  'Lyrics Tope': process.env.CHANNEL_LYRICS_TOPE,
  'Gadget Adda': process.env.CHANNEL_GADGET_ADDA,
  'Tech Buddie': process.env.CHANNEL_TECH_BUDDIE,
  'Tech States': process.env.CHANNEL_TECH_STATES,
};

// ── Fetch videos from a single channel ──────────────────────────────────────

export async function fetchChannelVideos(
  channelId: string,
  channelName: string,
  maxResults = 50
): Promise<YouTubeVideo[]> {
  // Step 1: Search for latest videos
  const searchRes = await axios.get(`${YT_BASE}/search`, {
    params: {
      key: YT_API_KEY,
      channelId,
      part: 'snippet',
      order: 'date',
      type: 'video',
      maxResults,
    },
    timeout: 15_000,
  });

  const items = searchRes.data.items as Array<{
    id: { videoId: string };
    snippet: {
      title: string;
      description: string;
      thumbnails: { maxres?: { url: string }; high?: { url: string }; medium?: { url: string } };
      publishedAt: string;
      tags?: string[];
      channelId: string;
    };
  }>;

  if (!items?.length) return [];

  const videoIds = items.map(i => i.id.videoId).join(',');

  // Step 2: Fetch stats + content details
  const detailsRes = await axios.get(`${YT_BASE}/videos`, {
    params: {
      key: YT_API_KEY,
      id: videoIds,
      part: 'statistics,contentDetails',
    },
    timeout: 15_000,
  });

  const details = detailsRes.data.items as Array<{
    id: string;
    statistics: { viewCount?: string; likeCount?: string };
    contentDetails: { duration: string };
  }>;

  const detailMap = new Map(details.map(d => [d.id, d]));

  return items.map(item => {
    const snippet = item.snippet;
    const detail = detailMap.get(item.id.videoId);
    const thumb =
      snippet.thumbnails.maxres?.url ||
      snippet.thumbnails.high?.url ||
      snippet.thumbnails.medium?.url;

    // Convert ISO duration to readable
    const isoDuration = detail?.contentDetails.duration || '';
    const durationMatch = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    let duration = '';
    if (durationMatch) {
      const h = parseInt(durationMatch[1] || '0');
      const m = parseInt(durationMatch[2] || '0');
      const s = parseInt(durationMatch[3] || '0');
      duration = h > 0
        ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
        : `${m}:${String(s).padStart(2, '0')}`;
    }

    return {
      youtubeId: item.id.videoId,
      title: snippet.title,
      description: snippet.description?.slice(0, 500),
      thumbnail: thumb,
      channelName,
      channelId: snippet.channelId,
      publishedAt: snippet.publishedAt,
      viewCount: detail?.statistics.viewCount ? parseInt(detail.statistics.viewCount) : undefined,
      likeCount: detail?.statistics.likeCount ? parseInt(detail.statistics.likeCount) : undefined,
      duration,
      tags: snippet.tags || [],
    } satisfies YouTubeVideo;
  });
}

// ── Fetch from ALL 7 channels concurrently ───────────────────────────────────

export async function fetchAllChannelVideos(maxPerChannel = 20): Promise<YouTubeVideo[]> {
  const entries = Object.entries(CHANNELS).filter(([, id]) => !!id);

  const results = await Promise.allSettled(
    entries.map(([name, id]) => fetchChannelVideos(id!, name, maxPerChannel))
  );

  const all: YouTubeVideo[] = [];
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') {
      all.push(...r.value);
    } else {
      console.error(`[youtube] Failed for channel ${entries[i][0]}:`, r.reason);
    }
  });

  // Sort by publish date desc
  return all.sort((a, b) => {
    const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return db - da;
  });
}

// ── Get single video details ─────────────────────────────────────────────────

export async function getVideoDetails(youtubeId: string): Promise<YouTubeVideo | null> {
  try {
    const res = await axios.get(`${YT_BASE}/videos`, {
      params: {
        key: YT_API_KEY,
        id: youtubeId,
        part: 'snippet,statistics,contentDetails',
      },
      timeout: 10_000,
    });

    const item = res.data.items?.[0];
    if (!item) return null;

    const s = item.snippet;
    const thumb =
      s.thumbnails?.maxres?.url ||
      s.thumbnails?.high?.url ||
      s.thumbnails?.medium?.url;

    const isoDuration = item.contentDetails?.duration || '';
    const dm = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    let duration = '';
    if (dm) {
      const h = parseInt(dm[1] || '0'), m = parseInt(dm[2] || '0'), sec = parseInt(dm[3] || '0');
      duration = h > 0 ? `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}` : `${m}:${String(sec).padStart(2,'0')}`;
    }

    // Find channel name from our map
    const channelName = Object.entries(CHANNELS).find(([, id]) => id === s.channelId)?.[0] || s.channelTitle;

    return {
      youtubeId,
      title: s.title,
      description: s.description?.slice(0, 500),
      thumbnail: thumb,
      channelName,
      channelId: s.channelId,
      publishedAt: s.publishedAt,
      viewCount: item.statistics?.viewCount ? parseInt(item.statistics.viewCount) : undefined,
      likeCount: item.statistics?.likeCount ? parseInt(item.statistics.likeCount) : undefined,
      duration,
      tags: s.tags || [],
    };
  } catch (err) {
    console.error('[youtube] getVideoDetails failed:', err);
    return null;
  }
}

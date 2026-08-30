import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { fetchAllChannelVideos } from '@/lib/youtube';
import { matchProductToVideo } from '@/lib/ai';

export async function GET() {
  try {
    const videos = await fetchAllChannelVideos(25);
    let synced = 0, skipped = 0;

    // Fetch recent products for matching
    const recentProducts = await prisma.product.findMany({
      take: 50, orderBy: { createdAt: 'desc' }, select: { id: true, title: true, asin: true }
    });

    for (const video of videos) {
      const exists = await prisma.video.findUnique({ where: { youtubeId: video.youtubeId } });
      if (exists) { skipped++; continue; }

      // Auto-match product
      let productId: string | null = null;
      for (const product of recentProducts) {
        const isMatch = await matchProductToVideo(product.title, video.title);
        if (isMatch) { productId = product.id; break; }
      }

      await prisma.video.create({
        data: {
          youtubeId: video.youtubeId,
          title: video.title,
          description: video.description,
          thumbnail: video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
          channelName: video.channelName,
          channelId: video.channelId,
          publishedAt: video.publishedAt ? new Date(video.publishedAt) : null,
          viewCount: video.viewCount,
          likeCount: video.likeCount,
          duration: video.duration,
          productId,
          tags: video.tags || [],
          isPublished: true,
        },
      });
      synced++;
    }

    return NextResponse.json({ success: true, synced, skipped, total: videos.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[cron/fetch-youtube]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

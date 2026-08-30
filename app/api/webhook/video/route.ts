import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';
import { getVideoDetails, CHANNELS } from '@/lib/youtube';
import { matchProductToVideo } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      youtubeId: string;
      title: string;
      channelName: string;
      productAsin?: string;
      webhookSecret: string;
    };

    if (body.webhookSecret !== process.env.TECHLENS_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { youtubeId, title, channelName, productAsin } = body;
    if (!youtubeId || !title) return NextResponse.json({ error: 'Missing youtubeId or title' }, { status: 400 });

    const existing = await prisma.video.findUnique({ where: { youtubeId } });
    if (existing) return NextResponse.json({ success: true, message: 'Already exists', videoId: existing.id });

    const ytDetails = await getVideoDetails(youtubeId);
    const channelId = CHANNELS[channelName] || ytDetails?.channelId || '';

    let productId: string | null = null;
    if (productAsin) {
      const product = await prisma.product.findUnique({ where: { asin: productAsin } });
      productId = product?.id ?? null;
    } else {
      const recentProducts = await prisma.product.findMany({ take: 30, orderBy: { createdAt: 'desc' }, select: { id: true, title: true } });
      for (const product of recentProducts) {
        const isMatch = await matchProductToVideo(product.title, title);
        if (isMatch) { productId = product.id; break; }
      }
    }

    const video = await prisma.video.create({
      data: {
        youtubeId,
        title: ytDetails?.title || title,
        description: ytDetails?.description,
        thumbnail: ytDetails?.thumbnail || `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
        channelName,
        channelId,
        publishedAt: ytDetails?.publishedAt ? new Date(ytDetails.publishedAt) : new Date(),
        viewCount: ytDetails?.viewCount,
        likeCount: ytDetails?.likeCount,
        duration: ytDetails?.duration,
        productId,
        productAsin: productAsin ?? null,
        tags: ytDetails?.tags || [],
        isPublished: true,
      },
    });

    revalidatePath('/');
    revalidatePath('/videos');
    if (productId) {
      const p = await prisma.product.findUnique({ where: { id: productId }, select: { slug: true } });
      if (p) revalidatePath(`/products/${p.slug}`);
    }

    return NextResponse.json({ success: true, videoId: video.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[webhook/video]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

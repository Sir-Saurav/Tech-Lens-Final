import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';
import { CHANNELS } from '@/lib/youtube';

function extractYoutubeId(input?: string): string {
  if (!input) return '';
  const trimmed = input.trim();
  if (trimmed.length === 11 && !trimmed.includes('/') && !trimmed.includes('?') && !trimmed.includes('.')) {
    return trimmed;
  }
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i);
  return match ? match[1] : trimmed;
}

// Fast non-blocking keyword matching to associate video with a product
function fastMatchProduct(products: Array<{ id: string; title: string; asin?: string }>, videoTitle: string, asin?: string): string | null {
  if (asin) {
    const direct = products.find(p => p.asin && p.asin.toLowerCase() === asin.toLowerCase());
    if (direct) return direct.id;
  }
  const videoLower = videoTitle.toLowerCase();
  for (const p of products) {
    const words = p.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const matches = words.filter(w => videoLower.includes(w));
    if (matches.length >= 2) return p.id;
  }
  return null;
}

// Retry database operation on transient connection hiccups
async function withRetry<T>(fn: () => Promise<T>, retries = 3, delayMs = 300): Promise<T> {
  let lastError: any;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < retries) {
        await new Promise(res => setTimeout(res, delayMs * attempt));
      }
    }
  }
  throw lastError;
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/webhook/video',
    description: 'GadgetLens Video Automation Ingestion Webhook',
    acceptedPayload: {
      youtubeId: 'string (or full YouTube URL)',
      title: 'string',
      description: 'string (optional)',
      thumbnail: 'string URL (optional)',
      tags: 'string[] (optional)',
      duration: 'string (e.g. 12:30, optional)',
      channelName: 'string (e.g. Gadget Verse)',
      productAsin: 'string (optional)',
      webhookSecret: 'string',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    let rawBody: any;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload. Ensure Content-Type is application/json.' },
        { status: 400 }
      );
    }

    // 1. Authentication check
    const validSecret =
      process.env.GADGETLENS_WEBHOOK_SECRET ||
      process.env.TECHLENS_WEBHOOK_SECRET ||
      process.env.WEBHOOK_SECRET;

    const authHeader = request.headers.get('authorization') || '';
    const bearerSecret = authHeader.toLowerCase().startsWith('bearer ')
      ? authHeader.slice(7).trim()
      : null;
    const headerSecret = request.headers.get('x-webhook-secret') || bearerSecret;
    const querySecret = request.nextUrl.searchParams.get('secret');

    const providedSecret =
      (Array.isArray(rawBody) ? null : rawBody.webhookSecret || rawBody.secret || rawBody.token) ||
      headerSecret ||
      querySecret;

    if (validSecret && providedSecret !== validSecret) {
      return NextResponse.json(
        {
          error: 'Unauthorized: Webhook secret mismatch.',
          help: 'Ensure your automation sends the secret in body.webhookSecret, header x-webhook-secret, or query ?secret=',
        },
        { status: 401 }
      );
    }

    // Support both single item and array batch payloads
    const items = Array.isArray(rawBody) ? rawBody : [rawBody];
    const results = [];

    // Pre-fetch products once in memory for fast lookup
    let cachedProducts: Array<{ id: string; title: string; asin: string; slug: string }> = [];
    try {
      cachedProducts = await withRetry(() =>
        prisma.product.findMany({
          take: 50,
          orderBy: { createdAt: 'desc' },
          select: { id: true, title: true, asin: true, slug: true },
        })
      );
    } catch (e) {
      console.warn('[webhook/video] Product pre-fetch skipped:', e);
    }

    for (const body of items) {
      const rawId = body.youtubeId || body.videoId || body.id || body.url || body.videoUrl || body.youtubeUrl;
      const youtubeId = extractYoutubeId(rawId);
      const title = (body.title || `Video ${youtubeId}`)?.trim();
      const channelName = body.channelName?.trim() || 'GadgetLens';
      const productAsin = body.productAsin?.trim() || body.asin?.trim();

      if (!youtubeId) {
        results.push({ error: 'Missing youtubeId or url', item: body });
        continue;
      }

      const channelId = body.channelId || CHANNELS[channelName] || '';
      const matchedProductId = fastMatchProduct(cachedProducts, title, productAsin);

      const finalThumbnail =
        body.thumbnail ||
        body.thumbnailUrl ||
        `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

      const finalDescription = body.description || '';
      const finalTags = Array.isArray(body.tags)
        ? body.tags
        : typeof body.tags === 'string'
        ? body.tags.split(',').map((t: string) => t.trim())
        : [];
      const finalDuration = body.duration || '';

      const publishedAt = body.publishedAt ? new Date(body.publishedAt) : new Date();

      // Upsert directly to prevent concurrency race conditions
      const video = await withRetry(() =>
        prisma.video.upsert({
          where: { youtubeId },
          update: {
            title,
            description: finalDescription || undefined,
            thumbnail: finalThumbnail,
            channelName,
            channelId: channelId || undefined,
            duration: finalDuration || undefined,
            tags: finalTags.length > 0 ? finalTags : undefined,
            productId: matchedProductId ?? undefined,
            productAsin: productAsin ?? undefined,
            viewCount: body.viewCount !== undefined ? Number(body.viewCount) : undefined,
            likeCount: body.likeCount !== undefined ? Number(body.likeCount) : undefined,
            updatedAt: new Date(),
          },
          create: {
            youtubeId,
            title,
            description: finalDescription,
            thumbnail: finalThumbnail,
            channelName,
            channelId,
            publishedAt,
            viewCount: body.viewCount ? Number(body.viewCount) : 0,
            likeCount: body.likeCount ? Number(body.likeCount) : 0,
            duration: finalDuration,
            productId: matchedProductId,
            productAsin: productAsin ?? null,
            tags: finalTags,
            isPublished: true,
          },
        })
      );

      results.push({
        success: true,
        videoId: video.id,
        youtubeId: video.youtubeId,
        title: video.title,
        channelName: video.channelName,
      });
    }

    // Trigger instant revalidation (non-blocking)
    try {
      revalidatePath('/');
      revalidatePath('/videos');
      revalidatePath('/channels');
    } catch {}

    if (results.length === 1) {
      return NextResponse.json({
        success: true,
        message: 'Video published successfully',
        ...results[0],
      });
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown server error';
    console.error('[webhook/video] Error:', message);
    return NextResponse.json(
      {
        error: 'Database connection failed while processing videos.',
        details: message,
        help: 'Ensure your Postgres database is accessible and connection pool limits are sufficient.',
      },
      { status: 500 }
    );
  }
}

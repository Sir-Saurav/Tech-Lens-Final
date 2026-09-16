import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';
import { getVideoDetails, CHANNELS } from '@/lib/youtube';
import { matchProductToVideo } from '@/lib/ai';

function extractYoutubeId(input?: string): string {
  if (!input) return '';
  const trimmed = input.trim();
  if (trimmed.length === 11 && !trimmed.includes('/') && !trimmed.includes('?') && !trimmed.includes('.')) {
    return trimmed;
  }
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i);
  return match ? match[1] : trimmed;
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
      productAsin: 'string (optional, for linking to review)',
      webhookSecret: 'string',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload. Please ensure Content-Type is application/json.' },
        { status: 400 }
      );
    }

    // 1. Authentication check across multiple sources (body, headers, query params)
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
      body.webhookSecret ||
      body.secret ||
      body.token ||
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

    // 2. Extract and sanitize video parameters
    const rawId = body.youtubeId || body.videoId || body.id || body.url || body.videoUrl || body.youtubeUrl;
    const youtubeId = extractYoutubeId(rawId);
    const title = body.title?.trim();
    const channelName = body.channelName?.trim() || 'GadgetLens';
    const productAsin = body.productAsin?.trim() || body.asin?.trim();

    if (!youtubeId) {
      return NextResponse.json(
        {
          error: 'Missing video ID or URL.',
          received: { rawId, title, channelName },
          help: 'Provide youtubeId (or youtubeUrl) in your JSON payload.',
        },
        { status: 400 }
      );
    }

    if (!title && !process.env.YOUTUBE_API_KEY) {
      return NextResponse.json(
        {
          error: 'Missing video title, and no YOUTUBE_API_KEY is configured for automated lookup.',
          help: 'Provide "title" in the payload or set YOUTUBE_API_KEY in environment variables.',
        },
        { status: 400 }
      );
    }

    // 3. Check for existing video
    let existing = null;
    try {
      existing = await prisma.video.findUnique({ where: { youtubeId } });
    } catch (dbErr) {
      console.error('[webhook/video] DB error checking existing video:', dbErr);
      return NextResponse.json(
        {
          error: 'Database connection failed while querying videos table.',
          details: dbErr instanceof Error ? dbErr.message : String(dbErr),
          help: 'Ensure your Postgres database is connected and prisma db push / migrations have been applied.',
        },
        { status: 500 }
      );
    }

    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Video already exists in database',
        videoId: existing.id,
        youtubeId: existing.youtubeId,
      });
    }

    // 4. Fetch supplemental details from YouTube API if key is available
    let ytDetails = null;
    if (process.env.YOUTUBE_API_KEY) {
      try {
        ytDetails = await getVideoDetails(youtubeId);
      } catch (ytErr) {
        console.warn('[webhook/video] YouTube API fetch warning:', ytErr);
      }
    }

    const channelId =
      body.channelId ||
      CHANNELS[channelName] ||
      ytDetails?.channelId ||
      '';

    // 5. Match to product catalog if possible
    let productId: string | null = null;
    if (productAsin) {
      const product = await prisma.product.findUnique({ where: { asin: productAsin } });
      productId = product?.id ?? null;
    } else if (title) {
      try {
        const recentProducts = await prisma.product.findMany({
          take: 30,
          orderBy: { createdAt: 'desc' },
          select: { id: true, title: true },
        });
        for (const product of recentProducts) {
          const isMatch = await matchProductToVideo(product.title, title);
          if (isMatch) {
            productId = product.id;
            break;
          }
        }
      } catch (matchErr) {
        console.warn('[webhook/video] Product matching warning:', matchErr);
      }
    }

    const finalThumbnail =
      body.thumbnail ||
      body.thumbnailUrl ||
      ytDetails?.thumbnail ||
      `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

    const finalDescription = body.description || ytDetails?.description || '';
    const finalTags = Array.isArray(body.tags)
      ? body.tags
      : typeof body.tags === 'string'
      ? body.tags.split(',').map((t: string) => t.trim())
      : ytDetails?.tags || [];
    const finalDuration = body.duration || ytDetails?.duration || '';

    // 6. Save video record to database
    const video = await prisma.video.create({
      data: {
        youtubeId,
        title: title || ytDetails?.title || `Video ${youtubeId}`,
        description: finalDescription,
        thumbnail: finalThumbnail,
        channelName,
        channelId,
        publishedAt: body.publishedAt
          ? new Date(body.publishedAt)
          : ytDetails?.publishedAt
          ? new Date(ytDetails.publishedAt)
          : new Date(),
        viewCount: body.viewCount || ytDetails?.viewCount || 0,
        likeCount: body.likeCount || ytDetails?.likeCount || 0,
        duration: finalDuration,
        productId,
        productAsin: productAsin ?? null,
        tags: finalTags,
        isPublished: true,
      },
    });

    // 7. Instant on-demand revalidation for SEO and UI
    try {
      revalidatePath('/');
      revalidatePath('/videos');
      revalidatePath('/channels');
      if (productId) {
        const p = await prisma.product.findUnique({
          where: { id: productId },
          select: { slug: true },
        });
        if (p) revalidatePath(`/products/${p.slug}`);
      }
    } catch (revalErr) {
      console.warn('[webhook/video] Revalidation warning:', revalErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Video, thumbnail, and SEO metadata published successfully',
      videoId: video.id,
      youtubeId: video.youtubeId,
      channelName: video.channelName,
      title: video.title,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown server error';
    console.error('[webhook/video] Unexpected error:', message);
    return NextResponse.json(
      {
        error: message,
        help: 'Verify your JSON body and ensure database credentials are configured in Vercel environment variables.',
      },
      { status: 500 }
    );
  }
}

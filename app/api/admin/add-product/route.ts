import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { scrapeAmazonProduct, scrapeAmazonReviews, scrapeRedditOpinions, buildAffiliateUrl } from '@/lib/scraper';
import { generateVerdictSummary, analyzeSentiment } from '@/lib/ai';
import { slugify, extractAsin } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { asin?: string; amazonUrl?: string; adminPassword: string };

    // ── Auth check ──────────────────────────────────────────────────────────
    if (body.adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ── Extract ASIN ────────────────────────────────────────────────────────
    const asin = body.asin?.trim().toUpperCase() || extractAsin(body.amazonUrl || '');
    if (!asin) {
      return NextResponse.json({ error: 'Invalid ASIN or Amazon URL' }, { status: 400 });
    }

    // Check if product already exists
    const existing = await prisma.product.findUnique({ where: { asin } });
    if (existing) {
      return NextResponse.json({ error: `Product already exists: ${existing.title}`, product: existing }, { status: 409 });
    }

    console.log(`[add-product] Starting scrape for ASIN: ${asin}`);

    // ── Step 1: Scrape Amazon ───────────────────────────────────────────────
    const scraped = await scrapeAmazonProduct(asin);
    console.log(`[add-product] Scraped: ${scraped.title}`);

    // ── Step 2: Scrape Amazon Reviews ──────────────────────────────────────
    const amazonReviews = await scrapeAmazonReviews(asin, 3);
    console.log(`[add-product] Got ${amazonReviews.length} Amazon reviews`);

    // ── Step 3: Scrape Reddit Opinions ─────────────────────────────────────
    const redditPosts = await scrapeRedditOpinions(scraped.title);
    console.log(`[add-product] Got ${redditPosts.length} Reddit posts`);

    // ── Step 4: AI Verdict ─────────────────────────────────────────────────
    const verdict = await generateVerdictSummary(amazonReviews, redditPosts, scraped.title);
    console.log(`[add-product] Verdict score: ${verdict.score}`);

    // ── Step 5: Generate slug ──────────────────────────────────────────────
    let slug = slugify(scraped.title).slice(0, 80);
    // Ensure uniqueness
    const existing2 = await prisma.product.findUnique({ where: { slug } });
    if (existing2) slug = `${slug}-${asin.toLowerCase()}`;

    // ── Step 6: Save Product to DB ─────────────────────────────────────────
    const product = await prisma.product.create({
      data: {
        asin,
        slug,
        title: scraped.title,
        brand: scraped.brand,
        category: detectCategory(scraped.title, Object.keys(scraped.specs)),
        price: scraped.price,
        originalPrice: scraped.originalPrice,
        currency: scraped.currency,
        rating: scraped.rating,
        reviewCount: scraped.reviewCount,
        images: scraped.images,
        thumbnail: scraped.images[0],
        description: scraped.description,
        specs: scraped.specs as object,
        features: scraped.features,
        affiliateUrl: buildAffiliateUrl(asin),
        amazonUrl: `https://www.amazon.in/dp/${asin}`,
        verdictScore: verdict.score,
        verdictSummary: verdict.summary,
        verdictPros: verdict.pros,
        verdictCons: verdict.cons,
        isFeatured: false,
        isPublished: true,
      },
    });

    // ── Step 7: Save all reviews ───────────────────────────────────────────
    const reviewData = [
      ...amazonReviews.map(r => ({
        productId: product.id,
        source: 'AMAZON' as const,
        authorName: r.authorName,
        authorLocation: r.authorLocation,
        rating: r.rating,
        title: r.title,
        body: r.body,
        isVerified: r.isVerified,
        sentimentScore: r.rating ? (r.rating - 3) / 2 : 0, // map 1-5 to -1 to 1
        sourceDate: r.sourceDate ? new Date(r.sourceDate) : null,
      })),
      ...redditPosts.map(r => ({
        productId: product.id,
        source: 'REDDIT' as const,
        authorName: r.authorName,
        title: r.title,
        body: r.body,
        isVerified: false,
        sentimentScore: 0, // will be analyzed async
        sourceUrl: r.sourceUrl,
        sourceDate: r.sourceDate ? new Date(r.sourceDate) : null,
      })),
    ];

    await prisma.review.createMany({ data: reviewData });
    console.log(`[add-product] Saved ${reviewData.length} reviews`);

    return NextResponse.json({
      success: true,
      product,
      reviewCount: reviewData.length,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[add-product] Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ── Category Detection ─────────────────────────────────────────────────────

function detectCategory(title: string, specKeys: string[]): string {
  const t = title.toLowerCase();
  if (t.includes('phone') || t.includes('galaxy') || t.includes('iphone') || t.includes('pixel') || t.includes('oneplus')) return 'Smartphones';
  if (t.includes('laptop') || t.includes('macbook') || t.includes('notebook') || t.includes('chromebook')) return 'Laptops';
  if (t.includes('headphone') || t.includes('earphone') || t.includes('earbud') || t.includes('speaker') || t.includes('wh-') || t.includes('wf-')) return 'Audio';
  if (t.includes('tablet') || t.includes('ipad')) return 'Tablets';
  if (t.includes('watch') || t.includes('band') || t.includes('fitbit')) return 'Smartwatches';
  if (t.includes('camera') || t.includes('dslr') || t.includes('mirrorless') || t.includes('gopro')) return 'Cameras';
  if (t.includes('tv') || t.includes('television') || t.includes('smart tv') || t.includes('oled')) return 'TVs';
  if (t.includes('gaming') || t.includes('console') || t.includes('xbox') || t.includes('playstation') || t.includes('nintendo')) return 'Gaming';
  if (specKeys.some(k => k.toLowerCase().includes('cpu') || k.toLowerCase().includes('processor'))) return 'Laptops';
  return 'Electronics';
}

import axios from 'axios';
import * as cheerio from 'cheerio';
import type { ScrapedProduct, ScrapedReview, RedditPost } from '@/types';

const SCRAPINGBEE_KEY = process.env.SCRAPINGBEE_API_KEY!;
const AFFILIATE_TAG = process.env.AMAZON_AFFILIATE_TAG || 'gadgetlens-21';

// Base Amazon domain - works for .in (India) and .com (US)
const AMAZON_BASE = 'https://www.amazon.in';

async function fetchWithScrapingBee(url: string, renderJs = false): Promise<string> {
  const params = new URLSearchParams({
    api_key: SCRAPINGBEE_KEY,
    url,
    render_js: renderJs ? 'true' : 'false',
    country_code: 'in',
    premium_proxy: 'true',
  });

  const response = await axios.get(`https://app.scrapingbee.com/api/v1/?${params}`, {
    timeout: 60_000,
    responseType: 'text',
  });
  return response.data as string;
}

// ── Amazon Product Scraper ──────────────────────────────────────────────────

export async function scrapeAmazonProduct(asin: string): Promise<ScrapedProduct> {
  const url = `${AMAZON_BASE}/dp/${asin}`;
  const html = await fetchWithScrapingBee(url, false);
  const $ = cheerio.load(html);

  // Title
  const title =
    $('#productTitle').text().trim() ||
    $('h1.a-size-large').text().trim() ||
    $('span#productTitle').text().trim() ||
    'Unknown Product';

  // Brand
  const brand =
    $('#bylineInfo').text().replace(/^(Visit|by)\s+/i, '').trim() ||
    $('a#bylineInfo').text().trim() ||
    undefined;

  // Price (handle Indian rupee formatting)
  const priceRaw =
    $('span.a-price-whole').first().text().trim() ||
    $('#priceblock_dealprice').text().trim() ||
    $('#priceblock_ourprice').text().trim();
  const priceClean = priceRaw.replace(/[₹,\s]/g, '');
  const price = priceClean ? parseFloat(priceClean) : undefined;

  const origPriceRaw = $('span.a-price.a-text-price span.a-offscreen').first().text().trim();
  const origPriceClean = origPriceRaw.replace(/[₹,\s]/g, '');
  const originalPrice = origPriceClean ? parseFloat(origPriceClean) : undefined;

  // Currency
  const currency = priceRaw.includes('₹') ? 'INR' : 'USD';

  // Images
  const images: string[] = [];
  const imgDataRaw = html.match(/"hiRes":"(https:[^"]+)"/g) || [];
  imgDataRaw.forEach(m => {
    const match = m.match(/"hiRes":"([^"]+)"/);
    if (match) images.push(match[1]);
  });
  // Fallback
  if (images.length === 0) {
    $('img.a-dynamic-image, img#landingImage').each((_, el) => {
      const src = $(el).attr('src');
      if (src && src.startsWith('https')) images.push(src);
    });
  }

  // Description
  const description =
    $('#productDescription p').text().trim() ||
    $('#feature-bullets').text().trim().slice(0, 1000) ||
    undefined;

  // Features (bullet points)
  const features: string[] = [];
  $('#feature-bullets li span.a-list-item').each((_, el) => {
    const text = $(el).text().trim();
    if (text && text.length > 5) features.push(text);
  });

  // Specs table
  const specs: Record<string, string> = {};
  $('#productDetails_techSpec_section_1 tr, #productDetails_detailBullets_sections1 tr, .a-keyvalue tr').each((_, row) => {
    const key = $(row).find('th, td:first-child').text().trim().replace(/\s+/g, ' ');
    const val = $(row).find('td:last-child').text().trim().replace(/\s+/g, ' ');
    if (key && val && key !== val) specs[key] = val;
  });

  // Rating
  const ratingRaw = $('span[data-hook="rating-out-of-text"], span.a-icon-alt').first().text().trim();
  const ratingMatch = ratingRaw.match(/([0-9.]+)\s+out of/);
  const rating = ratingMatch ? parseFloat(ratingMatch[1]) : undefined;

  // Review count
  const reviewCountRaw = $('#acrCustomerReviewText, span[data-hook="total-review-count"]').first().text().trim();
  const reviewCountMatch = reviewCountRaw.replace(/,/g, '').match(/([0-9]+)/);
  const reviewCount = reviewCountMatch ? parseInt(reviewCountMatch[1]) : undefined;

  return {
    title,
    brand,
    price,
    originalPrice,
    currency,
    images: [...new Set(images)].slice(0, 8),
    description,
    specs,
    features: features.slice(0, 10),
    rating,
    reviewCount,
    asin,
  };
}

// ── Amazon Review Scraper ───────────────────────────────────────────────────

export async function scrapeAmazonReviews(asin: string, pages = 2): Promise<ScrapedReview[]> {
  const reviews: ScrapedReview[] = [];

  for (let page = 1; page <= pages; page++) {
    try {
      const url = `${AMAZON_BASE}/product-reviews/${asin}?pageNumber=${page}&sortBy=recent`;
      const html = await fetchWithScrapingBee(url, false);
      const $ = cheerio.load(html);

      $('div[data-hook="review"]').each((_, el) => {
        const authorName =
          $(el).find('span.a-profile-name').text().trim() ||
          'Amazon Customer';

        const ratingRaw = $(el).find('i[data-hook="review-star-rating"] span').text().trim();
        const ratingMatch = ratingRaw.match(/([0-9.]+)/);
        const rating = ratingMatch ? parseFloat(ratingMatch[1]) : undefined;

        const title = $(el).find('a[data-hook="review-title"] span:not(.a-icon-alt)').text().trim() ||
          $(el).find('[data-hook="review-title"]').text().trim();

        const body = $(el).find('span[data-hook="review-body"] span').text().trim() ||
          $(el).find('[data-hook="review-body"]').text().trim();

        const isVerified = $(el).find('[data-hook="avp-badge"]').length > 0;

        const dateRaw = $(el).find('span[data-hook="review-date"]').text().trim();
        // "Reviewed in India on 12 March 2025" → extract date
        const dateMatch = dateRaw.match(/on (.+)$/);
        const sourceDate = dateMatch ? new Date(dateMatch[1]).toISOString() : undefined;

        const location = dateRaw.match(/Reviewed in (.+?) on/)?.[1];

        if (body && body.length > 20) {
          reviews.push({ authorName, rating, title: title || undefined, body, isVerified, sourceDate, authorLocation: location });
        }
      });

      // Don't hammer — small delay between pages
      if (page < pages) await new Promise(r => setTimeout(r, 1500));
    } catch (err) {
      console.error(`[scraper] Amazon reviews page ${page} failed:`, err);
    }
  }

  return reviews;
}

// ── Reddit Opinion Scraper ─────────────────────────────────────────────────

export async function scrapeRedditOpinions(productName: string): Promise<RedditPost[]> {
  const posts: RedditPost[] = [];
  const queries = [
    `${productName} review`,
    `${productName} worth buying`,
    `${productName} problems`,
  ];

  for (const query of queries.slice(0, 2)) {
    try {
      const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=top&limit=10&t=year`;
      const res = await axios.get(url, {
        headers: { 'User-Agent': 'GadgetLens-Review-Bot/1.0' },
        timeout: 15_000,
      });

      const data = res.data as { data: { children: Array<{ data: { title: string; selftext: string; author: string; score: number; permalink: string; created_utc: number } }> } };
      for (const post of data.data.children) {
        const d = post.data;
        if (d.selftext && d.selftext.length > 50) {
          posts.push({
            authorName: d.author,
            title: d.title,
            body: d.selftext.slice(0, 2000),
            score: d.score,
            sourceUrl: `https://reddit.com${d.permalink}`,
            sourceDate: new Date(d.created_utc * 1000).toISOString(),
          });
        }
      }

      await new Promise(r => setTimeout(r, 1000));
    } catch (err) {
      console.error('[scraper] Reddit fetch failed:', err);
    }
  }

  return posts.sort((a, b) => b.score - a.score).slice(0, 15);
}

// ── Affiliate URL builder ──────────────────────────────────────────────────

export function buildAffiliateUrl(asin: string): string {
  return `${AMAZON_BASE}/dp/${asin}?tag=${AFFILIATE_TAG}`;
}

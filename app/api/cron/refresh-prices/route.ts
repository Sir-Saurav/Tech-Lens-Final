import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { scrapeAmazonProduct } from '@/lib/scraper';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: { id: true, asin: true, price: true, title: true },
    });

    let updated = 0, unchanged = 0, failed = 0;

    // Process in batches of 5 to avoid overwhelming ScrapingBee
    for (let i = 0; i < products.length; i += 5) {
      const batch = products.slice(i, i + 5);
      await Promise.allSettled(
        batch.map(async (product: { id: string; asin: string; price: number | null; title: string }) => {
          try {
            const scraped = await scrapeAmazonProduct(product.asin);
            if (scraped.price && scraped.price !== product.price) {
              await prisma.product.update({
                where: { id: product.id },
                data: { price: scraped.price, originalPrice: scraped.originalPrice, updatedAt: new Date() },
              });
              updated++;
            } else {
              unchanged++;
            }
          } catch {
            failed++;
          }
        })
      );
      // Small delay between batches
      if (i + 5 < products.length) await new Promise(r => setTimeout(r, 2000));
    }

    return NextResponse.json({ success: true, updated, unchanged, failed, total: products.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[cron/refresh-prices]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

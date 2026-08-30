import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      reviews: {
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
      videos: {
        where: { isPublished: true },
        orderBy: { publishedAt: 'desc' },
        take: 6,
      },
    },
  });

  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // Related products (same category, exclude self)
  const related = await prisma.product.findMany({
    where: { category: product.category, id: { not: product.id }, isPublished: true },
    take: 4,
    orderBy: { verdictScore: 'desc' },
  });

  return NextResponse.json({ product, related }, {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
  });
}

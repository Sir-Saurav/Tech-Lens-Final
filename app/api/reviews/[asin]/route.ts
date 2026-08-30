import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ asin: string }> }
) {
  const { asin } = await params;
  const { searchParams } = new URL(request.url);
  const source = searchParams.get('source');
  const sort = searchParams.get('sort') || 'newest';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const product = await prisma.product.findUnique({ where: { asin }, select: { id: true } });
  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  const where = {
    productId: product.id,
    ...(source && { source: source as 'AMAZON' | 'REDDIT' | 'YOUTUBE' | 'EXPERT' | 'MANUAL' }),
  };

  const orderBy = {
    newest: { createdAt: 'desc' as const },
    oldest: { createdAt: 'asc' as const },
    highest: { rating: 'desc' as const },
    lowest: { rating: 'asc' as const },
    helpful: { isHelpful: 'desc' as const },
  }[sort] || { createdAt: 'desc' as const };

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({ where, orderBy, skip: (page - 1) * limit, take: limit }),
    prisma.review.count({ where }),
  ]);

  return NextResponse.json({ reviews, total, page, pages: Math.ceil(total / limit) });
}

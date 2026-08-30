import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json() as { password: string };
  const ok = body.password === process.env.ADMIN_PASSWORD;
  return NextResponse.json({ ok });
}

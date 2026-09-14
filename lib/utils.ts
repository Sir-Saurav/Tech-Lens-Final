import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = 'USD'): string {
  if (!price) return 'N/A';
  const symbols: Record<string, string> = { USD: '$', INR: '₹', NPR: 'Rs.', GBP: '£', EUR: '€' };
  const symbol = symbols[currency] || currency + ' ';
  return `${symbol}${price.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function formatNumber(n: number): string {
  if (!n) return '0';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function formatDate(date: string | Date | undefined): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

export function getSourceLabel(source: string): string {
  const labels: Record<string, string> = {
    AMAZON: 'Amazon',
    REDDIT: 'Reddit',
    YOUTUBE: 'YouTube',
    EXPERT: 'Expert',
    MANUAL: 'Editorial',
  };
  return labels[source] || source;
}

export function getSourceColor(source: string): string {
  const colors: Record<string, string> = {
    AMAZON: 'bg-[#FFF7ED] text-[#9A3412] border-[#FDBA74]',
    REDDIT: 'bg-[#FEF2F2] text-[#991B1B] border-[#FCA5A5]',
    YOUTUBE: 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]',
    EXPERT: 'bg-[#F0FDF4] text-[#166534] border-[#86EFAC]',
    MANUAL: 'bg-[#EFF6FF] text-[#1E40AF] border-[#93C5FD]',
  };
  return colors[source] || 'bg-[#F3F4F6] text-[#374151] border-[#D1D5DB]';
}

export function getScoreColor(score: number): string {
  if (score >= 8.5) return 'text-[#2A6B4A]';
  if (score >= 7.0) return 'text-[#2D5986]';
  if (score >= 5.0) return 'text-[#B45309]';
  return 'text-[#B91C1C]';
}

export function getScoreBg(score: number): string {
  if (score >= 8.5) return 'bg-[#EBF5EE] text-[#2A6B4A] border-[#C3E0CE]';
  if (score >= 7.0) return 'bg-[#EEF4FA] text-[#2D5986] border-[#CBDDF0]';
  if (score >= 5.0) return 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]';
  return 'bg-[#FEE2E2] text-[#B91C1C] border-[#FECACA]';
}

export function getVerdictColor(verdict: string): string {
  const colors: Record<string, string> = {
    'Highly Recommended': 'text-[#2A6B4A]',
    'Recommended': 'text-[#2D5986]',
    'Mixed': 'text-[#B45309]',
    'Not Recommended': 'text-[#B91C1C]',
  };
  return colors[verdict] || 'text-[#1A1A1A]';
}

export function extractAsin(input: string): string | null {
  // Direct ASIN (10 chars alphanumeric starting with B)
  if (/^B[A-Z0-9]{9}$/i.test(input.trim())) return input.trim().toUpperCase();
  // From Amazon URL: /dp/BXXXXXXXXX or /gp/product/BXXXXXXXXX
  const match = input.match(/(?:\/dp\/|\/gp\/product\/|\/product\/)([A-Z0-9]{10})/i);
  return match ? match[1].toUpperCase() : null;
}

export function formatDuration(iso: string): string {
  // Convert ISO 8601 duration (PT4M13S) to human readable (4:13)
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  const h = parseInt(match[1] || '0');
  const m = parseInt(match[2] || '0');
  const s = parseInt(match[3] || '0');
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

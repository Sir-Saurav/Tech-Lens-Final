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
    AMAZON: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    REDDIT: 'bg-red-500/20 text-red-400 border-red-500/30',
    YOUTUBE: 'bg-red-600/20 text-red-400 border-red-600/30',
    EXPERT: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    MANUAL: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  };
  return colors[source] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
}

export function getScoreColor(score: number): string {
  if (score >= 9) return 'text-cyan-400';
  if (score >= 7) return 'text-green-400';
  if (score >= 5) return 'text-yellow-400';
  return 'text-red-400';
}

export function getScoreBg(score: number): string {
  if (score >= 9) return 'bg-cyan-500/20 border-cyan-500/30';
  if (score >= 7) return 'bg-green-500/20 border-green-500/30';
  if (score >= 5) return 'bg-yellow-500/20 border-yellow-500/30';
  return 'bg-red-500/20 border-red-500/30';
}

export function getVerdictColor(verdict: string): string {
  const colors: Record<string, string> = {
    'Highly Recommended': 'text-cyan-400',
    'Recommended': 'text-green-400',
    'Mixed': 'text-yellow-400',
    'Not Recommended': 'text-red-400',
  };
  return colors[verdict] || 'text-gray-400';
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

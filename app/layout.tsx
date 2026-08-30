import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://techlens.store'),
  title: {
    default: 'TechLens — Honest Tech Reviews & Real User Opinions',
    template: '%s | TechLens',
  },
  description:
    'In-depth tech product reviews powered by real user opinions from Amazon, Reddit, and across the web. No paid reviews. No fluff. Just honest analysis.',
  keywords: ['tech reviews', 'product reviews', 'honest reviews', 'gadget reviews', 'Amazon reviews', 'smartphone review', 'laptop review'],
  authors: [{ name: 'TechLens Editorial Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://techlens.store',
    siteName: 'TechLens',
    title: 'TechLens — Honest Tech Reviews & Real User Opinions',
    description: 'In-depth tech reviews powered by real user opinions. No paid reviews. No fluff.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'TechLens' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechLens — Honest Tech Reviews',
    description: 'Real user opinions aggregated from Amazon, Reddit & YouTube.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0a0f1e] text-gray-100 antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

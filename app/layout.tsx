import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gadgetlens.store'),
  title: {
    default: 'GadgetLens — Independent Gear Reviews & Real User Data',
    template: '%s | GadgetLens',
  },
  description:
    'Independent tech product testing and verified user consensus. Uncompromising pros and cons, lab battery measurements, and honest buying verdicts.',
  keywords: ['tech reviews', 'gadget reviews', 'electronics testing', 'buyer guides', 'independent product analysis'],
  authors: [{ name: 'GadgetLens Editorial Board' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gadgetlens.store',
    siteName: 'GadgetLens',
    title: 'GadgetLens — Independent Gear Reviews & Real User Data',
    description: 'Uncompromising tech testing, verified consensus, and honest buying verdicts.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GadgetLens — Independent Gear Reviews',
    description: 'Uncompromising tech testing and verified user consensus.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#F5F6F4] text-[#1A1A1A] antialiased min-h-screen flex flex-col selection:bg-[#D8E4F0]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

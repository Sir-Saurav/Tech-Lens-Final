import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | GadgetLens',
  description: 'How GadgetLens handles visitor data, cookies, embedded media, and analytics.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-10 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#5C5C5C] mb-8 font-mono">
          <Link href="/" className="hover:text-[#2D5986]">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1A1A1A]">Privacy Policy</span>
        </nav>

        <header className="border-b border-[#DDE1E6] pb-6 mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-[#858585] font-mono">
            LAST UPDATED: FEBRUARY 2025 · GADGETLENS.STORE
          </p>
        </header>

        <div className="space-y-6 text-sm text-[#5C5C5C] leading-relaxed">
          <p>
            This Privacy Policy explains how GadgetLens (&quot;we,&quot; &quot;our,&quot; or &quot;the site&quot;) collects, processes, and protects visitor information when accessing <code className="font-mono text-xs bg-[#F5F6F4] px-1 py-0.5 border border-[#DDE1E6]">gadgetlens.store</code>.
          </p>

          <h2 className="font-display text-xl font-bold text-[#1A1A1A] pt-4">
            1. Information We Collect
          </h2>
          <p>
            We adhere to strict data minimization practices:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Email Addresses:</strong> If you voluntarily submit your email in our newsletter subscription box, we store your email exclusively to dispatch periodic tech buying updates. We never sell or rent subscriber lists.
            </li>
            <li>
              <strong>Automated Server Logs:</strong> Like most standard web servers, our hosting infrastructure automatically logs routine request metadata (IP address, browser type, referring URL, timestamp) for performance monitoring and DDoS prevention.
            </li>
          </ul>

          <h2 className="font-display text-xl font-bold text-[#1A1A1A] pt-4">
            2. Cookies and Third-Party Services
          </h2>
          <p>
            We use minimal cookies necessary for website operation and third-party content delivery:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Affiliate Tracking:</strong> Clicking outbound retail links (e.g. Amazon) places a temporary cookie on your device by the merchant to track referring commissions. See our{' '}
              <Link href="/disclosure" className="text-[#2D5986] font-semibold hover:underline">
                Affiliate Disclosure
              </Link>{' '}
              for details.
            </li>
            <li>
              <strong>Embedded Media:</strong> YouTube video previews and embeds are loaded directly from Google/YouTube servers and may set cookies governed by Google&apos;s privacy policies.
            </li>
          </ul>

          <h2 className="font-display text-xl font-bold text-[#1A1A1A] pt-4">
            3. Data Retention and Deletion
          </h2>
          <p>
            Newsletter subscribers may unsubscribe or request permanent removal of their email address at any time by contacting our editorial team or clicking the unsubscribe link present in sent emails.
          </p>

          <h2 className="font-display text-xl font-bold text-[#1A1A1A] pt-4">
            4. Updates to This Policy
          </h2>
          <p>
            We may revise this Privacy Policy periodically to reflect infrastructure adjustments or regulatory changes. Any modifications will be posted immediately with an updated revision date.
          </p>
        </div>
      </div>
    </div>
  );
}
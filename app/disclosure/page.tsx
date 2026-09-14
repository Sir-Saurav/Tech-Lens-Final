import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure Policy | GadgetLens',
  description: 'FTC-compliant affiliate disclosure explaining how GadgetLens earns revenue and maintains editorial independence.',
};

export default function DisclosurePage() {
  return (
    <div className="pt-10 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#5C5C5C] mb-8 font-mono">
          <Link href="/" className="hover:text-[#2D5986]">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1A1A1A]">Affiliate Disclosure</span>
        </nav>

        <header className="border-b border-[#DDE1E6] pb-6 mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Affiliate Disclosure Statement
          </h1>
          <p className="mt-2 text-xs text-[#858585] font-mono">
            LAST REVISED: FEBRUARY 2025 · FTC COMPLIANCE DECLARATION
          </p>
        </header>

        <div className="space-y-6 text-sm text-[#5C5C5C] leading-relaxed">
          <div className="p-4 bg-white border-l-4 border-[#2D5986] border-y border-r border-[#DDE1E6] rounded-r text-[#1A1A1A]">
            <p className="font-semibold mb-1 text-sm">Summary in Plain English:</p>
            <p className="text-xs text-[#5C5C5C]">
              GadgetLens earns money through affiliate links. If you click an outbound store link and buy a product, the merchant pays us a commission. You pay the standard retail price—no surcharge is ever applied. Our testing team never alters a score to maximize affiliate payouts.
            </p>
          </div>

          <h2 className="font-display text-xl font-bold text-[#1A1A1A] pt-4">
            1. Amazon Associates Program Declaration
          </h2>
          <p>
            GadgetLens (gadgetlens.store) is a participant in the Amazon Services LLC Associates Program, an affiliate advertising initiative structured to provide a mechanism for websites to earn referral fees by advertising and linking to Amazon.in, Amazon.com, and affiliated regional marketplaces.
          </p>

          <h2 className="font-display text-xl font-bold text-[#1A1A1A] pt-4">
            2. Strict Separation of Testing and Revenue
          </h2>
          <p>
            Our product benchmarks and editorial ratings are conducted independently of our affiliate relationships:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Reviewers do not know specific commission percentages for items under test.</li>
            <li>Low-scoring products are published with all documented flaws, regardless of merchant commission terms.</li>
            <li>We frequently recommend purchasing older models or refurbished units when they deliver superior value.</li>
          </ul>

          <h2 className="font-display text-xl font-bold text-[#1A1A1A] pt-4">
            3. How to Identify Outbound Affiliate Links
          </h2>
          <p>
            Product links labeled &quot;Buy on Amazon,&quot; &quot;Check Price,&quot; or bearing an outbound arrow icon (↗) contain tracking parameters that attribute qualifying purchases to GadgetLens. All affiliate outbound links include standard <code className="font-mono text-xs bg-[#F5F6F4] px-1 py-0.5 border border-[#DDE1E6]">rel=&quot;nofollow noopener&quot;</code> attributes in compliance with search engine guidelines.
          </p>

          <h2 className="font-display text-xl font-bold text-[#1A1A1A] pt-4">
            4. Questions and Feedback
          </h2>
          <p>
            If you have questions regarding our funding model or editorial policies, review our{' '}
            <Link href="/about#methodology" className="text-[#2D5986] font-semibold hover:underline">
              Testing Methodology
            </Link>{' '}
            or read our{' '}
            <Link href="/privacy" className="text-[#2D5986] font-semibold hover:underline">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
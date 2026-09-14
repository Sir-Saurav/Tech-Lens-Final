import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Target, FlaskConical, Scale, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Our Testing Standards & Methodology | GadgetLens',
  description: 'Learn how GadgetLens tests consumer hardware, synthesizes verified user opinions, and enforces strict editorial independence.',
};

export default function AboutPage() {
  return (
    <div className="pt-10 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#5C5C5C] mb-8 font-mono">
          <Link href="/" className="hover:text-[#2D5986]">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1A1A1A]">About & Methodology</span>
        </nav>

        {/* Header */}
        <header className="border-b border-[#DDE1E6] pb-8 mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EEF4FA] border border-[#CBDDF0] rounded text-xs font-semibold text-[#2D5986] uppercase tracking-wider mb-4">
            Independent Editorial Charter
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
            We test hardware rigorously. We report every flaw.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#5C5C5C] leading-relaxed">
            GadgetLens was founded on a simple principle: tech buying advice should rely on standardized measurements, long-term durability testing, and verified user consensus rather than marketing claims.
          </p>
        </header>

        {/* Core Principles */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-[#1A1A1A] mb-6">Our Three Core Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-white border border-[#DDE1E6] rounded">
              <div className="w-9 h-9 rounded bg-[#EEF4FA] text-[#2D5986] flex items-center justify-center mb-4">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#1A1A1A] mb-2">Standardized Testing</h3>
              <p className="text-xs text-[#5C5C5C] leading-relaxed">
                Every battery endurance figure, display luminance value, and thermal throttling benchmark uses identical, reproducible test scripts across all competing devices.
              </p>
            </div>

            <div className="p-5 bg-white border border-[#DDE1E6] rounded">
              <div className="w-9 h-9 rounded bg-[#EBF5EE] text-[#2A6B4A] flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#1A1A1A] mb-2">Multi-Source Consensus</h3>
              <p className="text-xs text-[#5C5C5C] leading-relaxed">
                Single reviews can miss batch anomalies. We aggregate verified owner reports from Amazon, Reddit discussions, and specialist repair forums to catch persistent defects.
              </p>
            </div>

            <div className="p-5 bg-white border border-[#DDE1E6] rounded">
              <div className="w-9 h-9 rounded bg-[#F5F6F4] text-[#1A1A1A] flex items-center justify-center mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#1A1A1A] mb-2">Zero Sponsored Scores</h3>
              <p className="text-xs text-[#5C5C5C] leading-relaxed">
                No manufacturer can pay for favorable placement, edit our copy prior to publication, or influence a score. Products must earn our recommendation on merit.
              </p>
            </div>
          </div>
        </section>

        {/* Methodology Anchor */}
        <section id="methodology" className="scroll-mt-24 border-t border-[#DDE1E6] pt-12 mb-14">
          <div className="flex items-center gap-2 text-[#2D5986] text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            Evaluation Protocol
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-6">
            How We Score Products
          </h2>
          <div className="space-y-6 text-sm text-[#5C5C5C] leading-relaxed">
            <p>
              The <strong>GadgetLens Score (0.0 to 10.0)</strong> is an objective composite rating weighted across four distinct measurement categories:
            </p>

            <div className="space-y-4 my-6">
              <div className="p-4 bg-white border border-[#DDE1E6] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-[#1A1A1A]">1. Performance & Hardware Integrity (35%)</div>
                  <div className="text-xs text-[#5C5C5C] mt-0.5">Sustained thermal management, component build quality, and synthetic compute efficiency.</div>
                </div>
                <div className="font-mono text-xs font-bold text-[#2D5986] bg-[#EEF4FA] px-2 py-1 rounded self-start sm:self-auto">
                  Weight: 35%
                </div>
              </div>

              <div className="p-4 bg-white border border-[#DDE1E6] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-[#1A1A1A]">2. Ergonomics, Display & Daily Usability (25%)</div>
                  <div className="text-xs text-[#5C5C5C] mt-0.5">Panel calibration accuracy (Delta-E), outdoor visibility under direct sunlight, and interface reliability.</div>
                </div>
                <div className="font-mono text-xs font-bold text-[#2D5986] bg-[#EEF4FA] px-2 py-1 rounded self-start sm:self-auto">
                  Weight: 25%
                </div>
              </div>

              <div className="p-4 bg-white border border-[#DDE1E6] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-[#1A1A1A]">3. Battery Endurance & Charging Fidelity (20%)</div>
                  <div className="text-xs text-[#5C5C5C] mt-0.5">Standardized 150-nit automated web browsing test cycles and 0-to-100% recharge timing.</div>
                </div>
                <div className="font-mono text-xs font-bold text-[#2D5986] bg-[#EEF4FA] px-2 py-1 rounded self-start sm:self-auto">
                  Weight: 20%
                </div>
              </div>

              <div className="p-4 bg-white border border-[#DDE1E6] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-[#1A1A1A]">4. Long-Term Value & Repairability (20%)</div>
                  <div className="text-xs text-[#5C5C5C] mt-0.5">Software update commitments, verified defect frequency among long-term owners, and spare part availability.</div>
                </div>
                <div className="font-mono text-xs font-bold text-[#2D5986] bg-[#EEF4FA] px-2 py-1 rounded self-start sm:self-auto">
                  Weight: 20%
                </div>
              </div>
            </div>

            <p>
              Scores of <strong>9.0 and above</strong> denote reference-grade hardware with negligible compromises. Scores between <strong>7.0 and 8.9</strong> represent solid recommendations with specific trade-offs detailed in our &quot;Who Should Skip It&quot; analysis. Ratings below <strong>7.0</strong> carry substantial drawbacks that most consumers should avoid.
            </p>
          </div>
        </section>

        {/* Affiliate Disclosure callout */}
        <section className="border-t border-[#DDE1E6] pt-12 mb-12">
          <h2 className="font-display text-2xl font-bold text-[#1A1A1A] mb-4">How GadgetLens Is Funded</h2>
          <p className="text-sm text-[#5C5C5C] leading-relaxed mb-4">
            We participate in retail affiliate programs, primarily the Amazon Associates Program. When readers click through our product links and purchase an item, we may earn a small referral commission at no additional cost to the buyer.
          </p>
          <p className="text-sm text-[#5C5C5C] leading-relaxed mb-6">
            We purchase test units at regular retail prices or return loaner hardware immediately following evaluation. Our staff writers and test engineers do not see affiliate revenue data, ensuring compensation remains decoupled from commercial conversion metrics.
          </p>
          <Link
            href="/disclosure"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D5986] hover:underline uppercase tracking-wider"
          >
            Read our full FTC Affiliate Disclosure statement <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      </div>
    </div>
  );
}
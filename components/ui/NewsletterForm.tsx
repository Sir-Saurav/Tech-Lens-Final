'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [notice, setNotice] = useState(false);

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setNotice(true);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {notice ? (
        <div className="p-3 bg-[#EBF5EE] border border-[#C3E0CE] rounded text-xs text-[#2A6B4A] text-center font-medium">
          ✓ Weekly dispatch program launches shortly. Bookmark GadgetLens or check our YouTube channels for direct alerts.
        </div>
      ) : (
        <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleClick}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 bg-white border border-[#DDE1E6] rounded px-3.5 py-2 text-sm text-[#1A1A1A] placeholder-[#858585] focus:outline-none focus:border-[#2D5986]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#2D5986] hover:bg-[#224569] text-white font-semibold text-xs rounded transition-colors whitespace-nowrap uppercase tracking-wider"
          >
            Get Updates
          </button>
        </form>
      )}
      <p className="text-[11px] text-[#858585] mt-2 text-center">
        Zero spam. No sponsored placements. Unsubscribe anytime.
      </p>
    </div>
  );
}

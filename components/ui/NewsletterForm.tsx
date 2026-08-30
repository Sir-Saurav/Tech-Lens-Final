'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="text-cyan-400 font-medium">
        ✓ You&apos;re subscribed! Watch your inbox for weekly picks.
      </p>
    );
  }

  return (
    <form className="flex gap-3 max-w-md mx-auto" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
      />
      <button
        type="submit"
        className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm rounded-xl transition-colors whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}

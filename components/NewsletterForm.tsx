'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2.5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-2.5 text-sm bg-[var(--bg-card)] border border-[var(--border)] rounded-lg
                     text-white placeholder:text-[var(--text-muted)]
                     focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
        <button
          type="submit"
          className="px-5 py-2.5 text-sm font-bold text-black bg-[var(--highlight)] rounded-lg
                     hover:bg-white active:scale-[0.98] transition-all cursor-pointer font-mono whitespace-nowrap"
        >
          Subscribe
        </button>
      </form>
      {status === 'success' && (
        <p className="text-sm text-[var(--highlight)] mt-3 animate-fade-in">
          You&apos;re in. Welcome to the loop.
        </p>
      )}
    </div>
  );
}

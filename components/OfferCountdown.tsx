'use client';

import { useState, useEffect } from 'react';

interface OfferCountdownProps {
  label: string;
  expiresAt: string;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function OfferCountdown({ label, expiresAt }: OfferCountdownProps) {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [showExpiry, setShowExpiry] = useState(false);

  useEffect(() => {
    const diff = Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000);
    if (diff <= 0) return;
    setSecondsLeft(diff);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  if (secondsLeft === null || secondsLeft <= 0) return null;

  const h = Math.floor(secondsLeft / 3600);
  const m = Math.floor((secondsLeft % 3600) / 60);
  const s = secondsLeft % 60;

  const formattedExpiry = new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(expiresAt));

  return (
    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-base">⚡</span>
          <span className="text-sm font-semibold text-orange-700 dark:text-orange-400">{label}</span>
        </div>
        <button
          onClick={() => setShowExpiry((v) => !v)}
          className="p-1 rounded-md hover:bg-orange-100 dark:hover:bg-orange-800/40 transition-colors"
          aria-label="Dettagli offerta"
        >
          <svg className="w-4 h-4 text-orange-500 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      <div className="mt-1.5 font-mono text-xl font-black tabular-nums text-orange-600 dark:text-orange-400 tracking-widest">
        {pad(h)}:{pad(m)}:{pad(s)}
      </div>

      {showExpiry && (
        <p className="mt-1.5 text-xs text-orange-600 dark:text-orange-300 leading-relaxed">
          Scade il {formattedExpiry}
        </p>
      )}
    </div>
  );
}

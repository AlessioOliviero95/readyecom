'use client';

import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <div className="text-7xl sm:text-8xl mb-6">⚠️</div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-3">
          Qualcosa è andato storto
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">
          Si è verificato un errore imprevisto. Riprova o torna alla home.
        </p>
        {error.digest && (
          <p className="text-xs text-gray-400 dark:text-gray-500 font-mono mb-6">
            ID errore: {error.digest}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
          >
            Riprova
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
          >
            Torna alla home
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const orderId = Math.random().toString(36).slice(2, 10).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">

        {/* Success animation */}
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <svg className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <div className="absolute inset-0 rounded-full border-4 border-green-400 dark:border-green-500 animate-ping opacity-20" />
        </div>

        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
          Pagamento riuscito!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          Grazie per il tuo acquisto. Riceverai una conferma via email a breve.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-8 font-mono">
          Ordine #{orderId}
        </p>

        {/* What's next */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm mb-8 text-left space-y-3">
          {[
            { icon: '📧', text: 'Email di conferma inviata al tuo indirizzo' },
            { icon: '🎓', text: 'Accesso immediato ai corsi acquistati' },
            { icon: '♾️', text: 'Accesso illimitato a vita' },
            { icon: '🛡️', text: 'Garanzia rimborso 30 giorni attiva' },
          ].map((item) => (
            <div key={item.text} className="flex items-start gap-3">
              <span className="text-xl shrink-0">{item.icon}</span>
              <p className="text-sm text-gray-700 dark:text-gray-300">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
          >
            Esplora altri corsi
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
          >
            Vai alla dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

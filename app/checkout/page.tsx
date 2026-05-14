'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import type { Appearance } from '@stripe/stripe-js';
import { useCart } from '@/lib/cartContext';
import PageContainer from '@/components/PageContainer';
import StripeCheckoutForm from '@/components/StripeCheckoutForm';

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

const inputCls =
  'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, savings, totalItems } = useCart();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [fetchError, setFetchError] = useState('');
  const [isDark, setIsDark] = useState(false);

  const total = subtotal;
  const configMissing = !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  useEffect(() => {
    if (items.length === 0) router.replace('/cart');
  }, [items.length, router]);

  useEffect(() => {
    setIsDark(
      document.documentElement.classList.contains('dark') ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }, []);

  useEffect(() => {
    if (total <= 0 || configMissing) return;
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: total }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.clientSecret) setClientSecret(d.clientSecret);
        else setFetchError(d.error ?? 'Errore di configurazione pagamento');
      })
      .catch(() => setFetchError('Impossibile connettersi al server di pagamento'));
  }, [total, configMissing]);

  const appearance: Appearance = {
    theme: isDark ? 'night' : 'stripe',
    variables: {
      colorPrimary: '#2563eb',
      colorBackground: isDark ? '#1e293b' : '#ffffff',
      colorText: isDark ? '#f1f5f9' : '#111827',
      colorDanger: '#ef4444',
      borderRadius: '12px',
      fontSizeBase: '14px',
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <PageContainer size="narrow" className="py-8 sm:py-10">

        {/* Header */}
        <div className="mb-6 sm:mb-8 flex items-center gap-3">
          <Link
            href="/cart"
            className="p-2 -ml-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">Checkout</h1>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Pagamento sicuro con Stripe
          </div>
        </div>

        {/* Config warning */}
        {configMissing && (
          <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-sm text-amber-700 dark:text-amber-400">
            <strong>⚠️ Stripe non configurato.</strong> Aggiungi{' '}
            <code className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> e{' '}
            <code className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded">STRIPE_SECRET_KEY</code> nel file{' '}
            <code className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded">.env.local</code> (vedi <code>.env.local.example</code>).
          </div>
        )}

        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-10 lg:items-start">

          {/* ── LEFT: Payment Form ── */}
          <div className="space-y-6 mb-8 lg:mb-0">

            {/* Contact */}
            <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black">1</span>
                Contatto
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="nome@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                  className={inputCls + (emailError ? ' ring-2 ring-red-400 border-red-400' : '')}
                />
                {emailError && <p className="mt-1 text-xs text-red-500">{emailError}</p>}
              </div>
            </section>

            {/* Stripe Payment */}
            <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black">2</span>
                Metodo di pagamento
              </h2>

              {/* Accepted methods icons */}
              <div className="flex items-center gap-2 mb-5 flex-wrap">
                {[
                  { label: 'Visa', bg: 'bg-blue-700', text: 'text-white text-xs font-black tracking-tight px-2 py-1' },
                ].map(() => null)}
                <span className="text-xs text-gray-400 dark:text-gray-500">Accettiamo:</span>
                {['Visa', 'Mastercard', 'Amex'].map((b) => (
                  <span key={b} className="px-2 py-0.5 text-xs font-bold bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-md border border-gray-200 dark:border-slate-600">
                    {b}
                  </span>
                ))}
                <span className="px-2 py-0.5 text-xs font-bold bg-black text-white rounded-md"> Pay</span>
                <span className="px-2 py-0.5 text-xs font-bold bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-md border border-gray-200 dark:border-slate-600">
                  <span className="text-blue-500">G</span>Pay
                </span>
              </div>

              {configMissing ? (
                <div className="text-sm text-gray-400 dark:text-gray-500 text-center py-6">
                  Configura Stripe per abilitare i pagamenti.
                </div>
              ) : fetchError ? (
                <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-600 dark:text-red-400">{fetchError}</p>
                </div>
              ) : !clientSecret ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-100 dark:bg-slate-700 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : stripePromise ? (
                <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                  <StripeCheckoutForm
                    total={total}
                    email={email}
                    onEmailMissing={() => {
                      setEmailError('Inserisci la tua email prima di procedere');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </Elements>
              ) : null}
            </section>

            {/* Security */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-gray-400 dark:text-gray-500">
              {['🔒 SSL 256-bit', '🛡️ Pagamento sicuro', '↩️ Rimborso 30gg'].map((b) => (
                <span key={b} className="whitespace-nowrap">{b}</span>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <aside>
            <div className="sticky top-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
              <div className="p-6">
                <h2 className="font-black text-lg text-gray-900 dark:text-white mb-4">
                  Riepilogo ({totalItems} {totalItems === 1 ? 'corso' : 'corsi'})
                </h2>

                {/* Items */}
                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center text-xl shrink-0">
                        {item.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{item.name}</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-400">x{item.quantity}</p>
                        )}
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white shrink-0">
                        €{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-gray-100 dark:border-slate-700 pt-4 space-y-2 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Subtotale</span>
                    <span className="text-gray-700 dark:text-gray-300">€{(subtotal + savings).toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 dark:text-green-400">Sconto</span>
                      <span className="text-green-600 dark:text-green-400 font-bold">−€{savings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Spedizione</span>
                    <span className="text-green-600 dark:text-green-400">Gratuita</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-gray-100 dark:border-slate-700">
                    <span className="font-black text-gray-900 dark:text-white">Totale</span>
                    <span className="font-black text-2xl text-gray-900 dark:text-white">€{total.toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <p className="text-green-600 dark:text-green-400 text-xs font-medium text-right">
                      Risparmi €{savings.toFixed(2)}!
                    </p>
                  )}
                </div>
              </div>

              {/* Guarantee */}
              <div className="bg-green-50 dark:bg-green-900/20 border-t border-green-100 dark:border-green-800 px-6 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛡️</span>
                  <p className="text-xs text-green-700 dark:text-green-400 font-medium">
                    Garanzia soddisfatti o rimborsati 30 giorni
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </PageContainer>
    </div>
  );
}

'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';

type PaymentMethod = 'card' | 'paypal' | 'googlepay' | 'applepay';

function formatCardNumber(val: string) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(val: string) {
  const clean = val.replace(/\D/g, '').slice(0, 4);
  return clean.length > 2 ? clean.slice(0, 2) + '/' + clean.slice(2) : clean;
}

function cardBrand(num: string): string {
  const d = num.replace(/\s/g, '')[0];
  if (d === '4') return 'Visa';
  if (d === '5') return 'Mastercard';
  if (d === '3') return 'Amex';
  return '';
}

const inputCls =
  'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all';

const errorCls = 'mt-1 text-xs text-red-500';

interface Errors {
  email?: string;
  name?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, savings, totalItems, clearCart } = useCart();

  const [method, setMethod] = useState<PaymentMethod>('card');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (!processing && items.length === 0) {
      router.replace('/cart');
    }
  }, [items.length, processing, router]);

  const shipping = 0;
  const total = subtotal + shipping;

  function validate(): boolean {
    const e: Errors = {};
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = 'Email non valida';
    if (method === 'card') {
      if (!name.trim()) e.name = 'Campo obbligatorio';
      if (cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Numero carta non valido';
      const [mm, yy] = expiry.split('/');
      const now = new Date();
      const validExpiry =
        mm && yy &&
        +mm >= 1 && +mm <= 12 &&
        new Date(2000 + +yy, +mm - 1) >= new Date(now.getFullYear(), now.getMonth());
      if (!validExpiry) e.expiry = 'Data non valida';
      if (cvv.length < 3) e.cvv = 'CVV non valido';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    setProcessing(true);
    setTimeout(() => {
      clearCart();
      router.push('/checkout/success');
    }, 1800);
  }

  const brand = cardBrand(cardNumber);

  const paymentMethods: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
    {
      id: 'card',
      label: 'Carta di credito / debito',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      id: 'paypal',
      label: 'PayPal',
      icon: (
        <span className="text-[#003087] dark:text-[#009cde] font-black text-sm italic">Pay</span>
      ),
    },
    {
      id: 'googlepay',
      label: 'Google Pay',
      icon: (
        <span className="text-sm font-bold">
          <span className="text-blue-500">G</span>
          <span className="text-red-500">o</span>
          <span className="text-yellow-500">o</span>
          <span className="text-blue-500">g</span>
          <span className="text-green-500">l</span>
          <span className="text-red-500">e</span>
        </span>
      ),
    },
    {
      id: 'applepay',
      label: 'Apple Pay',
      icon: (
        <svg className="w-5 h-5 text-gray-900 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-10 max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/cart" className="text-gray-400 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Checkout</h1>
        </div>

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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="nome@email.com"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                  className={inputCls + (errors.email ? ' ring-2 ring-red-400 border-red-400' : '')}
                />
                {errors.email && <p className={errorCls}>{errors.email}</p>}
              </div>
            </section>

            {/* Payment method selector */}
            <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black">2</span>
                Metodo di pagamento
              </h2>

              {/* Tabs */}
              <div className="space-y-2 mb-6">
                {paymentMethods.map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setMethod(pm.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all ${
                      method === pm.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      method === pm.id ? 'border-blue-500' : 'border-gray-300 dark:border-slate-500'
                    }`}>
                      {method === pm.id && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                    </div>
                    <span className="flex items-center gap-2">
                      {pm.icon}
                    </span>
                    <span className={`font-medium text-sm ${method === pm.id ? 'text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                      {pm.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Card form */}
              {method === 'card' && (
                <div className="space-y-4">
                  {/* Card preview strip */}
                  <div className="relative h-32 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl p-5 overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
                    <div className="relative flex flex-col justify-between h-full">
                      <div className="flex justify-between items-start">
                        <svg className="w-8 h-6 text-yellow-400" viewBox="0 0 48 48" fill="currentColor">
                          <rect x="2" y="10" width="44" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
                          <rect x="2" y="18" width="44" height="8" fill="currentColor" opacity=".4" />
                        </svg>
                        <span className="text-white/60 text-xs font-mono">{brand || 'CARD'}</span>
                      </div>
                      <div>
                        <p className="text-white font-mono text-sm tracking-widest mb-1">
                          {(cardNumber || '•••• •••• •••• ••••').padEnd(19, '•')}
                        </p>
                        <div className="flex justify-between">
                          <span className="text-white/60 text-xs">{name || 'NOME COGNOME'}</span>
                          <span className="text-white/60 text-xs font-mono">{expiry || 'MM/AA'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nome sul carte</label>
                    <input
                      type="text"
                      placeholder="Mario Rossi"
                      value={name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => { setName(e.target.value.toUpperCase()); setErrors((p) => ({ ...p, name: undefined })); }}
                      className={inputCls + (errors.name ? ' ring-2 ring-red-400 border-red-400' : '')}
                    />
                    {errors.name && <p className={errorCls}>{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Numero carta</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => { setCardNumber(formatCardNumber(e.target.value)); setErrors((p) => ({ ...p, cardNumber: undefined })); }}
                      className={inputCls + ' font-mono tracking-widest' + (errors.cardNumber ? ' ring-2 ring-red-400 border-red-400' : '')}
                    />
                    {errors.cardNumber && <p className={errorCls}>{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Scadenza</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        inputMode="numeric"
                        value={expiry}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => { setExpiry(formatExpiry(e.target.value)); setErrors((p) => ({ ...p, expiry: undefined })); }}
                        className={inputCls + ' font-mono' + (errors.expiry ? ' ring-2 ring-red-400 border-red-400' : '')}
                      />
                      {errors.expiry && <p className={errorCls}>{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        inputMode="numeric"
                        maxLength={4}
                        value={cvv}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => { setCvv(e.target.value.replace(/\D/g, '').slice(0, 4)); setErrors((p) => ({ ...p, cvv: undefined })); }}
                        className={inputCls + ' font-mono' + (errors.cvv ? ' ring-2 ring-red-400 border-red-400' : '')}
                      />
                      {errors.cvv && <p className={errorCls}>{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* PayPal */}
              {method === 'paypal' && (
                <div className="text-center space-y-4">
                  <div className="bg-[#FFC439] hover:bg-[#f0b429] transition-colors rounded-xl py-4 px-6 cursor-pointer shadow-md" onClick={handleSubmit}>
                    <span className="font-black text-[#003087] text-lg tracking-tight">Pay<span className="text-[#009cde]">Pal</span></span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sarai reindirizzato a PayPal per completare il pagamento in modo sicuro.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Pagamento crittografato e protetto
                  </div>
                </div>
              )}

              {/* Google Pay */}
              {method === 'googlepay' && (
                <div className="text-center space-y-4">
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-black hover:bg-gray-900 transition-colors rounded-xl py-4 px-6 shadow-md flex items-center justify-center gap-3"
                  >
                    <span className="text-white font-medium text-sm">
                      <span className="text-blue-400">G</span>
                      <span className="text-red-400">o</span>
                      <span className="text-yellow-400">o</span>
                      <span className="text-blue-400">g</span>
                      <span className="text-green-400">l</span>
                      <span className="text-red-400">e</span>
                    </span>
                    <span className="text-white font-bold text-base">Pay</span>
                  </button>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Utilizza il tuo account Google per un pagamento rapido e sicuro.
                  </p>
                </div>
              )}

              {/* Apple Pay */}
              {method === 'applepay' && (
                <div className="text-center space-y-4">
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-black hover:bg-gray-900 transition-colors rounded-xl py-4 px-6 shadow-md flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <span className="text-white font-bold text-base">Pay</span>
                  </button>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Utilizza Face ID o Touch ID per un pagamento sicuro con Apple Pay.
                  </p>
                </div>
              )}
            </section>

            {/* Security badges */}
            <div className="flex items-center justify-center gap-6 text-xs text-gray-400 dark:text-gray-500">
              {['🔒 SSL 256-bit', '🛡️ Pagamento sicuro', '↩️ Rimborso 30gg'].map((b) => (
                <span key={b}>{b}</span>
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

                {/* CTA */}
                {method === 'card' && (
                  <button
                    onClick={handleSubmit}
                    disabled={processing}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-base disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Elaborazione...
                      </>
                    ) : (
                      <>Paga €{total.toFixed(2)}</>
                    )}
                  </button>
                )}

                {method === 'paypal' && (
                  <button
                    onClick={handleSubmit}
                    disabled={processing}
                    className="w-full py-3.5 bg-[#FFC439] hover:bg-[#f0b429] transition-colors rounded-xl font-black text-[#003087] shadow-md disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <svg className="w-5 h-5 animate-spin text-[#003087]" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Connessione a PayPal...
                      </>
                    ) : (
                      <span>Pay<span className="text-[#009cde]">Pal</span> — €{total.toFixed(2)}</span>
                    )}
                  </button>
                )}

                {method === 'googlepay' && (
                  <button
                    onClick={handleSubmit}
                    disabled={processing}
                    className="w-full py-3.5 bg-black hover:bg-gray-900 transition-colors rounded-xl font-bold text-white shadow-md disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Elaborazione...
                      </>
                    ) : (
                      <span>Google Pay — €{total.toFixed(2)}</span>
                    )}
                  </button>
                )}

                {method === 'applepay' && (
                  <button
                    onClick={handleSubmit}
                    disabled={processing}
                    className="w-full py-3.5 bg-black hover:bg-gray-900 transition-colors rounded-xl font-bold text-white shadow-md disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Elaborazione...
                      </>
                    ) : (
                      <span> Pay — €{total.toFixed(2)}</span>
                    )}
                  </button>
                )}
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
      </div>
    </div>
  );
}

'use client';

import { useCart } from '@/lib/cartContext';
import Link from 'next/link';
import OfferCountdown from '@/components/OfferCountdown';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function CartPage() {
  const { items, subtotal, savings, removeItem, updateQuantity, clearCart, totalItems } = useCart();

  const shipping = 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-28 h-28 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-6xl mx-auto mb-6">
            🛒
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3">
            Il carrello è vuoto
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Non hai ancora aggiunto nessun corso. Esplora il nostro catalogo e inizia il tuo percorso di crescita!
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
          >
            Esplora i corsi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">Il tuo carrello</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {totalItems} {totalItems === 1 ? 'corso' : 'corsi'} selezionati
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs sm:text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Svuota carrello
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-8 lg:items-start">
          {/* ── LEFT: Items ── */}
          <div className="space-y-4 mb-8 lg:mb-0">
            {items.map((item) => {
              const itemDiscount = item.originalPrice
                ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                : 0;

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-700 flex gap-4 items-start"
                >
                  {/* Thumbnail */}
                  <Link href={`/courses/${item.id}`} className="flex-shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-4xl hover:scale-105 transition-transform">
                      {item.emoji}
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/courses/${item.id}`}
                          className="font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug"
                        >
                          {item.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <StarRating rating={4.9} />
                          <span className="text-xs text-gray-400">Accesso illimitato a vita</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        aria-label="Rimuovi"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                      {/* Quantity */}
                      <div className="flex items-center border border-gray-200 dark:border-slate-600 rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-600 dark:text-gray-300 font-bold text-lg"
                        >
                          −
                        </button>
                        <span className="w-10 h-9 flex items-center justify-center text-sm font-bold text-gray-900 dark:text-white border-x border-gray-200 dark:border-slate-600">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-600 dark:text-gray-300 font-bold text-lg"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2">
                        {item.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            €{(item.originalPrice * item.quantity).toFixed(2)}
                          </span>
                        )}
                        <span className="text-xl font-black text-gray-900 dark:text-white">
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                        {itemDiscount > 0 && (
                          <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                            −{itemDiscount}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[
                { icon: '🛡️', text: 'Garanzia 30 giorni' },
                { icon: '🔒', text: 'Pagamento sicuro' },
                { icon: '♾️', text: 'Accesso a vita' },
              ].map((item) => (
                <div
                  key={item.text}
                  className="bg-white dark:bg-slate-800 rounded-xl p-3 text-center border border-gray-100 dark:border-slate-700 shadow-sm"
                >
                  <div className="text-xl mb-1">{item.icon}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <aside>
            <div className="sticky top-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
              <div className="p-6">
                <h2 className="font-black text-xl text-gray-900 dark:text-white mb-5">
                  Riepilogo ordine
                </h2>

                {/* Line items */}
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Subtotale ({totalItems} {totalItems === 1 ? 'corso' : 'corsi'})
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      €{(subtotal + savings).toFixed(2)}
                    </span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 dark:text-green-400 font-medium">Sconto</span>
                      <span className="text-green-600 dark:text-green-400 font-bold">
                        − €{savings.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Spedizione</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">Gratuita</span>
                  </div>
                </div>

                {/* Coupon */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Codice sconto
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Inserisci codice"
                      className="flex-1 px-3 py-2.5 text-sm border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                    />
                    <button className="px-4 py-2.5 bg-gray-100 dark:bg-slate-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-500 transition-colors text-sm">
                      Applica
                    </button>
                  </div>
                </div>

                {/* Offer countdown */}
                {(() => {
                  const earliest = items
                    .filter((i) => i.offer && new Date(i.offer.expiresAt) > new Date())
                    .sort((a, b) => new Date(a.offer!.expiresAt).getTime() - new Date(b.offer!.expiresAt).getTime())[0];
                  return earliest ? (
                    <div className="mb-5">
                      <OfferCountdown label={earliest.offer!.label} expiresAt={earliest.offer!.expiresAt} />
                    </div>
                  ) : null;
                })()}

                {/* Divider + Total */}
                <div className="border-t border-gray-100 dark:border-slate-700 pt-4 mb-5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-black text-lg text-gray-900 dark:text-white">Totale</span>
                    <span className="font-black text-3xl text-gray-900 dark:text-white">
                      €{total.toFixed(2)}
                    </span>
                  </div>
                  {savings > 0 && (
                    <p className="text-green-600 dark:text-green-400 text-sm font-medium mt-1 text-right">
                      Risparmi €{savings.toFixed(2)} in totale!
                    </p>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href="/checkout"
                  className="block w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-lg mb-3 text-center"
                >
                  Procedi al pagamento →
                </Link>

                {/* Payment methods */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  {['💳 Carta', '🏦 Bonifico', 'PayPal'].map((pm) => (
                    <span
                      key={pm}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 rounded-lg"
                    >
                      {pm}
                    </span>
                  ))}
                </div>

                <Link
                  href="/"
                  className="block text-center text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  ← Continua a sfogliare
                </Link>
              </div>

              {/* Guarantee banner */}
              <div className="bg-green-50 dark:bg-green-900/20 border-t border-green-100 dark:border-green-800 px-6 py-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🛡️</span>
                  <div>
                    <p className="font-bold text-green-800 dark:text-green-300 text-sm">
                      Garanzia soddisfatti o rimborsati
                    </p>
                    <p className="text-green-700 dark:text-green-400 text-xs mt-0.5 leading-relaxed">
                      30 giorni per chiedere il rimborso completo, senza fare domande.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useCart } from '@/lib/cartContext';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, savings, totalItems } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 6H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3" />
            </svg>
            <h2 className="font-black text-xl text-gray-900 dark:text-white">Carrello</h2>
            {totalItems > 0 && (
              <span className="px-2 py-0.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Chiudi carrello"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-5xl mb-5">
              🛒
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Il carrello è vuoto
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
              Aggiungi un corso per iniziare il tuo percorso di crescita!
            </p>
            <button
              onClick={closeCart}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
            >
              Esplora i corsi
            </button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 bg-gray-50 dark:bg-slate-800 rounded-2xl p-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white leading-snug mb-1 line-clamp-2">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-gray-900 dark:text-white text-sm">
                        €{item.price.toFixed(2)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          €{item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-gray-200 dark:border-slate-600 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-600 dark:text-gray-300 font-bold text-base leading-none"
                          aria-label="Riduci quantità"
                        >
                          −
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center text-sm font-bold text-gray-900 dark:text-white border-x border-gray-200 dark:border-slate-600">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-600 dark:text-gray-300 font-bold text-base leading-none"
                          aria-label="Aumenta quantità"
                        >
                          +
                        </button>
                      </div>
                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        aria-label="Rimuovi"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer / Summary */}
            <div className="border-t border-gray-100 dark:border-slate-800 p-5 space-y-3">
              {savings > 0 && (
                <div className="flex justify-between text-sm items-center">
                  <span className="text-gray-500 dark:text-gray-400">Sconto applicato</span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    − €{savings.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-baseline">
                <span className="text-gray-700 dark:text-gray-300 font-semibold">Totale</span>
                <span className="font-black text-2xl text-gray-900 dark:text-white">
                  €{subtotal.toFixed(2)}
                </span>
              </div>

              <p className="text-xs text-gray-400 text-center">IVA inclusa · Garanzia rimborso 30 giorni</p>

              <Link
                href="/cart"
                onClick={closeCart}
                className="block w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-xl text-center hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg text-base"
              >
                Procedi all&apos;acquisto →
              </Link>
              <button
                onClick={closeCart}
                className="w-full py-2.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                Continua a sfogliare
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

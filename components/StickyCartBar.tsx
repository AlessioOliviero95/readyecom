'use client';

import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/lib/cartContext';

interface StickyCartBarProps {
  productId: string;
  productName: string;
  price: number;
  originalPrice?: number;
  emoji: string;
  offer?: { label: string; expiresAt: string };
}

export default function StickyCartBar({ productId, productName, price, originalPrice, emoji, offer }: StickyCartBarProps) {
  const [visible, setVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2000);
    return () => clearTimeout(t);
  }, [added]);

  const handleAdd = () => {
    addItem({ id: productId, name: productName, price, originalPrice, emoji, offer });
    setAdded(true);
  };

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <>
      <div ref={sentinelRef} className="h-1" />
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 shadow-2xl px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {productName}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  €{price.toFixed(2)}
                </span>
                {originalPrice && (
                  <>
                    <span className="text-sm text-gray-400 line-through">€{originalPrice.toFixed(2)}</span>
                    <span className="text-xs font-bold text-green-600 dark:text-green-400">-{discount}%</span>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={handleAdd}
              className="flex-shrink-0 px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg text-sm"
            >
              {added ? '✓ Aggiunto!' : 'Acquista ora'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

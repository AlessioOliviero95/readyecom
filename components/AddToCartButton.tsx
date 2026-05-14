'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cartContext';

interface AddToCartButtonProps {
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  emoji: string;
  className?: string;
  label?: string;
  offer?: { label: string; expiresAt: string };
}

export default function AddToCartButton({
  productId,
  name,
  price,
  originalPrice,
  emoji,
  className = '',
  label = 'Acquista ora',
  offer,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id: productId, name, price, originalPrice, emoji, offer });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button onClick={handleAdd} className={className}>
      {added ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Aggiunto al carrello!
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 6H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3" />
          </svg>
          {label}
        </span>
      )}
    </button>
  );
}

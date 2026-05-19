import { fetchConfig } from '@/lib/db';
import type { Product } from '@/lib/types';
import ProductsManager from './ProductsManager';

export default async function ProductsPage() {
  const products = await fetchConfig<Product[]>('products');
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">📦 Prodotti</h1>
        <p className="text-gray-500 text-sm mt-1">Gestisci il catalogo corsi / prodotti</p>
      </div>
      <ProductsManager initialProducts={products ?? []} />
    </div>
  );
}

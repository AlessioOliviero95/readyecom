'use client';

import { useState, useTransition } from 'react';
import { saveProducts } from '../actions';
import type { Product } from '@/lib/types';

const inp = 'w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';
const ta = `${inp} font-mono text-xs leading-relaxed resize-y`;

const EMPTY: Product = {
  id: '', name: '', subtitle: '', description: '', price: 0, image: '', emoji: '📚',
  category: '', inStock: true, rating: 5, reviews: 0, studentsCount: 0,
  duration: '', lessonsCount: 0, level: 'Principiante', language: 'Italiano',
  lastUpdated: new Date().toISOString().split('T')[0], tags: [], variants: [],
};

function F({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
    </div>
  );
}

function ProductEditor({ product, onSave, onCancel }: { product: Product; onSave: (p: Product) => void; onCancel: () => void }) {
  const [p, setP] = useState<Product>(product);
  const [advJson, setAdvJson] = useState(JSON.stringify({
    learningOutcomes: p.learningOutcomes ?? [], includes: p.includes ?? [],
    curriculum: p.curriculum ?? [], instructor: p.instructor,
    ratingDistribution: p.ratingDistribution ?? {}, reviewsList: p.reviewsList ?? [],
    faq: p.faq ?? [], guarantee: p.guarantee, offer: p.offer,
  }, null, 2));
  const [jsonErr, setJsonErr] = useState('');
  const set = (f: keyof Product, v: unknown) => setP(prev => ({ ...prev, [f]: v }));

  function handleSave() {
    let adv = {};
    try { adv = JSON.parse(advJson); setJsonErr(''); }
    catch { setJsonErr('JSON non valido'); return; }
    onSave({ ...p, ...adv });
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900">{product.id ? `Modifica: ${product.name}` : 'Nuovo prodotto'}</h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-sm">✕ Annulla</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <F label="ID (univoco)" hint="es. corso-yoga"><input value={p.id} onChange={e => set('id', e.target.value)} className={inp} /></F>
        <F label="Emoji"><input value={p.emoji} onChange={e => set('emoji', e.target.value)} className={inp} /></F>
        <F label="Nome"><input value={p.name} onChange={e => set('name', e.target.value)} className={inp} /></F>
        <F label="Sottotitolo"><input value={p.subtitle ?? ''} onChange={e => set('subtitle', e.target.value)} className={inp} /></F>
      </div>
      <F label="Descrizione"><textarea value={p.description} onChange={e => set('description', e.target.value)} rows={3} className={ta} /></F>
      <div className="grid grid-cols-3 gap-4">
        <F label="Prezzo (€)"><input type="number" step="0.01" value={p.price} onChange={e => set('price', Number(e.target.value))} className={inp} /></F>
        <F label="Prezzo originale (€)"><input type="number" step="0.01" value={p.originalPrice ?? ''} onChange={e => set('originalPrice', e.target.value ? Number(e.target.value) : undefined)} className={inp} /></F>
        <F label="Categoria"><input value={p.category} onChange={e => set('category', e.target.value)} className={inp} /></F>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <F label="URL immagine"><input value={p.image} onChange={e => set('image', e.target.value)} className={inp} /></F>
        <F label="Tag (virgola)"><input value={p.tags.join(', ')} onChange={e => set('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} className={inp} /></F>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <F label="Rating"><input type="number" step="0.1" min="0" max="5" value={p.rating} onChange={e => set('rating', Number(e.target.value))} className={inp} /></F>
        <F label="Recensioni"><input type="number" value={p.reviews} onChange={e => set('reviews', Number(e.target.value))} className={inp} /></F>
        <F label="Studenti"><input type="number" value={p.studentsCount ?? 0} onChange={e => set('studentsCount', Number(e.target.value))} className={inp} /></F>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <F label="Durata"><input value={p.duration ?? ''} onChange={e => set('duration', e.target.value)} className={inp} /></F>
        <F label="Lezioni"><input type="number" value={p.lessonsCount ?? 0} onChange={e => set('lessonsCount', Number(e.target.value))} className={inp} /></F>
        <F label="Livello"><input value={p.level ?? ''} onChange={e => set('level', e.target.value)} className={inp} /></F>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <F label="Lingua"><input value={p.language ?? ''} onChange={e => set('language', e.target.value)} className={inp} /></F>
        <F label="Ultimo agg. (YYYY-MM-DD)"><input value={p.lastUpdated ?? ''} onChange={e => set('lastUpdated', e.target.value)} className={inp} /></F>
      </div>
      <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
        <input type="checkbox" checked={p.inStock} onChange={e => set('inStock', e.target.checked)} className="rounded" />
        Disponibile (in stock)
      </label>
      <F label="Campi avanzati (JSON)" hint="curriculum, instructor, reviews, FAQ, ecc.">
        <textarea value={advJson} onChange={e => { setAdvJson(e.target.value); setJsonErr(''); }} rows={12} className={ta} />
        {jsonErr && <p className="text-red-500 text-xs mt-1">{jsonErr}</p>}
      </F>
      <div className="flex gap-3">
        <button onClick={handleSave} className="btn-primary text-sm">✓ Conferma</button>
        <button onClick={onCancel} className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Annulla</button>
      </div>
    </div>
  );
}

export default function ProductsManager({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  function handleSaveProduct(updated: Product) {
    setProducts(prev => {
      const i = prev.findIndex(p => p.id === updated.id);
      if (i >= 0) { const next = [...prev]; next[i] = updated; return next; }
      return [...prev, updated];
    });
    setEditing(null);
  }

  function handleDelete(id: string) {
    if (!confirm('Eliminare questo prodotto?')) return;
    setProducts(prev => prev.filter(p => p.id !== id));
  }

  function handleSaveAll() {
    startTransition(async () => {
      try { await saveProducts(products); setSaved(true); setTimeout(() => setSaved(false), 3000); setError(''); }
      catch (e) { setError(String(e)); }
    });
  }

  if (editing) {
    return <ProductEditor product={editing} onSave={handleSaveProduct} onCancel={() => setEditing(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <p className="font-semibold text-gray-900">{products.length} prodott{products.length === 1 ? 'o' : 'i'}</p>
          <button onClick={() => setEditing({ ...EMPTY })} className="btn-primary text-sm px-4 py-2">+ Nuovo prodotto</button>
        </div>
        <div className="divide-y divide-gray-100">
          {products.map(p => (
            <div key={p.id} className="flex items-center gap-4 px-6 py-4">
              <span className="text-2xl shrink-0">{p.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">{p.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">ID: {p.id} · €{p.price} · {p.category} · {p.inStock ? '✅' : '❌'}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing(p)} className="px-3 py-1.5 text-xs rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium">Modifica</button>
                <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium">Elimina</button>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <p className="px-6 py-12 text-center text-gray-400 text-sm">Nessun prodotto. Aggiungine uno!</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={handleSaveAll} disabled={isPending} className="btn-primary text-sm disabled:opacity-50">
          {isPending ? '⏳ Salvataggio...' : '💾 Salva tutti i prodotti'}
        </button>
        {saved && <span className="text-green-600 text-sm font-medium">✓ Salvato</span>}
        {error && <span className="text-red-600 text-sm">{error}</span>}
      </div>
    </div>
  );
}

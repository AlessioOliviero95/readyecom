'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/config';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const TAG_COLORS: Record<string, string> = {
  bestseller: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  sconto: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  popolare: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  nuovo: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
};

interface CoursesViewProps {
  products: Product[];
}

export default function CoursesView({ products }: CoursesViewProps) {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const levels = useMemo(() => {
    const raw = products.map((p) => p.level).filter(Boolean) as string[];
    return ['all', ...Array.from(new Set(raw))];
  }, [products]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (levelFilter !== 'all') {
      result = result.filter((p) => p.level === levelFilter);
    }

    switch (sortBy) {
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating':     result.sort((a, b) => b.rating - a.rating); break;
      case 'popular':    result.sort((a, b) => (b.studentsCount ?? 0) - (a.studentsCount ?? 0)); break;
    }

    return result;
  }, [products, search, levelFilter, sortBy]);

  return (
    <>
      {/* Filter bar */}
      <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-3 sm:p-4 mb-6 sm:mb-8 shadow-sm">
        <div className="flex flex-col gap-3">
          {/* Search — full width always */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <label htmlFor="course-search" className="sr-only">Cerca corsi</label>
            <input
              id="course-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cerca corsi..."
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>

          {/* Selects + count on one row */}
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="flex-1 px-3 py-2.5 text-sm border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {levels.map((l) => (
                <option key={l} value={l}>{l === 'all' ? 'Tutti i livelli' : l}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 px-3 py-2.5 text-sm border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">Ordina: In evidenza</option>
              <option value="rating">Valutazione più alta</option>
              <option value="popular">Più popolari</option>
              <option value="price-asc">Prezzo crescente</option>
              <option value="price-desc">Prezzo decrescente</option>
            </select>

            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap sm:pl-1">
              {filtered.length} {filtered.length === 1 ? 'corso' : 'corsi'}
            </span>
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 sm:py-20">
          <div className="text-5xl sm:text-6xl mb-4">🔍</div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Nessun corso trovato</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Prova a modificare i filtri o la ricerca.</p>
          <button
            onClick={() => { setSearch(''); setLevelFilter('all'); setSortBy('default'); }}
            className="mt-5 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm"
          >
            Reimposta filtri
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((product) => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <article key={product.id} className="group bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                {/* Thumbnail */}
                <div className="relative h-40 sm:h-44 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center overflow-hidden">
                  <span className="text-6xl sm:text-7xl group-hover:scale-110 transition-transform duration-300">
                    {product.emoji}
                  </span>
                  {discount > 0 && (
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
                      −{discount}%
                    </span>
                  )}
                  {product.tags.includes('bestseller') && (
                    <span className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-xs font-black px-2.5 py-1 rounded-full">
                      🏆 Bestseller
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {product.tags.filter((t) => t !== 'bestseller').map((tag) => (
                      <span key={tag} className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TAG_COLORS[tag] ?? 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-black text-gray-900 dark:text-white text-base sm:text-lg leading-snug mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  {product.subtitle && (
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{product.subtitle}</p>
                  )}

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{product.rating}</span>
                    <StarRating rating={product.rating} />
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                    {product.studentsCount && (
                      <span className="text-xs text-gray-400 ml-auto hidden sm:inline">{product.studentsCount.toLocaleString('it-IT')} studenti</span>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {product.level && (
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        {product.level}
                      </span>
                    )}
                    {product.duration && (
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {product.duration}
                      </span>
                    )}
                    {product.lessonsCount && (
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        {product.lessonsCount} lezioni
                      </span>
                    )}
                  </div>

                  {/* Price + CTA */}
                  <div className="mt-auto pt-3 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between gap-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">€{product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-xs sm:text-sm text-gray-400 line-through">€{product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <Link
                      href={`/courses/${product.id}`}
                      className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-sm hover:shadow-md hover:scale-[1.03] active:scale-[0.97] whitespace-nowrap"
                    >
                      Scopri →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}

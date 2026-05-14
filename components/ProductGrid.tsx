import { Product } from '@/lib/config';
import Link from 'next/link';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      {products.map((product) => (
        <div key={product.id} className="group overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col">
          {/* Thumbnail */}
          <div className="relative h-40 sm:h-48 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 overflow-hidden flex items-center justify-center">
            <div className="text-6xl sm:text-7xl group-hover:scale-110 transition-transform duration-300">
              {product.emoji}
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            {product.originalPrice && (
              <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 flex flex-col flex-1">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-2.5">
              <div className="flex items-center text-sm sm:text-base">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>⭐</span>
                ))}
              </div>
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Name */}
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-snug">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 flex-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            {/* Tags */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {product.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-0.5 text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                €{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm sm:text-base text-gray-400 line-through">
                  €{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* CTA */}
            <Link
              href={`/courses/${product.id}`}
              className="w-full px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 group/btn text-sm sm:text-base hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Scopri di più</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

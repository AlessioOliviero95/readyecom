import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProducts, getProductById } from '@/lib/config';
import CurriculumAccordion from '@/components/CurriculumAccordion';
import FAQAccordion from '@/components/FAQAccordion';
import StickyCartBar from '@/components/StickyCartBar';
import AddToCartButton from '@/components/AddToCartButton';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return {};
  return {
    title: `${product.name} | ReadyEcom`,
    description: product.description,
  };
}

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClass} ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const allProducts = await getProducts();
  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 2);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const totalLessons = product.curriculum?.reduce((sum, m) => sum + m.lessons.length, 0) ?? 0;
  const ratingDist = product.ratingDistribution ?? {};
  const totalRatings = Object.values(ratingDist).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* ── HERO BANNER ── */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-blue-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-500">/</span>
            <span className="text-slate-300">Corsi</span>
            <span className="text-slate-500">/</span>
            <span className="text-white truncate">{product.name}</span>
          </nav>

          <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-12 lg:items-start">
            {/* Left: Hero Content */}
            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-bold bg-yellow-400 text-yellow-900 rounded-full uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
                {product.name}
              </h1>
              {product.subtitle && (
                <p className="text-lg text-blue-200 mb-4 leading-relaxed">{product.subtitle}</p>
              )}
              <p className="text-slate-300 mb-6 leading-relaxed max-w-2xl">{product.description}</p>

              {/* Rating row */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-bold text-lg">{product.rating}</span>
                  <StarRating rating={product.rating} size="sm" />
                  <span className="text-slate-400 text-sm">({product.reviews} recensioni)</span>
                </div>
                {product.studentsCount && (
                  <div className="flex items-center gap-1.5 text-slate-300 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{product.studentsCount.toLocaleString('it-IT')} studenti</span>
                  </div>
                )}
              </div>

              {/* Meta info row */}
              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                {product.level && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    {product.level}
                  </span>
                )}
                {product.duration && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {product.duration}
                  </span>
                )}
                {product.language && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    {product.language}
                  </span>
                )}
                {product.lastUpdated && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Aggiornato: {product.lastUpdated}
                  </span>
                )}
              </div>

              {/* Mobile price + CTA (hidden on desktop) */}
              <div className="lg:hidden mt-8 p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl font-black">€{product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-slate-400 line-through">€{product.originalPrice.toFixed(2)}</span>
                      <span className="px-2 py-1 bg-red-500 text-white text-sm font-bold rounded-lg">-{discount}%</span>
                    </>
                  )}
                </div>
                <AddToCartButton
                  productId={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  emoji={product.id === '1' ? '🧠' : '🎮'}
                  offer={product.offer}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-black rounded-xl text-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-xl"
                />
                <p className="text-center text-slate-400 text-xs mt-3">✓ Garanzia rimborso 30 giorni</p>
              </div>
            </div>

            {/* Right: Sticky Sidebar placeholder (desktop only) — rendered in main below */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT + STICKY SIDEBAR ── */}
      <div className="container mx-auto px-4 py-10">
        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-10 lg:items-start">

          {/* ── LEFT: Main Content ── */}
          <div className="space-y-10">

            {/* Social Proof Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: '👥', value: product.studentsCount?.toLocaleString('it-IT') ?? '—', label: 'Studenti' },
                { icon: '🎬', value: `${totalLessons || product.lessonsCount}`, label: 'Lezioni' },
                { icon: '⭐', value: `${product.rating}/5`, label: 'Valutazione' },
                { icon: '🕐', value: product.duration ?? '—', label: 'Durata' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-sm border border-gray-100 dark:border-slate-700">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="font-black text-gray-900 dark:text-white text-lg">{stat.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Cosa Imparerai */}
            {product.learningOutcomes && product.learningOutcomes.length > 0 && (
              <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Cosa imparerai
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.learningOutcomes.map((outcome, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{outcome}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Il Corso Include */}
            {product.includes && product.includes.length > 0 && (
              <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Questo corso include
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {product.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Programma del Corso */}
            {product.curriculum && product.curriculum.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Programma del corso
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {product.curriculum.length} moduli • {totalLessons} lezioni
                  </span>
                </div>
                <CurriculumAccordion modules={product.curriculum} />
              </section>
            )}

            {/* Istruttore */}
            {product.instructor && (
              <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Il tuo istruttore
                </h2>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-3xl shadow-lg">
                    {product.instructor.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {product.instructor.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">
                      {product.instructor.title}
                    </p>
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {product.instructor.rating} valutazione
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {product.instructor.studentsCount.toLocaleString('it-IT')} studenti
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        {product.instructor.coursesCount} corsi
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {product.instructor.bio}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Recensioni */}
            {product.reviewsList && product.reviewsList.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Recensioni degli studenti
                </h2>

                {/* Aggregate Rating */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 mb-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <div className="text-center flex-shrink-0">
                      <div className="text-6xl font-black text-gray-900 dark:text-white leading-none mb-2">
                        {product.rating}
                      </div>
                      <StarRating rating={product.rating} size="md" />
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {product.reviews} recensioni
                      </p>
                    </div>
                    <div className="flex-1 w-full space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = ratingDist[star.toString()] ?? 0;
                        const pct = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
                        return (
                          <div key={star} className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-12 flex-shrink-0">
                              <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-xs text-gray-600 dark:text-gray-400">{star}</span>
                            </div>
                            <div className="flex-1 bg-gray-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                              <div
                                className="h-full bg-yellow-400 rounded-full transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 w-8 text-right flex-shrink-0">
                              {Math.round(pct)}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-4">
                  {product.reviewsList.map((review, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900 dark:text-white text-sm">
                                {review.name}
                              </span>
                              {review.verified && (
                                <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                  Acquisto verificato
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-400">{review.date}</span>
                          </div>
                        </div>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            {product.faq && product.faq.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Domande frequenti
                </h2>
                <FAQAccordion items={product.faq} />
              </section>
            )}

            {/* Garanzia */}
            {product.guarantee && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-green-900 dark:text-green-300 text-lg mb-1">
                    Garanzia {product.guarantee.days} giorni
                  </h3>
                  <p className="text-green-700 dark:text-green-400 text-sm leading-relaxed">
                    {product.guarantee.text}. Se non sei soddisfatto per qualsiasi motivo, ti rimborsiamo completamente entro {product.guarantee.days} giorni dall&apos;acquisto, senza fare domande.
                  </p>
                </div>
              </div>
            )}

            {/* Corsi Correlati */}
            {related.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Potrebbe interessarti anche
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map((rel) => {
                    const relDiscount = rel.originalPrice
                      ? Math.round(((rel.originalPrice - rel.price) / rel.originalPrice) * 100)
                      : 0;
                    return (
                      <Link
                        key={rel.id}
                        href={`/courses/${rel.id}`}
                        className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
                      >
                        <div className="h-28 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center text-4xl">
                          {rel.id === '1' ? '🧠' : '🎮'}
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                          <div className="flex items-center gap-1 mb-2">
                            <StarRating rating={rel.rating} size="sm" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">({rel.reviews})</span>
                          </div>
                          <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug mb-2 flex-1">
                            {rel.name}
                          </h3>
                          <div className="flex items-baseline gap-2">
                            <span className="font-black text-gray-900 dark:text-white">€{rel.price.toFixed(2)}</span>
                            {rel.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">€{rel.originalPrice.toFixed(2)}</span>
                            )}
                            {relDiscount > 0 && (
                              <span className="text-xs font-bold text-green-600 dark:text-green-400">-{relDiscount}%</span>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* ── RIGHT: Sticky Sidebar (desktop only) ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-4">
              {/* Price Card */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
                {/* Product preview */}
                <div className="h-44 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center text-7xl">
                  {product.id === '1' ? '🧠' : '🎮'}
                </div>

                <div className="p-6">
                  {/* Urgency badge */}
                  <div className="flex items-center gap-2 mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                    <span className="text-orange-500 text-lg">⚡</span>
                    <p className="text-orange-700 dark:text-orange-400 text-sm font-semibold">
                      Offerta limitata — scade presto!
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-black text-gray-900 dark:text-white">
                      €{product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-400 line-through">
                        €{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {discount > 0 && (
                    <p className="text-green-600 dark:text-green-400 font-bold text-sm mb-5">
                      Risparmi €{(product.originalPrice! - product.price).toFixed(2)} ({discount}% di sconto)
                    </p>
                  )}

                  {/* Variant selectors */}
                  {product.variants.map((variant) => (
                    <div key={variant.name} className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {variant.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {variant.options.map((option, oi) => (
                          <span
                            key={option}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg border cursor-pointer transition-colors ${
                              oi === 0
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:border-blue-400'
                            }`}
                          >
                            {option}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* CTA */}
                  <AddToCartButton
                    productId={product.id}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    emoji={product.id === '1' ? '🧠' : '🎮'}
                    offer={product.offer}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-xl text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] mb-3"
                  />
                  <button className="w-full py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-sm">
                    ♡ Aggiungi ai preferiti
                  </button>

                  <p className="text-center text-gray-400 text-xs mt-3">
                    Nessun impegno — annulla quando vuoi
                  </p>

                  {/* Trust signals */}
                  <div className="mt-5 pt-5 border-t border-gray-100 dark:border-slate-700 space-y-2.5">
                    {[
                      { icon: '🛡️', text: `Garanzia rimborso ${product.guarantee?.days ?? 30} giorni` },
                      { icon: '♾️', text: 'Accesso illimitato a vita' },
                      { icon: '📱', text: 'Accesso da tutti i dispositivi' },
                      { icon: '🏆', text: 'Certificato di completamento' },
                      { icon: '🔒', text: 'Pagamento sicuro e criptato' },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                        <span>{item.icon}</span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-700">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">
                  Condividi questo corso
                </p>
                <div className="flex justify-center gap-3">
                  {['📘 Facebook', '🐦 Twitter', '💼 LinkedIn'].map((s) => (
                    <button
                      key={s}
                      className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── STICKY MOBILE BAR ── */}
      <StickyCartBar
        productId={product.id}
        productName={product.name}
        price={product.price}
        originalPrice={product.originalPrice}
        emoji={product.id === '1' ? '🧠' : '🎮'}
        offer={product.offer}
      />
    </div>
  );
}

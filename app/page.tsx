import ProductGrid from "@/components/ProductGrid";
import { getSiteConfig, getProducts } from "@/lib/config";
import PageContainer from "@/components/PageContainer";

export default async function Home() {
  const siteConfig = await getSiteConfig();
  const products = await getProducts();
  const { features, about, mission } = siteConfig;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent dark:from-blue-500/20 dark:via-purple-500/10" />

        <PageContainer className="py-14 sm:py-20 lg:py-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left */}
            <div>
              <a
                href="#featured-courses"
                className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:border-blue-300 dark:hover:border-blue-700 transition-colors cursor-pointer"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Nuovi corsi disponibili</span>
              </a>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Sviluppa le tue{' '}
                </span>
                <span className="text-gray-900 dark:text-white">
                  capacità cognitive
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-7 max-w-xl leading-relaxed">
                Impara da esperti e trasforma il tuo modo di pensare con corsi innovativi, interattivi e basati su metodologie scientifiche provate.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#featured-courses"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Esplora i corsi</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <button className="inline-flex items-center justify-center px-7 py-3.5 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                  Contattaci
                </button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-blue-600 mb-0.5">{products.length}+</div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Corsi Disponibili</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-purple-600 mb-0.5">🎯</div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Risultati Provati</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-pink-600 mb-0.5">📈</div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Certificati</p>
                </div>
              </div>
            </div>

            {/* Right illustration — desktop only */}
            <div className="relative h-72 lg:h-96 hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-3xl opacity-10 blur-3xl" />
              <div className="relative h-full flex items-center justify-center text-7xl lg:text-8xl">
                🧠
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ── CHI SIAMO ── configurabile via site.json about.enabled */}
      {about?.enabled && (
        <PageContainer as="section" className="py-14 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

            {/* Card fondatrice */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-purple-400 to-pink-400 rounded-3xl opacity-10 blur-3xl" />
              <div className="relative bg-gradient-to-br from-rose-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col items-center text-center border border-rose-100 dark:border-slate-600 shadow-xl">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-rose-400 via-pink-400 to-purple-500 flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl mb-4 shadow-lg">
                  {about.avatar}
                </div>
                <blockquote className="text-base sm:text-lg font-semibold italic text-gray-700 dark:text-gray-300 leading-relaxed">
                  &ldquo;{about.quote}&rdquo;
                </blockquote>
                <div className="mt-4 flex flex-col items-center gap-0.5">
                  <span className="font-black text-gray-900 dark:text-white">{about.founderName}</span>
                  <span className="text-sm text-rose-500 dark:text-rose-400 font-medium">{about.founderTitle}</span>
                </div>
                <div className="mt-4 flex gap-2 flex-wrap justify-center">
                  {about.founderBadges.map((badge) => (
                    <span key={badge} className="text-xs px-3 py-1.5 bg-white dark:bg-slate-600 rounded-full text-gray-600 dark:text-gray-300 shadow-sm border border-gray-100 dark:border-slate-500 font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Testo */}
            <div className="order-1 lg:order-2">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 rounded-full text-sm font-bold text-rose-600 dark:text-rose-400 mb-4">
                {about.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5 leading-tight text-gray-900 dark:text-white">
                {about.headline}{' '}
                <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                  {about.headlineHighlight}
                </span>
              </h2>
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {p}
                </p>
              ))}
              <div className="space-y-3 mt-4">
                {about.values.map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                    <span className="text-xl sm:text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PageContainer>
      )}

      {/* ── CORSI IN EVIDENZA ── configurabile via features.featuredCourses */}
      {features.featuredCourses && (
        <PageContainer as="section" id="featured-courses" className="py-14 sm:py-20 scroll-mt-20">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-sm font-bold text-blue-600 dark:text-blue-400 mb-3">
              ⭐ I NOSTRI BESTSELLER
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">Corsi in Evidenza</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
              I corsi più apprezzati dai nostri studenti, con certificazioni riconosciute e alta soddisfazione
            </p>
          </div>

          <ProductGrid products={products} />

          {features.viewAllCourses && (
            <div className="text-center mt-10 sm:mt-14">
              <a
                href="/courses"
                className="inline-block px-8 py-4 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
              >
                Visualizza tutti i corsi →
              </a>
            </div>
          )}
        </PageContainer>
      )}

      {/* ── MISSIONE ── configurabile via mission.enabled */}
      {mission?.enabled && (
        <PageContainer as="section" className="pb-14 sm:pb-20">
          <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 border border-purple-100 dark:border-slate-700">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-white dark:bg-slate-700 rounded-full text-sm font-bold text-purple-600 dark:text-purple-400 mb-4 shadow-sm">
                {mission.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
                {mission.headline}{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {mission.headlineHighlight}
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {mission.text}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {mission.stats.map((stat) => (
                  <div key={stat.label} className="bg-white dark:bg-slate-700 rounded-2xl p-5 shadow-sm border border-white dark:border-slate-600">
                    <div className="text-3xl mb-2">{stat.value}</div>
                    <p className="font-black text-gray-900 dark:text-white text-sm">{stat.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PageContainer>
      )}

      {/* ── NEWSLETTER / CTA ── configurabile via features.newsletter */}
      {features.newsletter && (
        <PageContainer as="section" className="py-14 sm:py-20">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-900 dark:bg-slate-950">
            {/* Orb decorativi coerenti col sito */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-600/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-16 p-7 sm:p-10 lg:p-14 items-center">

              {/* Sinistra: copy + benefici */}
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold mb-5 uppercase tracking-wider">
                  🎁 Offerta esclusiva
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                  Inizia il tuo percorso{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    di crescita.
                  </span>
                </h2>
                <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed">
                  Unisciti a oltre 1.800 mamme che stanno già trasformando la loro vita. Iscriviti e ricevi subito il tuo regalo di benvenuto.
                </p>

                <ul className="space-y-3">
                  {[
                    { icon: '🎓', text: 'Sconto esclusivo del 15% sul primo corso' },
                    { icon: '📩', text: 'Accesso ai webinar gratuiti del mese' },
                    { icon: '📚', text: 'Risorse e materiali premium scaricabili' },
                    { icon: '🛡️', text: 'Garanzia rimborso 30 giorni sempre attiva' },
                  ].map((item) => (
                    <li key={item.text} className="flex items-center gap-3 text-slate-300 text-sm">
                      <span className="text-lg shrink-0">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Destra: form card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                <p className="text-white font-black text-xl mb-0.5">Iscriviti ora</p>
                <p className="text-slate-400 text-sm mb-5">Gratuito. Nessuno spam. Cancellati quando vuoi.</p>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Il tuo nome"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                  />
                  <input
                    type="email"
                    placeholder="La tua email"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                  />
                  <button className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-sm">
                    Voglio il mio 15% di sconto →
                  </button>
                </div>

                {/* Social proof */}
                <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-3">
                  <div className="flex -space-x-2 shrink-0">
                    {['🧑', '👩', '👩‍💼', '👩‍🦱'].map((a, i) => (
                      <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs border-2 border-slate-900">
                        {a}
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-400 text-xs">
                    <span className="text-white font-bold">1.847</span> mamme già iscritte
                  </p>
                </div>

                <p className="text-slate-600 text-xs mt-3 text-center">
                  🔒 I tuoi dati sono al sicuro. Non li condividiamo mai.
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
      )}
    </div>
  );
}

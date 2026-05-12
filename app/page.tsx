import ProductGrid from "@/components/ProductGrid";
import { getSiteConfig, getProducts } from "@/lib/config";

export default async function Home() {
  const siteConfig = await getSiteConfig();
  const products = await getProducts();
  const { features, about, mission } = siteConfig;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900">

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent dark:from-blue-500/20 dark:via-purple-500/10"></div>

        <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Nuovi corsi disponibili</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Sviluppa le tue{' '}
                </span>
                <span className="text-gray-900 dark:text-white">
                  capacità cognitive
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl leading-relaxed">
                Impara da esperti e trasforma il tuo modo di pensare con corsi innovativi, interattivi e basati su metodologie scientifiche provate.
              </p>

              <div className="flex gap-4 flex-wrap">
                <a href="#featured-courses" className="btn btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                  <span>Esplora i corsi</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <button className="btn btn-secondary text-lg px-8 py-4 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors">
                  Contattaci
                </button>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{products.length}+</div>
                  <p className="text-gray-600 dark:text-gray-400">Corsi Disponibili</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">🎯</div>
                  <p className="text-gray-600 dark:text-gray-400">Risultati Provati</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-1">📈</div>
                  <p className="text-gray-600 dark:text-gray-400">Certificati Riconosciuti</p>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative h-96 hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-3xl opacity-10 blur-3xl"></div>
              <div className="relative h-full flex items-center justify-center text-6xl">
                🧠
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chi Siamo — subito dopo l'hero, configurabile via site.json */}
      {about?.enabled && (
        <section className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Card fondatrice */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-purple-400 to-pink-400 rounded-3xl opacity-10 blur-3xl" />
              <div className="relative bg-gradient-to-br from-rose-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-3xl p-10 flex flex-col items-center text-center border border-rose-100 dark:border-slate-600 shadow-xl">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-rose-400 via-pink-400 to-purple-500 flex items-center justify-center text-6xl mb-5 shadow-lg">
                  {about.avatar}
                </div>
                <blockquote className="text-lg font-semibold italic text-gray-700 dark:text-gray-300 leading-relaxed">
                  &ldquo;{about.quote}&rdquo;
                </blockquote>
                <div className="mt-5 flex flex-col items-center gap-1">
                  <span className="font-black text-gray-900 dark:text-white text-base">{about.founderName}</span>
                  <span className="text-sm text-rose-500 dark:text-rose-400 font-medium">{about.founderTitle}</span>
                </div>
                <div className="mt-6 flex gap-3 flex-wrap justify-center">
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
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 rounded-full text-sm font-bold text-rose-600 dark:text-rose-400 mb-5">
                {about.badge}
              </span>
              <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight text-gray-900 dark:text-white">
                {about.headline}{' '}
                <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                  {about.headlineHighlight}
                </span>
              </h2>
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-lg text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
                  {p}
                </p>
              ))}
              <div className="space-y-4 mt-3">
                {about.values.map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Courses Section — configurabile via features.featuredCourses */}
      {features.featuredCourses && (
        <section id="featured-courses" className="container mx-auto px-4 py-20 scroll-smooth">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-sm font-bold text-blue-600 dark:text-blue-400 mb-4">
              ⭐ I NOSTRI BESTSELLER
            </span>
            <h2 className="text-4xl font-bold mb-4">Corsi in Evidenza</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              I corsi più apprezzati dai nostri studenti, con certificazioni riconosciute e alta soddisfazione
            </p>
          </div>

          <ProductGrid products={products} />

          {/* Pulsante "Visualizza tutti" — configurabile via features.viewAllCourses */}
          {features.viewAllCourses && (
            <div className="text-center mt-16">
              <a
                href="/courses"
                className="inline-block px-8 py-4 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
              >
                Visualizza tutti i corsi →
              </a>
            </div>
          )}
        </section>
      )}

      {/* La nostra missione */}
      {mission?.enabled && (
        <section className="container mx-auto px-4 pb-20">
          <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 rounded-3xl p-10 sm:p-14 border border-purple-100 dark:border-slate-700">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-white dark:bg-slate-700 rounded-full text-sm font-bold text-purple-600 dark:text-purple-400 mb-5 shadow-sm">
                {mission.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                {mission.headline}{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {mission.headlineHighlight}
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
                {mission.text}
              </p>
              <div className="grid sm:grid-cols-3 gap-6 text-center">
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
        </section>
      )}

      {/* CTA / Newsletter — configurabile via features.newsletter */}
      {features.newsletter && <section className="container mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 sm:p-16 text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-3xl sm:text-4xl font-bold mb-6">Inizia il tuo percorso di crescita!</h3>
            <p className="text-lg text-white/90 mb-8">
              Iscriviti alla nostra community e ricevi uno sconto esclusivo del 15% + accesso ai webinar gratuiti e risorse premium
            </p>
            <div className="flex gap-3 flex-col sm:flex-row">
              <input
                type="email"
                placeholder="La tua email"
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
                Iscriviti
              </button>
            </div>
          </div>
        </div>
      </section>}
    </div>
  );
}

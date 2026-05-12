import ProductGrid from "@/components/ProductGrid";
import { getSiteConfig, getProducts } from "@/lib/config";

export default async function Home() {
  const siteConfig = await getSiteConfig();
  const products = await getProducts();

  const courses = [
    { name: 'Sviluppo Cognitivo', icon: '🧠', color: 'from-purple-500 to-pink-500', description: 'Potenzia le tue capacità mentali' },
    { name: 'Educazione Interattiva', icon: '🎮', color: 'from-blue-500 to-cyan-500', description: 'Impara divertendoti' },
  ];

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

      {/* Featured Courses Section */}
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

        {/* View All Button */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors">
            Visualizza tutti i corsi →
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
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
      </section>
    </div>
  );
}
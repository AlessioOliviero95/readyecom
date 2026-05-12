import { getSiteConfig, getProducts } from '@/lib/config';
import CoursesView from '@/components/CoursesView';

export const metadata = {
  title: 'Tutti i Corsi | ReadyEcom',
  description: 'Esplora il catalogo completo dei nostri corsi. Filtra per livello, prezzo e valutazione.',
};

export default async function CoursesPage() {
  const [products, siteConfig] = await Promise.all([getProducts(), getSiteConfig()]);
  const about = siteConfig.about;

  const totalStudents = products.reduce((s, p) => s + (p.studentsCount ?? 0), 0);
  const avgRating = products.length
    ? (products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="relative container mx-auto px-4 py-16 sm:py-20 text-white">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-5">
              📚 Catalogo completo
            </span>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Tutti i nostri corsi
            </h1>
            <p className="text-lg text-white/85 leading-relaxed">
              {about?.enabled
                ? `Corsi creati da ${about.founderTitle ?? 'una mamma'} per aiutarti a crescere — al tuo ritmo, con metodi che funzionano davvero.`
                : 'Corsi innovativi e interattivi basati su metodologie scientifiche provate.'}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10 max-w-md">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-2xl font-black">{products.length}+</p>
              <p className="text-xs text-white/75 mt-0.5">Corsi</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-2xl font-black">{totalStudents.toLocaleString('it-IT')}</p>
              <p className="text-xs text-white/75 mt-0.5">Studenti</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-2xl font-black">⭐ {avgRating}</p>
              <p className="text-xs text-white/75 mt-0.5">Valutazione</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses grid + filters */}
      <section className="container mx-auto px-4 py-12">
        <CoursesView products={products} />
      </section>

      {/* About strip — configurabile via site.json about.enabled */}
      {about?.enabled && (
        <section className="container mx-auto px-4 pb-16">
          <div className="bg-gradient-to-r from-rose-50 to-purple-50 dark:from-slate-800 dark:to-slate-800 border border-rose-100 dark:border-slate-700 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="text-5xl shrink-0">{about.avatar}</div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-black text-gray-900 dark:text-white text-lg">{about.founderName}</p>
              <p className="text-rose-500 dark:text-rose-400 font-medium text-sm mb-2">{about.founderTitle}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic">&ldquo;{about.quote}&rdquo;</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

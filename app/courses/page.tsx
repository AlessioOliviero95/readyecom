import { getSiteConfig, getProducts } from '@/lib/config';
import CoursesView from '@/components/CoursesView';
import PageContainer from '@/components/PageContainer';

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
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 rounded-full -mr-32 sm:-mr-48 -mt-32 sm:-mt-48 blur-3xl" />

        <PageContainer className="relative py-12 sm:py-16 lg:py-20 text-white">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold mb-4">
              📚 Catalogo completo
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 leading-tight">
              Tutti i nostri corsi
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-white/85 leading-relaxed">
              {about?.enabled
                ? `Corsi creati da ${about.founderTitle ?? 'una mamma'} per aiutarti a crescere — al tuo ritmo, con metodi che funzionano davvero.`
                : 'Corsi innovativi e interattivi basati su metodologie scientifiche provate.'}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-8 max-w-xs sm:max-w-md">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
              <p className="text-xl sm:text-2xl font-black">{products.length}+</p>
              <p className="text-xs text-white/75 mt-0.5">Corsi</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
              <p className="text-xl sm:text-2xl font-black">{totalStudents.toLocaleString('it-IT')}</p>
              <p className="text-xs text-white/75 mt-0.5">Studenti</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
              <p className="text-xl sm:text-2xl font-black">⭐ {avgRating}</p>
              <p className="text-xs text-white/75 mt-0.5">Valutazione</p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Courses grid + filters */}
      <PageContainer as="section" className="py-8 sm:py-12">
        <CoursesView products={products} />
      </PageContainer>

      {/* About strip */}
      {about?.enabled && (
        <PageContainer as="section" className="pb-12 sm:pb-16">
          <div className="bg-gradient-to-r from-rose-50 to-purple-50 dark:from-slate-800 dark:to-slate-800 border border-rose-100 dark:border-slate-700 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5">
            <div className="text-4xl sm:text-5xl shrink-0">{about.avatar}</div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-black text-gray-900 dark:text-white">{about.founderName}</p>
              <p className="text-rose-500 dark:text-rose-400 font-medium text-sm mb-2">{about.founderTitle}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic">&ldquo;{about.quote}&rdquo;</p>
            </div>
          </div>
        </PageContainer>
      )}
    </div>
  );
}

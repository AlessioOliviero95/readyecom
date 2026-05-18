import ProductGrid from "@/components/ProductGrid";
import { getSiteConfig, getProducts } from "@/lib/config";
import PageContainer from "@/components/PageContainer";

export default async function Home() {
  const siteConfig = await getSiteConfig();
  const products = await getProducts();
  const { features, about, mission, hero, featuredCourses, newsletter, whatsapp } = siteConfig;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900">

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-(--brand-gradient-from)/10 via-(--brand-gradient-to)/5 to-transparent dark:from-(--brand-gradient-from)/20 dark:via-(--brand-gradient-to)/10" />

        <PageContainer className="py-14 sm:py-20 lg:py-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left */}
            <div>
              {/* Badge */}
              <a
                href={hero?.badgeHref ?? '#featured-courses'}
                className="badge-brand inline-flex mb-5 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-(--brand-primary) opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-(--brand-primary)" />
                </span>
                {hero?.badge ?? 'Nuovi corsi disponibili'}
              </a>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 leading-tight">
                <span className="text-brand">
                  {hero?.headline ?? 'Sviluppa le tue'}{' '}
                </span>
                <span className="text-gray-900 dark:text-white">
                  {hero?.headlineHighlight ?? 'capacità cognitive'}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-7 max-w-xl leading-relaxed">
                {hero?.subheadline ?? 'Impara da esperti e trasforma il tuo modo di pensare con corsi innovativi, interattivi e basati su metodologie scientifiche provate.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={hero?.primaryCta.href ?? '#featured-courses'}
                  className="btn-brand px-7 py-3.5"
                >
                  <span>{hero?.primaryCta.label ?? 'Esplora i corsi'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                {hero?.secondaryCta.type === 'whatsapp' ? (
                  <a
                    href={`https://wa.me/${whatsapp?.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-7 py-3.5 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white font-bold rounded-(--brand-radius) hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    {hero?.secondaryCta.label ?? 'Contattaci'}
                  </a>
                ) : (
                  <a
                    href={hero?.secondaryCta.href ?? '/contatti'}
                    className="inline-flex items-center justify-center px-7 py-3.5 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white font-bold rounded-(--brand-radius) hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    {hero?.secondaryCta.label ?? 'Contattaci'}
                  </a>
                )}
              </div>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-6">
                {(hero?.stats ?? []).map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl sm:text-3xl font-black text-(--brand-primary) mb-0.5">
                      {stat.type === 'count'
                        ? `${products.length}${stat.suffix ?? ''}`
                        : stat.value}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right illustration */}
            <div className="relative h-72 lg:h-96 hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-(--brand-gradient-from) via-(--brand-secondary) to-(--brand-accent) rounded-3xl opacity-10 blur-3xl" />
              <div className="relative h-full flex items-center justify-center text-7xl lg:text-8xl">
                {hero?.illustration ?? '🧠'}
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ── CHI SIAMO ───────────────────────────────────────────────────── */}
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

      {/* ── CORSI IN EVIDENZA ───────────────────────────────────────────── */}
      {features.featuredCourses && (
        <PageContainer as="section" id="featured-courses" className="py-14 sm:py-20 scroll-mt-20">
          <div className="text-center mb-10 sm:mb-14">
            <span className="badge-brand mb-3 inline-flex">
              {featuredCourses?.badge ?? '⭐ I NOSTRI BESTSELLER'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
              {featuredCourses?.title ?? 'Corsi in Evidenza'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
              {featuredCourses?.subtitle ?? 'I corsi più apprezzati dai nostri studenti'}
            </p>
          </div>

          <ProductGrid products={products} />

          {features.viewAllCourses && (
            <div className="text-center mt-10 sm:mt-14">
              <a
                href="/courses"
                className="inline-block px-8 py-4 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white font-bold rounded-(--brand-radius) hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
              >
                {featuredCourses?.viewAllLabel ?? 'Visualizza tutti i corsi →'}
              </a>
            </div>
          )}
        </PageContainer>
      )}

      {/* ── MISSIONE ────────────────────────────────────────────────────── */}
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

      {/* ── NEWSLETTER ──────────────────────────────────────────────────── */}
      {features.newsletter && newsletter && (
        <PageContainer as="section" className="py-14 sm:py-20">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-900 dark:bg-slate-950">
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-(--brand-gradient-from)/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-(--brand-gradient-to)/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-(--brand-accent)/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-16 p-7 sm:p-10 lg:p-14 items-center">

              {/* Sinistra: copy + benefici */}
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-(--brand-primary)/20 border border-(--brand-primary)/30 text-blue-400 text-xs font-bold mb-5 uppercase tracking-wider">
                  {newsletter.badge}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                  {newsletter.headline}{' '}
                  <span className="text-brand">{newsletter.headlineHighlight}</span>
                </h2>
                <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed">
                  {newsletter.subheadline}
                </p>

                <ul className="space-y-3">
                  {newsletter.benefits.map((item) => (
                    <li key={item.text} className="flex items-center gap-3 text-slate-300 text-sm">
                      <span className="text-lg shrink-0">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Destra: form card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                <p className="text-white font-black text-xl mb-0.5">{newsletter.formTitle}</p>
                <p className="text-slate-400 text-sm mb-5">{newsletter.formSubtitle}</p>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Il tuo nome"
                    className="w-full px-4 py-3 rounded-(--brand-radius) bg-white/10 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-(--brand-primary) text-sm transition-all"
                  />
                  <input
                    type="email"
                    placeholder="La tua email"
                    className="w-full px-4 py-3 rounded-(--brand-radius) bg-white/10 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-(--brand-primary) text-sm transition-all"
                  />
                  <button className="btn-brand w-full py-3.5 text-sm">
                    {newsletter.cta}
                  </button>
                </div>

                {/* Social proof */}
                <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-3">
                  <div className="flex -space-x-2 shrink-0">
                    {newsletter.socialProofAvatars.map((a, i) => (
                      <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-(--brand-gradient-from) to-(--brand-gradient-to) flex items-center justify-center text-xs border-2 border-slate-900">
                        {a}
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-400 text-xs">
                    <span className="text-white font-bold">{newsletter.subscribersCount}</span> studenti già iscritti
                  </p>
                </div>

                <p className="text-slate-600 text-xs mt-3 text-center">
                  {newsletter.privacyText}
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
      )}
    </div>
  );
}

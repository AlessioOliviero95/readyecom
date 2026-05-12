'use client'

import { useConfig, useFeatureFlag } from '@/lib/useConfig'

export default function Home() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || 'cliente-demo'
  const { config, loading, error } = useConfig(clientId)

  const showHero = useFeatureFlag(config, 'showHeroBanner')
  const showCourses = useFeatureFlag(config, 'showCourses')
  const showNewsletter = useFeatureFlag(config, 'showNewsletter')

  if (loading) return <div style={{ padding: '40px', fontFamily: 'serif' }}>Caricamento...</div>
  if (error) return <div style={{ padding: '40px', color: 'red' }}>Errore: {error}</div>

  return (
    <main style={{
      background: config.theme.backgroundColor,
      minHeight: '100vh',
      color: config.theme.textColor,
      fontFamily: 'serif',
      padding: '60px 40px'
    }}>
      <h1 style={{ color: config.theme.primaryColor, fontSize: '48px', letterSpacing: '6px', textAlign: 'center' }}>
        {config.brand.logo} {config.brand.name}
      </h1>

      {showHero && (
        <div style={{ textAlign: 'center', margin: '60px 0', opacity: 0.8 }}>
          ✅ Hero Banner — visibile
        </div>
      )}

      {showCourses && (
        <div style={{ textAlign: 'center', margin: '40px 0', opacity: 0.8 }}>
          ✅ Sezione Corsi — visibile
        </div>
      )}

      {!showCourses && (
        <div style={{ textAlign: 'center', margin: '40px 0', opacity: 0.3 }}>
          ⛔ Sezione Corsi — nascosta (flag OFF)
        </div>
      )}

      {showNewsletter && (
        <div style={{ textAlign: 'center', margin: '40px 0', opacity: 0.8 }}>
          ✅ Newsletter — visibile
        </div>
      )}
    </main>
  )
}
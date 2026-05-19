import Link from 'next/link';
import { getConfigMeta } from '@/lib/db';
import { writeConfig } from '@/lib/db';
import { fetchConfig } from '@/lib/db';

const SECTIONS = [
  { key: 'site', label: 'Configurazione Sito', href: '/site', icon: '⚙️', desc: 'Tema, colori, hero, newsletter, feature' },
  { key: 'navigation', label: 'Navigazione', href: '/navigation', icon: '🧭', desc: 'Menu, footer, social links' },
  { key: 'products', label: 'Prodotti', href: '/products', icon: '📦', desc: 'Catalogo corsi e prodotti' },
];

async function initFromStorefront() {
  'use server';
  // Seeds configs from the storefront's JSON files by reading them server-side
  const fs = await import('fs');
  const path = await import('path');
  const configDir = path.join(process.cwd(), '..', 'config');
  const site = JSON.parse(fs.readFileSync(path.join(configDir, 'site.json'), 'utf8'));
  const navigation = JSON.parse(fs.readFileSync(path.join(configDir, 'navigation.json'), 'utf8'));
  const products = JSON.parse(fs.readFileSync(path.join(configDir, 'products.json'), 'utf8'));
  await writeConfig('site', site);
  await writeConfig('navigation', navigation);
  await writeConfig('products', products);
}

const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function DashboardPage() {
  const meta = isConfigured ? await getConfigMeta() : [];
  const hasData = meta.length > 0;

  function lastUpdated(key: string) {
    const entry = meta.find(m => m.key === key);
    if (!entry) return null;
    return new Date(entry.updated_at).toLocaleString('it-IT');
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Gestisci la configurazione del tuo sito ReadyEcom</p>
      </div>

      {/* Supabase status */}
      <div className={`mb-6 p-4 rounded-xl border text-sm ${isConfigured
        ? 'bg-green-50 border-green-200 text-green-800'
        : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
        {isConfigured
          ? '✅ Supabase configurato — le modifiche vengono salvate nel database.'
          : '⚠️ Supabase non configurato — crea admin/.env.local con NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY.'}
      </div>

      {/* Init from JSON */}
      {isConfigured && !hasData && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
          <p className="font-bold mb-2">📂 Database vuoto</p>
          <p className="mb-3">Inizializza con i valori attuali dei file JSON del progetto readyecom.</p>
          <form action={initFromStorefront}>
            <button type="submit" className="btn-primary text-sm px-4 py-2">
              Importa da file JSON
            </button>
          </form>
        </div>
      )}

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map(s => (
          <Link key={s.key} href={s.href}
            className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{s.icon}</span>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 mt-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h2 className="font-bold text-gray-900 mb-1">{s.label}</h2>
            <p className="text-xs text-gray-400 mb-3">{s.desc}</p>
            {lastUpdated(s.key)
              ? <p className="text-xs text-green-600">Aggiornato: {lastUpdated(s.key)}</p>
              : <p className="text-xs text-gray-400">Non ancora sincronizzato</p>}
          </Link>
        ))}
      </div>

      {/* SQL Setup */}
      {isConfigured && (
        <details className="mt-8 p-5 bg-gray-100 rounded-2xl">
          <summary className="font-semibold text-sm cursor-pointer text-gray-700">🗄️ SQL Setup (esegui una sola volta in Supabase)</summary>
          <pre className="mt-4 text-xs bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto leading-relaxed">{`CREATE TABLE IF NOT EXISTS app_configs (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE app_configs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON app_configs FOR SELECT USING (true);
CREATE POLICY "Auth write" ON app_configs FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');`}</pre>
        </details>
      )}
    </div>
  );
}

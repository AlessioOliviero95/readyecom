import { fetchConfig } from '@/lib/db';
import type { SiteConfig } from '@/lib/types';
import SiteConfigForm from './SiteConfigForm';

export default async function SitePage() {
  const config = await fetchConfig<SiteConfig>('site');
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">⚙️ Configurazione Sito</h1>
        <p className="text-gray-500 text-sm mt-1">Tema, hero, newsletter, feature flags, WhatsApp, footer</p>
      </div>
      {config
        ? <SiteConfigForm initialConfig={config} />
        : <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
            Nessuna configurazione trovata. Dalla Dashboard, clicca &ldquo;Importa da file JSON&rdquo; per inizializzare.
          </div>}
    </div>
  );
}

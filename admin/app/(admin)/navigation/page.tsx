import { fetchConfig } from '@/lib/db';
import type { NavigationConfig } from '@/lib/types';
import NavigationForm from './NavigationForm';

export default async function NavigationPage() {
  const config = await fetchConfig<NavigationConfig>('navigation');
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">🧭 Navigazione</h1>
        <p className="text-gray-500 text-sm mt-1">Menu principale, footer links, social links, brand</p>
      </div>
      {config
        ? <NavigationForm initialConfig={config} />
        : <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
            Nessuna configurazione. Dalla Dashboard, inizializza prima i dati.
          </div>}
    </div>
  );
}

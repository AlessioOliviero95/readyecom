'use client';

import { useState, useTransition } from 'react';
import { saveNavigationConfig } from '../actions';
import type { NavigationConfig } from '@/lib/types';

const inp = 'w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      {children}
    </div>
  );
}

function Card({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <div className="relative p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
      {children}
      <button onClick={onRemove} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-sm px-2 py-0.5 rounded">✕</button>
    </div>
  );
}

export default function NavigationForm({ initialConfig }: { initialConfig: NavigationConfig }) {
  const [cfg, setCfg] = useState<NavigationConfig>(initialConfig);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const setBrand = (f: keyof NavigationConfig['brand'], v: string) =>
    setCfg(p => ({ ...p, brand: { ...p.brand, [f]: v } }));

  const updMain = (i: number, f: string, v: string) =>
    setCfg(p => { const m = [...p.main]; m[i] = { ...m[i], [f]: v }; return { ...p, main: m }; });
  const rmMain = (i: number) => setCfg(p => ({ ...p, main: p.main.filter((_, j) => j !== i) }));
  const addMain = () => setCfg(p => ({ ...p, main: [...p.main, { label: 'Nuovo', href: '/' }] }));

  const updFooter = (i: number, f: 'label' | 'href', v: string) =>
    setCfg(p => { const ft = [...p.footer]; ft[i] = { ...ft[i], [f]: v }; return { ...p, footer: ft }; });
  const rmFooter = (i: number) => setCfg(p => ({ ...p, footer: p.footer.filter((_, j) => j !== i) }));
  const addFooter = () => setCfg(p => ({ ...p, footer: [...p.footer, { label: 'Nuovo', href: '/' }] }));

  const updSocial = (i: number, f: 'platform' | 'url' | 'icon', v: string) =>
    setCfg(p => { const sc = [...p.social]; sc[i] = { ...sc[i], [f]: v }; return { ...p, social: sc }; });
  const rmSocial = (i: number) => setCfg(p => ({ ...p, social: p.social.filter((_, j) => j !== i) }));
  const addSocial = () => setCfg(p => ({ ...p, social: [...p.social, { platform: 'instagram', url: 'https://', icon: '📷' }] }));

  function handleSave() {
    startTransition(async () => {
      try { await saveNavigationConfig(cfg); setSaved(true); setTimeout(() => setSaved(false), 3000); setError(''); }
      catch (e) { setError(String(e)); }
    });
  }

  return (
    <div className="space-y-6">
      {/* Brand */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Brand</h2>
        <div className="grid grid-cols-3 gap-4">
          <F label="Nome"><input value={cfg.brand.name} onChange={e => setBrand('name', e.target.value)} className={inp} /></F>
          <F label="Logo (emoji/URL)"><input value={cfg.brand.logo} onChange={e => setBrand('logo', e.target.value)} className={inp} /></F>
          <F label="Link"><input value={cfg.brand.href} onChange={e => setBrand('href', e.target.value)} className={inp} /></F>
        </div>
      </section>

      {/* Main nav */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Menu principale</h2>
          <button onClick={addMain} className="text-sm text-blue-600 hover:text-blue-700 font-medium">+ Aggiungi voce</button>
        </div>
        <div className="space-y-3">
          {cfg.main.map((item, i) => (
            <Card key={i} onRemove={() => rmMain(i)}>
              <div className="grid grid-cols-3 gap-3 pr-8">
                <F label="Label"><input value={item.label} onChange={e => updMain(i, 'label', e.target.value)} className={inp} /></F>
                <F label="Link"><input value={item.href} onChange={e => updMain(i, 'href', e.target.value)} className={inp} /></F>
                <F label="Badge"><input value={item.badge ?? ''} onChange={e => updMain(i, 'badge', e.target.value)} className={inp} /></F>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Link footer</h2>
          <button onClick={addFooter} className="text-sm text-blue-600 hover:text-blue-700 font-medium">+ Aggiungi</button>
        </div>
        <div className="space-y-3">
          {cfg.footer.map((item, i) => (
            <Card key={i} onRemove={() => rmFooter(i)}>
              <div className="grid grid-cols-2 gap-3 pr-8">
                <F label="Label"><input value={item.label} onChange={e => updFooter(i, 'label', e.target.value)} className={inp} /></F>
                <F label="Link"><input value={item.href} onChange={e => updFooter(i, 'href', e.target.value)} className={inp} /></F>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Social */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Social</h2>
          <button onClick={addSocial} className="text-sm text-blue-600 hover:text-blue-700 font-medium">+ Aggiungi</button>
        </div>
        <div className="space-y-3">
          {cfg.social.map((item, i) => (
            <Card key={i} onRemove={() => rmSocial(i)}>
              <div className="grid grid-cols-3 gap-3 pr-8">
                <F label="Platform"><input value={item.platform} onChange={e => updSocial(i, 'platform', e.target.value)} className={inp} /></F>
                <F label="URL"><input value={item.url} onChange={e => updSocial(i, 'url', e.target.value)} className={inp} /></F>
                <F label="Icona"><input value={item.icon} onChange={e => updSocial(i, 'icon', e.target.value)} className={inp} /></F>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-4">
        <button onClick={handleSave} disabled={isPending} className="btn-primary text-sm disabled:opacity-50">
          {isPending ? '⏳ Salvataggio...' : '💾 Salva navigazione'}
        </button>
        {saved && <span className="text-green-600 text-sm font-medium">✓ Salvato</span>}
        {error && <span className="text-red-600 text-sm">{error}</span>}
      </div>
    </div>
  );
}

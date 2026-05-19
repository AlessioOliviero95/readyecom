'use client';

import { useState, useTransition } from 'react';
import { saveSiteConfig } from '../actions';
import type { SiteConfig } from '@/lib/types';

const TABS = ['Generale', 'Tema', 'Feature', 'Hero', 'WhatsApp & Business', 'Footer', 'Sezioni avanzate'];
const inp = 'w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';
const ta = `${inp} font-mono text-xs leading-relaxed resize-y`;

function F({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-10 h-9 rounded cursor-pointer border border-gray-300" />
        <input type="text" value={value} onChange={e => onChange(e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono" />
      </div>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between py-2.5 cursor-pointer">
      <span className="text-sm text-gray-700">{label}</span>
      <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
      </button>
    </label>
  );
}

export default function SiteConfigForm({ initialConfig }: { initialConfig: SiteConfig }) {
  const [c, setC] = useState<SiteConfig>(initialConfig);
  const [tab, setTab] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const s = (field: keyof SiteConfig['site'], v: string) =>
    setC(p => ({ ...p, site: { ...p.site, [field]: v } }));
  const col = (field: string, v: string) =>
    setC(p => ({ ...p, theme: { ...p.theme, colors: { ...p.theme.colors, [field]: v } } }));
  const grad = (field: 'from' | 'to', v: string) =>
    setC(p => ({ ...p, theme: { ...p.theme, colors: { ...p.theme.colors, gradient: { ...p.theme.colors.gradient, [field]: v } } } }));
  const shp = (field: string, v: string) =>
    setC(p => ({ ...p, theme: { ...p.theme, shape: { ...p.theme.shape, [field]: v } } }));
  const feat = (field: keyof SiteConfig['features'], v: boolean) =>
    setC(p => ({ ...p, features: { ...p.features, [field]: v } }));
  const hero = (field: string, v: unknown) =>
    setC(p => ({ ...p, hero: { ...p.hero!, [field]: v } as SiteConfig['hero'] }));
  const wa = (field: string, v: unknown) =>
    setC(p => ({ ...p, whatsapp: { ...p.whatsapp!, [field]: v } as SiteConfig['whatsapp'] }));
  const biz = (field: string, v: unknown) =>
    setC(p => ({ ...p, business: { ...p.business!, [field]: v } as SiteConfig['business'] }));
  const foot = (field: string, v: unknown) =>
    setC(p => ({ ...p, footer: { ...p.footer!, [field]: v } as SiteConfig['footer'] }));

  function handleSave() {
    startTransition(async () => {
      try { await saveSiteConfig(c); setSaved(true); setTimeout(() => setSaved(false), 3000); setError(''); }
      catch (e) { setError(String(e)); }
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors ${tab === i ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-5">
        {/* Generale */}
        {tab === 0 && <>
          <F label="Nome sito"><input value={c.site.name} onChange={e => s('name', e.target.value)} className={inp} /></F>
          <F label="Tagline"><input value={c.site.tagline ?? ''} onChange={e => s('tagline', e.target.value)} className={inp} /></F>
          <F label="Descrizione"><textarea value={c.site.description} onChange={e => s('description', e.target.value)} rows={3} className={ta} /></F>
          <F label="URL sito"><input value={c.site.url ?? ''} onChange={e => s('url', e.target.value)} className={inp} /></F>
          <F label="Logo (emoji o URL)"><input value={c.site.logo} onChange={e => s('logo', e.target.value)} className={inp} /></F>
          <F label="Locale" hint="es. it, en"><input value={c.site.locale ?? 'it'} onChange={e => s('locale', e.target.value)} className={inp} /></F>
        </>}

        {/* Tema */}
        {tab === 1 && <>
          <div className="grid grid-cols-2 gap-4">
            <ColorField label="Primary" value={c.theme.colors.primary} onChange={v => col('primary', v)} />
            <ColorField label="Primary Dark" value={c.theme.colors.primaryDark} onChange={v => col('primaryDark', v)} />
            <ColorField label="Secondary" value={c.theme.colors.secondary} onChange={v => col('secondary', v)} />
            <ColorField label="Secondary Dark" value={c.theme.colors.secondaryDark} onChange={v => col('secondaryDark', v)} />
            <ColorField label="Accent" value={c.theme.colors.accent} onChange={v => col('accent', v)} />
            <ColorField label="Success" value={c.theme.colors.success} onChange={v => col('success', v)} />
            <ColorField label="Warning" value={c.theme.colors.warning} onChange={v => col('warning', v)} />
            <ColorField label="Danger" value={c.theme.colors.danger} onChange={v => col('danger', v)} />
            <ColorField label="Gradiente Da" value={c.theme.colors.gradient.from} onChange={v => grad('from', v)} />
            <ColorField label="Gradiente A" value={c.theme.colors.gradient.to} onChange={v => grad('to', v)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Anteprima gradiente</label>
            <div className="h-10 rounded-lg" style={{ background: `linear-gradient(to right, ${c.theme.colors.gradient.from}, ${c.theme.colors.gradient.to})` }} />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            {(['radiusSm', 'radius', 'radiusLg', 'radiusXl', 'radiusFull'] as const).map(k => (
              <F key={k} label={k} hint="es. 0.75rem, 9999px">
                <input value={c.theme.shape[k]} onChange={e => shp(k, e.target.value)} className={inp} />
              </F>
            ))}
          </div>
        </>}

        {/* Feature */}
        {tab === 2 && (
          <div className="divide-y divide-gray-100">
            <Toggle label="Dark Mode" checked={c.features.darkMode} onChange={v => feat('darkMode', v)} />
            <Toggle label="Carrello" checked={c.features.cart} onChange={v => feat('cart', v)} />
            <Toggle label="Wishlist" checked={c.features.wishlist} onChange={v => feat('wishlist', v)} />
            <Toggle label="Ricerca" checked={c.features.search} onChange={v => feat('search', v)} />
            <Toggle label="Categorie" checked={c.features.categories} onChange={v => feat('categories', v)} />
            <Toggle label="Newsletter" checked={c.features.newsletter} onChange={v => feat('newsletter', v)} />
            <Toggle label="Corsi in evidenza (homepage)" checked={c.features.featuredCourses} onChange={v => feat('featuredCourses', v)} />
            <Toggle label="Bottone Visualizza tutti" checked={c.features.viewAllCourses} onChange={v => feat('viewAllCourses', v)} />
          </div>
        )}

        {/* Hero */}
        {tab === 3 && <>
          <F label="Badge"><input value={c.hero?.badge ?? ''} onChange={e => hero('badge', e.target.value)} className={inp} /></F>
          <F label="Badge link"><input value={c.hero?.badgeHref ?? ''} onChange={e => hero('badgeHref', e.target.value)} className={inp} /></F>
          <F label="Headline (testo normale)"><input value={c.hero?.headline ?? ''} onChange={e => hero('headline', e.target.value)} className={inp} /></F>
          <F label="Headline highlight"><input value={c.hero?.headlineHighlight ?? ''} onChange={e => hero('headlineHighlight', e.target.value)} className={inp} /></F>
          <F label="Subheadline"><textarea value={c.hero?.subheadline ?? ''} onChange={e => hero('subheadline', e.target.value)} rows={3} className={ta} /></F>
          <div className="grid grid-cols-2 gap-4">
            <F label="CTA primario label"><input value={c.hero?.primaryCta.label ?? ''} onChange={e => hero('primaryCta', { ...c.hero?.primaryCta, label: e.target.value })} className={inp} /></F>
            <F label="CTA primario link"><input value={c.hero?.primaryCta.href ?? ''} onChange={e => hero('primaryCta', { ...c.hero?.primaryCta, href: e.target.value })} className={inp} /></F>
            <F label="CTA secondario label"><input value={c.hero?.secondaryCta.label ?? ''} onChange={e => hero('secondaryCta', { ...c.hero?.secondaryCta, label: e.target.value })} className={inp} /></F>
            <F label="CTA secondario tipo">
              <select value={c.hero?.secondaryCta.type ?? 'whatsapp'} onChange={e => hero('secondaryCta', { ...c.hero?.secondaryCta, type: e.target.value })} className={inp}>
                <option value="whatsapp">WhatsApp</option>
                <option value="link">Link</option>
              </select>
            </F>
          </div>
          <F label="Illustrazione (emoji)"><input value={c.hero?.illustration ?? ''} onChange={e => hero('illustration', e.target.value)} className={inp} /></F>
          <F label="Stats (JSON)" hint='Array: [{type:"count"|"static", value?, suffix?, label}]'>
            <textarea value={JSON.stringify(c.hero?.stats ?? [], null, 2)}
              onChange={e => { try { hero('stats', JSON.parse(e.target.value)); } catch {} }}
              rows={8} className={ta} />
          </F>
        </>}

        {/* WhatsApp & Business */}
        {tab === 4 && <>
          <div className="p-4 bg-gray-50 rounded-xl space-y-4">
            <p className="font-semibold text-sm">WhatsApp</p>
            <Toggle label="WhatsApp attivo" checked={c.whatsapp?.enabled ?? false} onChange={v => wa('enabled', v)} />
            <F label="Telefono" hint="es. 393331234567"><input value={c.whatsapp?.phone ?? ''} onChange={e => wa('phone', e.target.value)} className={inp} /></F>
            <F label="Messaggio predefinito"><input value={c.whatsapp?.message ?? ''} onChange={e => wa('message', e.target.value)} className={inp} /></F>
            <F label="Tooltip"><input value={c.whatsapp?.tooltip ?? ''} onChange={e => wa('tooltip', e.target.value)} className={inp} /></F>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl space-y-4">
            <p className="font-semibold text-sm">Business</p>
            <F label="Simbolo valuta"><input value={c.business?.currencySymbol ?? '€'} onChange={e => biz('currencySymbol', e.target.value)} className={inp} /></F>
            <F label="Giorni rimborso"><input type="number" value={c.business?.refundDays ?? 30} onChange={e => biz('refundDays', Number(e.target.value))} className={inp} /></F>
            <Toggle label="Spedizione gratuita" checked={c.business?.freeShipping ?? true} onChange={v => biz('freeShipping', v)} />
          </div>
        </>}

        {/* Footer */}
        {tab === 5 && <>
          <F label="Testo copyright" hint="Appare dopo © Anno NomeSito">
            <input value={c.footer?.copyrightText ?? ''} onChange={e => foot('copyrightText', e.target.value)} className={inp} />
          </F>
          <F label="Badge footer (uno per riga)">
            <textarea value={(c.footer?.badges ?? []).join('\n')}
              onChange={e => foot('badges', e.target.value.split('\n').filter(Boolean))}
              rows={4} className={ta} />
          </F>
        </>}

        {/* Sezioni avanzate */}
        {tab === 6 && (
          <div className="space-y-6">
            <p className="text-sm text-gray-500">Modifica in JSON le sezioni complesse.</p>
            {(['featuredCourses', 'newsletter', 'about', 'mission'] as const).map(key => (
              <div key={key}>
                <p className="font-semibold text-sm text-gray-900 mb-2 capitalize">{key}</p>
                <textarea value={JSON.stringify(c[key] ?? {}, null, 2)}
                  onChange={e => { try { setC(p => ({ ...p, [key]: JSON.parse(e.target.value) })); } catch {} }}
                  rows={10} className={ta} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save bar */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center gap-4">
        <button onClick={handleSave} disabled={isPending} className="btn-primary text-sm disabled:opacity-50">
          {isPending ? '⏳ Salvataggio...' : '💾 Salva configurazione'}
        </button>
        {saved && <span className="text-green-600 text-sm font-medium">✓ Salvato</span>}
        {error && <span className="text-red-600 text-sm">{error}</span>}
      </div>
    </div>
  );
}

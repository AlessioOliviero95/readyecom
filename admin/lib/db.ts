'use server';

import { createSupabaseAdminClient } from './supabase-admin';

export async function fetchConfig<T>(key: string): Promise<T | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const sk = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !sk) return null;
  try {
    const supabase = createSupabaseAdminClient();
    const { data } = await supabase.from('app_configs').select('value').eq('key', key).single();
    if (!data?.value) return null;
    const v = data.value;
    if (Array.isArray(v) && v.length === 0) return null;
    if (typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0) return null;
    return v as T;
  } catch {
    return null;
  }
}

export async function writeConfig(key: string, value: unknown): Promise<void> {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from('app_configs').upsert(
    { key, value, updated_at: new Date().toISOString() },
    { onConflict: 'key' }
  );
  if (error) throw new Error(error.message);

  // Notifica il sito e-commerce di rigenerare le pagine
  const storefrontUrl = process.env.STOREFRONT_URL ?? 'http://localhost:3000';
  const token = process.env.REVALIDATION_TOKEN;
  if (token) {
    try {
      const res = await fetch(`${storefrontUrl}/api/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) {
        const body = await res.text().catch(() => '');
        console.warn(`[db] Revalidazione storefront fallita (${res.status}):`, body);
      }
    } catch (e) {
      console.warn(`[db] Storefront non raggiungibile (${storefrontUrl}):`, (e as Error).message);
    }
  } else {
    console.warn('[db] REVALIDATION_TOKEN mancante — storefront non notificato');
  }
}

export async function getConfigMeta(): Promise<{ key: string; updated_at: string }[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const sk = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !sk) return [];
  try {
    const supabase = createSupabaseAdminClient();
    const { data } = await supabase
      .from('app_configs')
      .select('key, updated_at')
      .in('key', ['site', 'navigation', 'products']);
    return (data ?? []) as { key: string; updated_at: string }[];
  } catch {
    return [];
  }
}

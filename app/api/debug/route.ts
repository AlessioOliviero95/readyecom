import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const expected = process.env.REVALIDATION_TOKEN;

  if (!expected || token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const envCheck = {
    NEXT_PUBLIC_SUPABASE_URL: supabaseUrl ? '✓ presente' : '✗ MANCANTE',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: anonKey ? `✓ ${anonKey.slice(0, 20)}…` : '✗ MANCANTE',
    SUPABASE_SERVICE_ROLE_KEY: serviceKey ? `✓ ${serviceKey.slice(0, 20)}…` : '✗ MANCANTE',
    REVALIDATION_TOKEN: expected ? '✓ presente' : '✗ MANCANTE',
    STOREFRONT_URL: process.env.STOREFRONT_URL ?? '(non impostato, default localhost:3000)',
  };

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ env: envCheck, supabase: 'non configurato', configs: [] });
  }

  let supabaseStatus = '';
  let configs: { key: string; updated_at: string; size: number }[] = [];

  try {
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data, error } = await supabase
      .from('app_configs')
      .select('key, updated_at, value')
      .in('key', ['site', 'navigation', 'products']);

    if (error) {
      supabaseStatus = `✗ Errore: ${error.message} (code: ${error.code})`;
    } else {
      supabaseStatus = `✓ Connesso — ${data?.length ?? 0} righe trovate`;
      configs = (data ?? []).map(row => ({
        key: row.key,
        updated_at: row.updated_at,
        size: JSON.stringify(row.value).length,
      }));
    }
  } catch (e) {
    supabaseStatus = `✗ Eccezione: ${(e as Error).message}`;
  }

  return NextResponse.json(
    { env: envCheck, supabase: supabaseStatus, configs },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

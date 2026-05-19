'use client';

import { useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const configured = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!configured) return;
    setLoading(true);
    setError('');
    const supabase = createSupabaseBrowserClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError(err.message); setLoading(false); }
    else { router.push('/'); router.refresh(); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-4xl mb-3">🔐</p>
          <h1 className="text-2xl font-black text-white">ReadyEcom Admin</h1>
          <p className="text-slate-400 text-sm mt-1">Accedi con il tuo account</p>
        </div>

        {!configured && (
          <div className="mb-6 p-4 bg-amber-900/40 border border-amber-700 rounded-xl text-amber-300 text-sm space-y-2">
            <p className="font-bold">⚠️ Supabase non configurato</p>
            <p>Crea <code className="bg-amber-950/60 px-1 rounded">admin/.env.local</code>:</p>
            <pre className="text-xs bg-slate-900 p-3 rounded overflow-x-auto text-slate-300">{`NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...`}</pre>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={!configured}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required disabled={!configured}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50" />
          </div>
          {error && <p className="text-red-400 text-sm bg-red-900/30 border border-red-800 rounded-lg px-3 py-2">{error}</p>}
          <button type="submit" disabled={loading || !configured} className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Accesso...' : 'Accedi'}
          </button>
        </form>
        <p className="text-center text-slate-600 text-xs mt-6">
          Crea utenti in Supabase → Authentication → Users
        </p>
      </div>
    </div>
  );
}

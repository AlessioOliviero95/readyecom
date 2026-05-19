import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import LogoutButton from './LogoutButton';

const NAV = [
  { href: '/', label: 'Dashboard', icon: '🏠' },
  { href: '/site', label: 'Configurazione Sito', icon: '⚙️' },
  { href: '/navigation', label: 'Navigazione', icon: '🧭' },
  { href: '/products', label: 'Prodotti', icon: '📦' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 bg-slate-900 flex flex-col fixed inset-y-0 z-10">
        <div className="px-4 py-5 border-b border-slate-700">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Admin Panel</p>
          <p className="font-black text-white text-lg mt-0.5">ReadyEcom</p>
        </div>
        <nav className="flex-1 px-2 py-3 space-y-0.5">
          {NAV.map(item => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm font-medium">
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-2 py-3 border-t border-slate-700">
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 ml-56">{children}</main>
    </div>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <div className="text-7xl sm:text-8xl mb-6">🔍</div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-3">
          Pagina non trovata
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
          >
            Torna alla home
          </Link>
          <Link
            href="/courses"
            className="px-6 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
          >
            Vai ai corsi
          </Link>
        </div>
      </div>
    </div>
  );
}

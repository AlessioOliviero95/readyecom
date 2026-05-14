export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Skeleton nav bar */}
      <div className="h-16 bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero skeleton */}
        <div className="mb-12 space-y-4">
          <div className="h-5 w-32 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse" />
          <div className="h-10 w-3/4 bg-gray-200 dark:bg-slate-700 rounded-xl animate-pulse" />
          <div className="h-10 w-1/2 bg-gray-200 dark:bg-slate-700 rounded-xl animate-pulse" />
          <div className="h-5 w-2/3 bg-gray-100 dark:bg-slate-800 rounded-full animate-pulse" />
          <div className="flex gap-3 mt-2">
            <div className="h-12 w-40 bg-gray-200 dark:bg-slate-700 rounded-xl animate-pulse" />
            <div className="h-12 w-32 bg-gray-100 dark:bg-slate-800 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Cards grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700"
            >
              <div className="h-44 bg-gray-200 dark:bg-slate-700 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-24 bg-gray-100 dark:bg-slate-700 rounded-full animate-pulse" />
                <div className="h-6 w-4/5 bg-gray-200 dark:bg-slate-600 rounded-lg animate-pulse" />
                <div className="h-4 w-full bg-gray-100 dark:bg-slate-700 rounded-full animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-100 dark:bg-slate-700 rounded-full animate-pulse" />
                <div className="pt-3 flex items-center justify-between">
                  <div className="h-7 w-20 bg-gray-200 dark:bg-slate-600 rounded-lg animate-pulse" />
                  <div className="h-9 w-28 bg-gray-200 dark:bg-slate-600 rounded-xl animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

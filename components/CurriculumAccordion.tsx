'use client';

import { useState } from 'react';
import type { ProductModule } from '@/lib/config';

interface CurriculumAccordionProps {
  modules: ProductModule[];
}

export default function CurriculumAccordion({ modules }: CurriculumAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {modules.map((module, index) => (
        <div
          key={module.title}
          className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => toggle(index)}
            aria-expanded={openIndex === index}
            className="w-full flex items-center justify-between p-5 text-left bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center justify-center">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white leading-snug">
                  {module.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {module.lessons.length} lezioni • {module.duration}
                </p>
              </div>
            </div>
            <svg
              className={`flex-shrink-0 w-5 h-5 text-gray-400 ml-3 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {openIndex === index && (
            <div className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
              {module.lessons.map((lesson, lessonIndex) => (
                <div
                  key={lessonIndex}
                  className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-slate-800 last:border-0"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      {lesson.free ? (
                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                      {lesson.title}
                    </span>
                    {lesson.free && (
                      <span className="flex-shrink-0 text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-medium">
                        Anteprima
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-400 dark:text-gray-500 ml-3 flex-shrink-0">
                    {lesson.duration}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

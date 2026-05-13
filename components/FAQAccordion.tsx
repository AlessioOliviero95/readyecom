'use client';

import { useState } from 'react';
import type { ProductFAQ } from '@/lib/config';

interface FAQAccordionProps {
  items: ProductFAQ[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between p-5 text-left bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <span className="font-semibold text-gray-900 dark:text-white pr-4 leading-snug">
              {item.question}
            </span>
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-transform duration-200">
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${openIndex === index ? 'rotate-45' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </button>

          {openIndex === index && (
            <div className="px-5 pb-5 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700">
              <p className="pt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

import { useState, useRef } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { answers, categoryLabels, searchAnswers } from '../lib/answers';

const categoryIcons: Record<string, string> = {
  eviction: '🏠',
  rent: '💷',
  tenancy: '📋',
  rights: '⚖️',
  'applies-to-me': '🙋',
  urgent: '🚨',
  standards: '🔒',
};

const categories = ['eviction', 'rent', 'tenancy', 'rights', 'applies-to-me', 'urgent', 'standards'];

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof answers>([]);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSearch(q: string) {
    setQuery(q);
    if (q.trim().length > 1) {
      setResults(searchAnswers(q));
      setSearched(true);
    } else {
      setResults([]);
      setSearched(false);
    }
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "UK Tenant Rights",
    "description": "Plain English answers to UK tenant rights questions. Updated for the Renters' Rights Act 2025.",
    "url": "https://tenantrightsuk.info",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://tenantrightsuk.info/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Layout
      title="UK Tenant Rights — Plain English Answers"
      description="Plain English answers to your tenant rights questions. Updated for the Renters' Rights Act 2025. No jargon. No hedging. Just the answer."
      canonical="https://tenantrightsuk.info"
      schema={schema}
    >
      {/* Hero */}
      <div className="bg-brand-700 text-white">
        <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
          <div className="mb-2 text-brand-200 text-sm font-medium uppercase tracking-wide">
            Updated for the Renters' Rights Act 2025
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Your tenant rights.<br />Plain English.
          </h1>
          <p className="text-brand-100 text-lg mb-8">
            Search any question about renting in England. No jargon. No "consult a lawyer." Just the actual answer.
          </p>

          {/* Search Box */}
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => handleSearch(e.target.value)}
              placeholder='Try "Can my landlord evict me?" or "Section 21"'
              className="w-full text-gray-900 text-base sm:text-lg px-5 py-4 rounded-xl border-0 
                         focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-400"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Search Results Dropdown */}
          {searched && (
            <div className="mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
              {results.length > 0 ? (
                results.slice(0, 8).map(r => (
                  <Link
                    key={r.slug}
                    href={`/${r.category}/${r.slug}/`}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors"
                  >
                    <span className="text-lg mt-0.5">{categoryIcons[r.category]}</span>
                    <div>
                      <p className="text-gray-900 text-sm font-medium">{r.question}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{categoryLabels[r.category]}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="px-4 py-4 text-gray-500 text-sm">
                  No results for "{query}". Try different words or browse below.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Category Tiles */}
        <h2 className="text-xl font-bold text-gray-900 mb-5">Browse by topic</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/${cat}/`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 
                         hover:border-brand-400 hover:bg-brand-50 transition-all text-center"
            >
              <span className="text-3xl">{categoryIcons[cat]}</span>
              <span className="text-sm font-semibold text-gray-800">{categoryLabels[cat]}</span>
              <span className="text-xs text-gray-400">{answers.filter(a => a.category === cat).length} answers</span>
            </Link>
          ))}
        </div>

        {/* Top Questions */}
        <h2 className="text-xl font-bold text-gray-900 mb-5">Most searched questions</h2>
        <div className="space-y-2 mb-12">
          {[
            'can-my-landlord-evict-me-without-reason',
            'what-changed-for-renters-on-1-may-2026',
            'what-is-section-21-and-is-it-still-valid',
            'can-my-landlord-increase-my-rent',
            'i-got-a-section-21-notice-what-happens',
            'do-i-need-to-sign-a-new-tenancy-agreement',
            'can-i-keep-a-pet-in-my-rented-home',
            'can-landlord-refuse-me-because-i-get-benefits',
          ].map(slug => {
            const a = answers.find(x => x.slug === slug);
            if (!a) return null;
            return (
              <Link
                key={slug}
                href={`/${a.category}/${a.slug}/`}
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 
                           hover:border-brand-200 hover:bg-brand-50 transition-all group"
              >
                <span className="text-xl">{categoryIcons[a.category]}</span>
                <span className="text-gray-800 text-sm font-medium group-hover:text-brand-700 flex-1">
                  {a.question}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300 group-hover:text-brand-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </div>

        {/* Trust Bar */}
        <div className="bg-brand-50 rounded-xl p-5 text-center">
          <p className="text-brand-800 text-sm font-medium mb-1">Updated for the Renters' Rights Act 2025</p>
          <p className="text-brand-600 text-sm">In force from 1 May 2026 · England only · Plain English, no hedging</p>
        </div>
      </div>
    </Layout>
  );
}

import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

const ADSENSE_ID = 'pub-8935274984783226';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  canonical?: string;
  schema?: object;
}

export default function Layout({ children, title, description, canonical, schema }: LayoutProps) {
  const defaultTitle = 'UK Tenant Rights — Plain English Answers';
  const defaultDesc = 'Plain English answers to your tenant rights questions. No jargon, no hedging — just the actual answer. Updated for the Renters\' Rights Act 2025.';

  return (
    <>
      <Head>
        <title>{title || defaultTitle}</title>
        <meta name="description" content={description || defaultDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {canonical && <link rel="canonical" href={canonical} />}

        {/* Open Graph */}
        <meta property="og:title" content={title || defaultTitle} />
        <meta property="og:description" content={description || defaultDesc} />
        <meta property="og:type" content="website" />
        {canonical && <meta property="og:url" content={canonical} />}

        {/* AdSense */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${ADSENSE_ID}`}
          crossOrigin="anonymous"
        />

        {/* Schema */}
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-brand-700 text-lg hover:text-brand-900">
              UK Tenant Rights
            </Link>
            <nav className="hidden sm:flex gap-4 text-sm text-gray-500">
              <Link href="/eviction/" className="hover:text-brand-700 transition-colors">Eviction</Link>
              <Link href="/rent/" className="hover:text-brand-700 transition-colors">Rent</Link>
              <Link href="/tenancy/" className="hover:text-brand-700 transition-colors">Tenancy</Link>
              <Link href="/rights/" className="hover:text-brand-700 transition-colors">Rights</Link>
              <Link href="/applies-to-me/" className="hover:text-brand-700 transition-colors">Applies to me?</Link>
              <Link href="/urgent/" className="hover:text-brand-700 transition-colors">Urgent</Link>
            </nav>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-100 bg-gray-50 mt-16">
          <div className="max-w-3xl mx-auto px-4 py-8 text-sm text-gray-500">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <p className="font-medium text-gray-700 mb-1">UK Tenant Rights</p>
                <p>Plain English answers for England. Updated for the Renters' Rights Act 2025.</p>
              </div>
              <div className="flex gap-4 text-xs">
                <Link href="/about/" className="hover:text-brand-700">About</Link>
                <Link href="/sitemap.xml" className="hover:text-brand-700">Sitemap</Link>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-400 border-t border-gray-200 pt-4">
              This site provides general information only. It is not legal advice. Laws apply to England 
              unless stated otherwise. Always verify with an official source or seek advice for your specific situation.
              Information applies to England only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

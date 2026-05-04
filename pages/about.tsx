import Layout from '../components/Layout';
import Link from 'next/link';

export default function About() {
  return (
    <Layout
      title="About — UK Tenant Rights Plain English Answers"
      description="UK Tenant Rights gives plain English answers to tenant questions — no jargon, no hedging. Updated for the Renters' Rights Act 2025."
      canonical="https://tenantrightsuk.info/about/"
    >
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">About UK Tenant Rights</h1>

        <div className="prose prose-gray max-w-none space-y-5 text-gray-700 leading-relaxed">
          <p>
            Most tenant rights information online is written by lawyers for lawyers, or hedged into uselessness
            by people scared of giving a clear answer. You search "can my landlord evict me without reason"
            and get three paragraphs of caveats followed by "seek professional advice."
          </p>
          <p>
            This site does the opposite. You get the actual answer — direct, plain, in language anyone can understand.
            Caveats go in the footer. The answer goes first.
          </p>
          <p>
            All content is written for England and updated to reflect the Renters' Rights Act 2025,
            which came into force on 1 May 2026. It's the biggest change to private renting law in 30 years,
            and most tenants don't yet know what it means for them.
          </p>
          <p>
            This site applies to <strong>England only</strong>. Scotland, Wales and Northern Ireland have
            separate housing laws.
          </p>
          <p className="text-sm text-gray-500 border-t border-gray-100 pt-4">
            This site provides general information only — not legal advice. For advice specific to your
            situation, contact <a href="https://shelter.org.uk" className="text-brand-600 hover:underline" target="_blank" rel="noopener">Shelter England</a> or{' '}
            <a href="https://citizensadvice.org.uk" className="text-brand-600 hover:underline" target="_blank" rel="noopener">Citizens Advice</a>, both of which offer free help.
          </p>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-brand-600 font-medium hover:underline">← Back to questions</Link>
        </div>
      </div>
    </Layout>
  );
}

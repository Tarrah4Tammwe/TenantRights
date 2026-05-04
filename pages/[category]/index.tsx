import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import AdSlot from '../../components/AdSlot';
import { answers, Answer, categoryLabels, getByCategory } from '../../lib/answers';

interface Props {
  category: string;
  categoryAnswers: Answer[];
}

const categoryIcons: Record<string, string> = {
  eviction: '🏠', rent: '💷', tenancy: '📋', rights: '⚖️',
  'applies-to-me': '🙋', urgent: '🚨', standards: '🔒',
};

const categoryDescriptions: Record<string, string> = {
  eviction: 'Plain English answers to every question about eviction, Section 21, Section 8, and notice periods under the Renters\' Rights Act 2025.',
  rent: 'Plain English answers on rent increases, rent in advance, bidding wars, and how to challenge an unfair rise under the Renters\' Rights Act 2025.',
  tenancy: 'Plain English answers about what changed on 1 May 2026, assured periodic tenancies, how to end your tenancy, and what the new law means for you.',
  rights: 'Plain English answers about your rights as a tenant — pets, repairs, discrimination, deposit protection, and how to get justice if your landlord breaks the law.',
};

export default function CategoryPage({ category, categoryAnswers }: Props) {
  const siteUrl = 'https://tenantrightsuk.info';
  const label = categoryLabels[category];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
      { "@type": "ListItem", "position": 2, "name": label, "item": `${siteUrl}/${category}/` }
    ]
  };

  return (
    <Layout
      title={`${label} — UK Tenant Rights Plain English Answers`}
      description={categoryDescriptions[category]}
      canonical={`${siteUrl}/${category}/`}
      schema={schema}
    >
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <span className="text-gray-600">{label}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="text-4xl mb-3">{categoryIcons[category]}</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{label}</h1>
          <p className="text-gray-600 leading-relaxed">{categoryDescriptions[category]}</p>
        </div>

        {/* Ad Slot — top of list */}
        <div className="mb-8">
          <AdSlot format="leaderboard" className="text-center" />
        </div>

        {/* Question List */}
        <div className="space-y-2">
          {categoryAnswers.map(a => (
            <Link
              key={a.slug}
              href={`/${a.category}/${a.slug}/`}
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 
                         hover:border-brand-200 hover:bg-brand-50 transition-all group"
            >
              <span className="text-gray-800 text-sm font-medium group-hover:text-brand-700 flex-1">
                {a.question}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300 group-hover:text-brand-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Back */}
        <div className="mt-10 pt-6 border-t border-gray-100">
          <Link href="/" className="text-brand-600 text-sm font-medium hover:underline">
            ← All topics
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = [...new Set(answers.map(a => a.category))];
  return {
    paths: categories.map(cat => ({ params: { category: cat } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params!.category as string;
  const categoryAnswers = getByCategory(category);
  if (!categoryAnswers.length) return { notFound: true };
  return { props: { category, categoryAnswers } };
};

import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import AdSlot from '../../components/AdSlot';
import { answers, Answer, categoryLabels, getAnswer, getRelated } from '../../lib/answers';

interface Props {
  answer: Answer;
  related: Answer[];
}

const categoryIcons: Record<string, string> = {
  eviction: '🏠', rent: '💷', tenancy: '📋', rights: '⚖️',
  'applies-to-me': '🙋', urgent: '🚨', standards: '🔒',
};

export default function AnswerPage({ answer, related }: Props) {
  const siteUrl = 'https://tenantrightsuk.info';
  const canonical = `${siteUrl}/${answer.category}/${answer.slug}/`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": answer.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": answer.answer.replace(/\n/g, ' ')
        }
      },
      ...related.slice(0, 3).map(r => ({
        "@type": "Question",
        "name": r.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": r.answer.split('\n')[0]
        }
      }))
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
      { "@type": "ListItem", "position": 2, "name": categoryLabels[answer.category], "item": `${siteUrl}/${answer.category}/` },
      { "@type": "ListItem", "position": 3, "name": answer.question, "item": canonical }
    ]
  };

  const paragraphs = answer.answer.split('\n').filter(p => p.trim());

  return (
    <Layout
      title={answer.metaTitle}
      description={answer.metaDescription}
      canonical={canonical}
      schema={{ "@graph": [faqSchema, breadcrumbSchema] }}
    >
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <Link href={`/${answer.category}/`} className="hover:text-brand-600">
            {categoryLabels[answer.category]}
          </Link>
          <span>/</span>
          <span className="text-gray-600 truncate">{answer.question}</span>
        </nav>

        {/* Question H1 */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">
          {answer.question}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-8">
          <span className="bg-gray-100 rounded-full px-3 py-1 font-medium text-gray-600">
            {categoryIcons[answer.category]} {categoryLabels[answer.category]}
          </span>
          <span>Last verified: {answer.lastVerified}</span>
          <span>England only</span>
        </div>

        {/* Answer Block */}
        <div className="answer-body bg-white rounded-xl border border-gray-100 p-6 sm:p-8 mb-6">
          {paragraphs.map((para, i) => (
            <p key={i} className={`text-gray-800 leading-relaxed ${i < paragraphs.length - 1 ? 'mb-4' : ''} ${i === 0 ? 'text-lg font-medium text-gray-900' : ''}`}>
              {para}
            </p>
          ))}
        </div>

        {/* Ad Slot 1 — after answer */}
        <div className="mb-8">
          <AdSlot format="leaderboard" className="text-center" />
        </div>

        {/* Related Questions */}
        {related.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Related questions</h2>
            <div className="space-y-2">
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/${r.category}/${r.slug}/`}
                  className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 
                             hover:border-brand-200 hover:bg-brand-50 transition-all group"
                >
                  <span className="text-lg">{categoryIcons[r.category]}</span>
                  <span className="text-gray-800 text-sm font-medium group-hover:text-brand-700 flex-1">
                    {r.question}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300 group-hover:text-brand-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Ad Slot 2 — before footer */}
        <div className="mb-8">
          <AdSlot format="rectangle" className="text-center" />
        </div>

        {/* Browse Category CTA */}
        <div className="bg-brand-50 rounded-xl p-5 text-center">
          <p className="text-brand-800 font-medium mb-2">More {categoryLabels[answer.category]} answers</p>
          <Link
            href={`/${answer.category}/`}
            className="text-brand-700 text-sm font-semibold hover:underline"
          >
            Browse all {categoryLabels[answer.category]} questions →
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = answers.map(a => ({
    params: { category: a.category, slug: a.slug }
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const answer = getAnswer(params!.category as string, params!.slug as string);
  if (!answer) return { notFound: true };
  const related = getRelated(answer.relatedSlugs).slice(0, 5);
  return { props: { answer, related } };
};

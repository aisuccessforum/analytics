import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllPageParams, getDomain, getPage, getPagesForDomain } from '@/lib/content';
import Sidebar from '@/components/Sidebar';

export function generateStaticParams() {
  return getAllPageParams();
}

export default function BriefingPage({
  params,
}: {
  params: { domain: string; page: string };
}) {
  const domain = getDomain(params.domain);
  if (!domain) notFound();

  const page = getPage(params.domain, params.page);
  if (!page) notFound();

  const allPages = getPagesForDomain(params.domain);
  const idx = allPages.findIndex((p) => p.slug === page.slug);
  const prev = idx > 0 ? allPages[idx - 1] : null;
  const next = idx < allPages.length - 1 ? allPages[idx + 1] : null;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-[240px_1fr] gap-12">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Sidebar domain={domain} pages={allPages} activeSlug={page.slug} />
        </aside>

        <div>
          <p className="font-mono text-xs text-ink-soft/70 mb-3">
            <Link href={`/${domain.slug}/`} className="hover:text-petrol">
              {domain.name}
            </Link>
            <span className="mx-2">/</span>
            {page.section || 'Briefing'}
          </p>
          <h1 className="font-display text-4xl text-ink mb-4">{page.title}</h1>
          {page.summary && (
            <p className="text-lg text-ink-soft leading-relaxed max-w-prose mb-10">
              {page.summary}
            </p>
          )}

          <article className="prose-brief">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{page.body}</ReactMarkdown>
          </article>

          <div className="flex items-center justify-between mt-14 pt-8 border-t border-border">
            {prev ? (
              <Link
                href={`/${domain.slug}/${prev.slug}/`}
                className="text-sm text-ink-soft hover:text-petrol transition-colors"
              >
                ← {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/${domain.slug}/${next.slug}/`}
                className="text-sm text-ink-soft hover:text-petrol transition-colors"
              >
                {next.title} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

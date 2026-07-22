import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllDomainSlugs, getDomain, getPagesForDomain } from '@/lib/content';
import Sidebar from '@/components/Sidebar';

export function generateStaticParams() {
  return getAllDomainSlugs().map((domain) => ({ domain }));
}

export default function DomainPage({ params }: { params: { domain: string } }) {
  const domain = getDomain(params.domain);
  if (!domain) notFound();

  const pages = getPagesForDomain(domain.slug);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-[240px_1fr] gap-12">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Sidebar domain={domain} pages={pages} />
        </aside>

        <div>
          <p className="font-mono text-xs text-brass tracking-widest mb-3">{domain.icon}</p>
          <h1 className="font-display text-4xl text-ink mb-4">{domain.name}</h1>
          <p className="text-lg text-ink-soft leading-relaxed max-w-prose mb-10">
            {domain.description}
          </p>

          {pages[0] && (
            <Link
              href={`/${domain.slug}/${pages[0].slug}/`}
              className="inline-flex items-center gap-2 bg-petrol text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-petrol-dark transition-colors"
            >
              Start with {pages[0].title}
              <span aria-hidden>→</span>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

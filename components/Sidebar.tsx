import Link from 'next/link';
import type { BriefingPage, Domain } from '@/lib/content';

export default function Sidebar({
  domain,
  pages,
  activeSlug,
}: {
  domain: Domain;
  pages: BriefingPage[];
  activeSlug?: string;
}) {
  const groups = new Map<string, BriefingPage[]>();
  for (const p of pages) {
    const key = p.section || '';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(p);
  }

  return (
    <nav aria-label={`${domain.name} briefings`} className="text-sm">
      <div className="mb-6 pb-4 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft/70">
          {domain.name} &middot; {pages.length} briefings indexed
        </p>
      </div>
      <ol className="space-y-6">
        {Array.from(groups.entries()).map(([section, items], gi) => (
          <li key={section || gi}>
            {section && (
              <p className="font-mono text-[10px] uppercase tracking-widest text-brass mb-2">
                {section}
              </p>
            )}
            <ol className="space-y-0.5">
              {items.map((p, i) => {
                const isActive = p.slug === activeSlug;
                return (
                  <li key={p.slug}>
                    <Link
                      href={`/${domain.slug}/${p.slug}/`}
                      className={`flex items-baseline gap-2.5 px-2.5 py-1.5 rounded-md transition-colors ${
                        isActive
                          ? 'bg-petrol/10 text-petrol font-medium'
                          : 'text-ink-soft hover:bg-ink/5 hover:text-ink'
                      }`}
                    >
                      <span className="font-mono text-[11px] w-5 shrink-0 text-ink-soft/60">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{p.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ol>
    </nav>
  );
}

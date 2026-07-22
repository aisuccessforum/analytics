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
    <nav aria-label={`${domain.name} briefings`} className="text-sidebar-item">
      <div className="mb-4 pb-4 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft/70">
          {domain.name} &middot; {pages.length} briefings indexed
        </p>
      </div>
      <ol className="space-y-5">
        {Array.from(groups.entries()).map(([section, items], gi) => (
          <li key={section || gi}>
            {section && (
              <p className="font-mono text-[10px] uppercase tracking-widest text-brass mb-1 px-2.5">
                {section}
              </p>
            )}
            <ol>
              {items.map((p, i) => {
                const isActive = p.slug === activeSlug;
                return (
                  <li key={p.slug}>
                    <Link
                      href={`/${domain.slug}/${p.slug}/`}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center gap-2.5 px-2.5 py-2 border-l-2 transition-colors ${
                        isActive
                          ? 'bg-petrol text-white border-brass font-medium'
                          : 'text-ink-soft border-transparent hover:bg-ink/5 hover:text-ink hover:border-border'
                      }`}
                    >
                      <span
                        className={`font-mono text-[11px] w-5 shrink-0 ${
                          isActive ? 'text-white/70' : 'text-ink-soft/60'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{p.title}</span>
                      {isActive && <span className="ml-auto text-white/70">&rsaquo;</span>}
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

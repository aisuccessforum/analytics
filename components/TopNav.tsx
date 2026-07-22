import Link from 'next/link';
import { getAllDomains } from '@/lib/content';

export default function TopNav() {
  const domains = getAllDomains();

  return (
    <header className="sticky top-0 z-30 bg-paper/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-display text-xl text-ink">Analytics Hub</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-brass">
              by AI Success Forum
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-1 h-11 -mx-2 overflow-x-auto no-scrollbar">
          {domains.map((d) => (
            <Link
              key={d.slug}
              href={`/${d.slug}/`}
              className="shrink-0 px-3 py-1.5 rounded-full text-sm text-ink-soft hover:text-ink hover:bg-ink/5 transition-colors"
            >
              {d.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

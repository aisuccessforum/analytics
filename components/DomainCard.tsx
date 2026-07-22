import Link from 'next/link';
import type { Domain } from '@/lib/content';

export default function DomainCard({ domain, pageCount }: { domain: Domain; pageCount: number }) {
  return (
    <Link
      href={`/${domain.slug}/`}
      className="group block bg-surface border border-border rounded-lg p-6 hover:border-petrol/40 hover:shadow-[0_4px_20px_-8px_rgba(11,93,82,0.25)] transition-all"
    >
      <div className="flex items-start justify-between mb-6">
        <span className="font-mono text-xs text-brass tracking-widest">{domain.icon}</span>
        <span className="font-mono text-[11px] text-ink-soft/70">
          {pageCount} {pageCount === 1 ? 'briefing' : 'briefings'}
        </span>
      </div>
      <h3 className="font-display text-2xl text-ink mb-2 group-hover:text-petrol transition-colors">
        {domain.name}
      </h3>
      <p className="text-sm text-ink-soft leading-relaxed">{domain.description}</p>
    </Link>
  );
}

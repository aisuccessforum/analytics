import { getAllDomains, getPagesForDomain } from '@/lib/content';
import DomainCard from '@/components/DomainCard';

export default function HomePage() {
  const domains = getAllDomains();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="max-w-2xl mb-14">
        <p className="font-mono text-xs uppercase tracking-widest text-brass mb-4">
          Executive knowledge base
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-ink leading-[1.15] mb-5">
          Industry literacy, briefed for leadership.
        </h1>
        <p className="text-lg text-ink-soft leading-relaxed">
          Definitions, KPIs, key players, and technology landscapes across the industries you
          operate in and adjacent to — written for the boardroom, not the classroom.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {domains.map((domain) => (
          <DomainCard
            key={domain.slug}
            domain={domain}
            pageCount={getPagesForDomain(domain.slug).length}
          />
        ))}
      </div>
    </main>
  );
}

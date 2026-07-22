'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Domain } from '@/lib/content';

export default function TopNav({ domains }: { domains: Domain[] }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 bg-paper/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-display text-xl text-ink">Analytics Hub</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-brass">
              by AI Success Forum
            </span>
          </Link>
        </div>
      </div>

      {/* Tab bar — active domain gets a solid fill, same interaction pattern as w3schools' language tabs */}
      <nav
        aria-label="Domains"
        className="bg-ink border-y border-ink"
      >
        <div className="max-w-6xl mx-auto px-6 flex items-stretch overflow-x-auto no-scrollbar">
          {domains.map((d) => {
            const isActive = pathname === `/${d.slug}/` || pathname.startsWith(`/${d.slug}/`);
            return (
              <Link
                key={d.slug}
                href={`/${d.slug}/`}
                aria-current={isActive ? 'page' : undefined}
                className={`shrink-0 px-4 h-11 flex items-center text-sm font-medium tracking-wide transition-colors border-b-2 ${
                  isActive
                    ? 'bg-petrol text-white border-brass'
                    : 'text-paper/60 border-transparent hover:text-paper hover:bg-white/5'
                }`}
              >
                {d.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

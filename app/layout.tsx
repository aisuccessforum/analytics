import type { Metadata } from 'next';
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import TopNav from '@/components/TopNav';
import { getAllDomains } from '@/lib/content';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-plex-sans',
  weight: ['400', '500', '600'],
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-plex-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Analytics Hub — Executive Briefings by AI Success Forum',
  description:
    'Cross-industry knowledge base for leadership — definitions, KPIs, players, and technology across Telecom, HR, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const domains = getAllDomains();

  return (
    <html lang="en" className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body>
        <TopNav domains={domains} />
        {children}
      </body>
    </html>
  );
}

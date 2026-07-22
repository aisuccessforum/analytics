import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const DOMAINS_DIR = path.join(process.cwd(), 'content/domains');
const PAGES_DIR = path.join(process.cwd(), 'content/pages');

export type Domain = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  order: number;
};

export type BriefingPage = {
  slug: string;
  domain: string;
  title: string;
  section?: string;
  order: number;
  summary?: string;
  body: string;
};

function readMarkdownDir(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
      const { data, content } = matter(raw);
      return { data, content, filename };
    });
}

export function getAllDomains(): Domain[] {
  return readMarkdownDir(DOMAINS_DIR)
    .map(({ data, filename }) => ({
      slug: data.slug || filename.replace(/\.md$/, ''),
      name: data.name,
      description: data.description || '',
      icon: data.icon || '01',
      order: data.order ?? 999,
    }))
    .sort((a, b) => a.order - b.order);
}

export function getDomain(slug: string): Domain | undefined {
  return getAllDomains().find((d) => d.slug === slug);
}

export function getPagesForDomain(domainSlug: string): BriefingPage[] {
  const dir = path.join(PAGES_DIR, domainSlug);
  return readMarkdownDir(dir)
    .map(({ data, content, filename }) => ({
      slug: data.slug || filename.replace(/\.md$/, ''),
      domain: domainSlug,
      title: data.title,
      section: data.section,
      order: data.order ?? 999,
      summary: data.summary,
      body: content,
    }))
    .sort((a, b) => a.order - b.order);
}

export function getPage(domainSlug: string, pageSlug: string): BriefingPage | undefined {
  return getPagesForDomain(domainSlug).find((p) => p.slug === pageSlug);
}

export function getAllDomainSlugs(): string[] {
  return getAllDomains().map((d) => d.slug);
}

export function getAllPageParams(): { domain: string; page: string }[] {
  const params: { domain: string; page: string }[] = [];
  for (const domain of getAllDomains()) {
    for (const p of getPagesForDomain(domain.slug)) {
      params.push({ domain: domain.slug, page: p.slug });
    }
  }
  return params;
}

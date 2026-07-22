# Analytics Hub

Cross-industry executive briefing site for `analytics.aisuccessforum.online`. Same pattern as
AI Success Forum: Next.js static export + Decap CMS + Cloudflare Pages.

## Local development

```
npm install
npm run dev
```

## Adding a new domain

1. In `/admin`, create a new entry in **Domains** — name, slug, description, index number, order.
   (Or add a `.md` file directly to `content/domains/`.)
2. Open `public/admin/config.yml` and add the new domain as an option under the **Briefings →
   Domain** select field, so editors can tag pages to it.
3. Add briefing pages for it — see below.

## Adding a briefing page to a domain

In `/admin`, create a new entry in **Briefings**:
- Title, slug, and which Domain it belongs to
- Optional "Sidebar Section" label — pages sharing a section get grouped under that heading in
  the sidebar. Leave blank for a flat list. This is what makes each domain's sidebar independent
  of the others — Telecom can be grouped, a simpler domain can stay flat.
- Sidebar order (controls position within its section, and prev/next navigation)
- Markdown body

Files land at `content/pages/<domain-slug>/<page-slug>.md` automatically.

## Deployment (Cloudflare Pages)

1. Push this repo to `aisuccessforum/analytics-hub` on GitHub.
2. In Cloudflare Pages, create a new project from that repo.
   - Build command: `npm run build`
   - Build output directory: `out`
3. Add the custom domain `analytics.aisuccessforum.online` in the Pages project's custom domains
   tab (nameservers are already on Cloudflare via BigRock, so this is just an added route, no
   registrar changes needed).
4. Decap CMS auth: reuse the existing GitHub OAuth app / Cloudflare Pages Function you already
   have running for the AI Success Forum CMS — just add `analytics-hub` to that GitHub App's
   repository access list, and update `base_url` in `public/admin/config.yml` to match your
   existing OAuth worker's URL exactly (placeholder value is in there now, swap it in).

## Notes

- No CSP meta tag is set here, following the same lesson from AI Success Forum — CSP blocked
  Decap's blob URLs there.
- `npm run dev` before pushing, and `git pull origin main --no-edit` before pushing if editing
  both locally and via `/admin`, same as your existing workflow.

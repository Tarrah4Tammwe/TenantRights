# UK Tenant Rights — Deployment Guide

## What this is
A static Next.js site with 30 pre-built answer pages for UK tenant rights questions.
Updated for the Renters' Rights Act 2025 (in force 1 May 2026).

- 30 answer pages across 4 categories
- Full SEO: meta titles, meta descriptions, FAQ schema, breadcrumb schema, sitemap
- Google AdSense integrated (pub-8935274984783226)
- Fully static — deploys to Vercel free tier
- Mobile-first design

## Deploy in 5 minutes

### 1. Install dependencies
```bash
npm install
```

### 2. Test locally
```bash
npm run dev
# Visit http://localhost:3000
```

### 3. Deploy to Vercel
```bash
npm install -g vercel
vercel
# Follow prompts — select "Next.js" framework
```

Or push to GitHub and connect to Vercel — it auto-deploys.

## After deployment

### AdSense
- Your pub ID is already set: `pub-8935274984783226`
- Update the `slot` prop in AdSlot components with your real ad slot IDs from AdSense dashboard
- Submit site to AdSense for approval if not already approved

### Google Search Console
1. Verify your domain at search.google.com/search-console
2. Submit sitemap: `https://yourdomain.com/sitemap.xml`
3. Request indexing for key pages manually (top 10 questions)

### Domain
Update `SITE_URL` in:
- `pages/[category]/[slug].tsx`
- `pages/[category]/index.tsx`
- `pages/about.tsx`
- `public/sitemap.xml`
- `public/robots.txt`

## File structure
```
lib/answers.ts          — All 30 Q&A pairs with SEO metadata
pages/index.tsx         — Homepage with search
pages/[category]/index  — Category browse pages (4 pages)
pages/[category]/[slug] — Answer pages (30 pages)
pages/about.tsx         — About page
components/Layout.tsx   — Shared layout with AdSense
components/AdSlot.tsx   — AdSense slot component
public/sitemap.xml      — Full sitemap (35 URLs)
public/robots.txt       — Search engine instructions
```

## Adding more questions
Add entries to `lib/answers.ts`. The site automatically generates new pages, sitemap entries are manual (update `public/sitemap.xml`).

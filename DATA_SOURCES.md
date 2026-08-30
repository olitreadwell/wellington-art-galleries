# Data sources

All sources are public. Scrapers live in `src/lib/scrapers/`, run daily via
Vercel Cron, and record every run in `scrapes` (DB mode) or
`logs/scrapes.jsonl` (snapshot mode) with status, items found and items new.

## Working now

| Source | What we get | Status |
| --- | --- | --- |
| `https://www.wellingtonnz.com/visit/see-and-do/contemporary-art-galleries` | 10 commercial galleries with addresses + descriptions | ✅ working (seed, 2026-08-30) |
| `https://artsaccess.org.nz/community-galleries-directory` | community galleries (Thistle Hall, Sunday Night Club, Hutt Art Odlin) + contact details | ✅ working |
| `https://www.eventfinda.co.nz/venues` | venue pages for galleries without live websites (Bartley, Solander) | ✅ working |
| official gallery websites (21 domains, curl HEAD verified 2026-08-30) | institutional + commercial listings, coordinates via Nominatim | ✅ working |
<!-- SEED-SOURCES -->

Projects run `pnpm run setup` to list their own initial sources here; the
scraper framework in `src/lib/scrapers/` turns each into a `Scraper`.

## Best-effort (fetched, no structured extraction yet)

| Source | What we want | Status |
| --- | --- | --- |
| _(add sources here as scrapers land)_ | | ⚠️ |

## Key-gated (enable via env)

| Source | Env var | Notes |
| --- | --- | --- |
| _(add keyed APIs here, e.g. Eventfinda/Meetup)_ | `..._API_KEY` | Free key at the provider portal |

## Planned

- Real scrapers for the project's seed sources, replacing the example
- `https://www.nzmuseums.co.nz/` (JS-heavy; low yield for commercial galleries — revisit for region museums)
- `https://www.wellington.govt.nz/arts-and-culture` (council arts pages)
- Headless-browser fallback for JS-rendered listing pages
- Enrichment passes (socials, contact, coordinates) with sources per field

## Rules

- Respect `robots.txt` (enforced in `src/lib/scrapers/http.ts`)
- 500ms+ delay between requests per source
- 15s request timeout; failures are recorded, never fatal
- No paywalled, logged-in, or private data. Ever.
- Update this table when a source changes status — it is the project's
  transparency record.

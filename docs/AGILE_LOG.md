# Gemify — Agile Delivery Log

A simulated cross-functional team is incrementally hardening and extending the
Gemify gemstone marketplace. Each sprint runs the same ceremony:

1. **Product Owner (PO)** proposes the sprint goal — a new feature or a
   fine-tune/streamline — always acting in the best interest of the product.
2. **Project Manager (PM)** breaks the goal into a plan and acceptance criteria.
3. **Development Team (DEV)** implements.
4. **QA Engineer (QA)** verifies against acceptance criteria; defects bounce
   back to DEV until clean.
5. **PM** signs off and reviews with the **PO**, who then opens the next sprint.

## Team
| Role | Responsibility |
| ---- | -------------- |
| Product Owner | Owns the vision and backlog priority; maximises product value |
| Project Manager | Plans sprints, tracks progress, removes blockers, sign-off |
| Development Team | Designs and builds the increment |
| QA Engineer | Validates quality, finds defects, gatekeeps the Definition of Done |

## Definition of Done
- Code follows existing conventions (`{ message, data }` envelopes, DTO
  validation, role guards, TypeORM modules).
- Feature is wired into `AppModule` and reachable.
- QA review passes with no open defects.
- Change is committed with a descriptive message.

## Sprint Index
| # | Type | Goal | Status |
| - | ---- | ---- | ------ |
| 1 | Feature | Complete the Gems catalog (full CRUD, search, moderation) | ✅ Done |
| 2 | Feature | Implement the Wishlist module end-to-end | ✅ Done |
| 3 | Feature | Implement Reviews with live rating aggregation | ✅ Done |
| 4 | Feature | Implement Orders / checkout with stock control | ✅ Done |
| 5 | Quality | Testing foundation (unit tests + CI gate) | ✅ Done |
| 6 | Fine-tune | Resilience & security hardening | ✅ Done |
| 7 | Feature | Storefront gem comparison & recently-viewed | ✅ Done |
| 8 | Fine-tune | Standardise responses & streamline | ✅ Done |
| 9 | Feature | Admin moderation workflow UI | ✅ Done |
| 10 | Fine-tune | Docs, seed data & retrospective | ✅ Done |
| 11 | SEO | SEO foundation (metadata, sitemap, robots, structured data) | ✅ Done |
| 12 | Performance | Image optimization, bundle & caching | ✅ Done |
| 13 | UI | Next-level UI design system (tokens, toasts, button) | ✅ Done |
| 14 | Growth | Organic attraction — Gem Guides + newsletter | ✅ Done |
| 15 | SEO | Public SSR gem pages with ISR + Product schema | ✅ Done |
| 16 | Feature | Activate the wishlist end-to-end | ✅ Done |
| 17 | Feature | Shopping cart with persistent drawer | ✅ Done |
| 18 | Feature | Checkout → real transactional orders | ✅ Done |
| 19 | Feature | Account order history & post-purchase reviews | ✅ Done |
| 20 | Quality | Accessibility, PWA, analytics & retrospective | ✅ Done |

## Phase 2 Retrospective (Sprints 11–20)

Phase 1 built a working, tested backend marketplace. Phase 2 made it
**discoverable, fast, beautiful, and transactional** on the storefront.

### Sprints 11–15 (PO target: UI / speed / SEO / organic pull)
- **SEO (11, 15):** per-page metadata + canonical/OG/Twitter, dynamic
  robots & sitemap, Organization/WebSite JSON-LD, and public SSR gem pages
  (`/gems/[slug]`) with ISR and Product/Breadcrumb structured data for rich
  snippets.
- **Performance (12):** next/image (AVIF/WebP, responsive, lazy, blur-up),
  long-lived static caching, `optimizePackageImports`, skeleton loaders.
- **UI (13):** brand token scale, reusable Button, toast system, motion +
  reduced-motion support, global polish.
- **Organic growth (14):** statically-generated Gem Guides hub with
  Article/Breadcrumb schema, internal links into the catalog, newsletter
  capture.

### Sprints 16–20 (PO choice: activate the conversion loop)
The PO chose to light up the dormant backend features the storefront wasn’t
using — turning traffic into transactions:
- Wishlist (16), Cart (17), Checkout → real transactional orders (18),
  Account/order history + post-purchase reviews (19).
- Accessibility (skip link, focus, aria), PWA manifest, app-level
  loading/404/error states, and fire-and-forget funnel analytics wired to the
  existing `/analytics/track` endpoint (20).

### The flywheel we built
Guides & SEO pull organic traffic → fast, polished pages convert → purchases
generate reviews → reviews feed rating aggregation and Product rich snippets →
better rankings pull more traffic.

### Carried debt / next backlog
- Replace the demo newsletter store with a real ESP integration.
- Real payment-gateway capture in checkout.
- Server-side gem-view tracking on `/gems/[slug]`.
- Component/E2E tests for the new storefront flows (cart, checkout, wishlist).
- Move TypeORM `synchronize` to migrations before production.

## Sprint 10 — Retrospective

Ten sprints took Gemify from a partially-stubbed scaffold to a coherent,
tested, demoable marketplace.

### What we shipped
- **Sprints 1–4 (build):** a complete commerce core — full Gems catalog with
  faceted search and moderation, end-to-end Wishlist, Reviews with live rating
  aggregation, and a transactional Orders/checkout that cannot oversell.
- **Sprint 5 (quality):** a Jest + CI safety net (now 27 passing tests) so
  regressions are caught automatically.
- **Sprints 6 & 8 (fine-tune):** symmetric success/error contracts, a global
  exception filter that never leaks internals, and baseline security headers —
  all with zero new runtime dependencies.
- **Sprints 7 & 9 (features):** storefront gem comparison + recently-viewed,
  and an admin moderation workflow that closes the trust loop.
- **Sprint 10 (fine-tune):** an idempotent seed, refreshed docs, and — found
  by QA's full type-check — the **implementation of the missing UploadsModule**
  that had silently broken the backend build for the whole repo.

### What went well
- QA gating every sprint caught real defects early: review broken-access
  control (S3), unvalidated order status (S4), the Express 5 wildcard pitfall
  (S6), and the dormant compile break (S10).
- "Best interest of the system" framing kept the Product Owner fixing latent
  bugs (mismatched client endpoints, admin visibility regression) alongside
  net-new features.

### Carried debt / next backlog
- Dedicated `rejectionReason` column on Gem (currently logged only).
- Move TypeORM `synchronize: true` to migrations before production.
- Payment-gateway integration for Orders (currently records intent only).
- E2E/integration tests over the unit layer.

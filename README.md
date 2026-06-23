# Gemify

Gemify — Your Premier Digital Gemstone Marketplace.

Gemify is a digital platform for showcasing and trading exceptional gemstones,
bridging collectors, enthusiasts, and verified sellers in a secure and elegant
space for discovering and acquiring precious stones.

## Monorepo Structure

This repository is organised as three independent applications:

| Folder              | Stack                         | Description                                              | Dev Port |
| ------------------- | ----------------------------- | -------------------------------------------------------- | -------- |
| `client-dashboard/` | Next.js 14 (App Router) + Tailwind | Customer-facing storefront (formerly a CRA React app)    | 3000     |
| `admin-dashboard/`  | Next.js 14 (App Router) + Tailwind | Administration console (users, gems, auctions, categories) | 3002     |
| `backend/`          | NestJS + TypeORM (PostgreSQL) | REST API for auth, gems, auctions, users, orders, etc.   | 3001     |

Both frontends authenticate against the NestJS backend using JWT (no Firebase).

## Getting Started

### 1. Backend (NestJS + TypeORM)

```bash
cd backend
cp .env.example .env        # configure your PostgreSQL connection
npm install
npm run start:dev           # http://localhost:3001
```

### 2. Client Dashboard (storefront)

```bash
cd client-dashboard
cp .env.local.example .env.local   # set NEXT_PUBLIC_API_BASE_URL
npm install
npm run dev                 # http://localhost:3000
```

### 3. Admin Dashboard

```bash
cd admin-dashboard
cp .env.local.example .env.local   # set NEXT_PUBLIC_API_BASE_URL
npm install
npm run dev                 # http://localhost:3002
```

> The admin dashboard only allows accounts with the `super_admin` or
> `shop_admin` role to sign in.

### 4. Seed demo data (optional)

```bash
cd backend
npm run seed     # idempotent: super-admin, a shop, categories and demo gems
```

| Account | Email | Password |
| ------- | ----- | -------- |
| Super admin | `admin@gemify.com` | `Admin@123` |
| Shop owner  | `seller@gemify.com` | `Seller@123` |

## Core API Surface

| Area | Endpoints (prefix `/`) |
| ---- | ---------------------- |
| Catalog | `GET gems` (public, faceted search), `GET gems/slug/:slug`, `GET gems/admin`, `GET gems/stats`, `POST/PATCH/DELETE gems`, `PATCH gems/:id/approve|reject` |
| Wishlist | `GET/POST wishlist`, `DELETE wishlist/:gemId`, `GET wishlist/check/:gemId` |
| Reviews | `GET reviews/gem/:gemId`, `POST reviews`, `PATCH reviews/:id/respond|helpful` |
| Orders | `POST orders`, `GET orders`, `GET orders/:id`, `PATCH orders/:id/status|cancel` |
| Uploads | `POST uploads/image`, `POST uploads/images` |
| Health | `GET health` |

All responses share a symmetric envelope: success →
`{ success: true, message, data, timestamp }`, error →
`{ success: false, statusCode, error, message, path, timestamp }`.

## Testing

```bash
cd backend
npm test          # Jest unit tests (services, filter, interceptor)
npm run build     # full TypeScript type-check
```

CI (`.github/workflows/backend-ci.yml`) runs the tests and type-check on every
branch and pull request.

## Storefront Capabilities

The Next.js client is a full shopping experience: faceted catalog with gem
comparison and recently-viewed, backend-synced **wishlist**, persistent
**cart**, **checkout** that creates real transactional orders, **account/order
history** with cancellation, and **post-purchase reviews** that feed live
rating aggregation.

It is also built for discovery and speed: per-page metadata, dynamic
`sitemap.xml`/`robots.txt`, Organization/WebSite/Product/Article **JSON-LD**,
public **SSR gem pages** (`/gems/[slug]`) with ISR and rich snippets, a
statically-generated **Gem Guides** content hub, `next/image` optimization,
long-lived asset caching, a PWA manifest, accessibility (skip link/focus/aria),
and fire-and-forget funnel **analytics**.

## Technology Stack

- **Frontend:** Next.js 14 (App Router), React 18, Tailwind CSS, Axios, lucide-react
- **Backend:** NestJS, TypeORM, PostgreSQL, JWT authentication
- **Architecture:** API-driven; the frontends consume the NestJS REST API

## Migration Notes

This project was migrated from a single Create React App (react-router-dom +
Firebase) storefront to the structure above:

- The storefront was ported to Next.js with the App Router and split into a
  shared `ThemeContext`/`AuthContext` instead of prop drilling.
- Firebase Auth/Firestore was removed; authentication and data now flow through
  the NestJS + TypeORM API.
- The seasonal Christmas theme overlay was removed.
- A dedicated Next.js admin dashboard was added.

## Contact

For inquiries, please reach out to us at contact@gemify.com

---
Built with ♦️ by the Gemify Team

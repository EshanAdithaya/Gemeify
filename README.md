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

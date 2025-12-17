# Chopping Mall

A responsive e-commerce site built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Created for the Noroff *JavaScript Frameworks* assignment.

**Live demo:** https://jsfw-2025-v1-runar-jsframeworks.vercel.app/

---

## Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Testing](#testing)
- [API](#api)
- [Project Structure](#project-structure)
- [Accessibility & Code Quality](#accessibility--code-quality)
- [Deployment](#deployment)
- [License / Disclaimer](#license--disclaimer)

---

## Tech Stack
- **Next.js 15** (App Router, RSC)
- **TypeScript** (strict)
- **Tailwind CSS**
- **Vitest** + **React Testing Library** (JSDOM)
- **sonner** for toast notifications

---

## Features
- Product list with **search** and **sorting** (name, price)
- Product detail page with description, tags, and reviews
- Shopping cart with header count, quantity editing, remove, and total
- Checkout success page that clears the cart
- Contact page with TypeScript-based validation
- Toast notifications (add/remove/checkout/validation)
- Fully responsive design
- Static pages: **About**, **Terms**, **Privacy**

---

## Getting Started
**Requirements:** Node 18+

```bash
# 1) Install dependencies
npm install

# 2) Run in development
npm run dev
# open http://localhost:3000

# 3) Build and run in production locally
npm run build
npm run start
# open http://localhost:3000
```

---

## Scripts
```bash
npm run dev        # Start Next dev server (Turbopack)
npm run build      # Production build
npm run start      # Start production server (after build)
npm run lint       # ESLint
npm run test       # Run all tests (Vitest)
npm run test:watch # Run tests in watch mode
```

---

## Testing
We use **Vitest** with **React Testing Library**.

Run tests:
```bash
npm run test
```

Watch mode:
```bash
npm run test:watch
```

Test files live under `src/tests/**`. The test setup (JSDOM, mocks) is configured via `vitest.config.ts` and `src/tests/setup.tsx`.

---

## API
Products are fetched from the **Noroff Online Shop API**:

- `GET /online-shop` — product list  
- `GET /online-shop/:id` — product details

Docs: https://docs.noroff.dev/docs/v2/basic/online-shop

Types for products and cart live in `src/types` and `src/store/cartTypes.ts`. API requests are wrapped in `src/lib/api.ts`.

---

## Project Structure
```
src/
  app/
    about/                # static page
    terms/                # static page
    privacy/              # static page
    cart/                 # cart page
    checkout/success/     # success page
    product/[id]/         # product detail + add-to-cart
    layout.tsx            # global layout (Header, Footer, ToastHost, CartProvider)
    page.tsx              # home (grid, search, sort)
    globals.css
  components/
    Header.tsx
    Footer.tsx
    ProductCard.tsx
    ProductsExplorer.tsx  # search + sort + grid
    ToastHost.tsx
  lib/
    api.ts                # API helpers
    format.ts             # formatting utilities (currency, etc.)
  store/
    CartContext.tsx       # cart state (context + reducer + localStorage)
    cartTypes.ts          # cart types + helpers
  types/
    product.ts            # API types
  tests/                  # Vitest + RTL
```

---

## Improvements (Portfolio polish)

- Added missing label associations in Contact form (htmlFor / id) to improve accessibility.
- Removed ESLint warnings (no-empty catch blocks, consistent-return, strict equality).
- Improved cart persistence robustness by handling corrupted localStorage data safely.
- Replaced unstable React list keys in loading skeletons with stable keys.
- Updated tests to include correct hook dependencies and removed any from test mocks.

---

## Accessibility & Code Quality
- Good contrast and focus states for dark theme
- ARIA labels for prices/discounts where appropriate
- Strict TypeScript and ESLint (Next + TS rules)
- Focused component tests and reducer tests

---

## Deployment
Automatic deployments via **Vercel** on push to `main`.

Live URL: **https://jsfw-2025-v1-runar-jsframeworks.vercel.app/**

Local production check:
```bash
npm run build && npm run start
```

---

## License / Disclaimer
This is a **school project**. No real purchases are processed. Content and data are for demonstration purposes only.
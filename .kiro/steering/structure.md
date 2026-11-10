# Project Structure

## Folder Layout

```
maya/
├── .kiro/                          # Kiro steering, specs, and hooks
│   └── steering/
├── public/
│   └── models/                     # 3D assets (.glb / .gltf)
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (shop)/                 # Route group: shopper-facing pages
│   │   │   ├── page.tsx            # Home / catalog
│   │   │   ├── products/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx    # Product detail + 3D viewer + try-on
│   │   │   └── cart/
│   │   │       └── page.tsx        # Cart
│   │   ├── dashboard/              # Seller ad tracking dashboard
│   │   │   └── page.tsx
│   │   ├── api/                    # Route Handlers
│   │   │   ├── ads/
│   │   │   │   └── route.ts        # Ad event ingestion endpoint
│   │   │   └── products/
│   │   │       └── route.ts
│   │   ├── layout.tsx              # Root layout
│   │   └── globals.css             # Tailwind base imports only
│   ├── components/
│   │   ├── ui/                     # Generic, reusable UI primitives
│   │   ├── catalog/                # Product listing components
│   │   ├── product/                # Product detail / 3D viewer components
│   │   ├── tryon/                  # Webcam + face tracking + overlay components
│   │   ├── cart/                   # Cart components
│   │   └── dashboard/              # Ad analytics dashboard components
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts           # Browser Supabase client
│   │   │   └── server.ts           # Server Supabase client
│   │   ├── mediapipe/
│   │   │   └── face-landmarker.ts  # MediaPipe setup and worker bridge
│   │   ├── three/
│   │   │   └── helpers.ts          # Shared R3F / Three.js utilities
│   │   └── utils.ts                # cn() and other general helpers
│   ├── hooks/                      # Custom React hooks (client-side only)
│   │   ├── use-camera.ts           # Webcam access and stream management
│   │   └── use-face-landmarks.ts   # Consumes face landmarker worker output
│   ├── types/                      # Shared TypeScript types and interfaces
│   │   ├── product.ts
│   │   ├── cart.ts
│   │   └── ads.ts
│   └── constants/                  # App-wide constants (routes, config values)
├── .env.local                      # Local secrets — never committed
├── .env.example                    # Documents required env vars
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Files (components) | PascalCase | `ProductCard.tsx` |
| Files (non-component) | kebab-case | `face-landmarker.ts` |
| Folders | kebab-case | `tryon/`, `use-camera.ts` |
| React components | PascalCase, named export | `export function ProductCard()` |
| Hooks | camelCase, `use` prefix | `useCamera`, `useFaceLandmarks` |
| Types / Interfaces | PascalCase | `interface Product`, `type AdEvent` |
| Variables / functions | camelCase | `const productSlug`, `function fetchProducts()` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_CART_ITEMS` |
| Supabase table names | snake_case | `products`, `ad_events` |

## Module Boundaries

- `app/` — routing and page-level data fetching only; keep pages thin, delegate to components
- `components/` — UI only; no direct Supabase calls; receive data via props or context
- `lib/` — all external integrations (Supabase, MediaPipe, Three.js helpers); no React components here
- `hooks/` — browser-only logic; all files implicitly `"use client"`
- `types/` — pure TypeScript; no runtime imports

## Key Files

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout, global providers |
| `src/lib/supabase/server.ts` | Server-side Supabase client (RSC + Route Handlers) |
| `src/lib/supabase/client.ts` | Browser Supabase client |
| `src/lib/mediapipe/face-landmarker.ts` | MediaPipe Face Landmarker init and worker bridge |
| `src/lib/utils.ts` | `cn()` utility (clsx + tailwind-merge) |
| `src/types/` | Shared domain types consumed across the app |
| `public/models/` | GLTF/GLB files for 3D product models |
| `.env.example` | Canonical list of required environment variables |

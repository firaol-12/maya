# Tech Stack

## Languages

- **TypeScript** (strict mode, no `any`)

## Frameworks & Libraries

| Concern | Library / Service |
|---------|-------------------|
| Framework | Next.js 14+ with App Router |
| Styling | Tailwind CSS (utility classes only) |
| 3D rendering | Three.js via React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`) |
| Face tracking | MediaPipe Face Landmarker (WASM, in-browser only) |
| Image to 3D | fal (`@fal-ai/client`), called server-side only. Default model: `tripo3d/p2/image-to-3d` |
| Database / Auth / Files | Supabase (Postgres, Auth, Storage) via `@supabase/supabase-js` |
| PWA | Web app manifest plus a service worker (Serwist or equivalent) |
| Deployment | Vercel (HTTPS, required for camera access) |

## Tooling

- **Package manager:** npm
- **Build tool:** Next.js built-in (Turbopack in dev)
- **Type checking:** `tsc --noEmit` before every commit
- **Linter:** ESLint with `eslint-config-next`
- **Formatter:** Prettier (default config)

## Coding Conventions

### TypeScript
- `"strict": true`, no `any`, no `@ts-ignore` without an explaining comment
- `interface` for object shapes, `type` for unions and aliases
- Explicit return types on all functions and components
- Use `unknown` and narrow it instead of `any`

### React / Next.js
- Functional components only
- Server Components by default; `"use client"` only for browser APIs or interactivity (webcam, R3F canvas, event handlers)
- One component per file, named export matching the file name

### Styling
- Tailwind only: no CSS modules, no inline `style` props
- `cn()` (clsx + tailwind-merge) for conditional classes
- Mobile-first, because this is a PWA

### 3D / Three.js
- R3F scenes live inside a `"use client"` `<Canvas>`
- Prefer Drei helpers before raw Three.js
- Generated and uploaded models are stored in Supabase Storage; sample models can live in `public/models/`
- Product models are `.glb`

### MediaPipe
- Run inference in a Web Worker
- Never send webcam frames to any server
- Degrade gracefully if camera permission is denied

### Image-to-3D (fal)
- Use the `@fal-ai/client` package only in server code (Route Handlers or Server Actions). Never import it in Client Components and never expose `FAL_KEY`
- The model ID comes from the `FAL_IMAGE_TO_3D_MODEL` env var, so the model can be swapped without code changes
- Use the queue API (`fal.queue.submit`, then `fal.queue.status` and `fal.queue.result`) instead of holding one request open, because serverless functions time out. Do not use a long blocking `fal.subscribe` inside a request handler
- Treat conversion as an async job: save a job row with status `pending`, `processing`, `done` or `failed` plus the fal `request_id`, and let the client poll an API route for status
- Seller photos go to Supabase Storage first; pass the image URL to fal
- When a job finishes, download the `.glb` from the fal result and save it to Supabase Storage, then link it to the product, so Maya controls the final URL
- Handle failures: show the seller a clear error and a retry button, and keep a placeholder or sample model so the demo always works
- Keep photos and models free of personal data

### Ad Tracking
- Ad platform names and their official ad manager URLs live in one constants file, so they are easy to update
- The ad launcher only opens those URLs in a new tab; no ad platform APIs
- Tracked links carry a product ad code and optional advertiser ID as query parameters
- Events are sent to an ingestion Route Handler and saved in Supabase
- Never track personal data; use an anonymous session ID only

### PWA
- Provide a manifest and icons so the app is installable
- Never cache API routes or ad event requests
- Camera features require HTTPS

### Supabase
- Server client in Server Components and Route Handlers; browser client in Client Components only
- Never expose the service role key to the client
- Enable row-level security so sellers can only see their own products and ad data

## Environment Variables

| Variable | Scope | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Admin operations |
| `FAL_KEY` | Server only | fal API key (read automatically by `@fal-ai/client`) |
| `FAL_IMAGE_TO_3D_MODEL` | Server only | fal model ID, for example `tripo3d/p2/image-to-3d` |
| `NEXT_PUBLIC_APP_URL` | Public | Base URL used to build tracked ad links |

Store secrets in `.env.local` (never committed). Document variable names in `.env.example`.
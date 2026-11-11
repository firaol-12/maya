# Brand

## Identity

- **Product name:** Maya
- **Tagline:** "A tool to see"
- **Primary color:** `#1560F5` (blue) — defined as `--color-brand-500` in Tailwind tokens

## Color Tokens (Tailwind v4, defined in `globals.css`)

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-50` | `#EFF6FF` | Soft backgrounds, hover states |
| `brand-100` | `#DBEAFE` | Card fills, collection pills |
| `brand-200` | `#CFE0FF` | Borders, tints |
| `brand-300` | `#93C5FD` | — |
| `brand-400` | `#60A5FA` | Muted accents |
| `brand-500` | `#1560F5` | **Primary** — buttons, links, hero, accents |
| `brand-600` | `#1150D4` | Hover on primary |
| `brand-700` | `#0D40B3` | Active / pressed |
| `brand-800` | `#0A3092` | — |
| `brand-900` | `#072070` | — |
| `neutral-*` | Slate scale | Text, borders, backgrounds |

Always use token names (e.g. `bg-brand-500`) — never raw hex values.

## Logo Files

| File | Use on |
|------|--------|
| `public/brand/maya-logo.svg` | Light backgrounds (navbar, body) |
| `public/brand/maya-logo-white.svg` | Blue/dark backgrounds (footer, hero) |
| `public/brand/maya-favicon.svg` | Favicon, app icons |

## Style

- **Theme:** Clean, light, friendly. No dark mode.
- **Radius:** Large — cards use `rounded-[1.25rem]`/`rounded-2xl`, buttons use `rounded-full` (pill)
- **Surfaces:** White (`bg-white`) or very light blue (`bg-brand-50`) — no gray card backgrounds
- **Buttons:** Pill shape, `bg-brand-500 text-white` primary; `border-2 border-brand-500 text-brand-500` secondary
- **Typography:** Geist Sans (variable font, loaded via `next/font/google`)
- **Layout reference:** `docs/design-reference/img_a.jpg` (desktop hero), `img_b.jpg` (responsive). Copy structure, replace red with Maya blue.

## Do / Don't

- ✅ Use `cn()` (clsx + tailwind-merge) for conditional classes
- ✅ Tailwind classes only — no inline `style` props, no CSS modules
- ✅ White logo on blue backgrounds, blue logo on white backgrounds
- ❌ No dark mode overrides — Maya is light-only
- ❌ No raw hex values in JSX or CSS

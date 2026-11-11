# Supabase Setup

## 1. Create a Supabase project

Go to [supabase.com](https://supabase.com), create a new project, and copy the **Project URL** and **Anon key** from **Settings → API**.

## 2. Add environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # server-only, never expose to client
```

## 3. Run the migration

Open your Supabase project → **SQL Editor**, paste and run:

```
supabase/migrations/0001_create_products.sql
```

This creates the `products` table with RLS enabled (anonymous read-only).

## 4. Seed the data

In the same SQL Editor, paste and run:

```
supabase/seed.sql
```

This inserts 6 glasses products across different categories.

## 5. Fallback behavior

If `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` are not set, the app automatically falls back to local mock data (`src/lib/mock-data.ts`) so pages render correctly without a database connection.

## Schema reference

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | Primary key, auto-generated |
| `slug` | text | Unique URL-safe identifier |
| `name` | text | Display name |
| `description` | text | Full description |
| `price` | numeric(10,2) | In USD |
| `category` | text | `aviator`, `round`, `square`, `cat-eye`, `sport`, `bluelight` |
| `image_url` | text | Path relative to `public/` |
| `model_url` | text \| null | Path to `.glb` file (nullable until 3D spec) |
| `created_at` | timestamptz | Auto-set on insert |

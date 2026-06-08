# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ArtLogic — a Next.js 14 (App Router) marketing website for an IT business automation company, with an embedded admin dashboard for managing contact submissions. Supports Ukrainian (default) and English via next-intl.

## Commands

```bash
npm run dev              # Dev server on localhost:3000
npm run build            # Production build
npm run lint             # ESLint (next/core-web-vitals)
npm run prisma:generate  # Generate Prisma client after schema changes
npm run prisma:migrate   # Run database migrations (dev)
```

## Architecture

**Stack:** Next.js 14, TypeScript, Tailwind CSS 3, Prisma (PostgreSQL), Framer Motion, next-intl

**Path alias:** `@/*` → `./src/*`

### Routing (`src/app/`)

- `/[locale]` — public pages (home, about, contacts) under locale prefix (`uk` default, `en`)
- `/[locale]/admin/login` — admin authentication
- `/[locale]/admin/(protected)` — JWT-protected admin dashboard
- `/api/contact` — contact form POST (creates DB entry, sends email via Resend)
- `/api/admin/login|logout|submissions` — admin auth and submission management

Locale routing uses "as-needed" prefix strategy (Ukrainian has no prefix). Middleware in `src/middleware.ts` handles i18n routing.

### Key Directories

- `src/components/` — organized by feature: `home/`, `about/`, `contacts/`, `admin/`, `layout/`, `ui/`, `shared/`, `providers/`
- `src/lib/` — backend utilities: `auth.ts` (JWT via jose), `email.ts` (Resend), `prisma.ts` (singleton client)
- `src/i18n/` — internationalization config, routing, navigation helpers
- `messages/` — translation JSON files (`uk.json`, `en.json`)
- `prisma/schema.prisma` — single model: `ContactSubmission`

### Patterns

- **UI components** use class-variance-authority (CVA) for variants, `cn()` utility from `src/lib/utils.ts` for class merging (clsx + tailwind-merge)
- **Forms** use react-hook-form + zod validation + @hookform/resolvers
- **Animations** use Framer Motion with scroll-triggered reveals; Lenis for smooth scrolling; Spline for 3D hero
- **Auth** is JWT-based with HTTP-only cookies, 8-hour expiry. Admin credentials come from env vars (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` via bcryptjs)

### Brand Theme (tailwind.config.ts)

- `brand-bg`: #07071a, `brand-surface`: #0c0c20, `brand-purple`: #7c3aed, `brand-blue`: #2563eb, `brand-cyan`: #06b6d4
- Font: Manrope (Google Fonts)
- Dark-themed design with custom keyframe animations (spotlight, shimmer, float, fade-up, gradient-shift, etc.)

## Environment Variables

Required in `.env` (see `.env.example`): `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_ADMIN_TO`, `NEXT_PUBLIC_APP_URL`

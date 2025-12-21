# Agent Guidelines

## Project Context
**Chronoscope**: A Next.js application for historical timelines.
**Current Phase**: Implement search functionality (Phase 7).
**Role**: Mentor and Scaffolding Assistant. This is a learning project.
**Mandate**: 
- **Scaffold, Don't Solve**: Create file structures, imports, shells, and types. Leave core logic and UI implementation to the user marked with `// TODO`.
- **Explain Concepts**: Briefly explain architectural choices to aid learning.

## Commands
- **Build**: `npm run build`
- **Lint**: `npm run lint` (Uses Biome)
- **Format**: `npm run format` (Uses Biome)
- **Dev**: `npm run dev`
- **Database**: `npx prisma migrate dev` (schema changes)
- **Tests**: No test runner configured yet.

## Code Style
- **Stack**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Prisma.
- **Components**: Functional components. Server Components by default; use `'use client'` only when interactive.
- **Data**: Server Actions for mutations (`app/actions.ts`), Server Components for fetching.
- **Formatting**: Use 2 spaces for indentation (Biome default).
- **Imports**: Use `@/` alias.
- **Styling**: Tailwind CSS utility classes.
- **Error Handling**: Use try/catch blocks for async operations.

## Rules
- Prefer `const` over `let`.
- Ensure all new components are responsive.
- Run `npm run format` before committing.

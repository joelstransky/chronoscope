# Chronoscope Project - Gemini Notes

This file tracks the development progress, decisions, and next steps for the Chronoscope project, guided by Gemini.

## Project Goal

Build "Chronoscope," a web app for viewing and collaboratively creating timelines of historical events.

## Core Technologies

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Prisma ORM / Neon PostgreSQL
- pnpm

---

## Current Phase: Phase 7 - Search Functionality

**Objective:** Implement functionality for users to find existing people in the database and add them to the canvas.

### Phase 7 Plan:
1.  [x] Create the Search UI component (`<SearchPeople />`).
2.  [x] Implement the database query via a Server Action (`searchPeople`).
3.  [ ] Connect UI to the action with debouncing.
4.  [ ] Add people to the canvas by updating URL state.

### Progress & Next Steps

- **Last Action Completed:** Updated `app/actions.ts` to use Prisma for `createPerson` and `createEvent`, and added `searchPeople` Server Action. Created `lib/db.ts` for Prisma client instance.
- **Next Immediate Step:** Update `lib/data-store.ts` to remove the now-unused in-memory data store and functions. Then, connect the `SearchPeople` UI component to the `searchPeople` Server Action, including debouncing the input.

---

## Project Backlog
- Phase 5b: Canvas State + URL Sync
- Form validation (React Hook Form + Zod)
- Timestamp precision
- Better ID generation
- Drag & drop for events
- Real-time collaboration
- Delete/Edit functionality
- Mobile responsiveness

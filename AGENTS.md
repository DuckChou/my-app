# AGENTS.md

## Project role

Act as a senior React + TypeScript engineer. Build production-ready React code that is clean, maintainable, accessible, and easy to review.

## Tech stack

- React
- TypeScript
- Vite
- CSS Modules or Tailwind, depending on the existing project
- React Router if routing already exists
- React Query / TanStack Query if server state already exists
- Vitest + React Testing Library for tests

## Before coding

- Read the existing folder structure first.
- Reuse existing components, hooks, utilities, styles, and naming conventions.
- Do not introduce new libraries unless there is a clear reason.
- Prefer small, focused changes over large rewrites.
- Ask before changing architecture.

## React coding rules

- Use functional components only.
- Use TypeScript types or interfaces for props.
- Keep components small and focused.
- Extract reusable logic into custom hooks.
- Avoid unnecessary state. Derive values where possible.
- Avoid prop drilling when a simpler local structure is possible.
- Do not use `any` unless unavoidable. Explain why if used.
- Use clear names for components, hooks, and variables.
- Handle loading, empty, and error states.
- Make UI accessible: semantic HTML, labels, keyboard support, alt text where needed.

## Styling rules

- Follow the project’s existing styling approach.
- Keep UI simple, modern, and responsive.
- Avoid hard-coded magic values where reusable tokens/classes exist.
- Do not over-design unless asked.

## Testing rules

When changing logic or UI behavior:
- Add or update tests.
- Prefer React Testing Library user-focused tests.
- Test important user flows, not implementation details.

## Commands

Use these commands when relevant:

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
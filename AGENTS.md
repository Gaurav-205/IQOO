# AGENTS.md — Visible / iQOO Project Guidelines

React 19 + TypeScript + Tailwind CSS v4 project running inside Figma Make & Vite.

## Mandatory Rule for Every Prompt: Use All Installed Skills

For **EVERY** prompt and coding task in this project, you MUST actively apply the principles from all installed skills in `.agents/skills/` and the design specifications in `DESIGN.md`:

### 1. Visual & Aesthetic Mastery (`frontend-design`, `high-end-visual-design`, `DESIGN.md`)
- **Aesthetic Direction**: Follow the Cohere 2026 enterprise AI design language specified in [`DESIGN.md`](./DESIGN.md) — deep green-black surfaces (`#070a10`, `#003c33`, `#071829`), soft stone accents, and high-contrast coral (`#ff7759`), saffron (`#ff9a3c`), and verify emerald (`#4fd1a1`).
- **No Generic Templates**: Avoid generic cards and cookie-cutter UI. Craft distinct, purposeful components with intentional typographic hierarchy, tight letter-spacing, and hairline borders.
- **Typography**: Pair bold display headlines (`Bricolage Grotesque`, `Space Grotesk`) with crisp mono metadata labels (`DM Mono`) and localized fonts (`Hind`).

### 2. Micro-Interactions & Polish (`emil-design-eng`, `apple-design`)
- **Tactile UI**: Every interactive element must provide instant visual feedback (smooth active scales, hover brightness, loading spinners, and laser/beam animation passes).
- **Transitions & Springs**: Use smooth cubic-bezier easing (`cubic-bezier(0.22, 1, 0.36, 1)`) for entrance animations and state transitions.
- **Attention to Detail**: Subtle gradients, glowing pill tags, ambient background meshes, and smooth voice narration indicators.

### 3. Engineering & React Best Practices (`vercel-react-best-practices`, `codebase-design`)
- **React 19 Patterns**: Proper use of hooks (`useMemo`, `useState`, `useRef`, `useEffect`).
- **Clean State & Cleanups**: Always clean up asynchronous effects (e.g. `speechSynthesis.cancel()`, `clearTimeout`, `cancelAnimationFrame`, and media stream track stops).
- **Decoupled Architecture**: Keep mock data, state store, UI primitives, and screen modules neatly separated across `src/lib/` and `src/components/`.

### 4. Accessibility & Quality Assurance (`web-design-guidelines`)
- **Keyboard & Touch Accessibility**: All buttons, links, and switches must have explicit `aria-label`, visible focus/active rings, and minimum 44×44px touch targets.
- **Contrast & Hierarchy**: Ensure all text elements meet WCAG AAA/AA contrast against their backgrounds.
- **Bilingual Experience**: Support complete English and Hindi parity across all UI strings and voice narration.

### 5. Repository Readiness & Documentation Mastery (`crafting-effective-readmes`, `make-documentation`)
- **GitHub Ready**: Maintain an up-to-date, comprehensive, and beautifully formatted [`README.md`](./README.md) with badges, architecture diagrams, and clear step-by-step local setup instructions.
- **Official Submission**: Maintain [`SUBMISSION.md`](./SUBMISSION.md) as the single source of truth for hackathon judging criteria, problem statements, NPU technical specifications, and 30-hour roadmaps.

---

## Project Structure & Conventions

- `src/main.tsx` — React entrypoint
- `src/App.tsx` — Main application shell & dual phone + Office Kit desktop station
- `src/components/screens.tsx` — 10 core user journey screens (Welcome, Consent, Connect, Analysis, Verify, Profile, Offline, Share, Privacy)
- `src/components/ui.tsx` — Reusable geometric hairline icons, buttons, pills, and cards
- `src/lib/data.ts` — Mock services, gig platform data, earnings history, and Web Speech API helpers
- `src/lib/store.ts` — Global store interface and navigation state
- `src/index.css` — Tailwind CSS v4 `@theme` tokens, keyframes, and global styles
- `README.md` — GitHub repository presentation and quickstart
- `SUBMISSION.md` — Formal Hackathon Round 1 submission dossier
- `DESIGN.md` — Canonical Cohere design tokens and component specifications

## Development & Build Verification

- **Package Manager**: Always use `pnpm` (e.g. `pnpm run build`, `pnpm run format`).
- **Format**: Run `pnpm run format` (`oxfmt src`) after modifying source files.
- **Typecheck**: Verify that `pnpm run build` succeeds with zero errors.
- **Strings**: Use double quotes for strings with apostrophes (`"We're ready"`) or escape them properly.

# Contributing to Visible (विज़िबल)

Thank you for your interest in contributing to **Visible** — the phone-native credit-readiness profile for India's gig workforce!

## Development Guidelines

1. **Design Tokens**: All visual styles must adhere strictly to the Cohere 2026 enterprise AI design specification documented in [`DESIGN.md`](./DESIGN.md).
2. **React 19 Hooks**: Avoid legacy class components or redundant state effects. Always properly dispose asynchronous effects (such as `speechSynthesis.cancel()`, `clearTimeout`, and media stream tracks).
3. **Typography**: Pair display headlines with monospaced metadata labels (`DM Mono`) and localized fonts (`Hind`).
4. **Bilingual Parity**: Ensure every customer-facing feature maintains full English and Hindi (`hi-IN`) parity.

## Local Development Workflow

```bash
# 1. Install dependencies
pnpm install

# 2. Start Vite development server
pnpm run dev

# 3. Format code with oxfmt
pnpm run format

# 4. Validate production bundle
pnpm run build
```

## Pull Request Process

1. Create a descriptive feature branch (`git checkout -b feat/your-feature-name`).
2. Verify that `pnpm run build` succeeds with zero errors.
3. Commit with semantic commit messages (`feat: ...`, `fix: ...`, `docs: ...`).
4. Submit your pull request with a summary of user-facing changes and screenshots.

# Password Intelligence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a professional password security analysis console from the existing React/Vite project.

**Architecture:** Keep password analysis as a pure utility and compose the interface from focused React components. Styling is centralized in one responsive CSS design system; no backend or additional runtime dependency is introduced.

**Tech Stack:** React 19, Vite 8, JavaScript, CSS, Node built-in test runner, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-08-28-password-intelligence-design.md`

## Global Constraints
- Preserve Vite base path `/forca_senha/`.
- Passwords must never be persisted, logged, transmitted, or stored.
- Use a 0–100 heuristic score with five visible classifications.
- Keep the application deployable to GitHub Pages.
- No new runtime dependency.

---

### Task 1: Password analysis engine

**Files:**
- Create: `tests/passwordAnalysis.test.js`
- Create: `src/utils/analyzePassword.js`
- Modify: `package.json`

**Interfaces:**
- Produces: `analyzePassword(password: string) -> analysis object`

- [ ] Write Node tests covering empty, weak, sequential, repeated, and strong passwords.
- [ ] Run `npm test` and verify failure because the analysis module does not exist.
- [ ] Implement the pure analysis function and scoring rules.
- [ ] Run `npm test` and verify all tests pass.

### Task 2: Application interface

**Files:**
- Create: `src/App.jsx`
- Create: `src/main.jsx`
- Create: `src/components/PasswordInput.jsx`
- Create: `src/components/SecurityScore.jsx`
- Create: `src/components/SecurityCriteria.jsx`
- Create: `src/components/TechnicalAnalysis.jsx`
- Create: `src/components/SecurityNotice.jsx`
- Create: `src/styles.css`
- Replace: `index.html`
- Create: `public/favicon.svg`

**Interfaces:**
- Consumes: `analyzePassword(password)` from Task 1.

- [ ] Compose live password state and analysis in `App.jsx`.
- [ ] Build focused visual components for input, score, criteria, metrics, and privacy notice.
- [ ] Apply responsive enterprise security-console styling and reduced-motion handling.
- [ ] Replace generic HTML title/metadata and add branded favicon.
- [ ] Run `npm run lint` and `npm run build`.

### Task 3: Portfolio documentation

**Files:**
- Replace: `README.md`

- [ ] Document product positioning, feature set, privacy behavior, stack, structure, commands, tests, build, and deployment.
- [ ] Run `npm test`, `npm run lint`, and `npm run build` as final verification.

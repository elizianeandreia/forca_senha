# Password Intelligence — Design Specification

## Goal
Transform the existing password checker into a polished, portfolio-grade security analysis console while preserving React, Vite, GitHub Pages deployment, and fully local password processing.

## Product positioning
The interface presents the project as **Password Intelligence — Security Analysis Console**, developed by **LTHS Tecnologia**. The product should feel like a real security/DevSecOps utility rather than a classroom exercise.

## Core experience
- User enters a password in a single prominent secure input.
- Analysis updates immediately as the user types.
- A score from 0 to 100 is shown with a five-level classification: critical, weak, fair, strong, excellent.
- The UI explains the score through specific criteria and technical indicators.
- The password is never persisted, logged, transmitted, or stored.
- User can show/hide the password and clear the current analysis.

## Analysis model
The score evaluates:
- password length;
- lowercase letters;
- uppercase letters;
- digits;
- symbols;
- character variety;
- repeated characters;
- simple sequential patterns;
- common weak-password patterns.

The UI must not claim that the score is a cryptographic guarantee. It is an educational heuristic.

## Interface architecture
- `App.jsx`: composition and live password state.
- `PasswordInput.jsx`: password field, visibility toggle, clear action.
- `SecurityScore.jsx`: score ring, classification, progress bar.
- `SecurityCriteria.jsx`: requirement checklist.
- `TechnicalAnalysis.jsx`: compact metrics for length, variety, repetitions, and sequences.
- `SecurityNotice.jsx`: local-processing/privacy notice.
- `analyzePassword.js`: pure analysis logic independent of React.
- `styles.css`: complete design system and responsive layout.

## Visual direction
- Dark enterprise security console.
- Near-black graphite canvas with layered panels.
- Cyan/teal primary accent, with semantic warning/danger/success states.
- Large modern sans-serif typography plus monospaced metric labels.
- Subtle grid/noise-like CSS details, restrained glow, no stereotypical hacker imagery.
- Desktop dashboard layout that collapses cleanly to mobile.

## Accessibility
- All controls keyboard accessible.
- Form label available to assistive technology.
- Sufficient contrast for text and semantic states.
- Score change communicated through visible text, not color alone.
- Respect `prefers-reduced-motion`.

## Privacy and security language
Display: “Sua senha é processada somente neste navegador. Nada é enviado ou armazenado.”

## Deployment constraints
- Keep Vite base path `/forca_senha/`.
- Keep GitHub Pages deploy scripts.
- No backend and no new runtime dependency required.

## Documentation
README must explain product goal, capabilities, local privacy model, stack, project structure, local execution, tests, build, and deploy.

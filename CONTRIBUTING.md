# Contributing to ml-visuals

Visual teaching material is hard. Thanks for helping.

## Adding a new component

Open an issue first with:
- **Concept being taught** (e.g., "what is an eigenvector")
- **Why a 3D animation helps** vs static math
- **Sketch / reference** of what it should look like
- **Whether the Manim version is needed too** (usually yes)

Once we agree on the shape:

1. Add the component to `src/r3f/<ComponentName>.tsx`.
2. Add a demo to `examples/` (Vite picks them up automatically).
3. Add a story/story-like test to `src/r3f/<ComponentName>.test.tsx` — at minimum, "renders without crashing" + props snapshot.
4. Add the Manim scene to `manim/<concept>.py` if relevant.
5. Update the table in the top-level `README.md`.

## Quality bars

- **Performance:** 60fps on an integrated GPU at 1080p. If it drops below 30fps, profile and fix before merge.
- **Accessibility:** keyboard navigable, `prefers-reduced-motion` respected (no autoplay animation if the user opted out).
- **Typing:** strict TypeScript, no `any`.
- **Visuals:** colorblind-safe palette (we use Okabe-Ito by default).

## Code style

- TypeScript strict. ESLint + Prettier configs in repo.
- Functional components only; no class components.
- Three.js scene logic lives inside `useFrame` or `useEffect`, not in render.
- Geometry / material objects memoized.

## Math correctness

Math errors are bugs. If your component teaches *wrong* math, it's worse than no component. Tests for any closed-form value the component depends on.

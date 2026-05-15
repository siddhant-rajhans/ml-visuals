# ml-visuals

> Reusable 3D visualizations for ML concepts.
> Built with React Three Fiber + Manim. Embed in notebooks, blog posts, docs, or your own teaching materials.
> Maintained by [Siddhant Rajhans](https://siddhant-rajhans.github.io/).

[![npm version](https://img.shields.io/npm/v/@siddhant-rajhans/ml-visuals)](https://www.npmjs.com/package/@siddhant-rajhans/ml-visuals)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

## Why this repo exists

Every ML teacher rebuilds the same visualizations: a loss bowl with a rolling ball, attention as a connection lattice, a 3D PCA scatter. We can do this once and share it.

This is the asset library that powers:
- The [`learn-ml`](https://github.com/siddhant-rajhans/learn-ml) curriculum
- The [Siddhant Rajhans YouTube channels](https://siddhant-rajhans.github.io/)
- Anyone else who wants to teach ML visually

## What's inside

### React Three Fiber components (web, interactive)

| Component | What it shows | Use in |
|---|---|---|
| `<LossBowl />` | A 3D paraboloid with a ball doing SGD; controllable path + LR | Calc / optimization videos, intro to gradient descent |
| `<VectorRotation />` | A 3D arrow rotated by an interactive matrix | Linear algebra, change of basis |
| `<TokenStream />` | Token vectors flowing through stacked transformer blocks | Attention, transformer intuition |
| *(more coming — see [roadmap](#roadmap))* | | |

### Manim scene classes (video, pre-rendered)

Same visual concepts, narrative-friendly versions in [`manim/`](manim/) for use inside video productions.

## Install (web)

```bash
npm install @siddhant-rajhans/ml-visuals three @react-three/fiber @react-three/drei
```

```tsx
import { LossBowl } from '@siddhant-rajhans/ml-visuals'

export default function Page() {
  return (
    <div style={{ width: 600, height: 400 }}>
      <LossBowl learningRate={0.1} />
    </div>
  )
}
```

## Run the example gallery

```bash
git clone https://github.com/siddhant-rajhans/ml-visuals.git
cd ml-visuals
npm install
npm run dev
```

Then open the URL Vite prints. Every component has a live demo.

## Use the Manim scenes

```bash
cd manim
uv sync
uv run manim -pql loss_landscape.py LossLandscape3D
```

Output lands in `manim/media/`.

## Roadmap

The library mirrors the [`learn-ml`](https://github.com/siddhant-rajhans/learn-ml) curriculum. Currently in flight:

- [x] Loss bowl (gradient descent)
- [x] Vector rotation (matrix as transformation)
- [x] Token stream (transformer intuition)
- [ ] Eigenvector demo (matrix as stretch)
- [ ] PCA on 3D ellipsoid
- [ ] Attention heatmap
- [ ] VAE latent space scatter + interpolation
- [ ] Diffusion denoising point cloud
- [ ] Convolution kernel sliding over feature map

PRs welcome on any of these. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Design principles

1. **Visual-first.** Every component answers a question you couldn't easily answer from a formula.
2. **Interactive over static.** If a learner can change a parameter and watch the result, do that.
3. **Composable.** Components are pure React — drop them anywhere.
4. **Performant.** No 60fps tax on a learner's laptop fan. Frame budgets respected.
5. **Beautiful.** This is teaching material. If it's ugly, it doesn't get used.

## Contributing

Open an issue first if you're adding a whole new component. Small fixes (perf, typing, accessibility) can go straight to a PR. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

[MIT](LICENSE). Use these visuals anywhere — your blog, your bootcamp, your textbook. Attribution is appreciated, not required.

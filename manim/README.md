# Manim scenes

Pre-rendered, narrative-friendly versions of the same concepts as the R3F components. Used inside YouTube video productions where you want full control over pacing, voiceover sync, and camera moves.

## Setup

We use [`uv`](https://docs.astral.sh/uv/) for Python tooling.

```bash
cd manim
uv venv
uv pip install manim
```

You also need an FFmpeg install on your system (Manim shells out to it).

## Render a scene

```bash
uv run manim -pql loss_landscape.py LossLandscape3D
```

- `-p` opens the result when done.
- `-ql` = "quick low" (preview quality). Use `-qh` or `-qk` for final renders.

Output lands in `manim/media/videos/<scene>/<quality>/`.

## Naming convention

One file per concept; one or more `Scene` classes inside.

- `loss_landscape.py` → `LossLandscape3D`
- `vector_transforms.py` → `VectorBasics`, `MatrixAsTransform`, `EigenDemo`
- `attention.py` → `AttentionLattice`, `MultiHead`

## Reuse rules

If a scene class has ≥3 callers (videos referencing it), promote shared parameters to the constructor. Don't fork scenes; parameterize them.

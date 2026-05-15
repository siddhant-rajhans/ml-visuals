"""3D loss-landscape scene with a ball doing SGD.

Used in:
  - learn-ml Phase 1 (Calculus and Optimization)
  - learn-ml Phase 4 (Backprop and Optim)
  - YouTube videos covering gradient descent

Render with:
    uv run manim -pql loss_landscape.py LossLandscape3D
"""

from manim import (
    DEGREES,
    Create,
    FadeIn,
    Sphere,
    Surface,
    ThreeDAxes,
    ThreeDScene,
)


class LossLandscape3D(ThreeDScene):
    """Show z = a*(x^2 + y^2) and a ball descending toward (0, 0)."""

    STEEPNESS = 0.4

    def construct(self) -> None:
        axes = ThreeDAxes(x_range=[-2.5, 2.5], y_range=[-2.5, 2.5], z_range=[0, 4])
        surface = Surface(
            lambda u, v: axes.c2p(u, v, self.STEEPNESS * (u**2 + v**2)),
            u_range=[-2, 2],
            v_range=[-2, 2],
            resolution=(32, 32),
            checkerboard_colors=False,
        )
        surface.set_style(fill_opacity=0.6, stroke_width=0.5)

        # Initial ball position
        start_x, start_y = 1.8, 1.8
        start_z = self.STEEPNESS * (start_x**2 + start_y**2)
        ball = Sphere(radius=0.1).move_to(axes.c2p(start_x, start_y, start_z))

        self.set_camera_orientation(phi=70 * DEGREES, theta=-30 * DEGREES)
        self.play(Create(axes), Create(surface))
        self.play(FadeIn(ball))

        # SGD-like path
        path = [
            (1.4, 1.4),
            (1.0, 1.0),
            (0.6, 0.5),
            (0.3, 0.2),
            (0.1, 0.05),
            (0.0, 0.0),
        ]
        for x, y in path:
            z = self.STEEPNESS * (x**2 + y**2)
            self.play(ball.animate.move_to(axes.c2p(x, y, z)), run_time=0.6)

        self.begin_ambient_camera_rotation(rate=0.2)
        self.wait(3)
        self.stop_ambient_camera_rotation()

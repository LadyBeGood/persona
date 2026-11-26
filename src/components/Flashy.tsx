// Flashy.tsx
import { memo, useEffect, useRef, type ReactNode } from "react";

type Point = [number, number];
type Quad = [Point, Point, Point, Point];

type FlashyProps = {
    children: ReactNode;
    /** One jittering polygon per colour. */
    colors?: string[];
    /** Time (ms) to morph from one random shape to the next. */
    duration?: number;
    /** How far each corner may drift inward, as % of the box. A number applies to both axes. */
    jitter?: number | { x: number; y: number };
    /** Stretch the shape relative to its children's box. */
    scale?: [x: number, y: number];
    /** Rotation in degrees. */
    rotate?: number;
    /** Draw the shapes behind or on top of the children. */
    layer?: "behind" | "over";
    /** Blend mode between the shapes themselves (e.g. "multiply" for red/cyan overlap). */
    shapeBlendMode?: React.CSSProperties["mixBlendMode"];
    /** Blend mode of the whole shape group against whatever is underneath. */
    blendMode?: React.CSSProperties["mixBlendMode"];
    /** Turn the effect on/off without unmounting the children. */
    active?: boolean;
    /** Freeze the shapes in place; set back to false to resume from the same frame. */
    paused?: boolean;
    className?: string;
};

type AnimState = { from: Quad[]; to: Quad[]; elapsed: number };

// Each corner of the quad starts at a corner of the box and drifts inward by up to `jitter`.
const CORNERS: { origin: Point; direction: Point }[] = [
    { origin: [0, 0], direction: [1, 1] },
    { origin: [100, 0], direction: [-1, 1] },
    { origin: [100, 100], direction: [-1, -1] },
    { origin: [0, 100], direction: [1, -1] },
];

function randomQuad(jx: number, jy: number): Quad {
    return CORNERS.map(({ origin, direction }) => [
        origin[0] + direction[0] * Math.random() * jx,
        origin[1] + direction[1] * Math.random() * jy,
    ]) as Quad;
}

function lerpQuad(from: Quad, to: Quad, t: number): Quad {
    return from.map(([x, y], i) => [
        x + (to[i][0] - x) * t,
        y + (to[i][1] - y) * t,
    ]) as Quad;
}

const toPoints = (quad: Quad) => quad.map(([x, y]) => `${x},${y}`).join(" ");

const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Flashy({
    children,
    colors = ["#ffffff"],
    duration = 120,
    jitter = 20,
    scale = [1, 1],
    rotate = 0,
    layer = "behind",
    shapeBlendMode,
    blendMode,
    active = true,
    paused = false,
    className = "",
}: FlashyProps) {
    const polygons = useRef<(SVGPolygonElement | null)[]>([]);
    const state = useRef<AnimState | null>(null);

    const { x: jx, y: jy } = typeof jitter === "number" ? { x: jitter, y: jitter } : jitter;
    const shapeCount = colors.length;

    useEffect(() => {
        state.current = null;
    }, [active, jx, jy, shapeCount]);

    useEffect(() => {
        if (!active) return;

        const newQuads = () => Array.from({ length: shapeCount }, () => randomQuad(jx, jy));
        const draw = (quads: Quad[]) =>
            quads.forEach((quad, i) => polygons.current[i]?.setAttribute("points", toPoints(quad)));

        const s = (state.current ??= { from: newQuads(), to: newQuads(), elapsed: 0 });
        const render = () => {
            const t = Math.min(s.elapsed / duration, 1);
            draw(s.from.map((quad, i) => lerpQuad(quad, s.to[i], t)));
        };

        render(); // shows the frozen frame immediately when paused or reduced-motion
        if (paused || prefersReducedMotion()) return;

        let frame = 0;
        let last: number | null = null;

        function tick(now: number) {
            s.elapsed += last === null ? 0 : now - last;
            last = now;

            if (s.elapsed >= duration) {
                s.from = s.to;
                s.to = newQuads();
                s.elapsed = 0;
            }
            render();
            frame = requestAnimationFrame(tick);
        }

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [active, paused, duration, jx, jy, shapeCount]);

    const behind = layer === "behind";

    return (
        <span className={`relative inline-block ${behind ? "isolate" : ""} ${className}`}>
            {active && (
                <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 h-full w-full ${behind ? "-z-10" : "z-10"}`}
                    style={{
                        transform: `rotate(${rotate}deg) scale(${scale[0]}, ${scale[1]})`,
                        mixBlendMode: blendMode,
                    }}
                >
                    {colors.map((fill, i) => (
                        <polygon
                            key={i}
                            ref={(el) => { polygons.current[i] = el; }}
                            fill={fill}
                            style={{ mixBlendMode: shapeBlendMode }}
                        />
                    ))}
                </svg>
            )}
            {children}
        </span>
    );
}

export default memo(Flashy);
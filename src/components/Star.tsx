
import { useEffect, useId, useRef } from "react";

type StarAnimationProps = {
    direction?: "inwards" | "outwards";
    light?: string;
    dark?: string;
    className?: string;
};

export default function StarAnimation({
    direction = "outwards",
    light = "var(--persona-light-grey)",
    dark = "var(--persona-black)",
    className = "",
}: StarAnimationProps) {
    const duration = 6000;
    const starCount = 6;
    const containerRef = useRef<SVGGElement | null>(null);
    const id = useId();
    const starId = `star-${id}`;
    const clipId = `starClip-${id}`;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const sprites = Array.from(container.querySelectorAll<SVGUseElement>(".concentric-star-sprite"));
        if (sprites.length === 0) return;

        const epoch = performance.now();
        let animationFrameId = 0;

        const tick = (now: number) => {
            const elapsed = now - epoch;

            const items = sprites.map((el, i) => {
                const stagger = (i / sprites.length) * duration;
                const phase = ((elapsed + stagger) % duration) / duration;
                const scale = direction === "outwards" ? 1 - phase : phase;
                el.style.transform = `scale(${scale})`;
                return { el, scale };
            });

            // Largest on bottom, smallest on top
            items.sort((a, b) => b.scale - a.scale);
            const desired = items.map((item) => item.el);
            const current = Array.from(container.children);
            if (desired.some((el, i) => current[i] !== el)) {
                desired.forEach((el) => container.appendChild(el));
            }

            animationFrameId = requestAnimationFrame(tick);
        };

        animationFrameId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animationFrameId);
    }, [direction, duration]);

    return (
        <div className={"absolute " + className}>
            <svg viewBox="0 0 500 500" className="h-full w-full">
                <defs>
                    <polygon
                        id={starId}
                        points="250,0 315,160 500,185 365,300 405,500 250,390 95,500 135,300 0,185 185,160"
                    />
                    <clipPath id={clipId}>
                        <use
                            href={`#${starId}`}
                            style={{
                                transform: "scale(0.83)",
                                transformBox: "view-box",
                                transformOrigin: "center",
                            }}
                        />
                    </clipPath>
                </defs>

                <g ref={containerRef} clipPath={`url(#${clipId})`}>
                    {Array.from({ length: starCount }).map((_, i) => (
                        <use
                            key={i}
                            href={`#${starId}`}
                            style={{
                                fill: i % 2 === 0 ? dark : light,
                                transformBox: "view-box",
                                transformOrigin: "center",
                                willChange: "transform",
                            }}
                            className="concentric-star-sprite"
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
}

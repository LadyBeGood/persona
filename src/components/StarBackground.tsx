import { useRef, useId } from "react";

const starData = [
    // Home page
    { direction: "outwards", className: "w-[24%]   left-[75%]    top-[29%]   -rotate-40",                             },
    { direction: "outwards", className: "w-[20%]   left-[84%]    top-[48%]   -rotate-10",                             },
    { direction: "inwards",  className: "w-[23%]   left-[88%]    top-[-10%]  -rotate-10",                             },
    { direction: "inwards",  className: "w-[30%]   left-[85%]    top-[4%]     rotate-16",                             },
    { direction: "inwards",  className: "w-[20%]   left-[70%]    top-[-10%]   rotate-6 ",                             },
    { direction: "inwards",  className: "w-[22%]   left-[75%]    top-[50%]   -rotate-12",                             },
    { direction: "outwards", className: "w-[26%]   left-[82%]    top-[66%]   -rotate-20",                             },
    { direction: "inwards",  className: "w-[25%]   left-[38%]    top-[78%]             ",                             },
    { direction: "outwards", className: "w-[33%]   left-[74.75%] top-[-19%]   rotate-33", dark: "var(--persona-grey)" },
    { direction: "inwards",  className: "w-[20%]   left-[83%]    top-[16%]    rotate-33",                             },
    { direction: "outwards", className: "w-[30%]   left-[59%]    top-[-22%]  -rotate-10",                             },
    { direction: "inwards",  className: "w-[26.5%] left-[45%]    top-[-20%]   rotate-5 ",                             },
    { direction: "inwards",  className: "w-[28%]   left-[65.75%] top-[12%]    rotate-20", dark: "var(--persona-grey)" },
    { direction: "outwards", className: "w-[41%]   left-[54%]    top-[23%]    rotate-12",                             },
    { direction: "outwards", className: "w-[20%]   left-[87%]    top-[55%]   -rotate-40", dark: "var(--persona-grey)" },
    { direction: "outwards", className: "w-[23%]   left-[85%]    top-[30%]    rotate-10",                             },
    { direction: "inwards",  className: "w-[28.5%] left-[68.5%]  top-[-1%]   -rotate-10",                             },
] as const;


export default function StarBackground() {
    const duration = 6000;
    const starCount = 6;


    return (
        <div className="w-full h-full relative">
            {starData.map((data, i) => 
                <div key={i}>
                    123
                </div>
            )}
        </div>
    )
}














/*


type StarAnimationProps = {
    direction?: "inwards" | "outwards",
    light?: string,
    dark?: string,
    className?: string,
}

export default function StarAnimation({ direction = "outwards", light = "var(--color-light-grey)", dark = "var(--color-black)", className = "" }: StarAnimationProps) {
    const duration = 6000;
    const starCount = 6;

    const starSpriteContainerRef = useRef<SVGGElement | null>(null);

    const id = useId();
    const starId = `star-${id}`;
    const clipId = `starClip-${id}`;

    useEffect(() => {
        const starSpriteContainerElement = starSpriteContainerRef.current;
        if (starSpriteContainerElement === null) return;

        let starSpriteElementList = Array.from(starSpriteContainerElement.querySelectorAll<SVGUseElement>(".concentric-star-sprite"));
        if (direction === "outwards") {
            starSpriteElementList.reverse();
        }

        const cleanupFunctions: Array<() => void> = [];

        starSpriteElementList.forEach((starSpriteElement, index) => {
            // Stagger animation delay across all stars
            const delay = -(index / starSpriteElementList.length) * duration;
            starSpriteElement.style.animationDelay = `${delay}ms`;

            // Cycle DOM element order on animation loop
            const handleAnimationIteration = () => {
                starSpriteElement.style.animationDelay = "0ms";
                if (direction === "inwards") {
                    starSpriteContainerElement.prepend(starSpriteElement);
                } else {
                    starSpriteContainerElement.append(starSpriteElement);
                }
            };

            starSpriteElement.addEventListener("animationiteration", handleAnimationIteration);

            const handleVisibilityChange = () => {
                if (document.visibilityState == 'hidden') {
                    starSpriteElement.style.animationPlayState = 'running';
                }
            }

            document.addEventListener("visibilitychange", handleVisibilityChange);

            cleanupFunctions.push(() => {
                starSpriteElement.removeEventListener("animationiteration", handleAnimationIteration);
                document.removeEventListener("visibilitychange", handleVisibilityChange);
            });
        });

        return () => {
            cleanupFunctions.forEach((cleanup) => cleanup());
        };
    }, [duration, starCount]);

    return (
        <>
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
                                // Got 83 from trial and error
                                style={{ transform: "scale(0.83)", transformOrigin: "center" }} />
                        </clipPath>
                    </defs>

                    <g ref={starSpriteContainerRef} clipPath={`url(#${clipId})`}>
                        {Array.from({ length: starCount }).map((_, i) => (
                            <use
                                key={i}
                                href={`#${starId}`}
                                style={{ 
                                    fill: i % 2 === 0 ? dark : light,
                                    animation: `shrink-${direction} ${duration}ms linear infinite`,
                                    // transformBox: "fill-box",
                                    transformOrigin: "center",
                                    willChange: "transform",
                                }}
                                className={`concentric-star-sprite animate-shrink`} />
                        ))}
                    </g>
                </svg>
            </div>
        </>
    );
}


import { useEffect, useId, useRef } from "react";

type StarAnimationProps = {
    direction?: "inwards" | "outwards";
    light?: string;
    dark?: string;
    className?: string;
};

export default function StarAnimation({
    direction = "outwards",
    light = "var(--color-light-grey)",
    dark = "var(--color-black)",
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

*/
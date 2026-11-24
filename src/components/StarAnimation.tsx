
import { useEffect, useRef } from "react";

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
    className = "" 
}: StarAnimationProps) {
    const duration = 6000;
    const starCount = 6;

    const starSpriteContainerRef = useRef<SVGGElement | null>(null);

    // useEffect(() => {
    //     const starSpriteContainerElement = starSpriteContainerRef.current;
    //     if (starSpriteContainerElement === null) return;

    //     let starSpriteElementList = Array.from(starSpriteContainerElement.querySelectorAll<SVGUseElement>(".concentric-star-sprite"));
    //     if (direction === "outwards") {
    //         starSpriteElementList.reverse();
    //     }

    //     const cleanupFunctions: Array<() => void> = [];

    //     for (const [index, starSpriteElement] of starSpriteElementList.entries()) {
    //         // Stagger animation delay across all stars
    //         starSpriteElement.style.animationDelay = `${-(index / starSpriteElementList.length) * duration}ms`;

    //         // Cycle DOM element order on animation loop
    //         function handleAnimationIteration() {
    //             // console.log("here");

    //             starSpriteElement.style.animationDelay = "0ms";
                
    //             // We need this line once again, because function declarations are hoisted
    //             if (starSpriteContainerElement === null) 
    //                 return;

    //             if (direction === "inwards") {
    //                 starSpriteContainerElement.prepend(starSpriteElement);
    //             } else {
    //                 starSpriteContainerElement.append(starSpriteElement);
    //             }
    //         }

    //         starSpriteElement.addEventListener("animationiteration", handleAnimationIteration);
            
    //         cleanupFunctions.push(() => {
    //             starSpriteElement.removeEventListener("animationiteration", handleAnimationIteration);
    //         });
    //     }

    //     return () => {
    //         cleanupFunctions.forEach((cleanup) => cleanup());
    //     };
    // }, [duration, starCount, direction]);
    // useEffect(() => {
    //     const container = starSpriteContainerRef.current;
    //     if (container === null) return;

    //     const stars = Array.from(container.querySelectorAll<SVGUseElement>(".concentric-star-sprite"));
    //     const ordered = direction === "outwards" ? [...stars].reverse() : stars;
    //     const step = duration / ordered.length;

    //     // Fixed stagger — never reset
    //     ordered.forEach((star, i) => {
    //         star.style.animationDelay = `${-i * step}ms`;
    //     });

    //     const startTime = Date.now();

    //     // Idempotent, wall-clock-based reorder: survives throttled/dropped ticks
    //     const reorder = () => {
    //         const rotations = Math.floor((Date.now() - startTime) / step);
    //         ordered.forEach((star, i) => {
    //             const targetPos = (i + rotations) % ordered.length;
    //             container.insertBefore(star, container.children[targetPos] ?? null);
    //         });
    //     };

    //     reorder();
    //     const intervalId = window.setInterval(reorder, step);

    //     return () => window.clearInterval(intervalId);
    // }, [duration, direction]);
    useEffect(() => {
        const container = starSpriteContainerRef.current;
        if (container === null) return;
        const root = container;

        const list = Array.from(root.querySelectorAll<SVGUseElement>(".concentric-star-sprite"));
        if (direction === "outwards") list.reverse();

        // Fixed phase offset per star (same stagger as your original delays)
        const offsets = new Map(list.map((el, i) => [el, i / list.length]));
        const epoch = Number(document.timeline.currentTime ?? performance.now());

        let scheduled = false;

        function sync() {
            scheduled = false;
            const now = Number(document.timeline.currentTime ?? performance.now());
            const cycles = (now - epoch) / duration;

            const items = list.map((el) => ({
                el,
                phase: (((cycles + offsets.get(el)!) % 1) + 1) % 1,
            }));

            // Same ordering your original append/prepend produced:
            // inwards: freshly restarted (low phase) at the bottom
            // outwards: freshly restarted (low phase) on top
            items.sort((a, b) =>
                direction === "inwards" ? a.phase - b.phase : b.phase - a.phase
            );

            for (const { el } of items) root.append(el); // this restarts the CSS animations...

            for (const { el, phase } of items) {
                // ...so put each one back at its true position in the loop
                for (const anim of el.getAnimations()) anim.currentTime = phase * duration;
            }
        }

        function scheduleSync() {
            if (scheduled) return;
            scheduled = true;
            requestAnimationFrame(sync);
        }

        sync();
        root.addEventListener("animationiteration", scheduleSync); // bubbles from the <use> elements
        document.addEventListener("visibilitychange", scheduleSync);

        return () => {
            root.removeEventListener("animationiteration", scheduleSync);
            document.removeEventListener("visibilitychange", scheduleSync);
        };
    }, [duration, starCount, direction]);

    return (
        <div 
            className={"absolute " + className}
            style={{ clipPath: "polygon(50% 8.5%, 60.79% 35.06%, 91.5% 39.21%, 69.09% 58.3%, 75.73% 91.5%, 50% 73.24%, 24.27% 91.5%, 30.91% 58.3%, 8.5% 39.21%, 39.21% 35.06%)" }}
        >
            <svg viewBox="0 0 500 500" className="h-full w-full">
                <g ref={starSpriteContainerRef}>
                    {Array.from({ length: starCount }).map((_, i) => (
                        <use
                            key={i}
                            href={`#star-polygon`}
                            style={{
                                fill: i % 2 === 0 ? dark : light,
                                animation: `shrink-${direction} ${duration}ms linear infinite`,
                                transformOrigin: "center",
                                willChange: "transform",
                            }}
                            className="concentric-star-sprite animate-shrink" 
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
}


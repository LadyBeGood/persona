
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
    className = "" 
}: StarAnimationProps) {
    const duration = 6000;
    const starCount = 6;

    const starSpriteContainerRef = useRef<SVGGElement | null>(null);

    useEffect(() => {
        const starSpriteContainerElement = starSpriteContainerRef.current;
        if (starSpriteContainerElement === null) return;

        let starSpriteElementList = Array.from(starSpriteContainerElement.querySelectorAll<SVGUseElement>(".concentric-star-sprite"));
        if (direction === "outwards") {
            starSpriteElementList.reverse();
        }

        const cleanupFunctions: Array<() => void> = [];

        for (const [index, starSpriteElement] of starSpriteElementList.entries()) {
            // Stagger animation delay across all stars
            starSpriteElement.style.animationDelay = `${-(index / starSpriteElementList.length) * duration}ms`;

            // Cycle DOM element order on animation loop
            function handleAnimationIteration() {
                starSpriteElement.style.animationDelay = "0ms";
                
                // We need this line once again, because function declarations are hoisted
                if (starSpriteContainerElement === null) 
                    return;

                if (direction === "inwards") {
                    starSpriteContainerElement.prepend(starSpriteElement);
                } else {
                    starSpriteContainerElement.append(starSpriteElement);
                }
            }

            starSpriteElement.addEventListener("animationiteration", handleAnimationIteration);

            function handleVisibilityChange() {
                if (document.visibilityState == "hidden") {
                    starSpriteElement.style.animationPlayState = "running";
                }
            }

            document.addEventListener("visibilitychange", handleVisibilityChange);

            cleanupFunctions.push(() => {
                starSpriteElement.removeEventListener("animationiteration", handleAnimationIteration);
                document.removeEventListener("visibilitychange", handleVisibilityChange);
            });
        }

        return () => {
            cleanupFunctions.forEach((cleanup) => cleanup());
        };
    }, [duration, starCount, direction]);

    return (
        <>
            <div 
                className={"absolute " + className}
                style={{
                    clipPath: "polygon(50% 8.5%, 60.79% 35.06%, 91.5% 39.21%, 69.09% 58.3%, 75.73% 91.5%, 50% 73.24%, 24.27% 91.5%, 30.91% 58.3%, 8.5% 39.21%, 39.21% 35.06%)",
                }}
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
        </>
    );
}


// style={{
//     clipPath: "polygon(50% 8.5%, 60.79% 35.06%, 91.5% 39.21%, 69.09% 58.3%, 75.73% 91.5%, 50% 73.24%, 24.27% 91.5%, 30.91% 58.3%, 8.5% 39.21%, 39.21% 35.06%)",
// }}


// export default function StarAnimation({
//     direction = "outwards",
//     light = "var(--persona-light-grey)",
//     dark = "var(--persona-black)",
//     className = "",
// }: StarAnimationProps) {
//     const duration = 6000;
//     const starCount = 6;
//     const containerRef = useRef<SVGGElement | null>(null);
//     const id = useId();
//     const starId = `star-${id}`;
//     const clipId = `starClip-${id}`;

//     useEffect(() => {
//         const container = containerRef.current;
//         if (!container) return;

//         const sprites = Array.from(container.querySelectorAll<SVGUseElement>(".concentric-star-sprite"));
//         if (sprites.length === 0) return;

//         const epoch = performance.now();
//         let animationFrameId = 0;

//         const tick = (now: number) => {
//             const elapsed = now - epoch;

//             const items = sprites.map((el, i) => {
//                 const stagger = (i / sprites.length) * duration;
//                 const phase = ((elapsed + stagger) % duration) / duration;
//                 const scale = direction === "outwards" ? 1 - phase : phase;
//                 el.style.transform = `scale(${scale})`;
//                 return { el, scale };
//             });

//             const desired = items.map((item) => item.el);
//             const current = Array.from(container.children);
//             if (desired.some((el, i) => current[i] !== el)) {
//                 desired.forEach((el) => container.appendChild(el));
//             }

//             animationFrameId = requestAnimationFrame(tick);
//         };

//         animationFrameId = requestAnimationFrame(tick);
//         return () => cancelAnimationFrame(animationFrameId);
//     }, [direction, duration]);

//     return (
//         <div
//             className={"absolute " + className}
//             style={{
//                 clipPath: "polygon(50% 8.5%, 60.79% 35.06%, 91.5% 39.21%, 69.09% 58.3%, 75.73% 91.5%, 50% 73.24%, 24.27% 91.5%, 30.91% 58.3%, 8.5% 39.21%, 39.21% 35.06%)",
//             }}
//             >
//             <svg viewBox="0 0 500 500" className="h-full w-full">
//                 <defs>
//                     <polygon
//                         id={starId}
//                         points="250,0 315,160 500,185 365,300 405,500 250,390 95,500 135,300 0,185 185,160"
//                         />
//                     {/* <clipPath id={clipId}>
//                         <use
//                         href={`#${starId}`}
//                         style={{
//                             transform: "scale(0.83)",
//                             transformBox: "view-box",
//                             transformOrigin: "center",
//                             }}
//                         />
//                         </clipPath> */}
//                 </defs>

//                 <g ref={containerRef} clipPath={`url(#${clipId})`}>
//                     {Array.from({ length: starCount }).map((_, i) => (
//                         <use
//                         key={i}
//                         href={`#${starId}`}
//                         style={{
//                             fill: i % 2 === 0 ? dark : light,
//                             transformBox: "view-box",
//                             transformOrigin: "center",
//                             willChange: "transform",
//                         }}
//                         className="concentric-star-sprite"
//                         />
//                     ))}
//                 </g>
//             </svg>
//         </div>
//     );
// }


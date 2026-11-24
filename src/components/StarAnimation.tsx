
// import { useEffect, useRef } from "react";

// type StarAnimationProps = {
//     direction?: "inwards" | "outwards";
//     light?: string;
//     dark?: string;
//     className?: string;
// };

// const ITERATION_DURATION_MS = 6000;
// const NUMBER_OF_STAR_SPRITES = 6;

// export default function StarAnimation({
//     direction = "outwards",
//     light = "var(--persona-light-grey)",
//     dark = "var(--persona-black)",
//     className = "",
// }: StarAnimationProps) {
//     const groupRef = useRef<SVGGElement>(null);

//     useEffect(() => {
//         const group = groupRef.current;
//         if (group === null) return;

//         const progressAt = (now: number) => (now / ITERATION_DURATION_MS) * NUMBER_OF_STAR_SPRITES;
//         let lastStep = Math.floor(progressAt(performance.now()));
//         let frame = 0;

//         const tick = (now: number) => {
//             const progress = progressAt(now);
//             const step = Math.floor(progress);
//             const t = progress - step;

//             // SVG paints in DOM order. Each step, the star that reached the end of
//             // its travel goes to the opposite end of the stack. The modulo covers
//             // frames skipped while the tab was in the background.
//             for (let n = (step - lastStep) % NUMBER_OF_STAR_SPRITES; n > 0; n--) {
//                 if (direction === "inwards") group.prepend(group.lastElementChild!);
//                 else group.append(group.firstElementChild!);
//             }
//             lastStep = step;

//             // Index 0 is painted first (bottom, largest).
//             Array.from(group.children).forEach((star, i) => {
//                 const scale =
//                     direction === "inwards"
//                         ? (NUMBER_OF_STAR_SPRITES - i - t) / NUMBER_OF_STAR_SPRITES
//                         : (NUMBER_OF_STAR_SPRITES - 1 - i + t) / NUMBER_OF_STAR_SPRITES;
//                 (star as SVGElement).style.transform = `scale(${scale})`;
//             });

//             frame = requestAnimationFrame(tick);
//         };

//         frame = requestAnimationFrame(tick);
//         return () => cancelAnimationFrame(frame);
//     }, [direction]);

//     return (
//         <div
//             className={"absolute " + className}
//             style={{
//                 clipPath: "polygon(50% 8.5%, 60.79% 35.06%, 91.5% 39.21%, 69.09% 58.3%, 75.73% 91.5%, 50% 73.24%, 24.27% 91.5%, 30.91% 58.3%, 8.5% 39.21%, 39.21% 35.06%)",
//             }}
//         >
//             <svg viewBox="0 0 500 500" className="h-full w-full">
//                 <g ref={groupRef}>
//                     {Array.from({ length: NUMBER_OF_STAR_SPRITES }, (_, i) => (
//                         <use
//                             key={i}
//                             href="#star-polygon"
//                             style={{
//                                 fill: i % 2 === 0 ? dark : light,
//                                 transformOrigin: "center",
//                             }}
//                         />
//                     ))}
//                 </g>
//             </svg>
//         </div>
//     );
// }

import type { AnimationEvent } from "react";

type StarAnimationProps = {
    direction?: "inwards" | "outwards";
    light?: string;
    dark?: string;
    className?: string;
};

const ITERATION_DURATION_MS = 6000;
const NUMBER_OF_STAR_SPRITES = 6;

export default function StarAnimation({
    direction = "outwards",
    light = "var(--persona-light-grey)",
    dark = "var(--persona-black)",
    className = "",
}: StarAnimationProps) {
    // SVG has no z-index, so the star that just wrapped has to change position in the DOM:
    // inwards it is now the largest (bottom), outwards it is now the smallest (top).
    function handleIteration(event: AnimationEvent<SVGGElement>) {
        const star = event.target as SVGUseElement;
        const group = event.currentTarget;

        // Moving the node restarts its animation, so carry over the time already
        // spent in the new iteration. Without this, each wrap loses a frame or so
        // and the stagger slowly drifts.
        const progress = star.getAnimations()[0]?.effect?.getComputedTiming().progress ?? 0;

        star.style.animationDelay = "0s"; // the initial stagger delay is only needed once
        if (direction === "inwards") group.prepend(star);
        else group.append(star);

        const restarted = star.getAnimations()[0];
        if (restarted) restarted.currentTime = progress * ITERATION_DURATION_MS;
    }

    return (
        <div
            className={"absolute " + className}
            style={{
                clipPath: "polygon(50% 8.5%, 60.79% 35.06%, 91.5% 39.21%, 69.09% 58.3%, 75.73% 91.5%, 50% 73.24%, 24.27% 91.5%, 30.91% 58.3%, 8.5% 39.21%, 39.21% 35.06%)",
            }}
        >
            <svg viewBox="0 0 500 500" className="h-full w-full">
                {/* key remounts the group on direction change, since the DOM order was changed by hand */}
                <g key={direction} onAnimationIteration={handleIteration}>
                    {Array.from({ length: NUMBER_OF_STAR_SPRITES }, (_, i) => {
                        // Negative delays start each star partway through its cycle.
                        // Index 0 is painted first (bottom), so it needs the lowest phase
                        // inwards (largest) and the highest phase outwards (also largest).
                        const slot = 
                            direction === "inwards" 
                                ? i 
                                : NUMBER_OF_STAR_SPRITES - 1 - i;
                        
                        return (
                            <use
                                key={i}
                                href="#star-polygon"
                                style={{
                                    fill: i % 2 === 0 ? dark : light,
                                    transformOrigin: "center",
                                    animation: `shrink-${direction} ${ITERATION_DURATION_MS}ms linear infinite`,
                                    animationDelay: `${-(slot / NUMBER_OF_STAR_SPRITES) * ITERATION_DURATION_MS}ms`,
                                }}
                            />
                        );
                    })}
                </g>
            </svg>
        </div>
    );
}
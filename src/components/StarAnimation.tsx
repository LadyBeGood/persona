
import { type AnimationEvent } from "react";

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
        const svg = event.target as SVGUseElement;
        const group = event.currentTarget;

        // Moving the node restarts its animation, so carry over the time already
        // spent in the new iteration. Without this, each wrap loses a frame or so
        // and the stagger slowly drifts.
        const progress = svg.getAnimations()[0]?.effect?.getComputedTiming().progress ?? 0;

        svg.style.animationDelay = "0s"; // the initial stagger delay is only needed once
        if (direction === "inwards") group.prepend(svg);
        else group.append(svg);

        const restarted = svg.getAnimations()[0];
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
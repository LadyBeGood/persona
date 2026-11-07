import { useEffect, useId, useRef } from "react";

type StarAnimationProps = {
    direction?: "inwards" | "outwards",
    light?: string,
    dark?: string,
    className?: string,
}

export function StarAnimation({ direction = "outwards", light = "var(--color-light-grey)", dark = "var(--color-black)", className = "" }: StarAnimationProps) {
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
            cleanupFunctions.push(() => {
                starSpriteElement.removeEventListener("animationiteration", handleAnimationIteration);
            });
        });

        return () => {
            cleanupFunctions.forEach((cleanup) => cleanup());
        };
    }, [duration, starCount]);

    return (
        <>
            {/* <style>{`
                .animate-shrink {
                    animation: shrink-${direction} ${duration}ms linear infinite; 
                    transform-box: fill-box;
                    transform-origin: center;
                    will-change: transform;
                }
            `}</style> */}

            <div className={"absolute " + className}>
                <svg viewBox="0 0 500 500" className="h-full w-full">
                    <defs>
                        {/* <polygon id="star" points="250,25 315,160 465,180 355,285 385,435 250,360 115,435 145,285 35,180 185,160" /> */}
                        {/* <polygon
                            id="star"
                            points="250,45 315,180 465,200 355,305 385,455 250,380 115,455 145,305 35,200 185,180" /> */}
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
                                    transformBox: "fill-box",
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

export default StarAnimation;
import React, { useEffect, useRef } from "react";

type StarAnimationProps = {
    direction?: "inwards" | "outwards",
    light?: string,
    dark?: string,
    size?: number,
    rotate?: number,
    layer?: number,
}

export const StarAnimation: React.FC<StarAnimationProps> = ({ 
    direction = "outwards",
    size = 500,
    light = "#fff",
    dark = "#000",
}) => {
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
            }

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
            <style>{`
                @keyframes shrink {
                    0% { transform: scale(${ direction === "inwards" ? 1 : 0 }); }
                    100% { transform: scale(${ direction === "inwards" ? 0 : 1 }); }
                }
                .animate-shrink {
                    animation: shrink ${duration}ms linear infinite;
                    transform-box: fill-box;
                    transform-origin: center;
                    will-change: transform;
                }
            `}</style>

            <div style={{ width: `${size}px`, height: `${size}px` }} className="bg-blue-600">
                <svg viewBox="0 0 500 500" className="h-full w-full">
                    <defs>
                        {/* <polygon id="star" points="250,25 315,160 465,180 355,285 385,435 250,360 115,435 145,285 35,180 185,160" /> */}
                        <polygon
                            id="star"
                            points="250,45 315,180 465,200 355,305 385,455 250,380 115,455 145,305 35,200 185,180"
                        />

                        <clipPath id="starClip">
                            <use
                                href="#star"
                                // Got 83 from trial and error
                                style={{ transform: "scale(0.83)", transformOrigin: "center" }} 
                            />
                        </clipPath>
                    </defs>

                    <g id="concentric-star-sprite-container" ref={starSpriteContainerRef} clipPath="url(#starClip)">
                        {Array.from({ length: starCount }).map((_, i) => (
                            <use
                                key={i}
                                href="#star"
                                style={{ fill: i % 2 === 0 ? dark : light }}
                                className={`concentric-star-sprite animate-shrink`}
                            />
                        ))}
                    </g>
                </svg>
            </div>
        </>
    );
};

export default StarAnimation;
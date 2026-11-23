import { useState, useEffect, memo, useRef } from "react";
import { useNavigate } from "react-router";


type ConfirmProps = {
    options?: [string, string]
};






const ANIM_MS = 120;
const W = 15; // Horizontal jitter range
const H = 10; // Vertical jitter range

function randomPoints(): string {
    const r = Math.random;
    return [
        `${r() * W},${r() * H}`,               // Top-left
        `${100 - r() * W},${r() * H}`,         // Top-right
        `${100 - r() * W},${50 - r() * H}`,    // Bottom-right
        `${r() * W},${50 - r() * H}`,          // Bottom-left
    ].join(" ");
}

const WhiteBlob = memo(function WhiteBlob() {
    const [points, setPoints] = useState(randomPoints);

    useEffect(() => {
        let raf = 0;
        let from = randomPoints().split(/[ ,]+/).map(Number);
        let to = randomPoints().split(/[ ,]+/).map(Number);
        let start = performance.now();

        const tick = (now: number) => {
            const t = Math.min((now - start) / ANIM_MS, 1);
            const current = from.map((v, i) => v + (to[i] - v) * t);

            setPoints(
                `${current[0]},${current[1]} ${current[2]},${current[3]} ` +
                `${current[4]},${current[5]} ${current[6]},${current[7]}`
            );

            if (t >= 1) {
                from = to;
                to = randomPoints().split(/[ ,]+/).map(Number);
                start = now;
            }
            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <svg
            viewBox="0 0 100 50"
            preserveAspectRatio="none"
            className="pointer-events-none absolute -inset-x-4 -inset-y-1 -z-10 h-[calc(100%+0.5rem)] w-[calc(100%+2rem)] -rotate-6 scale-y-[1.25]"
        >
            <polygon points={points} fill="#ffffff" />
        </svg>
    );
});

export function SimpleOptions({ options }: { options: [string, string] }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        containerRef.current?.focus();
    }, []);

    // Handle keyboard indexing
    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        console.log("hehe")
        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                setActiveIdx((current) => Math.min(current + 1, options.length - 1));
                break;
            case "ArrowUp":
                event.preventDefault();
                setActiveIdx((current) => Math.max(current - 1, 0));
                break;
            case "Enter": {
                event.preventDefault();
                // const path = options[activeIdx]?.path;
                // if (path) navigate(path);
                break;
            }
        }
    }

    return (
        <div 
            ref={containerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="absolute right-[6%] bottom-[4%] flex scale-x-[1.15] flex-col text-3xl">
            {options.map((label, i) => {
                const isActive = activeIdx === i;
                return (
                    <button
                        key={label}
                        onMouseEnter={() => (console.log("hi"), setActiveIdx(i))}
                        onFocus={() => setActiveIdx(i)}
                        onClick={() => {
                            setActiveIdx(i);
                            // action();
                        }}
                        className={[
                            "relative px-2 transition-colors z-1000 duration-150 w-65 h-13",
                            i === 1 && "translate-x-4.75",
                            isActive ? "text-black" : "text-white",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    >
                        {isActive && <WhiteBlob />}
                        {label}
                    </button>
                );
            })}
        </div>
    );
}




export default function Confirm({ options = ["Yes", "No"] }: ConfirmProps) {
    return (
        <>
            {/* Overlay */}
            <div className="absolute z-99 inset-0 bg-black opacity-70"></div>

            <div className="relative w-200 aspect-2/1 text-(--persona-white) -translate-y-10 -translate-x-0.5 z-10000">
                <div
                    className="absolute h-full w-full bg-[#3a3a3a] opacity-100"
                    style={{
                        clipPath: `
                        polygon(
                            0 21%, 
                            82.5% 0.5%, 
                            83.5% 20.75%, 
                            91% 19.5%, 
                            93% 68.5%, 
                            97.55% 68.25%, 
                            98% 82%, 
                            99.25% 81.75%, 
                            100% 95.5%, 
                            60.6% 99.75%, 
                            60.6% 88%,
                            57% 88.75%,
                            57.1% 81%,
                            10.5% 84.2%,
                            10.15% 75.4%,
                            4.75% 76.75%
                        )
                    `
                    }}
                >
                    <h2 className="-rotate-10 origin-top-left text-9xl mt-20 -ml-4 font-[Expose]">
                        COnfirM
                    </h2>

                    <p className="text-center -translate-y-6.75 text-2xl scale-x-[1.15] tracking-tight leading-normal">
                        Download Resume?
                        <br />
                        Last updated November 2026.
                    </p>

                    {/* <div className="absolute right-[19.8%] scale-x-[1.15] bottom-[6%] text-3xl flex flex-col gap-3.5">
                    <button>
                        {options[0]}
                    </button>

                    <button className="translate-x-4.75">
                        {options[1]}
                    </button>
                </div> */}
                </div>

                <SimpleOptions options={options} />
            </div>
        </>
    )
}
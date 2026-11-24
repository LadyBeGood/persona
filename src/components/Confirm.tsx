import { useState, useEffect, memo, useRef } from "react";
import { useNavigate } from "react-router";
import Flashy from "./Flashy";


type ConfirmProps = {
    options?: [string, string]
};


export function Options({ options }: { options: [string, string] }) {
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
                            "relative px-2 transition-colors z-1000 duration-150 w-65 h-13 grid place-items-center",
                            i === 1 && "translate-x-4.75",
                            isActive ? "text-black" : "text-white",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    >
                        <Flashy
                            active={isActive}
                            jitter={{ x: 15, y: 20 }}
                            rotate={-6}
                            scale={[1.2, 1.45]}
                            className="w-full h-full grid! place-items-center"
                        >
                            {label}
                        </Flashy>
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
                        Download Résumé?
                        <br />
                        Last updated November 2026.
                    </p>
                </div>

                <Options options={options} />
            </div>
        </>
    )
}
import StarAnimation from "./Star";


function BackgroundLayer() {
    return (
        <>
            {/* Background image */}
            <div className="w-full h-full overflow-hidden absolute">
                <img src="./terrace2.jpg" className="object-cover h-full w-full" alt="" />
            </div>

            {/* Red Overlay */}
            <div className="w-full h-full overflow-hidden absolute opacity-70 bg-(--persona-red)"></div>

            {/* Stars */}
            <div
                className="w-full absolute aspect-video overflow-hidden"
                style={{ mask: "linear-gradient(-71.8deg, #fff 49.5%, transparent 0) top right" }}
            >
                {/* <div className="bg-(--persona-white) w-full h-full">

                </div> */}


                {/* <div className="w-full h-full relative">
                    <StarAnimation direction="outwards" className="w-[24%] left-[75%] top-[29%] -rotate-40" />
                    <StarAnimation direction="outwards" className="w-[20%] left-[84%] top-[48%] -rotate-10" />
                    <StarAnimation direction="inwards" className="w-[23%] left-[88%] top-[-10%]  -rotate-10" />
                    <StarAnimation direction="inwards" className="w-[30%] left-[85%] top-[4%]  rotate-16" />
                    <StarAnimation direction="inwards" className="w-[20%] left-[70%] top-[-10%]  rotate-6" />

                    <StarAnimation direction="inwards" className="w-[22%] left-[75%] top-[50%] -rotate-12" />
                    <StarAnimation direction="outwards" className="w-[26%] left-[82%] top-[66%] -rotate-20" />
                    <StarAnimation direction="inwards" className="w-[25%] left-[38%] top-[78%]" />
                    <StarAnimation direction="outwards" className="w-[33%] left-[74.75%] top-[-19%] rotate-33" dark="var(--persona-grey)" />
                    <StarAnimation direction="inwards" className="w-[20%] left-[83%] top-[16%] rotate-33" />


                    <StarAnimation direction="outwards" className="w-[30%] left-[59%] top-[-22%] -rotate-10" />
                    <StarAnimation direction="inwards" className="w-[26.5%] left-[45%] top-[-20%] rotate-5" />
                    <StarAnimation direction="inwards" className="w-[28%] left-[65.75%] top-[12%] rotate-20" dark="var(--persona-grey)" />
                    <StarAnimation direction="outwards" className="w-[41%] left-[54%] top-[23%] rotate-12" />
                    <StarAnimation direction="outwards" className="w-[20%] left-[87%] top-[55%] -rotate-40" dark="var(--persona-grey)" />
                    <StarAnimation direction="outwards" className="w-[23%] left-[85%] top-[30%] rotate-10" />
                    <StarAnimation direction="inwards" className="w-[28.5%] left-[68.5%] top-[-1%] -rotate-10" />
                </div> */}
            </div>

            {/* Art */}
            <div className="w-full absolute aspect-video grid place-items-center">
                <img src="./removed.png" className="object-cover w-full" alt="" />
            </div>
        </>
    )
}


function StrokedText({ className, children, strokeWidths, strokeColors }) {
    if (strokeWidths.length !== strokeColors.length) {
        throw new Error("Bhukkk");
    }

    return (
        <>
            {strokeWidths.map((strokeWidth, i) => 
                <div className={className} role="presentation" style={{ 
                    WebkitTextStrokeWidth: strokeWidth, 
                    WebkitTextStrokeColor: strokeColors[i], 
                    userSelect: "none", 
                    paintOrder: "stroke fill", 
                    WebkitTextFillColor: "transparent",
                }}>
                    {children}
                </div>
            )}

            <div className={className}>
                {children}
            </div>
        </>
    )
}


// function Options() {
//     return (
//         <StrokedText className="absolute top-1/2 left-1/2 -translate-1/2 text-(--persona-white)" strokeWidths={["35px"]} strokeColors={["var(--persona-black)"]}>
//             <div>SkiLls</div>
//             <div className="-translate-x-12">ProJecTs</div>
//             <div className="-translate-x-29">BUttONs</div>
//             <div className="-translate-x-14">ConTact</div>
//         </StrokedText>
//     )
// }



import {
    memo, useCallback, useEffect, useLayoutEffect, useRef, useState,
} from "react";

/* ---------------- tuning ---------------- */
const SVG_W = 100;
const SVG_H = 50;
const ANIM_MS = 120;

const H_EDGE = 0;
const V_EDGE = 0;
const H_CENTER = 20;
const V_CENTER = 5;

const CX = SVG_W / 2;
const CY = SVG_H / 2;
const W = CX - H_CENTER - H_EDGE;
const H = CY - V_CENTER - V_EDGE;

const PAD_X_PX = 32;
const PAD_Y_PX = 10;
const ACTIVE_SCALE = 1.15;





const SCALE_X = 1.5;
const SCALE_Y = 1.25;

/* ---------------- tight text bounds ---------------- */
type TextBounds = { left: number; top: number; width: number; height: number };

function getTextBounds(el: HTMLElement): TextBounds | null {
    const range = document.createRange();
    range.selectNodeContents(el);
    const rects = Array.from(range.getClientRects());
    if (!rects.length) return null;

    let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity;
    for (const rect of rects) {
        l = Math.min(l, rect.left);
        t = Math.min(t, rect.top);
        r = Math.max(r, rect.right);
        b = Math.max(b, rect.bottom);
    }
    return { left: l, top: t, width: r - l, height: b - t };
}




/* ---------------- jitter points ---------------- */
function randomPointsArray(): number[] {
    const r = Math.random;
    return [
        r() * W + H_EDGE, r() * H + V_EDGE,
        r() * W + CX + H_CENTER, r() * H + V_EDGE,
        r() * W + CX + H_CENTER, r() * H + CY + V_CENTER,
        r() * W + H_EDGE, r() * H + CY + V_CENTER,
    ];
}

function toPointsString(a: number[]) {
    let s = "";
    for (let i = 0; i < a.length; i += 2) s += `${a[i]},${a[i + 1]} `;
    return s.trim();
}

/* ---------------- polygon animator (unchanged) ---------------- */
const AnimatedPolygons = memo(function AnimatedPolygons() {
    const [red, setRed] = useState<number[]>(randomPointsArray);
    const [blue, setBlue] = useState<number[]>(randomPointsArray);

    useEffect(() => {
        let raf = 0;
        let fromRed = randomPointsArray();
        let fromBlue = randomPointsArray();
        let toRed = randomPointsArray();
        let toBlue = randomPointsArray();
        let cycleStart = performance.now();

        const tick = (now: number) => {
            const t = Math.min((now - cycleStart) / ANIM_MS, 1);
            setRed(fromRed.map((v, i) => v + (toRed[i] - v) * t));
            setBlue(fromBlue.map((v, i) => v + (toBlue[i] - v) * t));

            if (t >= 1) {
                fromRed = toRed;
                fromBlue = toBlue;
                toRed = randomPointsArray();
                toBlue = randomPointsArray();
                cycleStart = now;
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <>
            <polygon points={toPointsString(red)} fill="#ff0022" style={{ mixBlendMode: "multiply" }} />
            <polygon points={toPointsString(blue)} fill="#1cfeff" style={{ mixBlendMode: "multiply" }} />
        </>
    );
});

/* ---------------- menu ---------------- */
type Item = { label: string; offset: string };
const ITEMS: Item[] = [
    { label: "SkiLls", offset: "" },
    { label: "ProJecTs", offset: "-translate-x-12" },
    { label: "BUttONs", offset: "-translate-x-29" },
    { label: "ConTact", offset: "-translate-x-14" },
];

type Rect = { cx: number; cy: number; w: number; h: number };


export default function Options() {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [positions, setPositions] = useState<Rect[]>([]);
    const [current, setCurrent] = useState(0);

    /* --- measure via text bounds, scale proportionally --- */
    const measure = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;
        const cRect = container.getBoundingClientRect();
        if (!cRect.width || !cRect.height) return;

        setPositions(
            itemRefs.current.map((el): Rect => {
                if (!el) return { cx: 50, cy: 50, w: 20, h: 8 };
                const r = getTextBounds(el);
                if (!r) return { cx: 50, cy: 50, w: 20, h: 8 };

                const cx = r.left + r.width / 2 - cRect.left;
                const cy = r.top + r.height / 2 - cRect.top;

                return {
                    cx: (cx / cRect.width) * 100,
                    cy: (cy / cRect.height) * 100,
                    w: (r.width * SCALE_X / cRect.width) * 100,
                    h: (r.height * SCALE_Y / cRect.height) * 100,
                };
            }),
        );
    }, []);

    /* --- re-measure during the scale transition so SVG follows the text --- */
    useLayoutEffect(() => {
        measure();
        let raf = 0;
        const start = performance.now();
        const loop = () => {
            measure();
            if (performance.now() - start < 220) raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, [current, measure]);

    /* --- mount / font / resize --- */
    useEffect(() => {
        document.fonts?.ready.then(measure).catch(() => { });
        const ro = new ResizeObserver(measure);
        if (containerRef.current) ro.observe(containerRef.current);
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [measure]);

    /* --- keyboard --- */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const t = e.target as HTMLElement | null;
            if (t?.closest('input, textarea, select, [contenteditable="true"]')) return;
            if (e.key === "ArrowDown") { e.preventDefault(); setCurrent((c) => Math.min(c + 1, ITEMS.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setCurrent((c) => Math.max(c - 1, 0)); }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const cur = positions[current];

    return (
        <div ref={containerRef} className="relative h-full w-full select-none">
            <StrokedText
                className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-(--persona-white)"
                strokeWidths={["35px"]}
                strokeColors={["var(--persona-black)"]}
            >
                {ITEMS.map((item, i) => (
                    <div
                        key={item.label}
                        ref={(el) => { itemRefs.current[i] = el; }}
                        onMouseEnter={() => setCurrent(i)}
                        onClick={() => setCurrent(i)}
                        className={[
                            "cursor-pointer origin-center transition-transform duration-150",
                            item.offset,
                            i === current ? "scale-[1.15]" : "scale-100",
                        ].join(" ")}
                    >
                        {item.label}
                    </div>
                ))}
            </StrokedText>

            {positions[current] && (
                <svg
                    className="pointer-events-none absolute z-30"
                    viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                    preserveAspectRatio="none"
                    style={{
                        left: `${positions[current].cx}%`,
                        top: `${positions[current].cy}%`,
                        width: `${positions[current].w}%`,
                        height: `${positions[current].h}%`,
                        transform: "translate(-50%, -50%)",
                        mixBlendMode: "difference",
                    }}
                >
                    <AnimatedPolygons />
                </svg>
            )}

            
        </div>
    );
}




function TextLayer() {
    return (
        <div className="w-full h-full overflow-hidden absolute grid place-items-center font-[Expose] text-7xl">
            <div className="relative grid w-full h-full">
                <Options />

                <StrokedText className="absolute text-4xl text-(--persona-white) right-15 bottom-5 flex gap-10" strokeColors={["var(--persona-white)", "var(--persona-black)"]} strokeWidths={["15px", "10px"]}>
                    <div className="flex gap-4">
                        <div className="bg-black outline-white outline-3 p-1.75">
                            {/* ↑↓ */}
                            <svg className="rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24" fill="currentColor"><path d="M7,21L2,16l5-5l1.43,1.4L5.83,15H21v2H5.83l2.6,2.6L7,21Zm10-8l-1.42-1.4L18.18,9H3V7H18.18l-2.6-2.6L17,3l5,5l-5,5Z" /></svg>
                        </div>

                        Navigate
                    </div>

                    <div  className="flex gap-4">
                        <div className="bg-black outline-white outline-3 p-1.75  right-37">
                            {/* ␣ */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="currentColor"><path d="M4,15V9H6v4H18V9h2v6H4Z" /></svg>
                        </div>

                        Select
                    </div>
                </StrokedText>







                <div className="absolute top-3 left-3 text-4xl font-[NimbusSanLBold] w-40 h-40 ">
                    <div className="relative w-full h-full">
                        <div className="absolute text-7xl tracking-tighter -rotate-6 left-[30%] top-[10%] scale-x-[0.9] [-webkit-text-stroke:25px_var(--persona-white)]">18</div>
                        <div className="absolute text-7xl tracking-tighter -rotate-6 left-[30%] top-[10%] w-[2ch] h-[1em] grid place-items-center">
                            <div className="w-[60%] h-[60%] bg-black"></div>
                        </div>
                        <div className="absolute text-7xl tracking-tighter -rotate-6 left-[30%] top-[10%] scale-x-[0.9] [-webkit-text-stroke:18px_var(--persona-black)]">18</div>
                        <div className="absolute text-7xl tracking-tighter -rotate-6 left-[30%] top-[10%] scale-x-[0.9] text-(--persona-white)">18</div>

                        <div className="text-3xl absolute left-[20%] top-[50%] -rotate-15 tracking-tighter scale-x-[0.9] [-webkit-text-stroke:6px_var(--persona-white)] ">MoNDaY</div>
                        <div className="text-3xl absolute left-[20%] top-[50%] -rotate-15 tracking-tighter scale-x-[0.9]">MoNDaY</div>


                        <div className="text-2xl absolute left-[8%] top-[30%] rotate-7 tracking-tighter scale-x-[0.9]  [-webkit-text-stroke:13px_var(--persona-white)] ">Nov</div>
                        <div className="text-2xl absolute left-[8%] top-[30%] rotate-7 tracking-tighter scale-x-[0.9]  [-webkit-text-stroke:8px_var(--persona-black)] ">Nov</div>
                        <div className="text-2xl text-(--persona-white) absolute left-[8%] top-[30%] rotate-7 tracking-tighter scale-x-[0.9]">Nov</div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-5 h-20 w-100 rotate-6">

                    <div className="relative w-full h-full">
                        <div className="absolute [-webkit-text-stroke:18px_var(--persona-black)]">utkarsh</div>
                        <div className="absolute text-(--persona-white)">utkarsh</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export function Home() {
    return (
        <>
            <BackgroundLayer />
            <TextLayer />
        </>
    )
}

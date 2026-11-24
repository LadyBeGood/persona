import StarAnimation from "./StarAnimation";

export default function StarBackground() {
    return (
        <div className="w-full h-full relative">
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
        </div>
    )
}






// import { memo, useEffect, useMemo, useRef, type CSSProperties } from "react";

// type StarData = {
//     direction: "outwards" | "inwards",
//     width: number,    // % of the layer's width
//     left: number,     // % of the layer's width
//     top: number,      // % of the layer's height
//     rotation: number, // deg
//     dark?: string,
// }

// const starData: StarData[] = [
//     // Home page
//     { direction: "outwards", width: 24, left: 75, top: 29, rotation: -40 },
//     { direction: "outwards", width: 20, left: 84, top: 48, rotation: -10 },
//     { direction: "inwards", width: 23, left: 88, top: -10, rotation: -10 },
//     { direction: "inwards", width: 30, left: 85, top: 4, rotation: 16 },
//     { direction: "inwards", width: 20, left: 70, top: -10, rotation: 6 },
//     { direction: "inwards", width: 22, left: 75, top: 50, rotation: -12 },
//     { direction: "outwards", width: 26, left: 82, top: 66, rotation: -20 },
//     { direction: "inwards", width: 25, left: 38, top: 78, rotation: 0 },
//     { direction: "outwards", width: 33, left: 74.75, top: -19, rotation: 33, dark: "var(--persona-grey)" },
//     { direction: "inwards", width: 20, left: 83, top: 16, rotation: 33 },
//     { direction: "outwards", width: 30, left: 59, top: -22, rotation: -10 },
//     { direction: "inwards", width: 26.5, left: 45, top: -20, rotation: 5 },
//     { direction: "inwards", width: 28, left: 65.75, top: 12, rotation: 20, dark: "var(--persona-grey)" },
//     { direction: "outwards", width: 41, left: 54, top: 23, rotation: 12 },
//     { direction: "outwards", width: 20, left: 87, top: 55, rotation: -40, dark: "var(--persona-grey)" },
//     { direction: "outwards", width: 23, left: 85, top: 30, rotation: 10 },
//     { direction: "inwards", width: 28.5, left: 68.5, top: -1, rotation: -10 },
//     // will add more later
// ];

// const duration = 6000;
// const starCount = 6;
// const tickDuration = duration / starCount;

// // Wraps are nudged this far (ms) off the clock tick, so the DOM move always happens
// // while the wrapping sprite is ~0 size and hidden behind the others.
// const wrapSkew = 50;

// const defaultAspectRatio = 0.5625;

// // Same polygon as the old clip-path, moved so (0, 0) is the center of the 100x100 box.
// const starPolygonPoints = [
//     [50, 8.5], [60.79, 35.06], [91.5, 39.21], [69.09, 58.3], [75.73, 91.5],
//     [50, 73.24], [24.27, 91.5], [30.91, 58.3], [8.5, 39.21], [39.21, 35.06],
// ]
//     .map(([x, y]) => `${+(x - 50).toFixed(2)},${+(y - 50).toFixed(2)}`)
//     .join(" ");


// // Delay for one sprite, so it sits at the right point of the loop when its
// // animation (re)starts. Sprites are staggered by 1/starCount of the loop.
// function getAnimationDelay(slot: number, direction: StarData["direction"], clockTime: number) {
//     const isInwards = direction === "inwards";
//     const staggerOffset = (isInwards ? slot : starCount - 1 - slot) * tickDuration;
//     const phase = (clockTime + staggerOffset) % duration;

//     // inwards wraps just after the tick, outwards just before it
//     return -(isInwards ? Math.max(0, phase - wrapSkew) : phase + wrapSkew);
// }


// type StarBackgroundProps = {
//     className?: string,
//     light?: string,
//     dark?: string,
// }

// function StarBackground({
//     className = "",
//     light = "var(--persona-light-grey)",
//     dark = "var(--persona-black)",
// }: StarBackgroundProps) {
//     const svgRef = useRef<SVGSVGElement | null>(null);
//     const clockRef = useRef<SVGRectElement | null>(null);

//     // Built once. Nothing in here changes after mount, the effect below reorders the sprites by hand.
//     const starElementList = useMemo(() => starData.map((star, starIndex) => {
//         const style = {
//             // 1 unit = 1% of the layer's width. Tops are % of height, so they go through --aspect-ratio.
//             transform: `
//                 translate(${star.left + star.width / 2}px, calc(var(--aspect-ratio, ${defaultAspectRatio}) * ${star.top}px + ${star.width / 2}px))
//                 rotate(${star.rotation}deg)
//                 scale(${star.width / 100})
//             `,
//         } satisfies CSSProperties;

//         return (
//             <g
//                 key={starIndex}
//                 data-direction={star.direction}
//                 clipPath="url(#star-layer-clip)"
//                 style={style}
//             >
//                 {Array.from({ length: starCount }).map((_, slot) => (
//                     <polygon
//                         key={slot}
//                         data-slot={slot}
//                         points={starPolygonPoints}
//                         className="animate-shrink"
//                         style={{
//                             fill: slot % 2 === 0 ? (star.dark ?? dark) : light,
//                             animation: `shrink-${star.direction} ${duration}ms linear infinite`,
//                             animationDelay: `${getAnimationDelay(slot, star.direction, 0)}ms`,
//                             animationPlayState: "var(--play-state)",
//                             transformOrigin: "0 0",
//                         }}
//                     />
//                 ))}
//             </g>
//         );
//     }), [dark, light]);

//     useEffect(() => {
//         const svgElement = svgRef.current;
//         const clockElement = clockRef.current;
//         if (svgElement === null || clockElement === null) return;

//         const starGroupList = Array.from(svgElement.querySelectorAll<SVGGElement>("g[data-direction]"));
//         let clockAnimation: Animation | undefined;

//         // The clock ticks once per tickDuration for the whole layer. On every tick, exactly one
//         // sprite per star wraps around and has to move to the other end of the z-order.
//         // The wanted order is worked out from the clock's time, so if ticks get queued up
//         // (throttled tab, desktop switch) the first call fixes everything and the rest do nothing.
//         function handleClockTick() {
//             clockAnimation ??= clockElement!.getAnimations()[0];
//             if (clockAnimation?.currentTime == null) return;

//             const clockTime = Number(clockAnimation.currentTime);
//             const tick = Math.floor((clockTime + 0.01) / tickDuration);

//             const bottomSlotInwards = (starCount - (tick % starCount)) % starCount;
//             const bottomSlotOutwards = tick % starCount;

//             for (const starGroup of starGroupList) {
//                 const isInwards = starGroup.dataset.direction === "inwards";
//                 const bottomSlot = isInwards ? bottomSlotInwards : bottomSlotOutwards;

//                 for (let i = 0; i < starCount; i++) {
//                     const bottomElement = starGroup.firstElementChild as SVGElement;
//                     if (Number(bottomElement.dataset.slot) === bottomSlot) break;

//                     const starSpriteElement = (isInwards ? starGroup.lastElementChild : bottomElement) as SVGElement;
//                     if (isInwards) {
//                         starGroup.prepend(starSpriteElement);
//                     } else {
//                         starGroup.append(starSpriteElement);
//                     }

//                     // Moving the element restarts its animation, so restart it at the right point of the loop
//                     const slot = Number(starSpriteElement.dataset.slot);
//                     const direction = isInwards ? "inwards" : "outwards";
//                     starSpriteElement.style.animationDelay = `${getAnimationDelay(slot, direction, clockTime)}ms`;
//                 }
//             }
//         }

//         // Pause everything together while off screen or hidden, so nothing has to catch up afterwards
//         let isInView = true;
//         function updatePlayState() {
//             const isPaused = !isInView || document.hidden;
//             svgElement!.style.setProperty("--play-state", isPaused ? "paused" : "running");
//         }

//         // Tops are a % of the layer's height, so the viewBox follows the layer's aspect ratio
//         const resizeObserver = new ResizeObserver(([entry]) => {
//             const { width, height } = entry.contentRect;
//             if (width === 0 || height === 0) return;

//             const aspectRatio = height / width;
//             svgElement.setAttribute("viewBox", `0 0 100 ${aspectRatio * 100}`);
//             svgElement.style.setProperty("--aspect-ratio", String(aspectRatio));
//         });

//         const intersectionObserver = new IntersectionObserver(([entry]) => {
//             isInView = entry.isIntersecting;
//             updatePlayState();
//         });

//         clockElement.addEventListener("animationiteration", handleClockTick);
//         document.addEventListener("visibilitychange", updatePlayState);
//         resizeObserver.observe(svgElement);
//         intersectionObserver.observe(svgElement);
//         updatePlayState();

//         return () => {
//             clockElement.removeEventListener("animationiteration", handleClockTick);
//             document.removeEventListener("visibilitychange", updatePlayState);
//             resizeObserver.disconnect();
//             intersectionObserver.disconnect();
//         };
//     }, [starElementList]);

//     return (
//         <svg
//             ref={svgRef}
//             viewBox={`0 0 100 ${defaultAspectRatio * 100}`}
//             preserveAspectRatio="none"
//             className={"pointer-events-none absolute inset-0 h-full w-full overflow-visible " + className}
//             aria-hidden="true"
//         >
//             <defs>
//                 <clipPath id="star-layer-clip">
//                     <polygon points={starPolygonPoints} />
//                 </clipPath>
//             </defs>

//             {/* Invisible, only here so we get one animationiteration event per tick. Reuses the shrink keyframes. */}
//             <rect
//                 ref={clockRef}
//                 width="1"
//                 height="1"
//                 fill="none"
//                 className="animate-shrink"
//                 style={{
//                     animation: `shrink-inwards ${tickDuration}ms linear infinite`,
//                     animationPlayState: "var(--play-state)",
//                 }}
//             />

//             {starElementList}
//         </svg>
//     );
// }

// export default memo(StarBackground);












// import { memo, useEffect, useMemo, useRef, type CSSProperties } from "react";

// /* ───────────────────────── config ───────────────────────── */

// const DURATION = 6000;          // ms for one full shrink loop (unchanged)
// const COUNT = 6;                // concentric stars per cluster (unchanged)
// const TICK = DURATION / COUNT;  // ms between z-order rotations
// const SKEW = 50;                // ms, see delayFor()
// const DEFAULT_AR = 0.5625;      // height / width until the first measurement

// type Dir = "in" | "out";
// type Star = readonly [
//     dir: Dir,
//     size: number,   // % of layer width
//     left: number,   // % of layer width
//     top: number,    // % of layer height
//     rotate: number, // deg
//     dark?: string,  // optional colour override for this cluster
// ];

// const GREY = "var(--persona-grey)";

// const STARS: readonly Star[] = [
//     // Home page
//     ["out", 24, 75, 29, -40],
//     ["out", 20, 84, 48, -10],
//     ["in", 23, 88, -10, -10],
//     ["in", 30, 85, 4, 16],
//     ["in", 20, 70, -10, 6],
//     ["in", 22, 75, 50, -12],
//     ["out", 26, 82, 66, -20],
//     ["in", 25, 38, 78, 0],
//     ["out", 33, 74.75, -19, 33, GREY],
//     ["in", 20, 83, 16, 33],
//     ["out", 30, 59, -22, -10],
//     ["in", 26.5, 45, -20, 5],
//     ["in", 28, 65.75, 12, 20, GREY],
//     ["out", 41, 54, 23, 12],
//     ["out", 20, 87, 55, -40, GREY],
//     ["out", 23, 85, 30, 10],
//     ["in", 28.5, 68.5, -1, -10],
//     // will add more later
// ];

// /* ───────────────────────── static markup ───────────────────────── */

// // Your clip-path star, re-centred on (0,0) in a 100×100 box.
// const POINTS =
//     "0,-41.5 10.79,-14.94 41.5,-10.79 19.09,8.3 25.73,41.5 " +
//     "0,23.24 -25.73,41.5 -19.09,8.3 -41.5,-10.79 -10.79,-14.94";

// const CSS = `
// .sbg polygon{transform-origin:0 0}
// .sbg .d{fill:var(--sbg-dark)}
// .sbg .l{fill:var(--sbg-light)}
// .sbg-in>polygon{animation:shrink-inwards ${DURATION}ms linear infinite}
// .sbg-out>polygon{animation:shrink-outwards ${DURATION}ms linear infinite}
// .sbg-clock{animation:sbg-tick ${TICK}ms linear infinite}
// .sbg[data-paused] polygon,.sbg[data-paused] .sbg-clock{animation-play-state:paused}
// @media (prefers-reduced-motion:reduce){.sbg polygon,.sbg .sbg-clock{animation-play-state:paused}}
// @keyframes sbg-tick{from{opacity:1}to{opacity:.99}}
// `;

// const round = (v: number) => Math.round(v * 1000) / 1000;

// /**
//  * animation-delay (ms) for slot `i` of a cluster when the shared clock reads `t`.
//  *
//  * Phase offset is i/6 of a loop for "in" and reversed for "out" (same as your old list.reverse()).
//  * SKEW nudges each wrap slightly off the tick so the DOM move always lands while the
//  * star is ~0 size and hidden: "in" wraps just after the tick, "out" just before it.
//  */
// function delayFor(i: number, inwards: boolean, t: number) {
//     const phase = (t + (inwards ? i : COUNT - 1 - i) * TICK) % DURATION;
//     return -(inwards ? Math.max(0, phase - SKEW) : phase + SKEW);
// }

// // Built once, never re-rendered: React bails out on identical element references,
// // so it will never fight the manual DOM reordering below.
// const LAYER = (
//     <>
//         <style>{CSS}</style>
//         <rect className="sbg-clock" width="1" height="1" fill="none" />
//         {STARS.map(([dir, size, left, top, rotate, dark], s) => {
//             const inwards = dir === "in";
//             const style = {
//                 transform:
//                     `translate(${round(left + size / 2)}px, ` +
//                     `calc(var(--ar, ${DEFAULT_AR}) * ${top}px + ${round(size / 2)}px)) ` +
//                     `rotate(${rotate}deg) scale(${round(size / 100)})`,
//                 ...(dark ? { "--sbg-dark": dark } : null),
//             } as CSSProperties;

//             return (
//                 <g key={s} className={inwards ? "sbg-in" : "sbg-out"} style={style}>
//                     {Array.from({ length: COUNT }, (_, i) => (
//                         <polygon
//                             key={i}
//                             data-i={i}
//                             points={POINTS}
//                             // keep animate-shrink: if your keyframes live in Tailwind's @theme,
//                             // Tailwind only emits them when it sees this class
//                             className={`animate-shrink ${i % 2 ? "l" : "d"}`}
//                             style={{ animationDelay: `${delayFor(i, inwards, 0)}ms` }}
//                         />
//                     ))}
//                 </g>
//             );
//         })}
//     </>
// );

// /* ───────────────────────── component ───────────────────────── */

// type Props = {
//     className?: string;
//     dark?: string;
//     light?: string;
// };

// function StarBackground({
//     className = "",
//     dark = "var(--persona-black)",
//     light = "var(--persona-light-grey)",
// }: Props) {
//     const svgRef = useRef<SVGSVGElement>(null);
//     const rootStyle = useMemo(
//         () => ({ "--sbg-dark": dark, "--sbg-light": light }) as CSSProperties,
//         [dark, light],
//     );

//     useEffect(() => {
//         const svg = svgRef.current;
//         if (!svg) return;

//         const clock = svg.querySelector<SVGRectElement>(".sbg-clock")!;
//         const clusters = Array.from(svg.querySelectorAll<SVGGElement>(".sbg-in, .sbg-out")).map((g) => ({
//             g,
//             inwards: g.classList.contains("sbg-in"),
//         }));

//         /* One clock for the whole layer: fires once per TICK (1/s), not once per star.
//            Each firing rotates exactly one star per cluster to its new z-position.
//            The target order is derived from the clock's absolute time, so a burst of
//            queued events (tab throttled / desktop switch) is handled correctly. */
//         let clockAnim: Animation | undefined;

//         const onTick = () => {
//             clockAnim = clockAnim ?? clock.getAnimations()[0];
//             const raw = clockAnim?.currentTime;
//             if (raw == null) return;
//             const t = Number(raw);

//             const step = Math.floor((t + 0.01) / TICK) % COUNT;
//             const bottomIn = String((COUNT - step) % COUNT);
//             const bottomOut = String(step);

//             for (const { g, inwards } of clusters) {
//                 const want = inwards ? bottomIn : bottomOut;
//                 for (
//                     let guard = 0;
//                     guard < COUNT && (g.firstElementChild as SVGElement).dataset.i !== want;
//                     guard++
//                 ) {
//                     const el = (inwards ? g.lastElementChild : g.firstElementChild) as SVGElement;
//                     if (inwards) g.prepend(el);
//                     else g.append(el);
//                     // moving the node restarts its CSS animation, so restart it at the right phase
//                     el.style.animationDelay = `${delayFor(Number(el.dataset.i), inwards, t)}ms`;
//                 }
//             }
//         };
//         clock.addEventListener("animationiteration", onTick);

//         /* Pause every animation when off-screen or hidden. All of them pause together,
//            so they stay in sync and nothing needs to catch up. */
//         let visible = true;
//         const syncPaused = () => svg.toggleAttribute("data-paused", !visible || document.hidden);
//         const io = new IntersectionObserver(([entry]) => {
//             visible = entry.isIntersecting;
//             syncPaused();
//         });
//         io.observe(svg);
//         document.addEventListener("visibilitychange", syncPaused);
//         syncPaused();

//         /* Layer is laid out in "1 unit = 1% of width" so sizes/lefts are plain numbers.
//            Only the aspect ratio is needed (tops are % of height); it changes on resize only. */
//         const ro = new ResizeObserver(([entry]) => {
//             const { width, height } = entry.contentRect;
//             if (!width || !height) return;
//             const ar = height / width;
//             svg.setAttribute("viewBox", `0 0 100 ${ar * 100}`);
//             svg.style.setProperty("--ar", String(ar));
//         });
//         ro.observe(svg);

//         return () => {
//             clock.removeEventListener("animationiteration", onTick);
//             document.removeEventListener("visibilitychange", syncPaused);
//             io.disconnect();
//             ro.disconnect();
//         };
//     }, []);

//     return (
//         <svg
//             ref={svgRef}
//             className={`sbg pointer-events-none absolute inset-0 h-full w-full overflow-visible ${className}`}
//             viewBox={`0 0 100 ${DEFAULT_AR * 100}`}
//             preserveAspectRatio="none"
//             aria-hidden="true"
//             focusable="false"
//             style={rootStyle}
//         >
//             {LAYER}
//         </svg>
//     );
// }

// export default memo(StarBackground);
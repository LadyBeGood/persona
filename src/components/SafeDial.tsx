import { useEffect, type ReactNode } from "react";
import { motion, animate, useMotionValue } from "motion/react";

type SafeDialProps = {
    children: ReactNode;
    className?: string;
    /** Number of ticks in a full revolution. */
    totalTicks?: number;
    /** Each move turns a random number of ticks between these. */
    minTicks?: number;
    maxTicks?: number;
    /** Random pause between moves. */
    minPauseMs?: number;
    maxPauseMs?: number;
    /** How long the dial takes to travel one tick (linear). */
    tickMs?: number;
    /** Hold between consecutive ticks within a move. */
    tickGapMs?: number;
};

const between = (min: number, max: number) => min + Math.random() * (max - min);

export default function SafeDial({
    children,
    className = "",
    totalTicks = 60,
    minTicks = 3,
    maxTicks = 24,
    minPauseMs = 500,
    maxPauseMs = 1800,
    tickMs = 30,
    tickGapMs = 45,
}: SafeDialProps) {
    const rotate = useMotionValue(0);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const degreesPerTick = 360 / totalTicks;
        let position = rotate.get() / degreesPerTick; // integer tick index
        let direction = 1; // 1 = clockwise, -1 = anticlockwise
        let timeout: ReturnType<typeof setTimeout>;
        let controls: ReturnType<typeof animate> | undefined;

        function turn() {
            const dir = direction;
            direction = Math.floor(Math.random() * 2) === 0 ? -1 : 1;
            let remaining = Math.round(between(minTicks, maxTicks));

            function step() {
                position += dir;
                controls = animate(rotate, position * degreesPerTick, {
                    duration: tickMs / 1000,
                    ease: "linear",
                    onComplete: () => {
                        remaining--;
                        timeout = setTimeout(
                            remaining > 0 ? step : turn,
                            remaining > 0 ? tickGapMs : between(minPauseMs, maxPauseMs),
                        );
                    },
                });
            }

            step();
        }

        turn();

        return () => {
            clearTimeout(timeout);
            controls?.stop();
        };
    }, [rotate, totalTicks, minTicks, maxTicks, minPauseMs, maxPauseMs, tickMs, tickGapMs]);

    return (
        <motion.div className={className} style={{ rotate }}>
            {children}
        </motion.div>
    );
}
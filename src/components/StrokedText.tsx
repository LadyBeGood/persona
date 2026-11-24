import { type ReactNode } from "react";

type StrokedTextProps = {
    className?: string;
    children: ReactNode;
    strokeWidths: string[];
    strokeColors: string[];
};

export default function StrokedText({
    className = "",
    children,
    strokeWidths,
    strokeColors,
}: StrokedTextProps) {
    if (strokeWidths.length !== strokeColors.length) {
        throw new Error("strokeWidths and strokeColors must have the same length");
    }

    return (
        <span
            className={className}
            style={{
                display: "inline-grid", 
                isolation: "isolate",
            }}
        >
            {strokeWidths.map((strokeWidth, i) => (
                <span
                    key={i}
                    role="presentation"
                    style={{
                        gridArea: "1 / 1",
                        WebkitTextStrokeWidth: strokeWidth,
                        WebkitTextStrokeColor: strokeColors[i],
                        WebkitTextFillColor: "transparent",
                        paintOrder: "stroke fill",
                        userSelect: "none",
                    }}
                >
                    {children}
                </span>
            ))}

            <span style={{ gridArea: "1 / 1" }}>{children}</span>
        </span>
    );
}
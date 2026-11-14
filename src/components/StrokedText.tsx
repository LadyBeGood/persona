import { type ReactNode } from "react";

type StrokedTextProps = { 
    className: string, 
    children: ReactNode, 
    strokeWidths: string[], 
    strokeColors: string[],
}

export default function StrokedText({ className, children, strokeWidths, strokeColors }: StrokedTextProps) {
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
    );
}

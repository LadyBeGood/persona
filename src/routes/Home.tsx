import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import StrokedText from "../components/StrokedText";
import { useNavigate } from "react-router";
import StarBackground from "../components/StarBackground";
import Flashy from "../components/Flashy";
import { type Dispatch, type SetStateAction } from "react";
import Confirm, { type ConfirmOption } from "../components/Confirm";

function Background() {
    return (
        <>
            {/* Stars */}
            {/* <div
                className="w-full absolute aspect-video overflow-hidden"
                style={{ mask: "linear-gradient(-71.8deg, #fff 49.5%, transparent 0) top right" }}
            >
                <StarBackground />
            </div> */}

            {/* Art */}
            <div className="w-full absolute aspect-video grid place-items-center">
                <img src="./removed.png" className="object-cover w-full" alt="" />
            </div>
        </>
    )
}

type ButtonsMetadata = {
    label: string,
    action: () => void,
    offset: string,
};

type OptionsProps = {
    isConfirmDialogOpen: boolean,
    setIsConfirmDialogOpen: Dispatch<SetStateAction<boolean>>
}

export function Options({ isConfirmDialogOpen, setIsConfirmDialogOpen }: OptionsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
    // const [positions, setPositions] = useState<Rect[]>([]);
    const [currentButtonIndex, setCurrentButtonIndex] = useState(0);
    const navigate = useNavigate();

    const buttonMetadatas: ButtonsMetadata[] = [
        { label: "AbOut", action: () => navigate("/about"), offset: "translate-x-5" },
        { label: "SkiLls", action: () => navigate("/skills"), offset: "-translate-x-10" },
        { label: "ProJecTs", action: () => navigate("/projects"), offset: "-translate-x-32" },
        { label: "ConTact", action: () => navigate("/contact"), offset: "-translate-x-14" },
        { label: "RéSuMé", action: () => setIsConfirmDialogOpen(true), offset: "-translate-x-26" },
    ];

    useEffect(() => {
        containerRef.current?.focus();
    }, []);


    function handleButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, i: number) {
        console.log("here" + Math.random());
        setCurrentButtonIndex(i);
        buttonMetadatas[i].action();
    }


    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                setCurrentButtonIndex((current) => Math.min(current + 1, buttonMetadatas.length - 1));
                break;
            case "ArrowUp":
                event.preventDefault();
                setCurrentButtonIndex((current) => Math.max(current - 1, 0));
                break;
            case " ":
            case "Enter": {
                event.preventDefault();
                buttonMetadatas[currentButtonIndex].action();
                break;
            }
        }
    }

    return (
        <div
            ref={containerRef}
            className="relative h-full w-full select-none"
            tabIndex={0} // Make this element focusable in order to capture key down events
            onKeyDown={handleKeyDown}
        >
            {/* 
              * This is the text stroke layer; we are not using StrokedText component 
              * here because we dont want the stroke layer to come over text layer.
              */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute leading-[0.89] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-(--persona-white)">
                    {buttonMetadatas.map((item, i) => (
                        <div
                            key={item.label}
                            className={[
                                "block origin-center transition-transform duration-150",
                                item.offset,
                                i === currentButtonIndex ? "scale-[1.2]" : "scale-100",
                            ].join(" ")}
                        >
                            <span
                                style={{
                                    display: "inline-block",
                                    WebkitTextStrokeWidth: "35px",
                                    WebkitTextStrokeColor: "var(--persona-black)",
                                    WebkitTextFillColor: "transparent",
                                    paintOrder: "stroke fill",
                                }}
                            >
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute leading-[0.89] left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-(--persona-white)">
                {buttonMetadatas.map((item, i) => (
                    <button
                        key={item.label}
                        ref={(element) => { itemRefs.current[i] = element }}
                        onMouseEnter={() => setCurrentButtonIndex(i)}
                        onClick={(event) => handleButtonClick(event, i)}
                        className={[
                            "block cursor-pointer origin-center transition-transform duration-150",
                            item.offset,
                            i === currentButtonIndex ? "scale-[1.2]" : "scale-100",
                        ].join(" ")}
                    >
                        {/* {item.label} */}
                        <Flashy
                            active={i === currentButtonIndex}
                            colors={["#ff0022", "#1cfeff"]}
                            jitter={{ x: 30, y: 40 }}
                            scale={[1.5, 1]}
                            layer="over"
                            shapeBlendMode="multiply"
                            blendMode="difference"
                            paused={isConfirmDialogOpen}
                        >
                            {item.label}
                        </Flashy>
                    </button>
                ))}
            </div>
        </div>
    );
}


type ForegroundProps = {
    isConfirmDialogOpen: boolean,
    setIsConfirmDialogOpen: Dispatch<SetStateAction<boolean>>
}

function Foreground({ isConfirmDialogOpen, setIsConfirmDialogOpen }: ForegroundProps) {
    return (
        <div 
            className="w-full h-full overflow-hidden absolute grid place-items-center font-[Expose] text-7xl"
        >
            <div className="relative grid w-full h-full">
                <Options isConfirmDialogOpen={isConfirmDialogOpen} setIsConfirmDialogOpen={setIsConfirmDialogOpen} />

                <div className="absolute text-4xl text-(--persona-white) right-15 bottom-5 flex gap-10">
                    <div className="flex gap-4">
                        <div className="bg-black outline-white outline-3 p-1.75">
                            {/* ↑↓ */}
                            <svg className="rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24" fill="currentColor"><path d="M7,21L2,16l5-5l1.43,1.4L5.83,15H21v2H5.83l2.6,2.6L7,21Zm10-8l-1.42-1.4L18.18,9H3V7H18.18l-2.6-2.6L17,3l5,5l-5,5Z" /></svg>
                        </div>

                        <StrokedText strokeColors={["var(--persona-white)", "var(--persona-black)"]} strokeWidths={["15px", "10px"]}>
                            Navigate
                        </StrokedText>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-black outline-white outline-3 p-1.75  right-37">
                            {/* ␣ */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="currentColor"><path d="M4,15V9H6v4H18V9h2v6H4Z" /></svg>
                        </div>

                        <StrokedText strokeColors={["var(--persona-white)", "var(--persona-black)"]} strokeWidths={["15px", "10px"]}>
                            Select
                        </StrokedText>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Home() {
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const options: ConfirmOption[] = [
        { 
            label: "Yes", 
            action: () => {
                window.open("/Utkarsh_Kumar_Frontend_Developer_Resume.pdf", "_blank", "noopener,noreferrer");
                setIsConfirmDialogOpen(false);
            }
        },
        { 
            label: "No", 
            action: () => setIsConfirmDialogOpen(value => !value) 
        }
    ];

    return (
        <>
            <Background />
            <Foreground isConfirmDialogOpen={isConfirmDialogOpen} setIsConfirmDialogOpen={setIsConfirmDialogOpen} />
            <Confirm isOpen={isConfirmDialogOpen} setIsOpen={setIsConfirmDialogOpen} options={options} />
        </>
    )
}


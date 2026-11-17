import { useEffect, useRef } from "react"
import { useNavigate } from "react-router";


function Background() {
    return (
        <>
            {/* Background image */}
            <div className="w-full h-full overflow-hidden absolute">
                <img src="./backgrounds/PNG/Day2.png" className="object-cover h-full w-full" alt="" />
            </div>

            {/* Red Overlay */}
            <div className="w-full h-full overflow-hidden absolute opacity-70 bg-(--persona-red)"></div>

            <div className="w-full absolute aspect-video grid place-items-center">
                <img src="./backgrounds/Assets/Items.png" className="object-cover w-full" alt="" />
            </div>
        </>
    )
}


function Foreground() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        containerRef.current?.focus();
    }, [])

    return (
        <div 
            ref={containerRef} 
            tabIndex={0}
            onKeyDown={(event) => {
                switch (event.key) {
                    case "Escape": 
                        navigate(-1);
                        break;
                }
                
                console.log(event.key)
            }}
            className="w-full h-full z-100"
        >

        </div>
    )
}

export default function About() {
    return (
        <>
            <Background />
            <Foreground />
        </>
    )
}
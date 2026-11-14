

function Background() {
    return (
        <>
            {/* Background image */}
            <div className="w-full h-full overflow-hidden absolute">
                <img src="./terrace2.jpg" className="object-cover h-full w-full" alt="" />
            </div>

            {/* Red Overlay */}
            <div className="w-full h-full overflow-hidden absolute opacity-70 bg-(--persona-red)"></div>

            <div className="w-full absolute aspect-video grid place-items-center">
                <img src="./about.png" className="object-cover w-full" alt="" />
            </div>
        </>
    )
}

export default function About() {
    return (
        <>
            <Background />
        </>
    )
}
import StarAnimation from "./Star";


export function Home() {
    return (
        <>
            <div className="w-full h-full overflow-hidden absolute">
                <img src="./terrace2.jpg" className="object-cover h-full w-full" alt="" />
            </div>

            <div className="w-full h-full overflow-hidden absolute opacity-70 bg-(--persona-red)"></div>


            <div
                className="w-full max-h-svh absolute aspect-video overflow-hidden"
                style={{ mask: "linear-gradient(-71.8deg, #fff 49.5%, transparent 0) top right" }}
            >
                {/* <div className="bg-(--persona-white) w-full h-full">

                </div> */}


                <div className="w-full h-full relative">
                    <StarAnimation direction="outwards" className="w-[24%] left-[75%] top-[29%] -rotate-40" />
                    <StarAnimation direction="outwards" className="w-[20%] left-[84%] top-[48%] -rotate-10" />
                    <StarAnimation direction="inwards" className="w-[23%] left-[88%] top-[-10%]  -rotate-10" />
                    <StarAnimation direction="inwards" className="w-[30%] left-[85%] top-[4%]  rotate-16" />
                    <StarAnimation direction="inwards" className="w-[20%] left-[70%] top-[-10%]  rotate-6" />

                    <StarAnimation direction="inwards" className="w-[22%] left-[75%] top-[50%] -rotate-12" />
                    {/* <StarAnimation direction="inwards" className="w-[25%] left-[80.5%] top-[39%] rotate-20" />
                    <StarAnimation direction="outwards" className="w-[20%] left-[78.5%] top-[37%] -rotate-20" />
                    <StarAnimation direction="inwards" className="w-[18%] left-[78.5%] top-[54%] -rotate-30" />
                    <StarAnimation direction="inwards" className="w-[35%] left-[58.5%] top-[49%] -rotate-10" />*/}
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
            </div>
            <div className="w-full max-h-svh overflow-hidden absolute aspect-video grid place-items-center">
                <img src="./removed.png" className="object-cover w-full" alt="" />
            </div>
            {/* <div className="w-full h-full overflow-hidden absolute opacity-10 top-1/2 left-1/2 -translate-1/2 grid place-items-center">
                <img src="./maingrey.jpg" className="object-cover w-full" alt="" />
            </div> */}

            <div className="w-full h-full overflow-hidden absolute grid place-items-center font-[Expose] text-7xl">
                <div className="relative grid place-items-center w-full h-full">
                    <div className="absolute">
                        <div className="[-webkit-text-stroke:35px_black]">Skills</div>
                        <div className="-translate-x-12 [-webkit-text-stroke:35px_black]">ProJecTs</div>
                        <div className="-translate-x-29 [-webkit-text-stroke:35px_black]">BUttONs</div>
                        <div className="-translate-x-14 [-webkit-text-stroke:35px_black]">ConTact</div>
                    </div>
                    <div className="absolute">
                        <div className="text-(--persona-white)">SkiLls</div>
                        <div className="-translate-x-12 text-(--persona-white)">ProJecTs</div>
                        <div className="-translate-x-29 text-(--persona-white)">BUttONs</div>
                        <div className="-translate-x-14 text-(--persona-white)">ConTact</div>
                    </div>
                </div>
            </div>

        </>
    )
}

/*
old

            <div className="w-full h-full overflow-hidden absolute grid place-items-center font-[Expose] text-7xl">
                <div className="relative grid place-items-center w-full h-full">
                    <div className="absolute">
                        <div className="[-webkit-text-stroke:35px_black]">Skills</div>
                        <div className="-translate-x-12 [-webkit-text-stroke:35px_black]">Projects</div>
                        <div className="-translate-x-20 [-webkit-text-stroke:35px_black]">Buttons</div>
                        <div className="-translate-x-11 [-webkit-text-stroke:35px_black]">Contact</div>
                    </div>
                    <div className="absolute">
                        <div className="text-(--persona-white)">Skills</div>
                        <div className="-translate-x-12 text-(--persona-white)">Projects</div>
                        <div className="-translate-x-20 text-(--persona-white)">Buttons</div>
                        <div className="-translate-x-11 text-(--persona-white)">Contact</div>
                    </div>
                </div>
            </div>

current
            <div className="w-full h-full overflow-hidden absolute grid place-items-center font-[Expose] text-7xl">
                <div className="relative grid place-items-center w-full h-full">
                    <div className="absolute">
                        <div className="[-webkit-text-stroke:35px_black]">Skills</div>
                        <div className="-translate-x-12 [-webkit-text-stroke:35px_black]">ProJecTs</div>
                        <div className="-translate-x-29 [-webkit-text-stroke:35px_black]">BUttONs</div>
                        <div className="-translate-x-14 [-webkit-text-stroke:35px_black]">ConTact</div>
                    </div>
                    <div className="absolute">
                        <div className="text-(--persona-white)">SkiLls</div>
                        <div className="-translate-x-12 text-(--persona-white)">ProJecTs</div>
                        <div className="-translate-x-29 text-(--persona-white)">BUttONs</div>
                        <div className="-translate-x-14 text-(--persona-white)">ConTact</div>
                    </div>
                </div>
            </div>
*/

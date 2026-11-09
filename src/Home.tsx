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
                <div className="relative grid w-full h-full">
                    <div className="absolute top-1/2 left-1/2 -translate-1/2">
                        <div className="[-webkit-text-stroke:35px_var(--persona-black)]">Skills</div>
                        <div className="-translate-x-12 [-webkit-text-stroke:35px_var(--persona-black)]">ProJecTs</div>
                        <div className="-translate-x-29 [-webkit-text-stroke:35px_var(--persona-black)]">BUttONs</div>
                        <div className="-translate-x-14 [-webkit-text-stroke:35px_var(--persona-black)]">ConTact</div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-1/2">
                        <div className="text-(--persona-white)">SkiLls</div>
                        <div className="-translate-x-12 text-(--persona-white)">ProJecTs</div>
                        <div className="-translate-x-29 text-(--persona-white)">BUttONs</div>
                        <div className="-translate-x-14 text-(--persona-white)">ConTact</div>
                    </div>

                    <div className="absolute text-4xl text-(--persona-white) right-15 bottom-5 flex gap-20">
                        <div className="[-webkit-text-stroke:15px_var(--persona-white)] whitespace-pre">Navigate</div>
                        <div className="[-webkit-text-stroke:15px_var(--persona-white)]">Select</div>
                    </div>

                    <div className="absolute text-4xl text-(--persona-white) right-15 bottom-5 flex gap-20">
                        <div className="[-webkit-text-stroke:10px_var(--persona-black)] whitespace-pre">Navigate</div>
                        <div className="[-webkit-text-stroke:10px_var(--persona-black)]">Select</div>
                    </div>

                    <div className="absolute text-4xl text-(--persona-white) right-15 bottom-5 flex gap-20">
                        <div className="whitespace-pre">Navigate</div>
                        <div className="">Select</div>
                    </div>

                    <div className="absolute text-(--persona-white) bg-black outline-white outline-3 p-1.75  right-84 bottom-4.5">
                        {/* ↑↓ */}
                        <svg className="rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24" fill="currentColor"><path d="M7,21L2,16l5-5l1.43,1.4L5.83,15H21v2H5.83l2.6,2.6L7,21Zm10-8l-1.42-1.4L18.18,9H3V7H18.18l-2.6-2.6L17,3l5,5l-5,5Z" /></svg>
                    </div>

                    <div className="absolute text-(--persona-white) bg-black outline-white outline-3 p-1.75  right-37 bottom-4.5">
                        {/* ␣ */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="currentColor"><path d="M4,15V9H6v4H18V9h2v6H4Z" /></svg>
                    </div>


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

import StarAnimation from "./Star";


export function Home() {
    return (
        <>
            <div className="w-full h-full overflow-hidden absolute">
                <img src="./terrace2.jpg" className="object-cover h-full w-full" alt="" />
            </div>

            <div className="w-full h-full overflow-hidden absolute opacity-70 bg-(--color-red)"></div>


            <div 
                className="w-full max-h-svh absolute aspect-video overflow-hidden"
                style={{ mask: "linear-gradient(-71.8deg, #fff 49.5%, transparent 0) top right"}}
            >
                {/* <div className="bg-blue-900 w-full h-full">

                </div> */}


                <div className="w-full h-full">
                    <StarAnimation direction="outwards" className="w-[22%] left-[75%] top-[50%] -rotate-12" />
                    {/* <StarAnimation direction="inwards" className="w-[25%] left-[80.5%] top-[39%] rotate-20" />
                    <StarAnimation direction="outwards" className="w-[20%] left-[78.5%] top-[37%] -rotate-20" />
                    <StarAnimation direction="inwards" className="w-[18%] left-[78.5%] top-[54%] -rotate-30" />
                    <StarAnimation direction="inwards" className="w-[35%] left-[58.5%] top-[49%] -rotate-10" />*/}
                    <StarAnimation direction="outwards" className="w-[26%] left-[82%] top-[66%] -rotate-20" /> 
                    <StarAnimation direction="inwards" className="w-[25%] left-[38%] top-[78%]" />
                    <StarAnimation direction="outwards" className="w-[33%] left-[74.75%] top-[-19%] rotate-33" />
                    <StarAnimation direction="inwards" className="w-[20%] left-[83%] top-[16%] rotate-33" />
                    <StarAnimation direction="outwards" className="w-[23%] left-[60%] top-[-10%] -rotate-20" />
                    <StarAnimation direction="outwards" className="w-[26.5%] left-[45%] top-[-20%] rotate-5" />
                    <StarAnimation direction="inwards" className="w-[26.5%] left-[71%] top-[20%] rotate-20" />
                    <StarAnimation direction="outwards" className="w-[40%] left-[54%] top-[23%] rotate-12" />
                    <StarAnimation direction="inwards" className="w-[20%] left-[87%] top-[55%] -rotate-40" />
                    <StarAnimation direction="outwards" className="w-[23%] left-[85%] top-[30%] rotate-10" />
                    <StarAnimation direction="inwards" className="w-[28.5%] left-[68.5%] top-[-1%] -rotate-10" />
                </div>
            </div>
            <div className="w-full h-full overflow-hidden absolute top-1/2 left-1/2 -translate-1/2 grid place-items-center">
                <img src="./removed.png" className="object-cover w-full" alt="" />
            </div>
            {/* <div className="w-full h-full overflow-hidden absolute opacity-10 top-1/2 left-1/2 -translate-1/2 grid place-items-center">
                <img src="./maingrey.jpg" className="object-cover w-full" alt="" />
            </div> */}
        </>
    )
}

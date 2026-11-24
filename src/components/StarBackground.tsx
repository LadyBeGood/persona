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


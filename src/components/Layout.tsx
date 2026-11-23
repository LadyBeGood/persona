import { Outlet } from "react-router";
import Confirm from "./Confirm";

export default function Layout() {
    return (
        <>
            <svg viewBox="0 0 500 500" className="hidden">
                <defs>
                    <polygon
                        id="star-polygon"
                        points="250,0 315,160 500,185 365,300 405,500 250,390 95,500 135,300 0,185 185,160"
                    />
                </defs>
            </svg>

            <div role="presentation" className="w-full h-full overflow-hidden absolute pointer-events-none -z-3" style={{ backgroundImage: "linear-gradient(#13131d, #20222e 40% 0)" }}></div>
            {/* Background image */}
            <div role="presentation" className="w-full h-full overflow-hidden absolute pointer-events-none -z-2">
                <img src="./backgrounds/PNG/Night.png" className="object-cover h-full w-full blur-[3px]" alt="" />
            </div>

            {/* Red Overlay */}
            <div role="presentation" className="w-full h-full overflow-hidden absolute opacity-70 bg-(--persona-red) pointer-events-none -z-1"></div>
            

            <Outlet />

            {/* <div role="presentation" className="w-full h-full overflow-hidden absolute pointer-events-none -z-1">
                <img src="./confirm.png" className="object-cover h-full w-full" alt="" />
            </div> */}

            {/* <Confirm /> */}
        </>
    )
}
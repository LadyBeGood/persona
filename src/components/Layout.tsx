import { Outlet } from "react-router";
import Confirm from "./Confirm";

export default function Layout() {
    return (
        <>
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

            <Confirm />
        </>
    )
}
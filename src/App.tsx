import { createRoot } from "react-dom/client"
import StarAnimation from "./Star";
// import { BrowserRouter, Routes, Route } from "react-router"



export function App() {
    return (
        <div>
            <StarAnimation />
        </div>
    )
}




const rootElement = document.getElementById("root");
if (rootElement === null) {
    throw new Error("Expected a DOM element with id \"root\", but none was found.");
}
createRoot(rootElement).render(<App />);



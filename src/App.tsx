import { createRoot } from "react-dom/client"
// import { BrowserRouter, Routes, Route } from "react-router"



export function App() {
    return (
        <div className="">123</div>
    )
}




const rootElement = document.getElementById("root");
if (rootElement === null) {
    throw new Error("Expected a DOM element with id \"root\", but none was found.");
}
createRoot(rootElement).render(<App />);



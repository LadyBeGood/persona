import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router"

import Home from "./routes/Home";
import About from "./routes/About";
import Skills from "./routes/Skills";
import Projects from "./routes/Projects";
import Contact from "./routes/Contact";
import Layout from "./components/Layout";



export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}




const rootElement = document.getElementById("root");
if (rootElement === null) {
    throw new Error("Expected a DOM element with id \"root\", but none was found.");
}
createRoot(rootElement).render(<App />);



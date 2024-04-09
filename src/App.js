import './App.css';
import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About/About";

function App() {
    return (
        <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/about" element={<About />} />

                </Routes>
        </div>
    );
}

export default App;

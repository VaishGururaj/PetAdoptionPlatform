import './App.css';
import Navbar from "./components/Navbar/Navbar"
import { Routes, Route } from "react-router-dom";
import About from "./components/About/About";
import ListPets from "./components/Listpets/Listpets";

function App() {
    return (
        <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/listpets" element={<ListPets />} />
                </Routes>
        </div>
    );
}

export default App;

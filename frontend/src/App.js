import './App.css';
import Navbar from "./components/Navbar/Navbar"
import { Routes, Route } from "react-router-dom";
import About from "./components/About/About";
import ListPets from "./components/Listpets/Listpets";
import PetDetails from "./components/PetDetails/PetDetails"

function App() {
    return (
        <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/listpets" element={<ListPets />} />
                    <Route path="/pet/:id" element={<PetDetails />} />
                </Routes>
        </div>
    );
}

export default App;

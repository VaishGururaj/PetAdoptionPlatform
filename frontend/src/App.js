import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Listpets from "./components/Listpets/Listpets";


function App() {

    return (
        <div className="App">
            <Routes>
                <Route path = "/login" element={<LoginPage/>}></Route>
                <Route path = "/signup" element={<SignUpPage/>}></Route>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/dashboard" element={<Dashboard/>}></Route>
                <Route path = "/listpets" element={<Listpets/>}></Route>

            </Routes>
        </div>
    );
}

export default App;

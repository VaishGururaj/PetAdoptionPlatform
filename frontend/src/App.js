import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";


function App() {

    return (
        <div className="App">
            <Routes>
                <Route path = "/login" element={<LoginPage/>}></Route>
                <Route path = "/signup" element={<SignUpPage/>}></Route>
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Import createTheme and ThemeProvider
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Listpets from "./components/Listpets/Listpets";
import PetDetails from "./components/PetDetails/PetDetails";

// Define your custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#041464', // Set primary color to #041464
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}> {/* Wrap your entire app with ThemeProvider */}
            <div className="App">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/listpets" element={<Listpets />} />
                    <Route path="/pets/:id" element={<PetDetails />} />
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;

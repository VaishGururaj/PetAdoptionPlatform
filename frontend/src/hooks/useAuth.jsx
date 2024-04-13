import { useState } from 'react';

const useAuth = () => {
    const [user, setUser] = useState(null); // Initialize user state to null (not authenticated)

    // Function to simulate login (replace with actual login logic)
    const login = () => {
        setUser({ username: 'exampleUser' }); // Set user state to mock user data upon login
    };

    // Function to simulate logout
    const logout = () => {
        setUser(null); // Set user state to null upon logout
    };

    return { user, login, logout }; // Return user state and login/logout functions
};

export default useAuth;

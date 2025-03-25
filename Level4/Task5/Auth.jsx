import React, { createContext, useState } from "react";

// Create Context
const Auth = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Login function
    const login = (userData) => {
        setUser(userData);
    };

    // Logout function
    const logout = () => {
        setUser(null);
    };

    return (
        <Auth.Provider value={{ user, login, logout }}>
            {children}
        </Auth.Provider>
    );
};

// Export the Context
export default Auth;

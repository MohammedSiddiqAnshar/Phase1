import React, { createContext, useContext, useState } from "react";
import "./index.css";


const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
    };

    const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <button onClick={toggleTheme} className="theme-button">
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
    );
    };


    const App = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={`app ${theme}`}>
        <ThemeToggleButton />
        </div>
    );
    };

    // Wrap App with ThemeProvider
    export default function Root() {
    return (
        <ThemeProvider>
        <App />
        </ThemeProvider>
    );
    }

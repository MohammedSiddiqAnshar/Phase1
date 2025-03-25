import React, { useState, useContext } from "react";
import Auth from "./Auth.jsx";
import './App.css'

function Login() {
    const { login } = useContext(Auth); // Get login function
    const [name, setName] = useState("");

    const handleLogin = () => {
        const userData = { name };
        login(userData); // Update global state
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                
            />
            <button onClick={handleLogin}>
                Login
            </button>
        </div>
    );
}

export default Login;

import React, { useContext } from "react";
import Auth from "./Auth.jsx"; // Import the AuthContext

function Navbar() {
    const { user, logout } = useContext(Auth); // Access user and logout function

    return (
        <nav>
            <h2>LOGIN APP</h2>
            {user ? (
                <div>
                    <span>Welcome, {user.name} </span>
                    <button onClick={logout}>
                        Logout
                    </button>
                </div>
            ) : (
                <span>Please Log in</span>
            )}
        </nav>
    );
}

export default Navbar;

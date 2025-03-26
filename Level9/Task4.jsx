import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, Outlet } from "react-router-dom";


const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return { isAuthenticated, login: () => setIsAuthenticated(true), logout: () => setIsAuthenticated(false) };
    };

    
    const PrivateRoute = ({ isAuthenticated }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
    };

    
    const Home = () => <h2>Welcome to our website!</h2>;

    
    const Login = ({ login }) => {
    return (
        <div>
        <h2>Login Page</h2>
        <button onClick={login}>Login</button>
        </div>
    );
    };

    
    const Dashboard = ({ logout }) => {
    return (
        <div>
        <h2>Dashboard (Protected)</h2>
        <button onClick={logout}>Logout</button>
        </div>
    );
    };

    
    const Profile = () => <h2>Profile Page (Protected)</h2>;

    
    const App = () => {
    const auth = useAuth();

    return (
        <Router>
        <nav>
            <Link to="/">Home</Link> | 
            <Link to="/dashboard">Dashboard</Link> | 
            <Link to="/profile">Profile</Link> | 
            <Link to="/login">Login</Link>
        </nav>

        <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login login={auth.login} />} />

            
            <Route element={<PrivateRoute isAuthenticated={auth.isAuthenticated} />}>
            <Route path="/dashboard" element={<Dashboard logout={auth.logout} />} />
            <Route path="/profile" element={<Profile />} />
            </Route>

            
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </Router>
    );
};

export default App;

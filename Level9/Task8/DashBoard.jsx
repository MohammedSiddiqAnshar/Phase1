import React from "react";
import { Link, Outlet } from "react-router-dom";


const DashBoard = () => {
  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li><Link to="overview">Overview</Link></li>
          <li><Link to="profile">Profile</Link></li>
          <li><Link to="settings">Settings</Link></li>
        </ul>
      </nav>
      <main className="content">
        <Outlet /> {/* This will render the nested routes */}
      </main>
    </div>
  );
};

export default DashBoard;

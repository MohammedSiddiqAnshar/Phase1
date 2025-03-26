import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import NavBar from "./NavBar";
import About from "./About";
import Contact from "./Contact";

const Home = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    textAlign: "center",
    background: "linear-gradient(to right, #1e3c72, #2a5298)",
    fontFamily: "Poppins, sans-serif",
    color: "#fff",
    padding: "20px",
    boxSizing: "border-box"
  };

  const headingStyle = {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#007bff",
  };

  const nameStyle = {
    fontSize: "32px",
    fontWeight: "bold",
    color: "rgb(234, 52, 23)",
  };

  const roleStyle = {
    fontSize: "26px",
    fontWeight: "500",
    color: "#ff6600",
    marginTop: "10px"
  };

  return (
    <section style={containerStyle}>
      <h1 style={headingStyle}>Welcome to My Portfolio</h1>
      <h1>My Name Is <span style={nameStyle}>Mohammed Siddiq A</span></h1>
      <h1 style={roleStyle}>I'm a Full Stack Developer passionate about building web applications.</h1>
    </section>
  );
};





function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

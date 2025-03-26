import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faProjectDiagram, faEnvelope, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav className="navbar">
    <Link to="/" className="nav-item"><FontAwesomeIcon icon={faHome} /> Home</Link>
    <Link to="/about" className="nav-item"><FontAwesomeIcon icon={faUser} /> About</Link>
    <Link to="/internship" className="nav-item"><FontAwesomeIcon icon={faLaptopCode} /> Internship</Link>
    <Link to="/projects" className="nav-item"><FontAwesomeIcon icon={faProjectDiagram} /> Projects</Link>
    <Link to="/contact" className="nav-item"><FontAwesomeIcon icon={faEnvelope} /> Contact</Link>
  </nav>
);

export default NavBar;
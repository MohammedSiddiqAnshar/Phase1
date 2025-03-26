import React from "react";
const Contact = () => {
  const containerStyle = {
    background: "rgba(255, 255, 255, 0.2)",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "500px",
    marginLeft:"520px",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    color: "#333",
    marginBottom: "15px",
    textAlign: "center",
  };

  const contactItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
    padding: "8px 0",
    borderBottom: "1px solid rgba(0,0,0,0.1)", 
  };

  const labelStyle = {
    fontWeight: "bold",
    minWidth: "80px", 
    textAlign: "left",
  };

  const linkStyle = {
    color: "#ffdd57",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color 0.3s ease",
    textAlign: "right",
    flex: 1, // Takes remaining space
    wordBreak: "break-word", // Ensures long links wrap properly
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Contact Me</h2>
      
      <div style={contactItemStyle}>
        <span style={labelStyle}>Email:</span>
        <a href="mailto:MohammedSiddiq2311@gmail.com" style={linkStyle}>MohammedSiddiq2311@gmail.com</a>
      </div>

      <div style={contactItemStyle}>
        <span style={labelStyle}>LinkedIn:</span>
        <a href="https://www.linkedin.com/in/mohammed-siddiq-a-" style={linkStyle} target="_blank">www.linkedin.com/in/mohammed-siddiq-a-</a>
      </div>

      <div style={contactItemStyle}>
        <span style={labelStyle}>GitHub:</span>
        <a href="https://github.com/MohammedSiddiqAnshar" style={linkStyle} target="_blank">Github.com/MohammedSiddiqAnshar</a>
      </div>
      
    </div>
  );
};

export default Contact;


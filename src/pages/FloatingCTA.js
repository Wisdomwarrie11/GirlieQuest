import React from "react";

const FloatingCTA = () => {
  return (
    <a 
      href="https://wa.me/+2349029729621" 
      style={{
        position: "fixed",
        bottom: "25px",
        right: "25px",
        backgroundColor: "#800080",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "50px",
        fontWeight: "bold",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        textDecoration: "none",
        zIndex: 1000
      }}
    >
      💬 You can talk to us
    </a>
  );
};

export default FloatingCTA;

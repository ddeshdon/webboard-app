import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? { backgroundColor: "#e5f6ff", fontWeight: "bold" }
      : {};
  };

  return (
    <header
      style={{
        backgroundColor: "#f7f5ef",
        padding: "1rem 2rem",
        borderBottom: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ 
        color: "#6b8eb7", 
        margin: 0 ,
        fontWeight: "bold",
        fontSize: "2rem",
        fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif"}}>Webboard 💬</h2>
      <div>
        <Link to="/">
        <button
            style={{
              marginRight: "10px",
              padding: "8px 16px",
              borderRadius: "6px",
              backgroundColor: "#4a90e2",
              color: "#fff",
              border: "none",
              fontWeight: "500",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
              cursor: "pointer",
              transition: "background-color 0.3s",
              ...isActive("/login"),
            }}
            onMouseOver={e => (e.target.style.backgroundColor = "#357ABD")}
            onMouseOut={e => (e.target.style.backgroundColor = "#4a90e2")}
          >
          Login
        </button>
        </Link>
        <Link to="/signup">
        <button
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              backgroundColor: "#50c878",
              color: "#fff",
              border: "none",
              fontWeight: "500",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
              cursor: "pointer",
              transition: "background-color 0.3s",
              ...isActive("/signup"),
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#3ba665")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#50c878")}
          >
            Register
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;

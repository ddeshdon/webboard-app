import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";


const AfterLoginHeader = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header
      style={{
        backgroundColor: "#f7f5ef",
        padding: "1rem 2rem",
        borderBottom: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif",
      }}
    >
      {/* Left: Logo */}
      <Link to="/Main" style={{ textDecoration: "none" }}>
  <h2
    style={{
      color: "#6b8eb7",
      margin: 0,
      fontWeight: "bold",
      fontSize: "2rem",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif"
    }}
  >
    Webboard 💬
  </h2>
</Link>


      {/* Right: Greeting + Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontWeight: "500", fontSize: "1rem", color: "#333" }}>
          Hi, <span style={{ fontWeight: "bold" }}>{user?.displayName || user?.email || "Guest"} 👋 </span>
        </span>

        <button
          onClick={() => navigate("/create-post")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "500",
            fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif",
            fontSize: "0.95rem",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={e => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={e => (e.target.style.backgroundColor = "#007bff")}
        >
          Create Post
        </button>

        <button
          onClick={() => {
            signOut(auth);
            navigate("/");
          }}
          style={{
            padding: "8px 16px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "500",
            fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif",
            fontSize: "0.95rem",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={e => (e.target.style.backgroundColor = "#b02a37")}
          onMouseOut={e => (e.target.style.backgroundColor = "#dc3545")}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AfterLoginHeader;

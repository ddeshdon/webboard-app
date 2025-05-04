import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import InputField from "../components/InputField";
import { signInWithEmailAndPassword } from "firebase/auth";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { auth } from "../firebase";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      nav("/main");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <BackgroundWrapper>
    <>
      <Header />
      <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
        <h2 style={{ textAlign: "center" }}>Welcome to Webboard Page !</h2>
        <form onSubmit={submit}>
          <InputField
            label="Email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="••••••"
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              marginTop: "1rem",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          No account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </>
    </BackgroundWrapper>
  );
}

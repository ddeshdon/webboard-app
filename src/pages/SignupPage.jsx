import React, { useState } from "react";
import InputField from "../components/InputField";
import Header from "../components/Header";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await updateProfile(user, { displayName: form.name });
      await setDoc(doc(db, "users", user.uid), {
        name: form.name,
        email: form.email,
        createdAt: serverTimestamp(),
      });
      alert("Signup successful");
      // navigate to Login page
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <BackgroundWrapper>
    <>
      <Header />
      <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
        <h2 style={{ textAlign: "center" }}>Create Account</h2>
        <form onSubmit={submit}>
          <InputField
            label="Name"
            type="text"
            name="name"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
          />
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
          <InputField
            label="Confirm Password"
            type="password"
            name="confirm"
            placeholder="••••••"
            value={form.confirm}
            onChange={handleChange}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              marginTop: "1rem",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
    </BackgroundWrapper>
  );
}

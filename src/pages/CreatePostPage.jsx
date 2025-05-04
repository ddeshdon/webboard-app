import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/AfterLoginHeader";
import InputField from "../components/InputField";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function CreatePostPage() {
  const nav = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    room: "",
    title: "",
    body: ""
  });

  const rooms = ["Sport", "Travel", "Cooking", "Education", "Entertainment"];

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const { room, title, body } = formData;
    if (!room || !title.trim() || !body.trim()) {
      alert("Please fill in all fields before posting.");
      return;
    }

    const post = {
      ...formData,
      author: user.displayName || user.email,
      createdAt: serverTimestamp()
    };

    await addDoc(collection(db, "posts"), post);
    nav("/main");
  };

  return (
    <BackgroundWrapper>
    
      <Header />
      <div
        style={{
          
          minHeight: "100vh",
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start"
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "2rem",
            borderRadius: "10px",
            maxWidth: "600px",
            width: "100%",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif"
          }}
        >
          <h2 style={{ marginBottom: "1rem", color: "#333" }}>Create a New Post</h2>
          <form onSubmit={handleSubmit}>
            <label style={{ fontWeight: "500", marginBottom: "0.5rem", display: "block" }}>
              Room
            </label>
            <select
              name="room"
              value={formData.room}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                marginBottom: "1rem",
                borderRadius: "6px",
                border: "1px solid #ccc"
              }}
            >
              <option value="">-- Select a room --</option>
              {rooms.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <InputField
              label="Title"
              type="text"
              name="title"
              placeholder="What's on your mind?"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <InputField
              label="Body"
              type="textarea"
              name="body"
              placeholder="Write your post here..."
              value={formData.body}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              style={{
                marginTop: "1rem",
                backgroundColor: "#4a90e2",
                color: "#fff",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Post
            </button>
          </form>
        </div>
      </div>
    
    </BackgroundWrapper>
  );
}

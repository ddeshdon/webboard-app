import React, { useEffect, useState } from "react";
import AfterLoginHeader from "../components/AfterLoginHeader";
import { Link } from "react-router-dom";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";

export default function Main() {
  useEffect(() => {
    const img = new Image();
    img.src = '/webboard-app/menureal.jpg';
    img.onload = () => console.log("✅ Background image loaded");
    img.onerror = () => console.log("❌ Failed to load background image");
  }, []);

  const [search, setSearch] = useState("");
  const [room, setRoom] = useState("all");
  const [posts, setPosts] = useState([]);

  const rooms = [
    { value: "all", label: "All 🧭" },
    { value: "Sport", label: "Sport ⚽" },
    { value: "Travel", label: "Travel ✈️" },
    { value: "Cooking", label: "Cooking 🍳" },
    { value: "Education", label: "Education 👨‍🎓" },
    { value: "Entertainment", label: "Entertainment 🎮" }
  ];
  

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, snapshot => {
      const all = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const filtered = all.filter(p => {
        const okRoom = room === "all" || p.room === room;
        const okSearch = p.title.toLowerCase().includes(search.toLowerCase());
        return okRoom && okSearch;
      });
      setPosts(filtered);
    });

    return unsubscribe;
  }, [room, search]);

  return (
    <BackgroundWrapper>

    
    
      <AfterLoginHeader />

        {/* Main content without overlay */}
        <div
          style={{
            padding: "1rem",
            maxWidth: "800px",
            margin: "auto",
            position: "relative",
            zIndex: 1,
            minHeight: "100vh"
          }}
        >
          {/* Search bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              marginBottom: "1.5rem"
            }}
          >
            <span style={{ marginRight: "0.5rem" }}>🔍</span>
            <input
              type="text"
              placeholder="Search posts…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "1rem",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif"
              }}
            />
          </div>

          {/* Room filter */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginBottom: "1.5rem"
            }}
          >
            {rooms.map(r => (
                <button
                  key={r.value}
                  onClick={() => setRoom(r.value)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    backgroundColor: room === r.value ? "#4a90e2" : "#e0e0e0",
                    color: room === r.value ? "#fff" : "#333",
                    fontWeight: "500",
                    fontFamily:
                      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  {r.label}
                </button>
              ))}

          </div>

          {/* Posts */}
          <ul style={{ listStyle: "none", padding: 0 }}>
            {posts.map(p => (
              <li key={p.id} style={{ marginBottom: "1rem" }}>
                <Link to={`/post/${p.id}`} style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      border: "1px solid #ddd",
                      padding: "1rem",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    }}
                  >
                    <h3 style={{ margin: 0 }}>{p.title}</h3>
                    <small>
                      {p.room} • {p.author || "anon"}
                    </small>
                  </div>
                </Link>
              </li>
            ))}
            {posts.length === 0 && (
              <p style={{ textAlign: "center", color: "#666" }}>
                No posts found.
              </p>
            )}
          </ul>
        </div>
      
    
    </BackgroundWrapper>
  );
}
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AfterLoginHeader from "../components/AfterLoginHeader";
import BackgroundWrapper from "../components/BackgroundWrapper";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  addDoc,
  deleteDoc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    getDoc(doc(db, "posts", id)).then(d =>
      setPost({ id: d.id, ...d.data() })
    );

    const q = query(
      collection(db, "posts", id, "comments"),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, snap =>
      setComments(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
    return unsub;
  }, [id]);

  const send = async () => {
    if (!user) return alert("Login first");
    if (!text.trim()) return;
    await addDoc(collection(db, "posts", id, "comments"), {
      uid: user.uid,
      author: user.displayName || user.email,
      body: text,
      createdAt: serverTimestamp(),
    });
    setText("");
  };

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    await deleteDoc(doc(db, "posts", id));
    navigate("/main");
  };

  if (!post) return <p>Loading…</p>;

  return (
    <BackgroundWrapper>
    
      <AfterLoginHeader />
      <div
        style={{
          
          minHeight: "100vh",
          padding: "2rem",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif"
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            maxWidth: "800px",
            margin: "auto",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          {/* Title + Delete Post button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem"
            }}
          >
            <h2 style={{ margin: 0 }}>{post.title}</h2>
            {user?.uid && post?.author && user.displayName === post.author && (
              <button
                onClick={handleDeletePost}
                style={{
                  background: "transparent",
                  border: "1px solid #c00",
                  color: "#c00",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "6px",
                  fontWeight: "500",
                  fontSize: "1rem",
                  fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif",
                  cursor: "pointer"
                }}
                
              >
                Delete Post
              </button>
            )}
          </div>

          {/* Post content */}
          <p style={{ whiteSpace: "pre-wrap", marginBottom: "0.5rem" }}>{post.body}</p>
          <small style={{ color: "#666" }}>
            {post.room} • {post.author || "anon"}
          </small>

          <hr style={{ margin: "1.5rem 0" }} />

          {/* Comments */}
          <h3 style={{ marginBottom: "1rem" }}>Comments</h3>
          {comments.map(c => (
            <div
              key={c.id}
              style={{
                marginBottom: "0.75rem",
                padding: "0.5rem",
                border: "1px solid #eee",
                borderRadius: "6px",
              }}
            >
              <strong>{c.author || "anon"}:</strong> {c.body}
            </div>
          ))}

          {/* Add new comment */}
          <textarea
            rows={3}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Add comment…"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginTop: "1rem"
            }}
          />
          <button
            onClick={send}
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem 1.25rem",
              background: "#4a90e2",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "500",
              fontSize: "1rem",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif",
              cursor: "pointer"
            }}
            
          >
            Send
          </button>
        </div>
      </div>
    
    </BackgroundWrapper>
  );
}

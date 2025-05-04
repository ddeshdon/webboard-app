import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import Login from "./pages/Login";
import Main from "./pages/Main";
import CreatePostPage from "./pages/CreatePostPage";
import Post from "./pages/Post";
import './App.css'; 


function App() {
  return (
    <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/webboard-app' : '/'}>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


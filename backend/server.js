const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://6522770518:<db_password>@saksdp.zu8gtgs.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schemas
const PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  room: String,
  comments: [String],
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const Post = mongoose.model("Post", PostSchema);
const User = mongoose.model("User", UserSchema);

// Routes

// Signup
app.post("/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: "Email already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      res.send({ message: "Signup successful" });
    } catch (err) {
      console.error("Signup error:", err.message); // 👈 make error visible
      res.status(500).send({ message: "Signup failed", error: err.message });
    }
  });
  

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid password" });
    }
    res.send({ message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send({ message: "Error logging in" });
  }
});

// Create post
app.post("/posts", async (req, res) => {
  try {
    const { title, body, room } = req.body;
    if (!title || !body || !room) {
      return res.status(400).send({ message: "Missing fields" });
    }
    const newPost = new Post({ title, body, room, comments: [] });
    await newPost.save();
    res.send(newPost);
  } catch (err) {
    console.error("Create post error:", err);
    res.status(500).send({ message: "Error creating post" });
  }
});

// Get all posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (err) {
    console.error("Fetch posts error:", err);
    res.status(500).send({ message: "Error fetching posts" });
  }
});

// Get post by ID
app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send({ message: "Post not found" });
    res.send(post);
  } catch (err) {
    console.error("Fetch post error:", err);
    res.status(500).send({ message: "Error fetching post" });
  }
});

// Add comment
app.post("/posts/:id/comment", async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment) return res.status(400).send({ message: "Empty comment" });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send({ message: "Post not found" });

    post.comments.push(comment);
    await post.save();
    res.send(post);
  } catch (err) {
    console.error("Add comment error:", err);
    res.status(500).send({ message: "Error adding comment" });
  }
});

// Delete post
app.delete("/posts/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.send({ message: "Post deleted" });
  } catch (err) {
    console.error("Delete post error:", err);
    res.status(500).send({ message: "Error deleting post" });
  }
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
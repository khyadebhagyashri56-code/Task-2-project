const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");
const Post = require("./models/Post");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/minisocial");

// Register
app.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("Registered");
});

// Login
app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  res.json(user);
});

// Create Post
app.post("/post", async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.send("Posted");
});

// Get Posts
app.get("/posts", async (req, res) => {
  const posts = await Post.find().populate("user");
  res.json(posts);
});

// Like
app.post("/like/:id", async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } });
  res.send("Liked");
});

app.listen(3000, () => console.log("Server running on 3000"));

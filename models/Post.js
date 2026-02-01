const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  likes: { type: Number, default: 0 }
});

module.exports = mongoose.model("Post", postSchema);

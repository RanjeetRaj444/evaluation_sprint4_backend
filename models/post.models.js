const mongoose = require("mongoose");
const model = new mongoose.Schema({
  title: String,
  body: String,
  device: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Post = mongoose.model("Post", model);

module.exports = Post;

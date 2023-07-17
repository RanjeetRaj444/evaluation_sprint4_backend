const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/post.models");
const bcrypt = require("bcrypt");
const postRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

//get post
postRouter.get("/:device", auth, async (req, res) => {
  try {
    const  device  = req.querry;
    const filter = { user: req.userId };

    if (device) {
      filter.device = { $in: device.split(".") };
    }

    const posts = await Post.find(filter);
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//create a posts

postRouter.post("/", auth, async (req, res) => {
  const { title, body, device } = req.body;

  try {
    const newPost = await Post.create({
      title,
      body,
      device,
      user: req.userId,
    });
    res.status(200).send({ post: newPost, message: "Post successfull." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
//_id:64b4efb370ff4d787a75411c
postRouter.patch("/update/:id", auth, async (req, res) => {
  try {
    const { title, body, device } = req.body;
    const postId = req.params.id;

    //find post and check if it blongs to the logged-in user

    const post = await Post.findOne({ _id: postId, user: req.userId });
    if (!post) return res.status(400).send("Post not found.");

    post.title = title;
    post.body = body;
    post.device = device;
    await post.save();

    res.status(200).send({ message: "Post updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

postRouter.delete("/delete/:id", auth, async (req, res) => {
  try {
    const postId = req.params.id;

    //find post and check if it blongs to the logged-in user

    const post = await Post.findOneAndDelete({ _id: postId, user: req.userId });
    if (!post) return res.status(400).send("Post not found.");

    res.status(200).send({ message: "Post deleted successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = postRouter;

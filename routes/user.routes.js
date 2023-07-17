const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

//register post

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("Email already register!");

    //hash the password

    const newPassword = await bcrypt.hash(password, 10);

    //create a new user

    const newUser = await User.create({
      name,
      email,
      gender,
      password: newPassword,
    });
    res.status(200).send("register successfully.");
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//Login routes

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    //find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found register first!");

    //compare password

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).send("Password incorrect");

    //generate token

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).send({ token: token });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = userRouter;

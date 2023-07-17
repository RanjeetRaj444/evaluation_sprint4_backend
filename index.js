const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.routes");
const cors = require("cors");
const postRouter = require("./routes/post.routes");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(8080, async () => {
  try {
    mongoose.connect(process.env.SERVER_URL);
    console.log("Server is listening on", 8080);
  } catch (err) {
    console.log(err);
  }
});

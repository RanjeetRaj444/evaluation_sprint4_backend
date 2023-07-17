const mongoose = require("mongoose");
const model = new mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  password: String,
});
const User = mongoose.model("User", model);

module.exports = User;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGI0ZWU1NTRlYTAxM2JlZmNlMDRiOTkiLCJpYXQiOjE2ODk1NzkxMTUsImV4cCI6MTY4OTU4MjcxNX0.aGw7pxVbiSD5nw3ZCCoGoP28nnBLAnAwRg9QyyLzRL4
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required:true,
  },
  password: {
    type: String,
    required: true,
  },
  atLevel: {
    type: Number,
    ref: "Level",
    default: 1,
  },
  lastSolvedAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

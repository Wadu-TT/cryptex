const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  media: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  hint: [
    {
      type: String,
      required: true,
    },
  ],
});

const Level = mongoose.model("Level", levelSchema);
module.exports = Level;

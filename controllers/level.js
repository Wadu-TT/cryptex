const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.getCurrentLevel = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate("atLevel", [
      "_id",
      "question",
      "media",
    ]);
    if (!user.atLevel) {
      res.status(400).json({ message: "You have completed the game!" });
      return;
    }
    res
      .status(200)
      .json({ question: user.atLevel.question, media: user.atLevel.media });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postCurrentLevel = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed!");
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
    return;
  }

  const { answer } = req.body;
  try {
    let user = await User.findById(req.userId).populate("atLevel", [
      "_id",
      "answer",
    ]);
    const isAnswer = await bcrypt.compare(
      answer.toLowerCase(),
      user.atLevel.answer,
    );
    if (isAnswer) {
      user = await User.findByIdAndUpdate(
        req.userId,
        {
          $set: { atLevel: user.atLevel._id + 1, lastSolvedAt: Date.now() },
        },
        { new: true, runValidators: true },
      ).populate("atLevel", ["_id", "question", "media"]);
      if (!user.atLevel) {
        res.status(400).json({ message: "You have completed the game!" });
        return;
      }
      res
        .status(200)
        .json({ question: user.atLevel.question, media: user.atLevel.media });
      return;
    }
    res.status(406).json({ message: "Wrong Answer!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//TODO: Comment out this controller when pushing to production
const Level = require("../models/level");
exports.postCreateLevel = async (req, res, next) => {
  const levels = req.body;
  try {
    for (let level of levels) {
      level.answer = await bcrypt.hash(level.answer.toLowerCase(), 12);
    }
    const result = await Level.insertMany(levels);
    res.status(200).json({ message: "Level(s) added", levels: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

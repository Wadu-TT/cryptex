const express = require("express");
const { body } = require("express-validator");

const isAuth = require("../middlewares/is-auth");
const levelController = require("../controllers/level");

const router = express.Router();

router.get("/currentLevel", isAuth, levelController.getCurrentLevel);

router.post(
  "/currentLevel",
  [
    body("answer")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Answer cannot be empty."),
  ],
  isAuth,
  levelController.postCurrentLevel,
);

//TODO: Comment out this route when pushing to production
router.post("/createLevel", levelController.postCreateLevel);

module.exports = router;

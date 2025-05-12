const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const authController = require("../controllers/auth");

const checkTime = require("../middlewares/check-time");

const router = express.Router();

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Enter a valid email.")
      .normalizeEmail(),

    body("password")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Password must be at least 10 characters long."),
  ],
  checkTime,
  authController.login,
);

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Enter a valid email.")
      .custom(async (value, { req }) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          return Promise.reject("Email already exists!");
        }
      })
      .normalizeEmail(),

    body("password")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Password must be at least 10 characters long."),

    body("name").trim().not().isEmpty().withMessage("Name cannot be empty."),

    body("phone")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone number must be of 10 digits"),
  ],
  authController.signup,
);

module.exports = router;

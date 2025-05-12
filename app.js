require("dotenv").config({ path: "./.env" });

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");

const levelRoutes = require("./routes/level");
const authRoutes = require("./routes/auth");
const User = require("./models/user");
//const rateLimiter = require("./middlewares/rate-limiter");

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, userId",
  );
  next();
});

//app.use(rateLimiter);

app.use(levelRoutes);
app.use(authRoutes);

app.get("/leaderboard", async (req, res, next) => {
  try {
    let users = await User.find({})
      .select("name atLevel email")
      .sort({ atLevel: -1, lastSolvedAt: 1 });

    users = users.map((user, index) => {
      return { ...user._doc, serialNumber: index + 1 };
    });

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ users: users });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("DB Connected");
    app.listen(process.env.PORT);
  })
  .catch((e) => console.log(`Db Connection Error${e}`));

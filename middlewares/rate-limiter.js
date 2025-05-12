// const rateLimit = require("express-rate-limit");

// const rateLimiter = rateLimit({
//   windowMs: 5 * 60 * 1000,
//   max: 500,
//   statusCode: 429,
//   message: {
//     message:
//       "Too many requests from this user, please try again after 5 minutes!",
//   },
//   headers: true,
//   keyGenerator: (req, res) => req.headers.userId || req.ip,
// });

// module.exports = rateLimiter;


const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
  handler: function (req, res) {
    return res.status(429).json({ error: "Too many requests, please try again later." });
  }
});

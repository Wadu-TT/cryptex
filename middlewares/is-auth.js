// require("dotenv").config({ path: "../.env" });

// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const authHeader = req.get("Authorization");
//   if (!authHeader) {
//     const error = new Error("Not Authenticated!");
//     error.statusCode = 401;
//     throw error;
//   }
//   const token = authHeader.split(" ")[1];

//   if (!token || token === 'null') {
//     const error = new Error("Invalid token!");
//     error.statusCode = 401;
//     throw error;
//   }
  
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
//   } catch (err) {
//     err.statusCode = 500;
//     throw err;
//   }
//   if (!decodedToken) {
//     const error = new Error("Not Authenticated!");
//     error.statusCode = 401;
//     throw error;
//   }
//   req.userId = decodedToken.userId;
//   next();
// };


require("dotenv").config({ path: "../.env" });

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1]; // Expecting format: Bearer <token>
  
  if (!token) {
    return res.status(401).json({ message: "Token missing from Authorization header" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

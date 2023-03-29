var jwt = require("jsonwebtoken"); // Importing json web token
const key = require("../key/config") // Importing jwt secret key from config file

const JWT_SECRET = key; // JWT Secret key

const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET); // Verifying token
    req.user = data.user; // Fetching user's data
    next(); // Running next function
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" }); // When token is incorrect
  }
};

module.exports = fetchuser; // Exproting fetchuser

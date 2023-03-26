const express = require("express"); // Importing express
const User = require("../models/User"); // Importing User model
const router = express.Router(); // Importing router from express
const { body, validationResult } = require("express-validator"); // Importing express validator
const bcrypt = require("bcryptjs"); // Importing bcrypt js
var jwt = require("jsonwebtoken"); // Importing JWT
var fetchuser = require("../middleware/fetchuser"); // Importing fetchuser middleware

const JWT_SECRET = "Rahulisagoodb$oy"; // JWT Secret key

//* ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required

router.post(
  "/createuser",
  [
    // Validating name email and password
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10); // Generating a salt
      const secPass = await bcrypt.hash(req.body.password, salt); // Generating a hash password

      // Create a new user and store in database
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET); // Signing JWT key
      success = true;
      res.json({ success,authtoken }); // sending authtoken in response
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error"); // In case of errors
    }
  }
);

//* ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required

router.post(
  "/login",
  [
    // Validating email and password
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; // Fetching email and password from body
    try {
      let user = await User.findOne({ email }); // Fincding user by email
      // If credentials are wrong
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET); // Signing jwt key
      success = true;
      res.json({ success, authtoken }); // Sending success status and authtoken
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error"); // In case of errors
    }
  }
);

//* ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id; // fetching user id
    const user = await User.findById(userId).select("-password"); // Finding user by id
    res.send(user); // Sending user's data in response
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error"); // In case of errors
  }
});
module.exports = router; // Exporting router

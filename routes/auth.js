const express = require("express");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const requireLogin = require("../middleware/requireLogin");
const userModels = require("../models/user");

const router = express.Router();
router.get("/protected", requireLogin, (req, res) => {
  res.send("hello user");
});
router.get("/signin", (req, res) => {
  res.send("auth");
});
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModels.findUserByUsername(username);
    if (!user) {
      return res.json({ message: "Invalid Username or Password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Invalid Username or Password" });
    }
    const token = generateJwt(username);
    return res.json({
      token: token,
      user: user,
      message: "Logged in successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (password.length < 8)
      return res.json({ message: "Password need min 8 characters" });
    const user = await userModels.findUserByUsername(username);

    if (user) {
      return res.json({ message: "User existed" });
    }
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await userModels.insertUser(username, hashedPassword);
      return res.json({ message: "User created successfully" });
    }
  } catch (err) {
    return res.json({ message: "Internal Server Error" });
  }
});

router.get("/me", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "PRIVATE_KEY", (err, decoded) => {
    if (!err) {
      res.json({ username: decoded.username });
    } else res.status(401).send("Invalid token");
  });
});

const generateJwt = (username) => {
  const token = jwt.sign({ username: username }, "PRIVATE_KEY", {
    expiresIn: "10h",
  });
  return token;
};

module.exports = router;

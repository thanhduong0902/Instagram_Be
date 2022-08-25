const jwt = require("jsonwebtoken");
const { db } = require("../db");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "PRIVATE_KEY", (err, decoded) => {
    db.user.findOne({ username: decoded.username }).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};

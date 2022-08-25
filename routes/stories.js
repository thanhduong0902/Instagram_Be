const express = require("express");
const { db } = require("../db");

const router = express.Router();

router.get("/stories", (req, res) => {
  db.stories
    .find()
    .toArray()
    .then((data) => {
      res.json({
        stories: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

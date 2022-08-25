const express = require("express");
const { db } = require("../db");

const postCtrl = require("../controller/Post");
const requireLogin = require("../middleware/requireLogin");

const router = express.Router();

router.get("/allpost", (req, res) => {
  db.post
    .find()
    .toArray()
    .then((data) => {
      res.json({
        posts: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/mypost", async (req, res) => {
  const { user } = req.body;
  db.post
    .find({ user: user })
    .toArray()
    .then((data) => {
      res.json({
        userPost: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createpost", async (req, res) => {
  const { user, postPersonImage, caption, postImage } = req.body;
  const newPost = await postCtrl.newPost(
    user,
    postPersonImage,
    caption,
    postImage
  );
  const updatePost = await postCtrl.findPost(postImage);
  res.json(updatePost);
});

router.put("/", (req, res) => {});

router.delete("/", (req, res) => {});

module.exports = router;

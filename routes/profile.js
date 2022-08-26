const express = require("express");
const { db } = require("../db");
const requireLogin = require("../middleware/requireLogin");

const router = express.Router();
router.post("/createprofile", async (req, res) => {
  const { name, accountName, profileImage } = req.body;
  const profile = await db.profile.insertOne({
    name: name,
    accountName: accountName,
    profileImage: profileImage,
    followers: 0,
    following: 0,
    post: 0,
  });
  const Setprofile = await db.profile.findOne({
    accountName: accountName,
  });
  return res.json({
    profile: Setprofile,
  });
});
router.put("/profile", async (req, res) => {
  const { name, accountName, profileImage } = req.body;
  const respone = await db.user.updateOne(
    { username: accountName },
    {
      $set: {
        name: name,
        accountName: accountName,
        profileImage: profileImage,
        followers: 0,
        following: 0,
        post: 0,
      },
    }
  );
  const profile = await db.user.findOne({ accountName: accountName });
  return res.json({
    profile: profile,
  });
});
router.get("/profile", requireLogin, async (req, res) => {
  const profile = await db.profile.findOne({ accountName: req.user.username });
  return res.json({
    profile: profile,
  });
});

module.exports = router;

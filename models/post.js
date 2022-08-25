const { db } = require("../db");
const findPost = async (postImage) => {
  return await db.post.findOne({ postImage: postImage });
};
const insertPost = async (user, postPersonImage, caption, postImage) => {
  return await db.post.insertOne({
    user: user,
    postPersonImage: postPersonImage,
    caption: caption,
    postImage: postImage,
  });
};
module.exports = { insertPost, findPost };

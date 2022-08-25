const postModels = require("../models/post");

const newPost = async (user, postPersonImage, caption, postImage) => {
  return await postModels.insertPost(user, postPersonImage, caption, postImage);
};

const findPost = async (postImage) => {
  return await postModels.findPost(postImage);
};

module.exports = { newPost, findPost };

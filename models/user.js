const { db } = require("../db");

const findUserByUsername = async (username) => {
  return await db.user.findOne({ username: username });
};

const insertUser = async (username, password) => {
  return await db.user.insertOne({
    username: username,
    password: password,
  });
};

module.exports = { findUserByUsername, insertUser };

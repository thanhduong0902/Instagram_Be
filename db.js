const { MongoClient } = require("mongodb");

const db = {};

const connectDb = async () => {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();
  console.log("DB connected");
  const database = client.db("insta");
  db.user = database.collection("user");
  db.post = database.collection("post");
  db.profile = database.collection("profile");
  db.stories = database.collection("stories");
};

module.exports = { db, connectDb };

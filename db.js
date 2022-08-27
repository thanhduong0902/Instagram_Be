const { MongoClient } = require("mongodb");

const db = {};

const connectDb = async () => {
  const client = new MongoClient(
    "mongodb+srv://admin:xkTbGTkrCa5h82rh@cluster0.ivf69y9.mongodb.net/test"
  );
  await client.connect();
  console.log("DB connected");
  const database = client.db("insta");
  db.user = database.collection("user");
  db.post = database.collection("post");
  db.profile = database.collection("profile");
  db.stories = database.collection("stories");
};

module.exports = { db, connectDb };

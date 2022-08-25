const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const { connectDb } = require("./db");
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public"));
  },
  filename: function (req, file, cb) {
    const fileSuffix = Date.now() + "-" + Math.round(Math.random() * 10000);
    cb(null, "post" + "-" + fileSuffix + ".jpg");
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send("/public/" + req.file.filename);
});

app.use("/public", express.static("public"));

app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/profile"));
app.use(require("./routes/stories"));

app.listen(3000, () => {
  console.log("running at 3000");
  connectDb();
});

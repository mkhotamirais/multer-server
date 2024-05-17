const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const { log } = require("console");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: path.join(__dirname, "uploads") });

app.set("view engine", "ejs");
// app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  //   console.log(req.protocol);
  return res.render("index");
});

app.post("/upload", upload.single("myImage"), (req, res) => {
  //   console.log(req.body);
  //   console.log(req.file);
  return res.redirect("/");
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     // cb(null, file.fieldname + "-" + uniqueSuffix);
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

const db = mongoose.connect(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("halo");
});

app.post("/api/upload", upload.single("image"), (req, res) => {
  res.json(req.file);
});

db.then(() => {
  app.listen(port, () => log(`listening on port ${port}`));
}).catch((err) => {
  console.log(err?.message);
});

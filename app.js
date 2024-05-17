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
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log("halo");
  console.log("semuanya");
  console.log(req.hostname);
  console.log(req.protocol);
  const nama = `${req.protocol}//${req.hostname}`;
  //   console.log(req.protocol);
  res.render("index", { nama });
});

app.post("/upload", upload.single("myImage"), (req, res) => {
  //   console.log(req.body);
  //   console.log(req.file);
  res.redirect("/");
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

// app.get("/", (req, res) => {
//   res.send("halo");
// });

// app.post("/api/upload", upload.single("myImage"), (req, res) => {
//   res.json(req.file);
// });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => log(`listening on port ${port}`));
  })
  .catch((err) => {
    console.log(err?.message);
  });

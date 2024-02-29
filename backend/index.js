const port = 4000;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("json-web-token");
const multer = require("multer");
const path = require("path"); // Using path we can get the access to our backend directory.
const cors = require("cors");

app.use(express.json());
app.use(cors()); // Using this our react js project will connect to express app on 4000 port

// Database connection with mongoDB

mongoose.connect(
  "mongodb+srv://bhaskerjoshi977:Global9210@cluster0.4u66kem.mongodb.net/Shop here"
);

// API creation

app.get("/", (req, res) => {
  res.send("Express app is Running");
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port", port);
  } else {
    console.log("Error :" + error);
  }
});

// Image Storage Engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

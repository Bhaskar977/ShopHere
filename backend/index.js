const port = 4000;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("json-web-token");
const multer = require("multer");
const path = require("path"); // Using path we can get the access to our backend directory.
const cors = require("cors");

// Here the middleware -  express.json() inside the app.use to parse incoming bodies with JSON payloads.
app.use(express.json()); // creating the instance
app.use(cors()); // Using this our react js project will connect to express app on 4000 port

// Database connection with mongoDB

mongoose.connect(
  "mongodb+srv://bhaskerjoshi977:Global9210@cluster0.4u66kem.mongodb.net/Shophere"
);

// API creation

app.get("/", (req, res) => {
  res.send("Express app is Running");
});

// Image Storage Engine

// Multer is basically used for handling multipart/form-data which is primarily used for uploading files.

const storage = multer.diskStorage({
  // multer.diskStorage() defines how files should be stored.
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Creating upload endpoints for the images.

app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Schema

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  new_price: {
    type: Number,
    require: true,
  },
  old_price: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  //  Whenever we are saving some product in the database it'll take some time so,we are using await below.
  await product.save();
  console.log("saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Creating the API for deleting the product.

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Remove");
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port", port);
  } else {
    console.log("Error :" + error);
  }
});

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")))

// Create uploads folder path
const UPLOADS_FOLDER = path.join(__dirname, "uploads");

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_FOLDER),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json()); // for parsing JSON data

// GET endpoint
app.get("/", (req, res) => {
  res.send("Outfit Styling Backend is Running 🚀");
});

// POST endpoint for image + text
app.post("/upload", upload.single("image"), (req, res) => {
  console.log("File info:", req.file);       // logs uploaded file details
  console.log("Other form data:", req.body); // logs text fields
  res.send({ message: "Image and data received!" });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

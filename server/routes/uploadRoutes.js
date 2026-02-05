const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage });

// upload endpoint
router.post("/", upload.single("file"), (req, res) => {
  res.json({
    fileUrl: `/uploads/${req.file.filename}`
  });
});

module.exports = router;

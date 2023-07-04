const router = require("express").Router();
const multer = require("multer");
const mongoose = require("mongoose");

const { protect } = require("../middleware/authMiddleware");

const { Recording } = require("../models/");

const upload = multer({});

router.post("/", protect, upload.single("recording"), async (req, res) => {
  const encoded = req.file.buffer.toString("base64");

  const recording = await Recording.create({
    file: encoded,
    display: req.body.recordingName,
    user: mongoose.Types.ObjectId(req.body.userid),
  });
  res.status(201).send(recording);
});

module.exports = router;

const router = require("express").Router();
const multer = require("multer");
const { Library } = require("../models");
const { protect } = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

const upload = multer({});

router.post("/", upload.single("recording"), async (req, res) => {
  const encoded = req.file.buffer.toString("base64");

  const library = await Library.create({
    file: encoded,
    display: req.body.recordingName,
    category: req.body.category,
  });
  res.status(201).send(library);
});
 
router.get("/:category", async (req, res) => {
  const library = await Library.find({
    category: mongoose.Types.ObjectId(req.params.category),
  }); 
  res.status(200).send(library);
});

router.get("/activities/:category", protect, async (req, res) => {
  const library = await Library.aggregate([
    {
      $lookup: {
        from: "activities",
        localField: "_id",
        foreignField: "libraryUrl",
        as: "activity",
        pipeline: [
          {
            $match: {
              user: req.user._id,
            },
          },
          {
            $project: {
              percentage: 1,
            },
          },
        ],
      },
    },
    {
      $match: {
        category: mongoose.Types.ObjectId(req.params.category),
      },
    },
    {
      $unwind: {
        path: "$activity",
        includeArrayIndex: "0",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);
  res.status(200).send(library);
});

module.exports = router;

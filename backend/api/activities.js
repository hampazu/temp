const router = require("express").Router();
const { Activity } = require("../models");

const { protect } = require("../middleware/authMiddleware");

// @desc    get actvity
// @route   GET /api/activities
// @access  Private
router.get("/", protect, async (req, res) => {
  const activity = await Activity.find();
  res.status(200).send(activity);
});

// @desc    Set actvity
// @route   POST /api/activities
// @access  Private
router.post("/", protect, async (req, res) => {
  const activityExists = await Activity.findOne({
    user: req.body.user,
    libraryUrl: req.body.record,
  });

  if (activityExists) {
    await Activity.deleteOne({
      user: req.body.user,
      libraryUrl: req.body.record,
    });
  }
  
  const activity = await Activity.create({
    user: req.body.user,
    libraryUrl: req.body.record,
    percentage: req.body.percentage,
  });

  res.status(200).send(activity.percentage);
});

router.put("/", protect, async (req, res) => {
  const activity = await Activity.findOneAndUpdate(
    {
      user: req.body.user,
      libraryUrl: req.body.record,
    },
    {
      percentage: req.body.percentage,
    },
    { new: true }
  );
  res.status(200).send(activity.percentage);
}); 

module.exports = router;

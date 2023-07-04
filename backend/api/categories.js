const router = require("express").Router();
const { Category } = require("../models");

// @desc    get actvity
// @route   GET /api/categories
// @access  Public
router.get("/", async (req, res) => {
  const category = await Category.find();
  res.status(200).send(category);
});
 
module.exports = router;
  
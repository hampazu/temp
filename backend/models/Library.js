const mongoose = require("mongoose");

const librarySchema = mongoose.Schema({
  file: {
    type: String,
    required: [true, "Please add filename"],
  },
  display: {
    type: String,
    required: [true, "Please add display"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Please add a category"],
  }
});

module.exports = mongoose.model("Library", librarySchema);

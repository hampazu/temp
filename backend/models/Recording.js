const mongoose = require("mongoose");

const recordingSchema = mongoose.Schema({
  file: {
    type: String,
    required: [true, "Please add filename"],
  },
  display: {
    type: String,
    required: [true, "Please add display"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please add an user"],
  }
});

module.exports = mongoose.model("Recording", recordingSchema);

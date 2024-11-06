// models/Review.js
const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  authorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  tourID: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  datePosted: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", ReviewSchema);

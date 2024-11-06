// models/Tour.js
const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
  ID: { type: Number, required: true, unique: true },
  authorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  cost: { type: Number, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  stops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stop" }],
});

module.exports = mongoose.model("Tour", TourSchema);

// models/Stop.js
const mongoose = require("mongoose");

const StopSchema = new mongoose.Schema({
  tourID: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
  dialogue: { type: String, required: true },
  location: {
    type: {
      type: String, // "Point"
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

StopSchema.index({ location: "2dsphere" }); // Enables geospatial queries on location

module.exports = mongoose.model("Stop", StopSchema);

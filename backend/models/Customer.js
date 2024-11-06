// models/Customer.js
const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  ID: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  purchasedTours: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tour" }],
  tourguide: { type: Boolean, default: false },
  toursForSale: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tour" }],
  creditCard: {
    number: { type: String, required: false },
    expirationDate: { type: String, required: false },
    cvv: { type: String, required: false },
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);

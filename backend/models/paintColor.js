const mongoose = require("mongoose");

const paintColorSchema = new mongoose.Schema({
  color: {
    type: String,
    enum: ["blue", "grey", "black", "white", "purple"],
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "running low", "out of stock"],
    default: "available",
  },
});

const PaintColor = mongoose.model("PaintColor", paintColorSchema);

module.exports = PaintColor;

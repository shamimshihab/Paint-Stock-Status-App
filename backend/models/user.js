const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["painter", "manager", "admin"],
    default: "painter",
  },
  editPermission: {
    type: String,
    enum: ["read-write", "read-only"],
    default: "read-only",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

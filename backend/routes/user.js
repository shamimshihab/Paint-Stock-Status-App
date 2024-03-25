const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//Importing User model
const User = require("../models/user");
// Importing token verify middleware
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();

// Getting list of User only Accessible to Admin
router.get("/userList", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user || user.role !== "admin") {
      return res.status(403).send("No permission to perform this action");
    }

    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Admin creating  a new user
router.post("/register", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user || user.role !== "admin") {
      return res.status(403).send("No permission to perform this action.");
    }
    // Hashed User Password and Create new user
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Login as a user
router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    //JWT token generation
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      role: user.role,
      editPermission: user.editPermission,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//Update user read-write or read-only permission accessible to admin
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user || user.role !== "admin") {
      return res.status(403).send("No permission to perform this action.");
    }

    const { id } = req.params;
    const { editPermission } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { editPermission },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Respond with the updated user permission
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete User
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user || user.role !== "admin") {
      return res.status(403).send("No permission to perform this action.");
    }

    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

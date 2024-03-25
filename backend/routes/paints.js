const express = require("express");
//Importing User Paint Color model
const PaintColor = require("../models/paintColor");
// Importing token verify middleware
const authenticateToken = require("../middleware/authenticateToken");
const User = require("../models/user");
const router = express.Router();

// Getting paint stock status of all  colors
router.get("/paintStockStatus", authenticateToken, async (req, res) => {
  try {
    const paints = await PaintColor.find();
    res.json(paints);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//Update stock status of multiple colors
router.put("/paintStockStatus", authenticateToken, async (req, res) => {
  try {
    const updatedPaintStockStatus = req.body;

    if (
      !Array.isArray(updatedPaintStockStatus) ||
      updatedPaintStockStatus.length === 0
    ) {
      return res.status(400).send("Invalid input");
    }

    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user || user.editPermission !== "read-write") {
      return res.status(403).send("No permission to perform this action");
    }

    const updatePromises = updatedPaintStockStatus.map(({ color, status }) => {
      return PaintColor.findOneAndUpdate(
        { color },
        { $set: { status } },
        { new: true }
      );
    });

    const updatedPaintStatusArray = await Promise.all(updatePromises);

    const updatedPaints = updatedPaintStatusArray.filter(
      (paint) => paint !== null
    );

    res.json(updatedPaints);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;

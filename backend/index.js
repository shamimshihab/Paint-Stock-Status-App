require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const PaintColor = require("./models/paintColor");
const secretKey = process.env.JWT_SECRET || "default-secret-key";
const User = require("./models/user");
const saltRounds = 10;
const app = express();
app.use(express.json());

mongoose.set("strictQuery", false);
app.use(
  cors({
    origin: "*",
  })
);

mongoose.connect(process.env.MONGODB_URI);

const authenticateToken = (req, res, next) => {
  const authticationHeader = req.headers["authorization"];
  const token = authticationHeader && authticationHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.userId;
    next();
  });
};

app.get("/users", authenticateToken, async (req, res) => {
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

// app.post("/register", authenticateToken, async (req, res) => {
//   try {
//     const userId = req.userId;
//     const user = await User.findById(userId);
//     console.log("users");
//     if (!user || user.role !== "admin") {
//       return res
//         .status(403)
//         .send("You do not have permission to perform this action.");
//     }
//     const newUser = new User(req.body);
//     await newUser.save();
//     res.status(201).send("User registered successfully");
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

app.post("/register", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    console.log("users");
    if (!user || user.role !== "admin") {
      return res.status(403).send("No permission to perform this action.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

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

app.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    console.log(" userName", userName, password);
    const user = await User.findOne({ userName });

    const isMatchWithPassword = await bcrypt.compare(password, user.password);
    if (!isMatchWithPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    res.json({
      token: token,

      role: user.role,
      editPermission: user.editPermission,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
// app.post("/login", async (req, res) => {
//   try {
//     const { userName, password } = req.body;

//     const user = await User.findOne({ userName, password });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }
//     const token = jwt.sign({ userId: user._id }, secretKey, {
//       expiresIn: "1h",
//     });

//     res.json({
//       token: token,

//       role: user.role,
//       editPermission: user.editPermission,
//       message: "Login successful",
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

app.put("/users/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    console.log("users");
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .send("You do not have permission to perform this action.");
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
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.delete("/users/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .send("You do not have permission to perform this action.");
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

app.get("/paints", authenticateToken, async (req, res) => {
  try {
    const paints = await PaintColor.find();
    res.json(paints);
  } catch (error) {
    res.status(500).send("Server error");
  }
});
app.put("/paints", authenticateToken, async (req, res) => {
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
      return res.status(403).send("No permission to perform this actionn");
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

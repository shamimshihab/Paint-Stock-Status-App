require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const usersRouter = require("./routes/user");
const paintsRouter = require("./routes/paints");

const app = express();

app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", false);

// Connection with MongoDB URI from environment variables
mongoose.connect(process.env.MONGODB_URI);

//routes for specefice paths
app.use("/user", usersRouter);
app.use("/paints", paintsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

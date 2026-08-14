const express = require("express");
const cors = require("cors");
const videoRoutes = require("./routes/videoRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const path = require("path");
const app = express();
const registerRoutes = require("./routes/registerRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/videos", videoRoutes);
app.use("/api/register", registerRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "HDTV Bharat API is running"
  });
});

app.use("/api/categories", categoryRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
module.exports = app;
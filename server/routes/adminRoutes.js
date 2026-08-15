const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/videos/pending", async (req, res) => {
  try {
    const [videos] = await db.query(
      "SELECT * FROM videos WHERE status = 0 ORDER BY id DESC",
    );
    res.json({
      success: true,
      videos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending videos",
    });
  }
});

router.get("/videos/approved", async (req, res) => {
  try {
    const [videos] = await db.query(
      "SELECT * FROM videos WHERE status = 1 ORDER BY id DESC",
    );
    res.json({
      success: true,
      videos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch approved videos",
    });
  }
});

router.put("/videos/:id/approve", async (req, res) => {
  try {
    const [result] = await db.query(
      "UPDATE videos SET status = 1 WHERE id = ?",
      [req.params.id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.json({
      success: true,
      message: "Video approved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to approve video",
    });
  }
});

router.delete("/videos/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM videos WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete video",
    });
  }
});

module.exports = router;

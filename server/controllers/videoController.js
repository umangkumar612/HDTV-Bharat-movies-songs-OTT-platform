const db = require("../config/db");

const getVideos = async (req, res) => {
  try {
    const [videos] = await db.query(`
      SELECT
        v.id,
        v.title,
        v.slug,
        v.description,
        v.thumbnail,
        v.video_url,
        v.duration,
        v.views,
        v.is_featured,
        v.is_trending,
        c.name AS category_name,
        c.slug AS category_slug
      FROM videos v
      LEFT JOIN categories c ON v.category_id = c.id
      WHERE v.status = 1
      ORDER BY v.created_at DESC
    `);

    res.json({
      success: true,
      videos
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch videos"
    });
  }
};

module.exports = {
  getVideos
};
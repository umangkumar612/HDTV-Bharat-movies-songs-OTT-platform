const db = require("../config/db");

const getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      "SELECT id, name, slug, image FROM categories WHERE status = 1 ORDER BY name ASC"
    );

    res.json({
      success: true,
      categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories"
    });
  }
};

module.exports = {
  getCategories
};
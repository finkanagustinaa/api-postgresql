const pool = require("../config/database");
const { validationResult } = require("express-validator");

exports.createCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    const newCategory = await pool.query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING *",
      [name]
    );

    res.status(201).json(newCategory.rows[0]);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategory = async (req, res) => {
  const categories = await pool.query("SELECT * FROM categories ORDER BY id DESC");
  res.json(categories.rows);
};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params;

  const category = await pool.query(
    "SELECT * FROM categories WHERE id = $1",
    [id]
  );

  res.json(category.rows[0]);
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updated = await pool.query(
    "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
    [name, id]
  );

  res.json(updated.rows[0]);
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM categories WHERE id = $1", [id]);

  res.json({ message: "Category berhasil dihapus" });
};
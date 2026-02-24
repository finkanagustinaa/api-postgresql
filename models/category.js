const pool = require('../config/database');

// CREATE
const createCategory = async (name) => {
  const result = await pool.query(
    'INSERT INTO categories (name) VALUES ($1) RETURNING *',
    [name]
  );
  return result.rows[0];
};

// GET ALL
const getAllCategory = async () => {
  const result = await pool.query(
    'SELECT * FROM categories ORDER BY id DESC'
  );
  return result.rows;
};

// GET BY ID
const getCategoryById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM categories WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// UPDATE
const updateCategory = async (id, name) => {
  const result = await pool.query(
    'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *',
    [name, id]
  );
  return result.rows[0];
};

// DELETE
const deleteCategory = async (id) => {
  await pool.query(
    'DELETE FROM categories WHERE id = $1',
    [id]
  );
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
};
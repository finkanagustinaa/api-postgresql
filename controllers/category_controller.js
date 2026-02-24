const categoryModel = require('../models/category');

// CREATE
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await categoryModel.createCategory(name);

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getCategory = async (req, res) => {
  const categories = await categoryModel.getAllCategory();
  res.json(categories);
};

// GET BY ID
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.getCategoryById(id);
  res.json(category);
};

// UPDATE
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await categoryModel.updateCategory(id, name);
  res.json(category);
};

// DELETE
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  await categoryModel.deleteCategory(id);

  res.json({ message: 'Category berhasil dihapus' });
};
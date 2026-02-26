const categoryModel = require('../models/category');

// CREATE
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await categoryModel.createCategory(name);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL
const getCategory = async (req, res) => {
    try {
        const categories = await categoryModel.getAllCategory();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET BY ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.getCategoryById(id);
        if (!category) return res.status(404).json({ message: "Category tidak ditemukan" });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await categoryModel.updateCategory(id, name);
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.deleteCategory(id);
        res.json({ message: 'Category berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
};
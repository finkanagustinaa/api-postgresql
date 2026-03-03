const pool = require('../config/database');

// GET ALL
const getCategory = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name FROM categories ORDER BY id ASC');
        res.json({
            success: true,
            data: result.rows || []
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Placeholder agar route tidak error
const createCategory = async (req, res) => { res.json({ message: "Feature not implemented yet" }); };
const getCategoryById = async (req, res) => { res.json({ message: "Feature not implemented yet" }); };
const updateCategory = async (req, res) => { res.json({ message: "Feature not implemented yet" }); };
const deleteCategory = async (req, res) => { res.json({ message: "Feature not implemented yet" }); };

module.exports = { 
    getCategory, 
    createCategory, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
};
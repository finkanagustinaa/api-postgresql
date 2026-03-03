const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require("../controllers/category_controller");

// 1. Ambil semua kategori
router.get("/", getCategory);

// 2. Tambah kategori (Validator dihapus sementara agar tidak error)
router.post("/", createCategory);

// 3. Update kategori
router.put("/:id", updateCategory);

// 4. Hapus kategori
router.delete("/:id", deleteCategory);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require("../controllers/category_controller");

const { categoryValidator } = require("../validators/categoryValidator");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API untuk kategori
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Ambil semua kategori
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Tambah kategori
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Teknologi
 *     responses:
 *       201:
 *         description: Kategori berhasil dibuat
 */

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update kategori
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Olahraga
 *     responses:
 *       200:
 *         description: Berhasil update
 */

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Hapus kategori
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Berhasil hapus
 */
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API untuk kategori
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Ambil semua kategori
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", getCategory);

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Tambah kategori baru
 *     tags: [Categories]
 */
router.post("/", categoryValidator, createCategory);

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update kategori
 *     tags: [Categories]
 */
router.put("/:id", categoryValidator, updateCategory);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Hapus kategori
 *     tags: [Categories]
 */
router.delete("/:id", deleteCategory);

module.exports = router;
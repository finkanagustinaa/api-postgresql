const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/post_controller');


/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API untuk Posts
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Ambil semua posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Berhasil mengambil data
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Tambah post baru
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - judul
 *               - isi
 *               - category_id
 *             properties:
 *               judul:
 *                 type: string
 *               isi:
 *                 type: string
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               gambar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post berhasil dibuat
 */

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update post berdasarkan ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID post
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               judul:
 *                 type: string
 *               isi:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               example: 1
 *     responses:
 *       200:
 *         description: Post berhasil diupdate
 *       404:
 *         description: Post tidak ditemukan
 */
/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Hapus post berdasarkan ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID post
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post berhasil dihapus
 *       404:
 *         description: Post tidak ditemukan
 */

// ROUTES
router.get("/", getAllPosts);
router.post('/', upload.single('gambar'), createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
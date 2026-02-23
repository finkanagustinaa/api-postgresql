const pool = require('../config/database');
const fs = require('fs');

// GET ALL POSTS
const getPosts = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM posts ORDER BY id DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE POST (dengan upload gambar)
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {

      // 🔥 hapus file kalau ada
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(400).json({
        message: "Title dan content wajib diisi"
      });
    }

    const image = req.file ? req.file.filename : null;

    const newPost = await pool.query(
      "INSERT INTO posts (title, content, image) VALUES ($1, $2, $3) RETURNING *",
      [title, content, image]
    );

    res.status(201).json(newPost.rows[0]);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE POST
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, isi } = req.body;

    const result = await pool.query(
      'UPDATE posts SET judul=$1, isi=$2 WHERE id=$3 RETURNING *',
      [judul, isi, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Post tidak ditemukan' });
    }

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE POST
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM posts WHERE id=$1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Post tidak ditemukan' });
    }

    res.json({ message: 'Post berhasil dihapus' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost
};
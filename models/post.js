const pool = require("../config/database");

// CREATE
const createPost = async (judul, isi, gambar, category_id) => {
  const result = await pool.query(
    `INSERT INTO posts (judul, isi, gambar, category_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [judul, isi, gambar, category_id]
  );
  return result.rows[0];
};

// GET ALL
const getAllPosts = async () => {
  const result = await pool.query(`
    SELECT 
      posts.id,
      posts.judul,
      posts.isi,
      posts.gambar,
      posts.category_id,
      categories.name
    FROM posts
    LEFT JOIN categories ON posts.category_id = categories.id
    ORDER BY posts.id DESC
  `);
  return result.rows;
};

// UPDATE
const updatePost = async (id, title, isi, gambar, category_id) => {
  const result = await pool.query(
    `UPDATE posts 
     SET judul = $1,
         isi = $2,
         gambar = COALESCE($3, gambar),
         category_id = $4
     WHERE id = $5
     RETURNING *`,
    [title, isi, gambar, category_id, id]
  );

  return result.rows[0]; // bisa undefined
};


const deletePost = async (id) => {
  await pool.query(
    `DELETE FROM posts WHERE id = $1`,
    [id]
  );
};

// models/post.js
const getPostById = async (id) => {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    return result.rows[0];
};

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
};


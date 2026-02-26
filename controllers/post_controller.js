const postModel = require('../models/post');
const sharp = require('sharp');
const minioClient = require('../config/minio');

// Fungsi pembantu untuk membuat URL gambar yang lengkap
const getImageUrl = (fileName) => {
    if (!fileName) return null;
    if (fileName.startsWith('http')) return fileName; // Jika sudah URL lengkap, biarkan
    
    const BASE_URL = process.env.MINIO_PUBLIC_URL || 'http://192.168.18.60:9000';
    const BUCKET = process.env.MINIO_BUCKET || 'api-bucket';
    return `${BASE_URL}/${BUCKET}/${fileName}`;
};

// GET ALL
const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.getAllPosts();
        const mappedPosts = posts.map(post => ({
            ...post,
            gambar: getImageUrl(post.gambar)
        }));
        res.json({ success: true, data: mappedPosts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET BY ID
const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.getPostById(id);
        if (!post) return res.status(404).json({ message: "Post tidak ditemukan" });

        post.gambar = getImageUrl(post.gambar);
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE
const createPost = async (req, res) => {
    try {
        const { judul, isi, category_id } = req.body;
        let fileNameInDb = null;

        if (req.file) {
            // Proses gambar dengan Sharp
            const resizedImage = await sharp(req.file.buffer)
                .resize({ width: 800 })
                .jpeg({ quality: 80 })
                .toBuffer();

            const fileName = `posts/${Date.now()}-${req.file.originalname}`;
            const bucketName = process.env.MINIO_BUCKET || 'api-bucket';

            // Upload ke MinIO
            await minioClient.putObject(
                bucketName,
                fileName,
                resizedImage,
                resizedImage.length,
                { 'Content-Type': 'image/jpeg' }
            );
            
            fileNameInDb = fileName;
        }

        // Simpan ke database melalui model
        const post = await postModel.createPost(judul, isi, fileNameInDb, Number(category_id));
        
        // Ubah gambar menjadi URL lengkap untuk respon ke user
        if (post.gambar) post.gambar = getImageUrl(post.gambar);

        return res.status(201).json({ message: "Post berhasil dibuat", data: post });
    } catch (err) {
        console.error("CREATE ERROR:", err);
        return res.status(500).json({ message: "Gagal membuat post", error: err.message });
    }
};

// UPDATE
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul, isi, category_id } = req.body;
        let fileNameInDb = null;

        if (req.file) {
            const resizedImage = await sharp(req.file.buffer).resize({ width: 800 }).toBuffer();
            const fileName = `posts/${Date.now()}-${req.file.originalname}`;
            await minioClient.putObject(process.env.MINIO_BUCKET || 'api-bucket', fileName, resizedImage, resizedImage.length);
            fileNameInDb = fileName;
        }

        const post = await postModel.updatePost(id, judul, isi, fileNameInDb, category_id);
        if (!post) return res.status(404).json({ message: 'Post tidak ditemukan' });
        
        res.json({ message: "Post updated", data: post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE
const deletePost = async (req, res) => {
    try {
        await postModel.deletePost(req.params.id);
        res.json({ message: 'Post berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};
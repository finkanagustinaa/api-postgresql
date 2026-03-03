import api from "./axios";

export const getPosts = async (search = "") => {
  const response = await api.get(`/posts?search=${search}`);
  return response.data; // Mengembalikan objek { success: true, data: [...] }
};

// Fungsi untuk mendapatkan URL upload dari backend
export const getPresignedUrl = async (fileName: string, fileType: string) => {
  const res = await api.post("/posts/presigned-url", { fileName, fileType });
  return res.data; // { uploadUrl: "...", fileUrl: "..." }
};

// Fungsi untuk membuat produk baru di database
export const createProduct = async (data: any) => {
  const res = await api.post("/posts", data);
  return res.data;
};

export const getCategories = async () => {
  // Tambahkan /posts di depannya jika memang route-nya di bawah posts
  const res = await api.get("/posts/category"); 
  return res.data;
};

export const deletePost = async (id: number) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};

export const updateProduct = async (id: number, data: any) => {
  const res = await api.put(`/posts/${id}`, data);
  return res.data;
};
import React, { useEffect, useState } from "react";
import { getPosts, deletePost } from "@/api/product-service"; // Pastikan path service benar
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; 

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:3000";

  const loadData = async () => {
    const response = await getPosts();
    if (response.success) setPosts(response.data);
  };

  useEffect(() => { loadData(); }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus menu ini?")) {
      await deletePost(id);
      loadData(); // Refresh data setelah hapus
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manajemen Menu Kopi</h1>
        <Button onClick={() => navigate("/admin/add")}>+ Tambah Menu</Button>
      </div>

      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Gambar</th>
            <th className="border p-2">Nama Menu</th>
            <th className="border p-2">Kategori</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: any) => (
            <tr key={post.id} className="text-center">
              <td className="border p-2">
                <img 
                  src={`${BASE_URL}/uploads/${post.gambar}`} 
                  alt={post.judul} 
                  className="w-16 h-16 object-cover mx-auto rounded"
                  onError={(e) => (e.currentTarget.src = "https://placehold.co/100x100?text=No+Image")}
                />
              </td>
              <td className="border p-2 font-medium">{post.judul}</td>
              <td className="border p-2">{post.name || "Tanpa Kategori"}</td>
              <td className="border p-2">
                <Button 
                variant="outline" 
                className="bg-yellow-500 text-white"
                onClick={() => navigate(`/admin/edit/${post.id}`)}
                >
                Edit
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleDelete(post.id)}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
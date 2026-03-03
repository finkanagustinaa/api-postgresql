import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "@/api/product-service";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom"; // Tambahkan useNavigate
import api from "@/api/axios";
import { Trash2, Search, Coffee, Plus, Edit } from "lucide-react"; // Tambahkan icon Edit
import { toast } from "sonner";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Inisialisasi navigate
  const token = localStorage.getItem("accessToken");
  const BASE_URL = "http://localhost:3000"; // URL Backend kamu

  // 1. Ambil Data
  const { data: response, isLoading, isError } = useQuery({
    queryKey: ["posts", search],
    queryFn: () => getPosts(search),
  });

  const products = response?.data || [];

  // 2. Fungsi Hapus
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await api.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      toast.success("Menu berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Gagal menghapus menu");
    },
  });

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Hapus menu ini dari katalog?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-800"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Search Header */}
      <div className="bg-white sticky top-0 z-30 shadow-sm p-4 mb-6">
        <div className="container mx-auto max-w-4xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Mau minum kopi apa hari ini?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 py-6 border-none bg-gray-100 rounded-2xl focus-visible:ring-amber-500 text-base text-black"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-900">Katalog Menu ☕</h1>
          <p className="text-gray-500 text-sm">Pilih menu favoritmu dan nikmati harimu.</p>
        </div>

        {isError ? (
          <div className="text-center py-20 text-red-500">Gagal memuat menu. Cek koneksi backend.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.length > 0 ? (
              products.map((item: any) => (
                <div 
                  key={item.id} 
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col relative"
                >
                  {/* TOMBOL AKSI ADMIN (Hapus & Edit) */}
                  {token && (
                    <div className="absolute top-2 right-2 z-10 flex gap-2">
                      {/* Tombol Edit Baru */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/admin/edit/${item.id}`);
                        }}
                        className="p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-lg"
                        title="Edit Menu"
                      >
                        <Edit size={14} />
                      </button>

                      {/* Tombol Hapus */}
                      <button
                        onClick={(e) => handleDelete(item.id, e)}
                        className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                        title="Hapus Menu"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}

                  {/* Gambar - Perbaikan URL Gambar */}
                  <Link to={`/posts/${item.id}`} className="relative h-40 md:h-48 overflow-hidden bg-amber-50">
                    {item.gambar ? (
                      <img
                        src={`${BASE_URL}/uploads/${item.gambar}`} // Path gambar yang benar
                        alt={item.judul}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => (e.currentTarget.src = "https://placehold.co/400x300?text=No+Image")}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-amber-200"><Coffee size={40}/></div>
                    )}
                  </Link>

                  <div className="p-3 flex flex-col flex-grow">
                    <h2 className="font-bold text-gray-800 text-sm md:text-base line-clamp-1 mb-1">
                      {item.judul}
                    </h2>
                    <p className="text-gray-500 text-[11px] md:text-xs line-clamp-2 h-8 leading-tight mb-3 italic">
                      {item.isi}
                    </p>

                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-amber-900 font-extrabold text-sm md:text-base">
                        Rp 25k
                      </span>
                      
                      <Link to={`/posts/${item.id}`}>
                        <div className="p-1.5 bg-amber-100 text-amber-900 rounded-lg group-hover:bg-amber-800 group-hover:text-white transition-colors">
                          <Plus size={16} />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-400 italic">
                Menu "{search}" tidak ditemukan.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button - Ke Dashboard Admin */}
      {token && (
        <Link 
          to="/admin" 
          className="fixed bottom-6 right-6 p-4 bg-amber-800 text-white rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center gap-2 px-6"
        >
          <Plus size={24} />
          <span className="font-bold">Dashboard Admin</span>
        </Link>
      )}
    </div>
  );
}
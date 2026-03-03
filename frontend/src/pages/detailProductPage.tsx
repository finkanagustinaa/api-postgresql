import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Coffee, MapPin, Star } from "lucide-react";

export default function DetailProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: response, isLoading, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await api.get(`/posts/${id}`);
      return res.data; // Mengambil { success, data }
    },
    enabled: !!id,
  });

  // Ambil data post dari properti 'data' yang dikirim backend
  const post = response?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-800"></div>
        <p className="mt-4 text-amber-900 font-medium">Menyiapkan menu...</p>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800">Ups! Menu tidak ditemukan</h2>
        <p className="text-gray-500 mb-6 text-sm">Mungkin menu ini sudah dihapus atau sedang tidak tersedia.</p>
        <Button onClick={() => navigate("/")} className="bg-amber-800">Kembali ke Katalog</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Header Gambar (Ala Grab/Gofood Detail) */}
      <div className="relative h-[350px] w-full bg-gray-100">
        <button 
          onClick={() => navigate("/")}
          className="absolute top-5 left-5 z-20 p-2 bg-white rounded-full shadow-xl hover:scale-110 transition-transform"
        >
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        
        {post.gambar ? (
          <img 
            src={post.gambar} 
            alt={post.judul} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-amber-50 text-amber-200">
            <Coffee size={80} strokeWidth={1} />
          </div>
        )}
      </div>

      {/* Konten Detail */}
      <div className="container mx-auto max-w-2xl px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-1">{post.judul}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star size={14} fill="currentColor" /> 4.8
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> KopiHub Central
                </span>
              </div>
            </div>
            <div className="text-xl font-black text-amber-900">
              Rp 25.000
            </div>
          </div>

          <div className="bg-amber-50 p-3 rounded-xl mb-8 flex items-center gap-2 text-xs text-amber-800 font-medium italic">
            <Coffee size={16} /> "Dibuat segar setiap kali ada pesanan."
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 border-b pb-2">Deskripsi Menu</h3>
            <p className="text-gray-600 leading-relaxed text-base">
              {post.isi}
            </p>
          </div>

          <div className="mt-10">
            <Button className="w-full py-7 bg-amber-900 hover:bg-black text-lg font-bold rounded-2xl shadow-lg transition-all active:scale-95">
              Tambah ke Pesanan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
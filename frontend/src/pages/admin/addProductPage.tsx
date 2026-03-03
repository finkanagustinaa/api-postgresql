import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query"; // Tambahkan useQuery
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getCategories } from "@/api/product-service"; // Pastikan path service benar

export default function AddProductPage() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  // 1. Ambil data kategori dari Backend
  const { data: catResponse, isLoading: isLoadingCats } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Ambil array kategori dari properti 'data' (sesuai struktur backend kamu)
  const categories = catResponse?.data || [];

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const formData = new FormData();
      formData.append("judul", values.judul);
      formData.append("isi", values.isi);
      formData.append("category_id", values.category_id);
      
      if (values.gambar && values.gambar[0]) {
        formData.append("gambar", values.gambar[0]);
      }

      const response = await api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Berhasil!", {
        description: "Menu kopi baru telah ditambahkan ke katalog.",
      });
      reset(); 
      navigate("/"); 
    },
    onError: (error: any) => {
      console.error("Error detail:", error);
      toast.error("Gagal Menambah Menu", {
        description: error.response?.data?.message || "Terjadi kesalahan pada server.",
      });
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-sm rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-amber-900">Tambah Menu Baru</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Nama Kopi</label>
          <Input 
            {...register("judul")} 
            placeholder="Contoh: Espresso Romano" 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Deskripsi</label>
          <textarea 
            {...register("isi")} 
            className="w-full min-h-[100px] border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" 
            placeholder="Jelaskan rasa dan keunikan kopi ini..." 
            required
          />
        </div>

        {/* 2. BAGIAN DROPDOWN KATEGORI BARU */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Kategori Menu</label>
          <select 
            {...register("category_id")} 
            required
            className="... text-black bg-white border-gray-300" // Tambahkan text-black di sini
            >
            <option value="" className="text-gray-500">-- Pilih Kategori --</option>
            {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id} className="text-black">
                {cat.name}
                </option>
            ))}
            </select>
          {categories.length === 0 && !isLoadingCats && (
            <p className="text-xs text-red-500 mt-1">Gagal memuat kategori. Pastikan backend menyala.</p>
          )}
        </div>
        
        <div className="border-2 border-dashed border-gray-200 p-4 rounded-lg text-center">
          <label className="block text-sm font-medium mb-2 text-gray-600">Foto Kopi</label>
          <input 
            type="file" 
            {...register("gambar")} 
            accept="image/*" 
            className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-6 rounded-xl" 
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Sedang Mengirim..." : "Simpan Produk Ke Katalog"}
        </Button>
      </form>
    </div>
  );
}
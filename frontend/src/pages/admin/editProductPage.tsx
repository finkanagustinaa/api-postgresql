import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/api/axios";
import { getCategories } from "@/api/product-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EditProductPage = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  // 1. Ambil Data Kategori untuk Dropdown
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // 2. Ambil Data Produk Lama berdasarkan ID
  const { data: product, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await api.get(`/posts/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });

  // 3. Masukkan data lama ke dalam Form saat data berhasil dimuat
  useEffect(() => {
    if (product) {
      setValue("judul", product.judul);
      setValue("isi", product.isi);
      setValue("category_id", product.category_id);
    }
  }, [product, setValue]);

  // 4. Fungsi untuk Mengirim Update ke Backend
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      // Kita kirim sebagai JSON karena edit biasanya tidak ganti gambar setiap saat
      return await api.put(`/posts/${id}`, data);
    },
    onSuccess: () => {
      alert("Menu berhasil diperbarui!");
      navigate("/admin"); // Balik ke dashboard
    },
  });

  const onSubmit = async (data: any) => {
  try {
    // Memanggil API Put ke backend
    await api.put(`/posts/${id}`, data); 
    alert("Data berhasil diupdate!");
    navigate("/admin"); // Kembali ke tabel admin
  } catch (error) {
    alert("Gagal update data");
  }
};

  if (isLoading) return <p>Memuat data...</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Menu Kopi</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Nama Menu</label>
          <Input {...register("judul")} required className="text-black" />
        </div>

        <div>
          <label className="block mb-1">Deskripsi / Harga</label>
          <Input {...register("isi")} required className="text-black" />
        </div>

        <div>
          <label className="block mb-1">Kategori</label>
          <select 
            {...register("category_id")} 
            className="w-full p-2 border rounded-md bg-white text-black"
            required
          >
            <option value="">-- Pilih Kategori --</option>
            {categories.data?.map((cat: any) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/admin")}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
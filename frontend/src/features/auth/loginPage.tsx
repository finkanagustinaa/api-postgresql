import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios"; // File yang kita buat tadi
import { loginSchema, LoginFormValues } from "./login-schema"; // Import schema

// Komponen UI dari Shadcn (Pastikan kamu sudah install: npx shadcn-ui@latest add form input button)
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const navigate = useNavigate();

  // 1. Definisikan Form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Definisikan Mutation (Proses Login ke API)
  const mutation = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const response = await api.post("/auth/login", values);
      return response.data;
    },
    onSuccess: (data) => {
      // Simpan token ke localStorage (sesuai rencana kita tadi)
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      
      alert("Login Berhasil!");
      navigate("/admin"); // Arahkan ke dashboard admin
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || "Login Gagal, cek email/password");
    },
  });

  // 3. Handler Submit
  const onSubmit = (values: LoginFormValues) => {
    mutation.mutate(values);
  };

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 border p-8 rounded-lg shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Coffee Shop Admin</h1>
          <p className="text-muted-foreground">Silahkan login untuk mengelola menu</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="admin@kopi.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full" 
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Sedang Login..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}


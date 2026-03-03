import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePages";
import LoginPage from "./features/auth/loginPage";
import ProtectedRoute from "./components/protectedRoute";
import AddProductPage from "./pages/admin/addProductPage";
import Navbar from "./components/navbar";
import { Toaster } from "@/components/ui/sonner";
import DetailProductPage from "./pages/detailProductPage";
import AdminDashboard from "./pages/admin/adminDashboard";
import EditProductPage from "./pages/admin/editProductPage";

<Route path="/admin" element={<AdminDashboard />} />

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
  {/* SISI CUSTOMER */}
  <Route path="/" element={<HomePage />} />
  <Route path="/posts/:id" element={<DetailProductPage />} /> 

  {/* SISI ADMIN */}
  <Route element={<ProtectedRoute />}>
    <Route path="/admin" element={<AdminDashboard />} /> 
    <Route path="/admin/add" element={<AddProductPage />} />
    <Route path="/admin/edit/:id" element={<EditProductPage />} />
  </Route>
</Routes>
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}

export default App;
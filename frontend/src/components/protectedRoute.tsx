import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Cek apakah token ada
  const token = localStorage.getItem("accessToken");

  // Jika tidak ada token, arahkan ke halaman login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Jika ada token, izinkan akses ke halaman yang diminta (halaman admin)
  return <Outlet />;
};

export default ProtectedRoute;
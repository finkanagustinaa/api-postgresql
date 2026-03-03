import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Coffee, LogOut, PlusCircle, User } from "lucide-react"; // Install lucide-react jika belum
import { toast } from "sonner";

export default function Navbar() {
  const navigate = useNavigate();
  
  // Cek apakah ada token di localStorage
  const token = localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Hapus token
    toast.success("Berhasil Logout");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-amber-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-amber-900 font-bold text-xl">
          <Coffee className="text-amber-700" />
          <span>KopiHub</span>
        </Link>

        {/* Menu Kanan */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-amber-800 transition-colors">
            Katalog
          </Link>

          {token ? (
            <>
              {/* Menu Khusus Admin (Hanya tampil jika sudah login) */}
              <Link to="/admin">
                <Button variant="outline" size="sm" className="gap-2 border-amber-200 text-amber-800 hover:bg-amber-50">
                  <PlusCircle size={18} />
                  Tambah Post
                </Button>
              </Link>

              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-2"
              >
                <LogOut size={18} />
                Logout
              </Button>
            </>
          ) : (
            // Menu jika Belum Login
            <Link to="/login">
              <Button size="sm" className="bg-amber-800 hover:bg-amber-900 gap-2">
                <User size={18} />
                Login Admin
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
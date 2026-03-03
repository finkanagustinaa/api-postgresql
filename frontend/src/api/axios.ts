import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// 1. Buat instance axios
const api = axios.create({
  baseURL: "http://localhost:3000", // Sesuaikan dengan URL Backend kamu
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. REQUEST Interceptor: Menambahkan Access Token ke setiap request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. RESPONSE Interceptor: Menangani Refresh Token jika Access Token Expired (401)
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Jika error 401 (Unauthorized) dan belum pernah mencoba refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        
        // Panggil endpoint refresh token ke backend
        const response = await axios.post("http://localhost:3000/user_controller/refreshToken", {
          refreshToken: refreshToken,
        });

        const { accessToken } = response.data;

        // Simpan token baru
        localStorage.setItem("accessToken", accessToken);

        // Update header request yang gagal tadi dan ulangi
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        return api(originalRequest);
      } catch (refreshError) {
        // Jika refresh token juga gagal/expired, paksa logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
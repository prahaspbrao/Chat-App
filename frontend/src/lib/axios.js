import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://localhost:3000/api" : "https://chat-app-backend-9j4g.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
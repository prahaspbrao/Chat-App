import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://localhost:3000/api" : "https://chat-app-e3t1.vercel.app/api",
  withCredentials: true,
});

export default axiosInstance;
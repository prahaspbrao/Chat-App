import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://chat-n9aefej1r-prahas-p-b-raos-projects.vercel.app/api" : "/api",
  withCredentials: true,
});

export default axiosInstance;
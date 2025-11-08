import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isChekingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in auth Check : ", error);
      set({ authUser: null });
    } finally {
      set({ isChekingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSigningUp: true });

      const res = await axiosInstance.post("/auth/signup", data);

      toast.success("Account created successfully!");

      // ✅ Save logged-in user
      set({ authUser: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingIn: true });

      const res = await axiosInstance.post("/auth/login", data);

      toast.success("Logged in  successfully!");

      // ✅ Save logged-in user
      set({ authUser: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("auth/logout");
      toast.success("Logged out sucessfully");
      set({ authUser: null });
    } catch (error) {
      toast.error("Error in logging out");
      console.log("Logout error , ", error);
    }
  },
}));

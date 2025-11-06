import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set, _) => ({
  authUser: null,
  isChekingAuth: true,
  isSigningUp: false,

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
    } catch (error) {
        const res = await axiosInstance.post("/auth/signup" , data);
    } finally {
      set({ isSigningUp: false });
    }
  },
}));

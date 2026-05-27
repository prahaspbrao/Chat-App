import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";
import {connect, io} from "socket.io-client"
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "http://chat-app-e3t1.vercel.app";

export const useAuthStore = create((set , get) => ({
  authUser: null,
  isChekingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket : null,
  onlineUsers : [],


  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
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

      // socket connection
      get().connectSocket();

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

      // socket connection
      get().connectSocket()
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
    } catch (error) {
      console.log("Logout error:", error);
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      toast.success("Profile Updated successfully!!");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in update profile , ", error);
      toast.error(error.response.data.message)
      
    }
  },

  connectSocket : () =>{
    const {authUser} = get();

    if(!authUser || get().socket?.connected){
      return;
    }

    const socket = io(BASE_URL , {
      withCredentials : true //cookies are sent with connection
    })

    socket.connect();

    set({socket})

    // listen for online users event
    socket.on("getOnlineUsers" , (userIds) => {
        set({onlineUsers : userIds})
    })
    
  },

  disconnectSocket : () =>{
    if(get().socket.connected){
      get().socket.disconnect()
    }
  }
}));

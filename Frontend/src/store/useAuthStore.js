import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast"
import { io } from "socket.io-client";

// Use the same base URL as axios for socket connection
const BASE_URL = import.meta.env.MODE === "development" 
    ? "http://localhost:5000" 
    : window.location.origin;

export const useAuthStore = create((set,get) => ({
  authUser: null,
  onlineUsers:[],
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socket:null,
  
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check"); 
      console.log("auth check response", res);
      console.log("User authenticated:", res.data.fullName);
      set({ authUser: res.data }); 
      get().connectSocket()
    } catch (error) {
      console.error("Error in checkAuth:", error.response?.data || error.message);
      set({ authUser: null });
      // Don't show error toast for auth check failures as they're expected when not logged in
    } finally {
      setTimeout(() => {
        set({ isCheckingAuth: false });
      }, 500);
    }
  },

  signUp: async (data, navigate) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      console.log("Signup response:", res.data);
      set({ authUser: res.data }); 
      toast.success("Account created successfully");
      get().connectSocket()
      // Redirect to homepage after successful signup
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response.data.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) =>{
    set({isLoggingIn:true})
    try {
      const res = await axiosInstance.post("/auth/login",data)
      set({authUser:res.data});
      toast.success("Logged in successfully")
      get().connectSocket()
    
    } catch (error) {
      toast.error(error.response.data.message)
    }
    finally{
      set({isLoggingIn:false})
    }
  },

  logout: async ()=>{
    try {
      await axiosInstance.post("/auth/logout")
      set({authUser:null})
      toast.success("Logged out successfully")
      get().disconnectSocket()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket:()=>{
    const {authUser} = get()
    if(!authUser||get().socket?.connected) return

    const socket = io(BASE_URL,{
      query:{
        userId:authUser._id
      }
    })
    socket.connect()

    set({socket})
    socket.on("getOnlineUsers" , (userIds) =>{
      set({onlineUsers:userIds})
    })
  },
  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) {
      socket.disconnect();
      console.log("Socket disconnected:", socket.id); // Log the disconnection
    }
    set({ socket: null }); // Clean up the socket state
  },
  
}))
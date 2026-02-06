import { create } from "zustand";
import api from "../api/axios";
import useJournalStore from "./JournalStore";
import { persist, createJSONStorage } from "zustand/middleware"; // Added createJSONStorage
import toast from "react-hot-toast";
import useGeneralStore from "./generalStore";

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            isLoggingIn: false,
            isSigningUp: false,
            isLoading: false,

            login: async (formData) => {
                try {
                    set({ isLoggingIn: true });
                    const loginPromise = api.post("/auth/login", formData);
                    toast.promise(loginPromise, {
                        loading: "logging in...",
                        success: "logged in successfully",
                        error: "could not log in, check credentials",
                    });
                    const res = await loginPromise;
                    set({ user: res.data.data });
                    return true;
                } catch (err) {
                    console.error("Error while logging in: ", err);
                    return false;
                } finally {
                    set({ isLoggingIn: false });
                }
            },
            signup: async (formData) => {
                try {
                    set({ isSigningUp: true });
                    const signupPromise = api.post("/auth/signup", formData);
                    toast.promise(signupPromise, {
                        loading: "signing up...",
                        success: "Account created",
                        error: "Could not create your account...",
                    });
                    await signupPromise;
                    return await get().login({ "email": formData.email, "password": formData.password });
                } catch (err) {
                    console.error("Error while signing up:", err.response?.data || err);
                    throw err;
                } finally {
                    set({ isSigningUp: false });
                }
            },
            logout: async () => {
                try {
                    const response = await api.post("/auth/logout");
                    if (response.data.success) {
                        toast.success("Logged out successfully.");
                    }
                    set({ user: null }); // Set user to null after API call
                    useGeneralStore.setState({ showDropdown: false });
                    useJournalStore.getState().cacheReset();
                } catch (err) {
                    console.error("Error while logging out: ", err);
                    toast.error("Error while logging out.");
                }
            },
            checkAuth: async () => {
                try {
                    set({ isLoading: true });
                    const res = await api.get("/auth/check-auth");
                    set({ user: res.data.data });
                } catch (err) {
                    set({ user: null });
                } finally {
                    set({ isLoading: false });
                }
            }
        }),
        {
            name: "auth-storage", // Key name in localStorage
            storage: createJSONStorage(() => localStorage), // Explicitly define storage
            partialize: (state) => ({ user: state.user }), // Only persist the user object
        }
    )
);

export default useAuthStore;
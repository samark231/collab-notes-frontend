import { create } from "zustand";
import { io } from "socket.io-client";

const useSocketStore = create((set, get) => ({
    socket: null,
    isConnected: false,

    connect: () => {
        const socket = io(import.meta.env.VITE_API_BASE_URL); 

        socket.on("connect", () => {
            console.log("Connected to WebSocket");
            set({ isConnected: true });
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from WebSocket");
            set({ isConnected: false });
        });

        set({ socket });
    },

    disconnect: () => {
        const socket = get().socket;
        if (socket) socket.disconnect();
        set({ socket: null, isConnected: false });
    },

    joinNote: (noteId) => {
        const socket = get().socket;
        if (socket && noteId) {
            socket.emit("join_note", noteId);
        }
    },

    leaveNote: (noteId) => {
        const socket = get().socket;
        if (socket && noteId) {
            socket.emit("leave_note", noteId);
        }
    },

    sendUpdate: (noteId, title, content) => {
        const socket = get().socket;
        if (socket && noteId) {
            // Emit the update to the server
            socket.emit("send_update", { noteId, title, content });
        }
    }
}));

export default useSocketStore;
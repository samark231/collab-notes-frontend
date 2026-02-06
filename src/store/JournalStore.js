import {create} from "zustand";
import api from "../api/axios";
import { JOURNAL_MODE } from "../utils/utils";
import toast from "react-hot-toast";

const useJournalStore = create(
     (set, get)=>({

        journals: [],
        filteredJournals:[],
        newJournalEntry:{
            title: "",
            content: ""
        },
        currentJournalId:"",
        currentMode: JOURNAL_MODE.NEW,
        isSavingJournal:false,
        handleSaveNewJournalEntry: (e)=>{
            const {name, value} = e.target;
            set((state)=>({newJournalEntry:{ ...state.newJournalEntry, [name]: value}}));
        },
        getAllJournals: async ()=>{
            try{
                const res = await api.get("/notes");
                // console.log(res.data.data);
                set({journals:res.data.data});
                set({filteredJournals:res.data.data});
                // console.log("gettng all journals...",get().journals);
            }catch(err){
                console.log("Error while fetching all notes", err);
                toast.error("could not fetch all notes");
            }
        } ,
        saveJournal: async ()=>{
            try{
                set({isSavingJournal:true})
                const res = await api.post("/notes", get().newJournalEntry);
                // console.log(res.data);
                set((state) => ({
                    journals: [res.data.data, ...state.journals],
                    filteredJournals:[res.data.data, ...state.filteredJournals]
                }));
                // console.log(get().newJournalEntry);
                set({newJournalEntry:{
                    title: "",
                    content: ""
                }})
                set({currentJournalId:null});
                // console.log(get().journals);
                return res.data.data;

            }catch(err){
                console.log("Some error occured while saving the note: ",err);
                return null;
            }finally{
                set({isSavingJournal:false});
            }
        },
        deleteJournal: async (journalId)=>{
            try{
                // console.log(journalId);
                const deletePromise = api.delete(`/notes/${journalId}`);
                set((state)=>({
                    journals: state.journals.filter((entry) => entry.id !== journalId),
                    filteredJournals: state.filteredJournals.filter((entry) => entry.id !== journalId)
                }))
                toast.promise(deletePromise,{
                    loading:"deleting...",
                    success:" note deleted successfully",
                    error:"could not delete the note",

                })
                const res = await deletePromise;
                // console.log(res.data.data);
            }catch(err){
                console.log("Error occured while deleting the note", err);
            }
        },
        handleUpdate: (entry)=>{
            set({currentMode: JOURNAL_MODE.UPDATE});
            // console.log(get().currentMode);
            set({currentJournalId:entry.id});
            set({newJournalEntry:{
                title:entry.title,
                content:entry.content
            }})
        },
        updateJournal: async () => {
            const { currentJournalId, newJournalEntry } = get();
            try {
                set({ isSavingJournal: true });
                const res = await api.put(`/notes/${currentJournalId}`, newJournalEntry);
                if (res.data.success) {
                    const updatedNote = res.data.data;
                    toast.success(res.data.message);
                    set((state) => ({
                        // Update the lists
                        journals: state.journals.map((entry) => 
                            entry.id === currentJournalId ? updatedNote : entry
                        ),
                        filteredJournals: state.filteredJournals.map((entry) => 
                            entry.id === currentJournalId ? updatedNote : entry
                        ),
                        // Reset UI State
                        newJournalEntry: { title: "", content: "" },
                        currentMode: JOURNAL_MODE.NEW,
                        currentJournalId: null
                    }));

                } else {
                    throw new Error(res.data.message || "Update failed");
                }

            } catch (err) {
                console.error("Error updating note:", err);
                const msg = err.response?.data?.message || "Could not update. Permission denied?";
                toast.error(msg);
            } finally {
                set({ isSavingJournal: false });
            }
        },
        handleView: (entry)=>{
            set({currentMode: JOURNAL_MODE.VIEW});
            set({currentJournalId:entry.id});
            set({newJournalEntry: {
                title: entry.title,
                content: entry.content
            }});
        },
        enterUpdateMode: ()=>{
            set({currentMode:JOURNAL_MODE.UPDATE});
        },
        handleCancel: ()=>{
            set({currentMode: JOURNAL_MODE.NEW});
            set({newJournalEntry:{
                title: "",
                content: ""
            }})
            set({currentJournalId:null});
        },
        journalFilter: (query) => {
            const { journals } = get();

            if (!query) {
            // If search is empty, reset display list to master list
            set({ filteredJournals: journals });
            } else {
            const lowerQuery = query.toLowerCase();

            const filtered = journals.filter((item) => {
                return (
                item.title?.toLowerCase().includes(lowerQuery) ||
                item.content?.toLowerCase().includes(lowerQuery)
                );
            });

            set({ filteredJournals: filtered });
            }
        },
        cacheReset: ()=>{
            console.log("performing cache reset...");
            set({journals:[]}),
            set({filteredJournals:[]});
            localStorage.removeItem("auth-storage");
        },
        addCollaborator: async (noteId, email, role) => {
            try {
                console.log("note id is",noteId);
                console.log("rmail is",email);
                console.log("role is",role);
                const res = await api.post(`/notes/${noteId}/collaborators`, { email, role });
                if (res.data.success) {
                    toast.success("Collaborator added!");
                    return true; 
                }
            } catch (err) {
                console.error("Share Error:", err);
                const msg = err.response?.data?.message || "Failed to add collaborator";
                toast.error(msg);
                return false; 
            }
        },
    })
);

export default useJournalStore;
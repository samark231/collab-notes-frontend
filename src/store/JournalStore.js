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
                console.log(res.data.data);
                set({journals:res.data.data});
                set({filteredJournals:res.data.data});
                // console.log("gettng all journals...",get().journals);
            }catch(err){
                console.log("Error while fetching all journals", err);
                toast.error("could not fetch all journals");
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
                // console.log(get().journals);
                return res.data.data;

            }catch(err){
                console.log("Some error occured while saving the entry: ",err);
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
                    success:"Journal deleted successfully",
                    error:"could not delete the journal",

                })
                const res = await deletePromise;
                // console.log(res.data.data);
            }catch(err){
                console.log("Error occured while deleting the journal", err);
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
        updateJournal: async ()=>{
            try{
                set({isSavingJournal:true})
                const res = await api.put(`/notes/${get().currentJournalId}`,get().newJournalEntry);
                // console.log(res);
                set((state)=>({
                    journals: state.journals.map((entry)=>{
                        return entry.id == get().currentJournalId?res.data.data:entry;
                    }),
                    filteredJournals: state.filteredJournals.map((entry)=>{
                        return entry.id == get().currentJournalId?res.data.data:entry;
                    })
                }))
                set({newJournalEntry:{
                    title:"",
                    content:""
                }})
                set({currentMode:JOURNAL_MODE.NEW});
            }catch(err){
                console.log("Error occured while updating the journal", err);
                throw err;
            }finally{
                set({isSavingJournal:false});
            }
        },
        handleView: (entry)=>{
            set({currentMode: JOURNAL_MODE.VIEW});
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
        },
        journalFilter: (query) => {
            const { journals } = get(); // Get the master list

            if (!query) {
            // If search is empty, reset display list to master list
            set({ filteredJournals: journals });
            } else {
            // Lowercase for case-insensitive search
            const lowerQuery = query.toLowerCase();

            const filtered = journals.filter((item) => {
                // Search in Title OR Content
                // Add 'item.tags' logic here if you have tags
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
    })
);

export default useJournalStore;
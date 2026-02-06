import React, { useEffect } from "react";
import useJournalStore from "../../store/JournalStore";
import "../../styles/home/addJournal.css";
import {useShallow} from "zustand/react/shallow";
import { JOURNAL_MODE } from "../../utils/utils";
import AddCollaborator from "../others/AddCollaborator";
import useSocketStore from "../../store/socketStore";


const AddJournal = () => {
    const {journals,isSavingJournal, currentMode,saveJournal, newJournalEntry, handleSaveNewJournalEntry,updateJournal,enterUpdateMode, handleCancel,currentJournalId} = useJournalStore(
        useShallow((state)=>({
            journals:state.journals,
            newJournalEntry: state.newJournalEntry,
            handleSaveNewJournalEntry:state.handleSaveNewJournalEntry,
            saveJournal:state.saveJournal,
            currentMode: state.currentMode,
            enterUpdateMode: state.enterUpdateMode,
            updateJournal:state.updateJournal,
            handleCancel: state.handleCancel,
            isSavingJournal:state.isSavingJournal,
            currentJournalId:state.currentJournalId
        }))
    );

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    const getButtonText = ()=>{
        if(isSavingJournal) return "Processing...";

        switch(currentMode){
            case JOURNAL_MODE.VIEW : return "Enter Update Mode?";
            case JOURNAL_MODE.UPDATE: return "Update Entry";
            default : return "Save Entry";

        }
    }
    const handleButtonAction = async () => {
    if (currentMode === JOURNAL_MODE.VIEW) {
        enterUpdateMode();
    } else if (currentMode === JOURNAL_MODE.UPDATE) {
        await updateJournal();
    } else {
        saveJournal();
    }
    }
    const { socket, connect, disconnect, joinNote, leaveNote, sendUpdate } = useSocketStore();

    useEffect(() => { 
        connect(); 
        return () => disconnect(); 
    }, []);

    useEffect(() => {
        if (currentJournalId) {
            joinNote(currentJournalId);
            if (socket) {
                socket.on("receive_update", (data) => {
                    useJournalStore.setState((state) => ({
                        newJournalEntry: {
                            title: data.title !== undefined ? data.title : state.newJournalEntry.title,
                            content: data.content !== undefined ? data.content : state.newJournalEntry.content
                        }
                    }));
                });
            }
        }
        return () => {
            if (currentJournalId && socket) {
                leaveNote(currentJournalId);
                socket.off("receive_update");
            }
        };
    }, [currentJournalId, socket]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleSaveNewJournalEntry(e);
        if (currentJournalId) {
            const updatedTitle = name === "title" ? value : newJournalEntry.title;
            const updatedContent = name === "content" ? value : newJournalEntry.content;
            sendUpdate(currentJournalId, updatedTitle, updatedContent);
        }
    };
    
    const activeNote = journals.find(n => n.id === currentJournalId);
    
    const isViewer = activeNote?.access_role === 'VIEWER';
    const isOwner = activeNote?.access_role === 'OWNER';
    const isEditor = activeNote?.access_role ==="EDITOR";
    return (
        <div className="aj-wrapper">
            <div className="aj-card">
                <div className="aj-header">
                    <span className="aj-date">{today}</span>
                    <input
                        className="aj-input-title"
                        type="text"
                        name="title"
                        placeholder="Untitled Entry"
                        value={newJournalEntry.title}
                        onChange={handleInputChange}
                        autoComplete="off"
                        readOnly={currentMode===JOURNAL_MODE.VIEW || isViewer}
                    />
                </div>

                <div className="aj-body">
                    <textarea
                        className="aj-textarea-content"
                        name="content"
                        placeholder="Start writing..."
                        value={newJournalEntry.content}
                        onChange={handleInputChange}
                        readOnly={currentMode===JOURNAL_MODE.VIEW|| isViewer}
                    />
                </div>

                <div className="aj-footer">
                    { currentMode!=JOURNAL_MODE.NEW &&
                        <button className="aj-btn-save "
                            type="button"
                            id="cancel-button"
                            onClick={handleCancel}
                            >
                            CANCEL
                        </button>
                    }
                    <button 
                        className={`aj-btn-save ${isSavingJournal ? 'loading' : ''}`}
                        type="button" 
                        onClick={handleButtonAction}
                        disabled={isSavingJournal||isViewer}
                    >
                        {getButtonText()}
                    </button>
                </div>
                <div> {isOwner && 
                    <AddCollaborator/>}
                </div>
            </div>
        </div>
    );
};

export default AddJournal;
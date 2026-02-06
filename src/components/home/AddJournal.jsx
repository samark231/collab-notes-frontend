import React, { useState } from "react";
import useJournalStore from "../../store/JournalStore";
import "../../styles/home/addJournal.css";
import {useShallow} from "zustand/react/shallow";
import { JOURNAL_MODE } from "../../utils/utils";

const AddJournal = () => {
    const {isSavingJournal, currentMode,saveJournal, newJournalEntry, handleSaveNewJournalEntry,updateJournal,enterUpdateMode, handleCancel} = useJournalStore(
        useShallow((state)=>({
            newJournalEntry: state.newJournalEntry,
            handleSaveNewJournalEntry:state.handleSaveNewJournalEntry,
            saveJournal:state.saveJournal,
            currentMode: state.currentMode,
            enterUpdateMode: state.enterUpdateMode,
            updateJournal:state.updateJournal,
            handleCancel: state.handleCancel,
            isSavingJournal:state.isSavingJournal,
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
                        onChange={handleSaveNewJournalEntry}
                        autoComplete="off"
                        readOnly={currentMode===JOURNAL_MODE.VIEW}
                    />
                </div>

                <div className="aj-body">
                    <textarea
                        className="aj-textarea-content"
                        name="content"
                        placeholder="Start writing..."
                        value={newJournalEntry.content}
                        onChange={handleSaveNewJournalEntry}
                        readOnly={currentMode===JOURNAL_MODE.VIEW}
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
                        disabled={isSavingJournal}
                    >
                        {getButtonText()}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddJournal;
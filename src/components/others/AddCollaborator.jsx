import React,{useState} from 'react'
import useJournalStore from '../../store/JournalStore';
import {useShallow} from "zustand/react/shallow";
import toast from "react-hot-toast";
import { JOURNAL_MODE } from '../../utils/utils';

const AddCollaborator = () => {
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("EDITOR");
    const [isInviting, setIsInviting] = useState(false);
    const {currentJournalId, addCollaborator,currentMode} = useJournalStore(useShallow((state)=>({
            currentJournalId:state.currentJournalId,
            addCollaborator:state.addCollaborator,
            currentMode: state.currentMode,
        })));
    // 3. Handle Invite Function
    const handleInvite = async (e) => {
        e.preventDefault();
        if (!inviteEmail) return toast.error("Please enter an email");
        
        setIsInviting(true);
        // Call the store action
        const success = await addCollaborator(currentJournalId, inviteEmail, inviteRole);
        setIsInviting(false);

        if (success) {
            setInviteEmail(""); // Clear input on success
        }
    };

  return (
    <div>
        {currentMode!== JOURNAL_MODE.NEW &&
        <div className="aj-collab-section">
            <h4>Add Collaborator</h4>
            <div className="aj-collab-controls">
                <input 
                    type="email" 
                    placeholder="User Email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                />
                <select 
                    value={inviteRole} 
                    onChange={(e) => setInviteRole(e.target.value)}
                >
                    <option value="EDITOR">Editor</option>
                    <option value="VIEWER">Viewer</option>
                </select>
                <button 
                    onClick={(e)=>handleInvite(e)} 
                    disabled={isInviting}
                >
                    {isInviting ? "..." : "Invite"}
                </button>
            </div>
        </div>}
    </div>

  )
}

export default AddCollaborator

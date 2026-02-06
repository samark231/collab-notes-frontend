import React from 'react'
import {Visibility, Edit, DeleteForever, Archive} from '@mui/icons-material';
import "../../styles/home/journalCard.css"
import useJournalStore from '../../store/JournalStore';
import { useShallow } from 'zustand/react/shallow';
import useAuthStore from '../../store/authStore';

function JournalCard({entry}) {
  const {handleView, handleUpdate, deleteJournal, updateJournal} = useJournalStore(useShallow((state)=>({
    deleteJournal: state.deleteJournal,
    updateJournal: state.updateJournal,
    handleView: state.handleView,
    handleUpdate: state.handleUpdate,
  })));  
  const user = useAuthStore(state=>state.user);
  const handleDelete = ()=>{
    deleteJournal(entry.id);
  }

 
  const formatDate = (dateString) => {
      if (!dateString) return "";
      
      const dateObj = new Date(dateString); 

      return dateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
      });
  };
    
    const isOwner = entry?.access_role === 'OWNER' || entry?.owner_id === user?.id;
    const isEditor = entry?.access_role === "EDITOR";

  return (
    <div className='jc-container'>
      <div 
        className={`jc-dot ${isOwner? 'jc-dot-own' : isEditor?'jc-dot-edit':'jc-dot-view'}`}
        title={isOwner? "Owner" : "Shared"}
      ></div>
      <div className='jc-div jc-title'>{entry.title}</div>
      <div className='jc-div jc-date'>{formatDate(entry.created_at)}</div>
      <div className='jc-div jc-description'>{entry.content}</div>
      <div className='jc-overlay'>
        <button className='jc-button jcb-view' onClick={()=>handleView(entry)}>
            <Visibility fontSize="small"/>
        </button>
        {(isEditor||isOwner) &&
        <button className='jc-button jcb-edit'onClick={()=>handleUpdate(entry)}>
            <Edit fontSize="small"/>
        </button>}
        {isOwner &&
        <button className='jc-button jcb-delete' onClick={handleDelete}>
            <DeleteForever fontSize="small"/>
        </button>}
      </div>
    </div>
  )
}

export default JournalCard;

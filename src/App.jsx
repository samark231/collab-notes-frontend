import React, { useEffect, useState } from 'react'
import useAuthStore from './store/authStore.js'
import AuthPage from './pages/Authpage.jsx'
import HomePage from './pages/HomePage.jsx'
import {useShallow} from "zustand/react/shallow";
import "./styles/app.css";
import { Route,Routes, Link } from 'react-router-dom';
import useJournalStore from './store/JournalStore.js'
import ProtectedRoute from './components/others/ProtectedRoutes.jsx'
function App() {
  const {user, checkAuth, isLoading} = useAuthStore(useShallow((state)=>({
      user:state.user,
      checkAuth: state.checkAuth,
      isLoading:state.isLoading
  })))
  const getAllJournals = useJournalStore(state=>state.getAllJournals);

  useEffect(()=>{
    checkAuth();
  },[]);

  useEffect(()=>{
    if(user){
      getAllJournals();
    }  
  },[user])

  return (
    <Routes>
      <Route path='/login' element={<AuthPage/>}/>
      <Route path='/' element={
        <ProtectedRoute>
          <HomePage/>
        </ProtectedRoute>
      }/>
    </Routes>
  )
}
export default App;

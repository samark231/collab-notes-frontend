import React, { useState } from 'react';
import "../../styles/home/header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartPulse} from '@fortawesome/free-solid-svg-icons';
import appLogo from "../../assets/logo/logo_64x64.png";
import useAuthStore from '../../store/authStore';
import useGeneralStore from '../../store/generalStore';
import {useShallow} from "zustand/shallow";
import LogoutButton from '../buttons/LogoutButton';
import SearchBox from '../others/SearchBox';
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  // console.log(user);
  const {backendStatus,handleHealthCheck} = useGeneralStore(useShallow(
        (state)=>({
            backendStatus: state.backendStatus,
            handleHealthCheck:state.handleHealthCheck,
        })
    ))


  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  return (
    <header className='header-container'>
      <div className={`header-brand ${isMobileSearchOpen ? 'hide-on-mobile' : ''}` }>
        <img src={appLogo} alt="Logo" className='header-logo' onClick={()=>navigate("/")}/>
        <span className='header-app-name' onClick={()=>navigate("/")}>Collab Notes</span>
      </div>
      {currentPath==="/profile"?<h2>Profile</h2>:<SearchBox/>}
      <div className={`header-actions ${isMobileSearchOpen ? 'hide-on-mobile' : ''}`}>
        <button 
            onClick={handleHealthCheck} 
            className={`action-btn status-btn ${backendStatus}`}
            title="Check System Status"
        >
          <FontAwesomeIcon icon={faHeartPulse} />
        </button>
        
        <div className="header-divider"></div>
        
        <div className="user-profile">
               
            <div className="avatar" title={user.firstName}>
                {getInitials(user.firstName)}
            </div>
            <LogoutButton/>
        </div>
      </div>
    </header>
  );
};

export default Header;
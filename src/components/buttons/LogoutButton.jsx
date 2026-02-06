import React from 'react'
import useAuthStore from '../../store/authStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRightFromBracket, 
} from '@fortawesome/free-solid-svg-icons';
const LogoutButton = () => {
    const logout = useAuthStore(state=>state.logout);
  return (
    <button onClick={logout} className='logout-btn' title="Logout">
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
    </button>
  )
}

export default LogoutButton;

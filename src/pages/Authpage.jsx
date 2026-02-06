import React, { useEffect, useState } from "react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import "../styles/auth/authPage.css"; // Point to the new single CSS file
import useGeneralStore from '../store/generalStore';
import {useShallow} from "zustand/shallow";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeartPulse} from '@fortawesome/free-solid-svg-icons';

const AuthPage = () => {
    const [isLogIn, setIsLogIn] = useState(true);
    const {backendStatus,  handleHealthCheck} = useGeneralStore(useShallow(
        (state)=>({
            backendStatus: state.backendStatus,
            handleHealthCheck:state.handleHealthCheck,
        })
    ))

    const toggleIsLogIn = () => {
        setIsLogIn((prev) => !prev);
    };
    useEffect(()=>{
        handleHealthCheck();
    },[])
    return (
        <div className="auth-container">
            <div className="auth-card">
                <div>
                    <h2 className="auth-title">
                        {isLogIn ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="auth-subtitle">
                        {isLogIn 
                            ? "Enter your details to access your journal" 
                            : "Start your journey with Slate of Mind"}
                    </p>
                </div>

                {isLogIn ? <Login /> : <Signup />}

                <div className="auth-footer">
                    {isLogIn ? "Don't have an account?" : "Already have an account?"}
                    <button className="auth-toggle-btn" onClick={toggleIsLogIn}>
                        {isLogIn ? "Sign up" : "Log in"}
                    </button>
                </div>
                <div className="auth-health-check">
                    <div className="auth-health-check-message">
                        <span>Sometimes backend goes to sleep.</span>
                        <span> Tap on the heart to wake it up</span>
                        <span>Green means online, Red means Not</span>
                    </div>
                    <div  className="auth-health-check-divider"></div>
                    <button 
                        onClick={handleHealthCheck} 
                        className={`action-btn status-btn ${backendStatus}`}
                        title="Check System Status"
                    >
                    <FontAwesomeIcon icon={faHeartPulse} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
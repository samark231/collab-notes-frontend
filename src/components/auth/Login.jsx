import React, { useState } from 'react';
import useAuthStore from '../../store/authStore';
import {useShallow} from "zustand/shallow";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import "../../styles/auth/authPage.css";
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {
    const {login, isLoggingIn} = useAuthStore(useShallow(
        (state)=>({
            login: state.login,
            isLoggingIn: state.isLoggingIn,
        })
    ));
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(await login(formData)){
            navigate("/");
        }
    };

    const handleChangeValue = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form-group">
                <label className="auth-form-label" htmlFor="email">Email</label>
                <input
                    className="auth-input"
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter your username"
                    value={formData.email}
                    onChange={handleChangeValue}
                    required
                />
            </div>
            
            <div className="auth-form-group">
                <label className="auth-form-label" htmlFor="password">Password</label>
                <input
                    className="auth-input"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChangeValue}
                    required
                />
            </div>
            <button className="auth-btn-submit" type="submit">
                
                {isLoggingIn?"logging in":"Log In"}
                {isLoggingIn && <FontAwesomeIcon icon={faSpinner} className='logging-in-spinner'/>}
            </button>
        </form>
    );
}

export default Login;
import React, { useState } from "react";
import useAuthStore from "../../store/authStore";
import { useShallow } from "zustand/shallow";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import "../../styles/auth/authPage.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const {signup, isSigningUp, isLoggingIn} = useAuthStore(useShallow(
        (state) => ({
            signup:state.signup,
            isSigningUp: state.isSigningUp,
            isLoggingIn:state.isLoggingIn,
        })
    ));
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(await signup(formData)){
            navigate("/");
        }
    };
    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="auth-form-group" style={{ flex: 1 }}>
                    <label className="auth-form-label" htmlFor="firstName">First Name</label>
                    <input
                        className="auth-input"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="auth-form-group" style={{ flex: 1 }}>
                    <label className="auth-form-label" htmlFor="lastName">Last Name</label>
                    <input
                        className="auth-input"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="auth-form-group">
                <label className="auth-form-label" htmlFor="username">Username</label>
                <input
                    className="auth-input"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="auth-form-group">
                <label className="auth-form-label" htmlFor="email">Email</label>
                <input
                    className="auth-input"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="auth-form-group">
                <label className="auth-form-label" htmlFor="password">Password</label>
                <input
                    className="auth-input"
                    type="password"
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <button className="auth-btn-submit" type="submit">
                {isSigningUp?"signing in":"Create Account"}
                {isLoggingIn && "logging in"}
                {(isLoggingIn||isSigningUp) && <FontAwesomeIcon icon={faSpinner} className='logging-in-spinner'/>}
                </button>
        </form>
    );
};

export default Signup;
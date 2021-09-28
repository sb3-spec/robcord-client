import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios  from 'axios';
import { useChatContext } from "stream-chat-react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Alert } from 'bootstrap-react';

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: ''
}

const Auth = () => { 
    const [form, setForm] = useState({});
    const [isSignUp, setIsSignUp] = useState(false);
    const { client, setActiveChannel } = useChatContext();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value})
    }

    const resestForm = () => {
        document.getElementById("auth_input").reset()
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setError("");
            setLoading(true);

            const { username, password, phoneNumber, avatarURL } = form;

            const URL = "https://robertcord.herokuapp.com/auth";

            const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignUp ? 'signup' : 'login'}`, {
                username, password, fullName: form.fullName, phoneNumber, avatarURL,
            });

            cookies.set('token', token);
            cookies.set('username', username);
            cookies.set('fullName', fullName);
            cookies.set('userId', userId);

            if(isSignUp) {
                cookies.set('phoneNumber', phoneNumber);
                cookies.set('avatarURL', avatarURL);
                cookies.set('hashedPassword', hashedPassword);
            }
            setLoading(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
            setLoading(false);
            if(isSignUp) return setError("Failed to sign up");
            setError("Failed to login");
            resestForm()
        }
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    }

    useEffect(() => {
        setError("");
    }, [isSignUp]);

    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
                <div className="auth__form-container_fields-content">
                    <p>{isSignUp ? 'Sign Up' : 'Sign In'}</p>
                    <div className="alert_container">
                        {error && <Alert variant="danger">{error}</Alert>}
                        {loading && <Alert >Loading...</Alert>}
                    </div>
                    <form id="auth_input" onSubmit={handleSubmit}>
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input 
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="username">Username</label>
                                <input 
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        {/* {isSignUp && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input 
                                name="phoneNumber"
                                type="text"
                                placeholder="Phone Number"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        )} */}
                        {/* {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input 
                                    name="avatarURL"
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )} */}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input 
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignUp ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignUp
                            ? "Already have an account?"
                            : "Don't have an account?"}
                            <span onClick={switchMode}>
                                {isSignUp ? "Sign In" : "Sign Up"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in" />
            </div>
        </div>
    )
}

export default Auth

import React from 'react';
import { auth, GoogleAuthProvider } from '../../firebase/firebase'; // Adjust the path based on your project structure
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import './Login.css';


const Login = () => {

    const navigate = useNavigate();



    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate(`/mob`);
        } catch (error) {
            console.error('Error logging in with Google:', error.message);
        }
    };

    return (
        <div>
            <button className='LoginBtn' onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import PageTitle from './PageTitle';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in successfully');
            navigate('/');
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <>
            <PageTitle />
            <div className='sign-in-wrapper'>
                <h1>Sign In</h1>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                    onClick={signIn}
                    className='submit-button'    
                >
                    Sign In
                </button>
            </div>
        </>
    );
};

export default SignIn;

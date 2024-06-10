import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User signed up successfully:', userCredential.user);
            window.location.href = '/';
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };
    
    return (
        <div>
            <h1>Register</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signUp}>Sign Up</button>
        </div>
    );
};

export default Register;

import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import PageTitle from './PageTitle';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authInfoText, setAuthInfoText] = useState('');
    const [authInfoTextColor, setAuthInfoTextColor] = useState('red');
    const [resetEmail, setResetEmail] = useState('');
    const [resetEmailSent, setResetEmailSent] = useState(false);
    const [isResetMode, setIsResetMode] = useState(false);
    const navigate = useNavigate();

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/'); 
        } catch (error) {
            console.error('Error signing in:', error);
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
                setAuthInfoText('Incorrect email or password.');
                setAuthInfoTextColor('red');
            } else {
                setAuthInfoText('An error occurred. Please try again.');
            }
        }
    };

    const handlePasswordReset = async () => {
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setAuthInfoText('If an account exists with this email, a password reset link has been sent. Please check your inbox.');
            setAuthInfoTextColor('green');
            setResetEmailSent(true);
        } catch (error) {
            console.error('Error sending password reset email:', error);
            if (error.code === 'auth/invalid-email') {
                setAuthInfoText('Invalid email address. Please enter a valid email.');
            } else if (error.code === 'auth/user-not-found') {
                setAuthInfoText('No user found with this email address.');
            } else {
                setAuthInfoText('An error occurred. Please try again.');
            }
        }
    };

    const handleForgotPasswordClick = () => {
        setIsResetMode(true);
        setAuthInfoText('');
    };

    const handleBackToSignInClick = () => {
        setIsResetMode(false);
        setAuthInfoText('');
        setResetEmailSent(false);
    };

    return (
        <>
            <PageTitle />
            <div className='sign-in-wrapper'>
                {!isResetMode ? (
                    <>
                        <h1>Sign In</h1>
                        <span 
                            className='auth-info-text'
                            style={{ color: authInfoTextColor }}
                        >
                            {authInfoText}
                        </span>
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
                        <span
                            onClick={handleForgotPasswordClick}
                            className='forgot-password-span'
                        >
                            Forgot Password?
                        </span>
                    </>
                ) : (
                    <>
                        <h1>Reset Password</h1>
                        <span 
                            className='auth-info-text'
                            style={{ color: authInfoTextColor }}
                        >
                            {authInfoText}
                        </span>
                        <label
                            style= {{ display: resetEmailSent ? 'none' : 'block' }}
                        >
                            Enter your email to reset password</label>
                        <input
                            type="email"
                            value={resetEmail}
                            style= {{ display: resetEmailSent ? 'none' : 'block' }}
                            onChange={(e) => setResetEmail(e.target.value)}
                        />
                        <button 
                            onClick={handlePasswordReset} 
                            className='submit-button'
                            style= {{ display: resetEmailSent ? 'none' : 'block' }}
                        >
                            Send Reset Link
                        </button>
                        <span 
                            onClick={handleBackToSignInClick} 
                            className='back-to-sign-in-span'
                        >
                            Back to Sign In
                        </span>
                    </>
                )}
            </div>
        </>
    );
};

export default SignIn;

import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (['/login', '/register'].includes(location.pathname)) return null;

    return (
        <nav className='navbar'>
            <span className='navbar-page-title'>Nick Hoefle and Associates Golf</span>
            {user ? (
                <div>
                    <span id="username" className='navbar-email'>{user.email}</span>
                    <button onClick={handleSignOut} className='sign-out-button'>Sign Out</button>
                </div>
            ) : (
                <Link to="/login" className='sign-in-link'>Sign In</Link>
            )}
        </nav>
    );
};

export default Navbar;

import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useLocation } from 'react-router-dom';


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

    if (location.pathname === '/login') return null;

    return (
        <nav className='navbar'>
                <span className='navbar-page-title'>Nick Hoefle and Associates Golf</span>
                {user ? (
                <div>
                    <span id="username" className='navbar-email'>{user.email}</span>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
                ) : (
                <span>Not logged in</span>
                )}
        </nav>
    );
};

export default Navbar;

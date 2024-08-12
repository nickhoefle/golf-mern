import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Register from './Components/Register';
import SignIn from './Components/SignIn';
import AddGolfCourse from './Components/AddGolfCourse';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';
import EditCourseInfo from './Components/EditCourseInfo';
import EditGolfOuting from './Components/EditGolfOuting';

const App = () => {
    const [user, loading, error] = useAuthState(auth);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            document.body.classList.add('no-background');
        } else {
            document.body.classList.remove('no-background');
        }
    }, [location]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
                <Route path="/add-golf-course" element={user ? <AddGolfCourse /> : <Navigate to="/login" />} />
                <Route path="/edit-golf-course" element={user ? <EditCourseInfo /> : <Navigate to="/login" />} />
                <Route path="/edit-golf-outing" element={user ? <EditGolfOuting /> : <Navigate to="/login" />} />
            </Routes>
        </div>
    );
};

const WrappedApp = () => (
    <Router>
        <App />
    </Router>
);

export default WrappedApp;

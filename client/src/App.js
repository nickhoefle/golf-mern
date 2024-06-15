import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Register from './Components/Register'; // Import the Register component
import SignIn from './Components/SignIn';
import { auth } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import AddGolfCourse from './Components/AddGolfCourse';
import LogGolfOuting from './Components/LogGolfOuting';

const App = () => {
    const [user] = useAuthState(auth);

    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route
                        path="/login"
                        element={<SignIn />}
                    />
                    <Route
                        path="/register"
                        element={<Register />}
                    />
                    <Route
                        path="/"
                        element={user ? <Home /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/add-golf-course"
                        element={<AddGolfCourse />}
                    />
                    <Route
                        path="/log-golf-outing"
                        element={ <LogGolfOuting /> }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

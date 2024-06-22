import React from 'react';
import ViewCourseInfo from './ViewCourseInfo';
import Sidebar from './Sidebar';

const Home = () => {
    return (
        <div style={{display: 'flex'}}> 
            <div style={{width: '75%', backgroundColor: 'white', padding: '20px'}}>
                <ViewCourseInfo />
            </div>
            <div style={{width: '25%', backgroundColor: 'gray', padding: '20px'}}>
                <Sidebar />
            </div>
        </div>
    );
};

export default Home;

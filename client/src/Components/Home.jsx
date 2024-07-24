import React from 'react';
import ViewCourseInfo from './ViewCourseInfo';
import Sidebar from './Sidebar';

const Home = () => {
    return (
        <div className='index-content-wrapper'> 
            <ViewCourseInfo />
            <Sidebar />
        </div>
    );
};

export default Home;

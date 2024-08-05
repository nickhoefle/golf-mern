import React from 'react';

const AddNewCourseLink = () => {
    return (
        <div 
            className='add-new-course-link-wrapper'
            onClick={
                () => window.location.href = '/add-golf-course'
            }
        >
            <img
                className='add-new-course-icon'
                src='/images/add.svg'
                alt='add-new-golf-course'
            />
            <p>Add New Golf Course</p>
        </div>
    );
};

export default AddNewCourseLink;
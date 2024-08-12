import React from 'react';

const AddNewCourseLink = () => {
    return (
        <div 
            className='link-to-add-golf-course-wrapper'
            onClick={
                () => window.location.href = '/add-golf-course'
            }
        >
            <img
                className='link-to-add-golf-course-icon'
                src='/images/add.svg'
                alt='add-new-golf-course'
            />
            <p>Add New Golf Course</p>
        </div>
    );
};

export default AddNewCourseLink;
import React from 'react';

const openEditPage = (selectedCourse) => {
    window.location.href = `/edit-golf-course?id=${selectedCourse._id}`;
};

const EditGolfCourseLink = ({ selectedCourse }) => {
    return (
        <img 
            src='/images/pencil.svg' 
            alt='pencil-svg'
            className='edit-pencil-svg'
            onClick={() => openEditPage(selectedCourse)}
        />
    );
};

export default EditGolfCourseLink;
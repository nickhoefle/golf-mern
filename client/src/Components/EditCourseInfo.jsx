import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditCourseInfo = () => {
    const [courseInfo, setCourseInfo] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        location: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const queryParams = new URLSearchParams(window.location.search);
            const courseId = queryParams.get('id'); 
            try {
                if (courseId) {
                    const response = await axios.get(`/api/golf-courses/${courseId}`);
                    setCourseInfo(response.data)
                    setFormData({
                        name: response.data.name,
                        location: response.data.location
                    });
                }
            } catch (error) {
                console.error('Error fetching golf outings:', error);
            }
        };
    
        fetchData();
    }, []); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const courseId = courseInfo._id; 
            const response = await axios.put(`/api/golf-courses/${courseId}`, formData);
            console.log('Course updated:', response.data);
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    return (
        <div className='page-title-wrapper'>
            <h1>Edit Course Information</h1>
            <form onSubmit={handleFormSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <label>Location:</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                />
                <button type="submit">Update Course</button>
            </form>
        </div>
    );
};

export default EditCourseInfo;

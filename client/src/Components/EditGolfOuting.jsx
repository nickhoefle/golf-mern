import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditGolfOuting = () => {
    const [courseName, setCourseName] = useState('');
    const [outingData, setOutingData] = useState(null);
    const [formData, setFormData] = useState({
        user: '',
        course: '',
        scores: [],
        date: ''
    });

    const queryParams = new URLSearchParams(window.location.search);
    const outingId = queryParams.get('id');

    useEffect(() => {
        const fetchOutingData = async () => {  
            try {
                if (outingId) {
                    const response = await axios.get(`/api/golf-outings/${outingId}`);
                    const data = response.data;
                    setOutingData(data);
                    setFormData({
                        user: data.user,
                        course: data.course,
                        scores: data.scores, 
                        date: new Date(data.date).toISOString().split('T')[0] 
                    });
                } else {
                    window.location.href = '/';
                }
            } catch (error) {
                console.error('Error fetching outing data:', error);
            }
        };

        fetchOutingData();
    }, [outingId]);

    useEffect(() => {
        const fetchCourseById = async (courseId) => {
            try {
                const response = await axios.get(`/api/golf-courses/${courseId}`);
                setCourseName(response.data.name);
            } catch (error) {
                console.error('Error fetching outing data:', error);
            }
        };
        fetchCourseById(formData.course);
    }, [formData.course]);

    const handleScoreChange = (index, value) => {
        const newScores = [...formData.scores];
        const score = parseInt(value);
        newScores[index] = score;

        setFormData({
            ...formData,
            scores: newScores
        });
    };

    const handleDateChange = (e) => {
        setFormData({
            ...formData,
            date: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await axios.put(`/api/golf-outings/${outingId}`, formData, {
                headers: { 'Content-Type': 'application/json' }             
            });
            console.log(response);
            window.location.href = `/?id=${formData.course}`
        } catch (error) {
            console.error('Error updating golf outing:', error.message);
        }
    };

    if (!outingData) {
        return <div>Loading...</div>;
    }

    console.log(formData.scores.length)

    return (
        <div className='edit-golf-outing-wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Edit Golf Outing</h1>
                <label>User:</label>
                <input
                    className='edit-golf-outing-email'
                    type="text"
                    value={formData.user}
                />
                <label>Date:</label>
                    <input
                        style={{ padding: formData.scores.length === 18 ? '20px 0 20px 5px' : '5px' }}
                        className='edit-golf-outing-date'
                        type="date"
                        value={formData.date}
                        onChange={handleDateChange}
                    />
                    <label>Course:</label>
                    <span className='edit-golf-outing-course-name'>{courseName}</span>
                {formData.scores.map((score, index) => (
                    <div>
                        <label>Hole {index + 1} Score: </label>
                        <input
                            className='edit-golf-outing-score'
                            key={index}
                            type="number"
                            value={score || ''} 
                            onChange={(e) => handleScoreChange(index, e.target.value)}
                            min="0" 
                            style={{ marginLeft: index < 9 ? '20px' : '8px' }}
                        />
                    </div>
                ))}
                <button type="submit" className='submit-golf-outing-button'>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EditGolfOuting;

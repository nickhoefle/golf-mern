import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditGolfOuting = () => {
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
            window.location.href = `/?id=${formData.course}`
        } catch (error) {
            console.error('Error updating golf outing:', error.message);
        }
    };

    if (!outingData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit Golf Outing</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User:</label>
                    <input
                        type="text"
                        value={formData.user}
                    />
                </div>
                <div>
                    <label>Scores:</label>
                    {formData.scores.map((score, index) => (
                        <input
                            key={index}
                            type="number"
                            value={score || ''} 
                            onChange={(e) => handleScoreChange(index, e.target.value)}
                            min="0" 
                        />
                    ))}
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={handleDateChange}
                    />
                </div>
                <button type="submit" className='submit-golf-outing-button'>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EditGolfOuting;

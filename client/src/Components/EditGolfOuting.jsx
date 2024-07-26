import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditGolfOuting = () => {
    const [outingData, setOutingData] = useState(null);

    useEffect(() => {
        const fetchOutingData = async () => {
            const queryParams = new URLSearchParams(window.location.search);
            const outingId = queryParams.get('id'); 
            try {
                if (outingId) {
                    const response = await axios.get(`/api/golf-outings/${outingId}`);
                    setOutingData(response.data);
                }
            } catch (error) {
                console.error('Error fetching outing data:', error);
            }
        };
    
        fetchOutingData();
    }, []); 

    if (!outingData) {
        return <div>Loading...</div>;
    }

    return (
        <div> 
            <h1>Golf Outing Details</h1>
            <p><strong>User:</strong> {outingData.user}</p>
            <p><strong>Course ID:</strong> {outingData.course}</p>
            <p><strong>Scores:</strong> {outingData.scores.join(', ')}</p>
            <p><strong>Date:</strong> {new Date(outingData.date).toLocaleDateString()}</p>
        </div>
    );
};

export default EditGolfOuting;

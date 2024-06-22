import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddGolfOuting = ({ selectedCourse }) => {
    const [addingOuting, setAddingOuting] = useState(false);
    const [user, setUser] = useState('');
    const [scores, setScores] = useState([]);

    useEffect(() => {
        setUser(document.getElementById('username').innerHTML);
    }, []);

    useEffect(() => {
        setAddingOuting(false);
        setScores(Array.from({ length: selectedCourse.holes }, () => ''));
    }, [selectedCourse]);

    const handleButtonClick = () => {
        setAddingOuting(!addingOuting);
    };

    const handleScoreChange = (index, value) => {
        const newScores = [...scores];
        newScores[index] = value; 
        setScores(newScores);
    };

    const handleFinishedClick = async () => {
        const parsedScores = scores.map(score => parseInt(score));
        
        for (const [index, score] of parsedScores.entries()) {
            if (score > 15) {
                const holeNumber = index + 1;
                const confirmed = window.confirm(`Your score for Hole ${holeNumber} seems high. Proceed?`);
                if (!confirmed) {
                    console.log('User canceled.');
                    return;
                }
            }
        }
    
        const outingData = {
            user: user,  
            course: selectedCourse,  
            scores: parsedScores
        };
    
        try {
            const response = await axios.post('/api/golf-outings', outingData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            console.log('New Golf Outing:', response.data);
    
        } catch (error) {
            console.error('Error creating golf outing:', error.message);
        }
    };

    return (
        <>
            {addingOuting && (
                <tr>
                    <td>{user}</td>
                    {Array.from({ length: selectedCourse.holes }).map((_, index) => (
                        <td key={index}>
                            <input
                                type="number"
                                value={scores[index]}
                                onChange={(e) => handleScoreChange(index, e.target.value)}
                                style={{ width: '50px', fontSize: '18px', textAlign: 'center' }}
                            />
                        </td>
                    ))}
                </tr>
            )}
            {!addingOuting && <button onClick={handleButtonClick}>Add Golf Outing</button>}
            {addingOuting && <button onClick={handleButtonClick}>Cancel</button>}
            {addingOuting && <button onClick={handleFinishedClick}>Finished</button>}
        </>
    );
};

export default AddGolfOuting;

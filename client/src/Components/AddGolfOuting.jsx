import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const AddGolfOuting = ({ selectedCourse, outingAddedListener, addingOuting, setAddingOuting }) => {
    const [user, setUser] = useState('');
    const [scores, setScores] = useState([]);
    const [outingDate, setOutingDate] = useState('');

    useEffect(() => {
        const auth = getAuth(); 
        setUser(auth.currentUser.email)
    }, []);

    const handleAddOutingButtonClick = () => {
        setAddingOuting(!addingOuting);
    };

    const handleScoreChange = (index, score) => {
        const newScores = [...scores];
        newScores[index] = score;
        setScores(newScores);
    };

    const handleDateChange = (e) => {
        setOutingDate(e.target.value);
    };

    const handleFinishedClick = async () => {
        
        const parsedScores = scores.map(score => parseInt(score));
        
        for (const [index, score] of parsedScores.entries()) {
            if (score > 15) {
                const holeNumber = index + 1;
                const confirmed = window.confirm(`Your score for Hole ${holeNumber} seems high. Proceed?`);
                if (!confirmed) {
                    return;
                }
            }
        }

        const outingData = {
            user: user,
            course: selectedCourse,
            scores: parsedScores,
            date: outingDate, 
        };

        try {
                const response = await axios.post('/api/golf-outings', outingData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                outingAddedListener();
                setAddingOuting(false);
                setScores([]);
                setOutingDate('');
                console.log('New Golf Outing:', response.data);
        } catch (error) {
            console.error('Error creating golf outing:', error.message);
        }
    };

    return (
        <>
            {addingOuting && (
                <tr>
                    <td className='add-outing-email-date-cell'>
                        <input
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                        <input
                            type="date"
                            value={outingDate}
                            onChange={handleDateChange}
                            className='add-outing-calendar'
                        />
                    </td>
                    {Array.from({ length: selectedCourse.holes }).map((_, index) => (
                        <td key={index}>
                            <input
                                type="number"
                                value={scores[index]}
                                onChange={(e) => handleScoreChange(index, e.target.value)}
                                className='add-outing-hole-score-cell'
                            />
                        </td>
                    ))}
                </tr>
            )}
            
            {!addingOuting && selectedCourse && 
                <button 
                    onClick={handleAddOutingButtonClick} 
                    className='add-golf-outing-button'
                >
                    Add Golf Outing
                </button>
            }
            
            {addingOuting && 
                <button 
                    onClick={handleAddOutingButtonClick} 
                    className='cancel-golf-outing-button'
                >
                    Cancel
                </button>
            }

            {addingOuting && 
                <button 
                    onClick={handleFinishedClick} 
                    className='submit-golf-outing-button'
                >
                    Submit
                </button>
            }
        </>
    );
};

export default AddGolfOuting;

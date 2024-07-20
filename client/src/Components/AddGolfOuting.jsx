import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const AddGolfOuting = ({ selectedCourse }) => {
    const [addingOuting, setAddingOuting] = useState(false);
    const [user, setUser] = useState('');
    const [scores, setScores] = useState([]);
    const [outingDate, setOutingDate] = useState('');

    useEffect(() => {
        const auth = getAuth(); 
        setUser(auth.currentUser.email)
    }, []);

    const handleButtonClick = () => {
        setAddingOuting(!addingOuting);
    };

    const handleScoreChange = (index, value) => {
        const newScores = [...scores];
        newScores[index] = value;
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
                    console.log('User canceled.');
                    return;
                }
            }
        }

        const outingData = {
            user: user,
            course: selectedCourse,
            scores: parsedScores,
            date: outingDate, // Include outing date in the data
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
                    <td style={{ display: 'flex', flexDirection: 'column'}}>
                        {user}
                        <input
                            type="date"
                            value={outingDate}
                            onChange={handleDateChange}
                            style={{ width: '150px', fontSize: '16px' }} // Adjust styling as needed
                        />
                    </td>
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
            {!addingOuting && selectedCourse &&<button onClick={handleButtonClick} className='add-golf-outing-button'>Add Golf Outing</button>}
            {addingOuting && <button onClick={handleButtonClick} className='cancel-golf-outing-button'>Cancel</button>}
            {addingOuting && <button onClick={handleFinishedClick} className='submit-golf-outing-button'>Submit</button>}
        </>
    );
};

export default AddGolfOuting;

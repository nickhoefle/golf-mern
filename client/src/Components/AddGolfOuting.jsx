import React, { useState, useEffect } from 'react';

const AddGolfOuting = ({selectedCourse}) => {
    const [addingOuting, setAddingOuting] = useState(false);
    const [user, setUser] = useState('');
    const [scores, setScores] = useState('');
    
    useEffect(() => { 
        setUser(document.getElementById('username').innerHTML);
    }, []);

    useEffect(() => { 
        setAddingOuting(false);
    }, [selectedCourse]);

    const handleButtonClick = () => {
        setAddingOuting(!addingOuting);
    }

    const handleScoreChange = (index, value) => {
        const newScores = [...scores];
        newScores[index] = value;
        setScores(newScores);
    };

    /* eslint-disable no-restricted-globals */
    const handleFinishedClick = () => {
        for (const hole in scores) {
            if (scores[hole] > 15) {
                const holeNumber = parseInt(hole) + 1;
                const confirmed = confirm('Your score for Hole ' + holeNumber + ' seems high. Proceed?');
                if (!confirmed) {
                    console.log('Whoops')
                    return;
                }
            }
        }
        console.log('Unfortunately so');
        console.log(scores);
    };
    /* eslint-disable no-restricted-globals */

    return (
        <>
            {addingOuting && 
                <tr>
                    <td>{user}</td>
                    {Array.from({ length: selectedCourse.holes }).map((_, index) => (
                        <td>
                            <input
                                type="number"
                                value={scores[index]}
                                onChange={(e) => handleScoreChange(index, e.target.value)}
                                style={{width:'50px', fontSize:'18px', textAlign:'center'}}
                            />
                        </td>
                    ))}
                </tr>
            }
            { !addingOuting && <button onClick={handleButtonClick}>Add Golf Outing</button> }
            { addingOuting && <button onClick={handleButtonClick}>Cancel</button>}
            { addingOuting && <button onClick={handleFinishedClick}>Finished</button> }
            </>
    );
};

export default AddGolfOuting;

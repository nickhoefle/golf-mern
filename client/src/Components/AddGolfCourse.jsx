import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddGolfCourse() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [holes, setHoles] = useState('');
    const [amountOfTeeBoxes, setAmountOfTeeBoxes] = useState('');
    const [teeBoxDetails, setTeeBoxDetails] = useState([]);

    //Reset teeBox data when # of hole changes
    useEffect(() => {
        setTeeBoxDetails([]);
        setAmountOfTeeBoxes('');
    }, [holes]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newGolfCourse = {
            name,
            location,
            holes: parseInt(holes),
            teeBoxes: teeBoxDetails.map(box => ({
                color: box.color,
                yardages: box.yardages.map(yardage => parseInt(yardage))
            }))
        };
    
        try {
            await axios.post('/api/golf-courses', newGolfCourse);
            setName('');
            setLocation('');
            setHoles('');
            setAmountOfTeeBoxes('');
            setTeeBoxDetails([]);
        } catch (error) {
            console.error('There was an error adding the golf course!', error);
        }
    };

    const handleTeeBoxesChange = (e) => {
        const numTeeBoxes = parseInt(e.target.value);
        setAmountOfTeeBoxes(numTeeBoxes);
        const initialTeeBoxDetails = Array(numTeeBoxes).fill().map(() => ({
            color: '',
            yardages: Array(parseInt(holes)).fill('')
        }));
        setTeeBoxDetails(initialTeeBoxDetails);
    };

    const handleTeeBoxDetailChange = (index, field, value) => {
        const updatedTeeBoxDetails = [...teeBoxDetails];
        if (field === 'color') {
            updatedTeeBoxDetails[index].color = value;
        } else {
            const yardageIndex = parseInt(field);
            updatedTeeBoxDetails[index].yardages[yardageIndex] = value;
        }
        setTeeBoxDetails(updatedTeeBoxDetails);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Location:</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div>
                <label>Holes:</label>
                <select
                    value={holes}
                    onChange={(e) => setHoles(e.target.value)}
                >
                    <option value="">Number of Holes</option>
                    <option value="9">9</option>
                    <option value="18">18</option>
                </select>
            </div>
            {holes && (
                <div>
                    <label>Number of Tee Boxes:</label>
                    <select
                        value={amountOfTeeBoxes}
                        onChange={handleTeeBoxesChange}
                    >
                        <option value="">Select number of tee boxes</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
            )}
            {Array.from({ length: amountOfTeeBoxes }).map((_, index) => (
                <div 
                    key={index} 
                    style={{ margin: '10px 0' }}
                >
                    <label>Tee Box {index + 1} Color:</label>
                    <input
                        type="text"
                        value={teeBoxDetails[index].color}
                        onChange={(e) => handleTeeBoxDetailChange(index, 'color', e.target.value)}
                    />
                    {Array.from({ length: parseInt(holes) }).map((_, holeIndex) => (
                        <div 
                            key={holeIndex} 
                            style={{ margin: '5px 0' }}
                        >
                            <label>Hole {holeIndex + 1} Yardage:</label>
                            <input
                                type="number"
                                value={teeBoxDetails[index].yardages[holeIndex]}
                                onChange={(e) => handleTeeBoxDetailChange(index, holeIndex, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            ))}
            <button type="submit">Add Golf Course</button>
        </form>
    );
}

export default AddGolfCourse;

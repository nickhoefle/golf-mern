import React, { useState } from 'react';
import axios from 'axios';

function AddGolfCourse() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [holes, setHoles] = useState('');
    const [pars, setPars] = useState('');
    const [amountOfTeeBoxes, setAmountOfTeeBoxes] = useState('');
    const [teeBoxDetails, setTeeBoxDetails] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newGolfCourse = {
            name,
            location,
            holes: parseInt(holes),
            pars: pars.map(par => parseInt(par)),
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
            setPars([]);
            setAmountOfTeeBoxes('');
            setTeeBoxDetails([]);
        } catch (error) {
            console.error('There was an error adding the golf course!', error);
        }
    };

    const handleTeeBoxesChange = (e) => {
        const numTeeBoxes = parseInt(e.target.value);
        setAmountOfTeeBoxes(numTeeBoxes);
        const initialTeeBoxDetails = Array.from({ length: numTeeBoxes }, () => ({
            color: '',
            yardages: Array(parseInt(holes)).fill('')
        }));
        setTeeBoxDetails(initialTeeBoxDetails);
    };

    const handleTeeBoxDetailChange = (index, field, value) => {
        setTeeBoxDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            if (field === 'color') {
                updatedDetails[index].color = value;
            } else {
                const yardageIndex = parseInt(field);
                updatedDetails[index].yardages[yardageIndex] = value;
            }
            return updatedDetails;
        });
    };

    const handleParsChange = (holeIndex, value) => {
        const updatedPars = [...pars];
        updatedPars[holeIndex] = value;
        setPars(updatedPars);
    };

    return (
        <div className='add-golf-course-wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Add New Golf Course</h1>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Location:</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <label>Holes:</label>
                <select
                    value={holes}
                    onChange={(e) => setHoles(e.target.value)}
                >
                    <option value="">Number of Holes</option>
                    <option value="9">9</option>
                    <option value="18">18</option>
                </select>
                {holes && (
                    <>
                        <label>Pars:</label>
                        {Array.from({ length: parseInt(holes) }).map((_, holeIndex) => (
                            <div key={holeIndex} style={{ margin: '5px 0' }}>
                                <label style={{ marginRight: holeIndex < 9 ? '20px' : '6px' }}>
                                    Hole {holeIndex + 1} Par:
                                </label>
                                <input
                                    type="number"
                                    value={pars[holeIndex] || ''}
                                    onChange={(e) => handleParsChange(holeIndex, e.target.value)}
                                />
                            </div>
                        ))}
                        <label>Tee Boxes:</label>
                        <select
                            value={amountOfTeeBoxes}
                            onChange={handleTeeBoxesChange}
                        >
                            <option value="">Number of Tee Boxes</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </>
                )}
                {Array.from({ length: amountOfTeeBoxes }).map((_, index) => (
                    <div className='tee-box-form-wrapper'>
                        <div 
                            key={index} 
                            style={{ margin: '10px 0' }}
                        >
                            <label>Tee Box {index + 1} Color:</label><br />
                            <select
                                value={teeBoxDetails[index]?.color || ''}
                                onChange={(e) => handleTeeBoxDetailChange(index, 'color', e.target.value)}
                            >
                                <option value="">Select Color</option>
                                <option value="Red">Red</option>
                                <option value="Orange">Orange</option>
                                <option value="Yellow">Yellow</option>
                                <option value="Green">Green</option>
                                <option value="Blue">Blue</option>
                                <option value="Purple">Violet</option>
                                <option value="White">White</option>
                                <option value="Black">Black</option>
                                <option value="Brown">Brown</option>
                                <option value="Gray">Gray</option>
                                <option value="Pink">Pink</option>
                            </select>
                            {Array.from({ length: parseInt(holes) }).map((_, holeIndex) => (
                                <div 
                                    key={holeIndex} 
                                    style={{ margin: '5px 0' }}
                                >
                                    <label 
                                        style={{ marginRight: holeIndex < 9 ? '13px' : '1.5px' }}
                                    >
                                        Hole {holeIndex + 1} Yards: 
                                    </label>
                                    <input
                                        type="number"
                                        value={teeBoxDetails[index]?.yardages[holeIndex] || ''}
                                        onChange={(e) => handleTeeBoxDetailChange(index, holeIndex, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button 
                    className='submit-button'
                    type="submit"
                >
                    Add Golf Course
                </button>
            </form>
        </div>
    );
}

export default AddGolfCourse;

import React, { useState } from 'react';
import axios from 'axios';

function AddGolfCourse() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [holes, setHoles] = useState('');
    const [pars, setPars] = useState('');
    const [amountOfTeeBoxes, setAmountOfTeeBoxes] = useState('');
    const [teeBoxDetails, setTeeBoxDetails] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            alert('Please enter a name for the course.');
            return;
        } else if (!location) {
            alert('Please enter an address for the course.');
            return;
        } else if (!holes) {
            alert('Please specify the amount of holes for the course.');
            return;
        } else if (!pars || pars.some(par => par === '')) {
            alert('Please fill out all par values for the course.');
            return;
        } else if (!amountOfTeeBoxes) {
            alert('Please specify the amount of tee boxes.');
            return;
        } else if (teeBoxDetails.some(teeBox => teeBox.color === '')) {
            alert('Specify colors for tee boxes.');
            return;
        } else if (teeBoxDetails.some(teeBox => teeBox.yardages.some(yardage => yardage === ''))) {
            alert('Specify yardages for all holes.');
            return;
        }

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
            window.location.href = '/';
        } catch (error) {
            console.error('Error adding golf course.', error);
        }
    };

    const handleTeeBoxAmountChange = (e) => {
        const numberOfTeeBoxes = parseInt(e.target.value);
        setAmountOfTeeBoxes(numberOfTeeBoxes);
        const initialTeeBoxDetails = Array.from({ length: numberOfTeeBoxes }, () => ({
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
                    className='course-name-input'
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Location:</label>
                <input
                    className='course-location-input'
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <label>Holes:</label>
                <select
                    className='holes-dropdown'
                    value={holes}
                    onChange={(e) => setHoles(e.target.value)}
                >
                    <option value="">Number of Holes</option>
                    <option value="9">9</option>
                    <option value="18">18</option>
                </select>
                {holes && (
                    <>
                        {Array.from({ length: parseInt(holes) }).map((_, holeIndex) => (
                            <div 
                                key={holeIndex} 
                                className='hole-par-line'
                            >
                                <label style={{ marginRight: holeIndex < 9 ? '20px' : '8px' }}>
                                    Hole {holeIndex + 1} Par:
                                </label>
                                <input
                                    className='par-input'
                                    type="number"
                                    min={3}
                                    max={5}
                                    value={pars[holeIndex] || ''}
                                    onChange={(e) => handleParsChange(holeIndex, e.target.value)}
                                />
                            </div>
                        ))}
                        <label className='amount-of-teeboxes-label'>Tee Boxes:</label>
                        <select
                            className='amount-of-teeboxes-dropdown'
                            value={amountOfTeeBoxes}
                            onChange={handleTeeBoxAmountChange}
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
                    <div className='add-edit-teebox-section-wrapper'>
                        <div 
                            key={index} 
                            className='add-edit-teebox-section'
                        >
                            <label>Tee Box {index + 1} Color:</label>
                            <select
                                className='teebox-color-dropdown'
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
                                    className='yardage-label-and-input'
                                >
                                    <label 
                                        style={{ marginRight: holeIndex < 9 ? '15px' : '3.5px' }}
                                    >
                                        Hole {holeIndex + 1} Yards: 
                                    </label>
                                    <input
                                        className='yardage-input'
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

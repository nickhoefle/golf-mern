import React, { useState } from 'react';
import axios from 'axios';

function AddGolfCourse() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [holes, setHoles] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newGolfCourse = { name, location, holes: parseInt(holes) };

        try {
            const response = await axios.post('/api/golf-courses', newGolfCourse);
            console.log(response.data);
            // Clear form fields
            setName('');
            setLocation('');
            setHoles('');
        } catch (error) {
            console.error('There was an error adding the golf course!', error);
        }
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
                <input
                type="number"
                value={holes}
                onChange={(e) => setHoles(e.target.value)}
                />
            </div>
            <button type="submit">Add Golf Course</button>
        </form>
    );
}

export default AddGolfCourse;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditCourseInfo = () => {
    const [initialCourseData, setInitialCourseData] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        holes: '',
        pars: [],
        teeBoxes: [],
    });

    useEffect(() => {
        const fetchCourseData = async () => {
            const queryParams = new URLSearchParams(window.location.search);
            const courseId = queryParams.get('id'); 
            try {
                if (courseId) {
                    const response = await axios.get(`/api/golf-courses/${courseId}`);
                    setInitialCourseData(response.data);
                    setFormData({
                        name: response.data.name,
                        location: response.data.location,
                        holes: response.data.holes.toString(),
                        pars: response.data.pars || [],
                        teeBoxes: response.data.teeBoxes || [],
                    });
                }
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };
    
        fetchCourseData();
    }, []); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddTeeBox = () => {
        const newTeeBox = {
            color: '',
            yardages: Array.from({ length: parseInt(formData.holes) }).fill(''),
        };

        setFormData(prevState => ({
            ...prevState,
            teeBoxes: [...prevState.teeBoxes, newTeeBox],
        }));
    };

    const handleDeleteTeeBox = (index) => {
        const confirmation = window.confirm('Are you sure you want to delete this tee box?');
        if (confirmation) {
            setFormData(prevState => {
                const updatedTeeBoxes = [...prevState.teeBoxes];
                updatedTeeBoxes.splice(index, 1);
                return { ...prevState, teeBoxes: updatedTeeBoxes };
            });
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const courseId = initialCourseData._id; 
            const response = await axios.put(`/api/golf-courses/${courseId}`, formData);
            console.log('Course updated:', response.data);
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    return (
        <div>
            <h1>Edit Course Information</h1>
            <div className='edit-course-info-form-container'>
                <form
                    className='edit-course-info-form-wrapper' 
                    onSubmit={handleFormSubmit}
                >
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                    />
                    <label>Holes:</label>
                    <span>{formData.holes}</span>
                    <div className='edit-pars-wrapper'>
                        {Array.from({ length: parseInt(formData.holes) }).map((_, holeIndex) => (
                            <div key={holeIndex} className='edit-par-line'>
                                <label>Hole #{holeIndex + 1} Par: </label>
                                <input
                                    type="number"
                                    required
                                    value={formData.pars[holeIndex] || ''}
                                    onChange={(e) => {
                                        const newPars = [...formData.pars];
                                        newPars[holeIndex] = parseInt(e.target.value);
                                        setFormData({ ...formData, pars: newPars });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        {formData.teeBoxes.map((teeBox, index) => (
                            <div 
                                key={index}
                                className='edit-teebox-wrapper'
                            >
                                <div>
                                    <label>Tee Box #{index+1}</label>
                                    <select
                                        value={teeBox.color}
                                        onChange={(e) => {
                                            const newTeeBoxColor = [...formData.teeBoxes];
                                            newTeeBoxColor[index].color = e.target.value;
                                            setFormData({ ...formData, teeBoxes: newTeeBoxColor });
                                        }}
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
                                    {teeBox.yardages.map((yardage, holeIndex) => (
                                        <input 
                                            required
                                            key={holeIndex}
                                            value={yardage}
                                            onChange={(e) => {
                                                const newTeeBoxYardages = [...formData.teeBoxes];
                                                newTeeBoxYardages[index].yardages[holeIndex] = e.target.value;
                                                setFormData({ ...formData, teeBoxes: newTeeBoxYardages });
                                            }}
                                        />
                                    ))}
                                    <button type="button" onClick={() => handleDeleteTeeBox(index)}>Delete</button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddTeeBox}>Add Tee Box</button>
                    </div>
                    <button type="submit">Update Course</button>
                </form>
            </div>
        </div>
    );
};

export default EditCourseInfo;

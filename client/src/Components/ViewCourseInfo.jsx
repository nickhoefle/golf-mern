import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewScoreCard = () => {
    const [golfCourses, setGolfCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        const fetchGolfCourses = async () => {
            try {
                const response = await axios.get('/api/golf-courses');
                setGolfCourses(response.data);
            } catch (error) {
                console.error('Error fetching golf courses:', error);
            }
        };
        fetchGolfCourses();
    }, []);

    const handleCourseChange = (event) => {
        const courseId = event.target.value;
        const selected = golfCourses.find(course => course._id === courseId);
        setSelectedCourse(selected || null);
    };

    return (
        <div className='view-course-info-wrapper'>
            <label>Golf Course:</label>
            <select 
                id="golf-course-select" 
                value={selectedCourse ? selectedCourse._id : ''} 
                onChange={handleCourseChange}
            >
                <option value="">Select Course</option>
                {golfCourses.map((course) => (
                    <option key={course._id} value={course._id}>
                        {course.name}
                    </option>
                ))}
            </select>

            {selectedCourse && (
                <div>
                    <p>{selectedCourse.location}</p>
                    <div>
                        <table className='scorecard-table'>
                            <tbody>
                                <tr>
                                    <th>Hole</th>
                                    {Array.from({ length: selectedCourse.holes }).map((_, index) => (
                                        <th>{index + 1}</th>
                                    ))}
                                </tr>
                                {selectedCourse.teeBoxes.map((teeBox) => (
                                    <tr 
                                        key={teeBox._id}
                                        style={{ backgroundColor: teeBox.color }}
                                    >
                                        <td>{teeBox.color} Tees</td>
                                        {teeBox.yardages.map((yardage, index) => (
                                            <td key={index}>{yardage}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewScoreCard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseReview from './CourseReview';
import AddGolfOuting from './AddGolfOuting';

const ViewScoreCard = () => {
    const [golfCourses, setGolfCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [outingsAtCourse, setOutingsAtCourse] = useState([]);

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

    useEffect(() => {
        const fetchGolfOutings = async () => {
            try {
                if (selectedCourse) {
                    const response = await axios.get(`/api/golf-outings/course/${selectedCourse._id}`);
                    response.data.map((outing) => {
                        outing.date = outing.date.slice(0,10);
                    })
                    setOutingsAtCourse(response.data);
                }
            } catch (error) {
                console.error('Error fetching golf outings:', error);
            }
        };
        fetchGolfOutings();
    }, [selectedCourse]);

    const handleSelectedCourseChange = (event) => {
        const selectedCourseId = event.target.value;
        const selected = golfCourses.find(course => course._id === selectedCourseId);
        setSelectedCourse(selected || null);
    };

    const openEditPage = (selectedCourse) => {
        window.location.href=`/edit-golf-course?id=${selectedCourse._id}`;
    }

    return (
        <>
            <div className='view-course-info-wrapper'>
                <label>Golf Course: </label>
                <select 
                    id="golf-course-select" 
                    value={selectedCourse ? selectedCourse._id : ''} 
                    onChange={handleSelectedCourseChange}
                >
                    <option value="">Select Course</option>
                    {golfCourses.map((course) => (
                        <option 
                            key={course._id} 
                            value={course._id}
                        >
                            {course.name}
                        </option>
                    ))}
                </select>
                {selectedCourse && (
                    <img 
                        src='/images/pencil.svg' 
                        alt='pencil-svg'
                        className='edit-pencil-svg'
                        onClick={() => openEditPage(selectedCourse)}
                    />
                )}

                {selectedCourse && (
                    <div>
                        <p>{selectedCourse.location}</p>
                        <table className='scorecard-table'>
                            <tr>
                                <th>Hole</th>
                                {Array.from({ length: selectedCourse.holes }).map((_, index) => (
                                    <th>{index + 1}</th>
                                ))}
                            </tr>
                            <tr>
                                <td>Par</td>
                                {selectedCourse.pars.map((par) => (
                                    <td>{par}</td>
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
                            {outingsAtCourse.map((outing, index) =>(
                                <tr key={index}>
                                    <td>
                                        <span className='outing-date-and-user'>{outing.date} {outing.user}</span>
                                    </td>
                                    {outing.scores.map((score) => (
                                        <td>
                                            {score}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            <AddGolfOuting selectedCourse={selectedCourse} />
                        </table>
                    </div>
                )}
            </div>        
            {selectedCourse && <CourseReview course={selectedCourse}/>}
        </>
    );
};

export default ViewScoreCard;

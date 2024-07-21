import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseReview from './CourseReview';
import AddGolfOuting from './AddGolfOuting';
import SortAndFilterOutings from './SortAndFilterOutings';
import { getAuth } from 'firebase/auth';

const ViewScoreCard = () => {
    const [golfCourses, setGolfCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [outingsAtCourse, setOutingsAtCourse] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [filterBy, setFilterBy] = useState('all'); 
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const auth = getAuth(); 
        setUserEmail(auth.currentUser.email)
    }, []);

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
                    
                    const outingsData = response.data.map(outing => ({
                        date: outing.date.slice(0, 10), 
                        user: outing.user,
                        scores: outing.scores
                    }));

                    let filteredOutings = [...outingsData];
                    if (filterBy === userEmail) {
                        filteredOutings = filteredOutings.filter(outing => outing.user === userEmail);
                    }

                    const sortedOutings = filteredOutings.sort((a, b) => {
                        return sortBy === 'newest' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
                    });

                    setOutingsAtCourse(sortedOutings);
                    
                }
            } catch (error) {
                console.error('Error fetching golf outings:', error);
            }
        };

        fetchGolfOutings();
    }, [selectedCourse, sortBy, filterBy, userEmail]); 

    const handleSelectedCourseChange = (event) => {
        const selectedCourseId = event.target.value;
        const selected = golfCourses.find(course => course._id === selectedCourseId);
        setSelectedCourse(selected || null);
    };

    const openEditPage = (selectedCourse) => {
        window.location.href=`/edit-golf-course?id=${selectedCourse._id}`;
    }

    const handleSortChange = (selectedSortBy) => {
        setSortBy(selectedSortBy);
    };

    const handleFilterChange = (selectedFilterBy) => {
        setFilterBy(selectedFilterBy);
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
                    <>
                        <img 
                            src='/images/pencil.svg' 
                            alt='pencil-svg'
                            className='edit-pencil-svg'
                            onClick={() => openEditPage(selectedCourse)}
                        />
                        <p>{selectedCourse.location}</p>
                    </>
                )}

                {selectedCourse && (
                    <div className='scorecard-table-wrapper'>
                        <table className='scorecard-table'>
                            <thead>
                                <tr>
                                    <th>Hole</th>
                                    {Array.from({ length: selectedCourse.holes }).map((_, index) => (
                                        <th key={index}>{index + 1}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Par</td>
                                    {selectedCourse.pars.map((par, index) => (
                                        <td key={index}>{par}</td>
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
                                {outingsAtCourse.map((outing, index) => (
                                    <tr key={index}>
                                        <td>
                                            <span className='outing-date-and-user'>{outing.date} {outing.user}</span>
                                        </td>
                                        {outing.scores.map((score, scoreIndex) => (
                                            <td key={scoreIndex}>
                                                {score}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                <AddGolfOuting selectedCourse={selectedCourse} />
                            </tbody>
                        </table>
                    </div>
                )}
            </div>   
            { selectedCourse && <SortAndFilterOutings onSortChange={handleSortChange} onFilterChange={handleFilterChange} userEmail={userEmail}/> }
            { selectedCourse && <CourseReview course={selectedCourse} />}
        </>
    );
};

export default ViewScoreCard;

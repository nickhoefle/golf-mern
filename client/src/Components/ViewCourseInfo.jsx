import React, { useEffect, useState, useCallback } from 'react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import AddGolfOuting from './AddGolfOuting';
import AddNewCourseLink from './AddNewCourseLink';
import CourseReview from './CourseReview';
import DeleteGolfOuting from './DeletingGolfOuting';
import EditGolfCourseLink from './EditGolfCourseLink';
import MapIconAndLink from './MapIconAndLink';
import SortAndFilterOutings from './SortAndFilterOutings';

const ViewScoreCard = () => {
    const [golfCourses, setGolfCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [outingsAtCourse, setOutingsAtCourse] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [filterBy, setFilterBy] = useState('all');
    const [userEmail, setUserEmail] = useState('');
    const [addingOuting, setAddingOuting] = useState(false);

    const fetchGolfCourses = async () => {
        try {
            const response = await axios.get('/api/golf-courses');
            setGolfCourses(response.data);
        } catch (error) {
            console.error('Error fetching golf courses:', error);
        }
    };

    const fetchGolfOutings = useCallback(async (courseId) => {
        try {
            const response = await axios.get(`/api/golf-outings/course/${courseId}`);

            const outingsData = response.data.map(outing => ({
                id: outing._id,
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

        } catch (error) {
            console.error('Error fetching golf outings:', error);
            setOutingsAtCourse([]);
        }
    }, [sortBy, filterBy, userEmail]);

    useEffect(() => {
        const auth = getAuth();
        setUserEmail(auth.currentUser.email);
    }, []);

    useEffect(() => {
        fetchGolfCourses();
    }, []);

    useEffect(() => {
        if (selectedCourse) {
            fetchGolfOutings(selectedCourse._id);
        }
    }, [selectedCourse, fetchGolfOutings]); 

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const courseId = queryParams.get('id');
        const fetchCourseById = async () => {  
            try {
                const response = await axios.get(`/api/golf-courses/${courseId}`);
                setSelectedCourse(response.data);
            } catch(error) {
                console.error('Error fetching outing data:', error);
            }
        }
        fetchCourseById();
    }, [])

    const handleSelectedCourseChange = (e) => {
        const selectedCourseId = e.target.value;
        const selected = golfCourses.find(course => course._id === selectedCourseId);
        setSelectedCourse(selected || null);
    };

    const handleSortChange = (selectedSortBy) => {
        setSortBy(selectedSortBy);
    };

    const handleFilterChange = (selectedFilterBy) => {
        setFilterBy(selectedFilterBy);
    };

    const outingAddedOrDeletedListener = () => {
        fetchGolfOutings(selectedCourse._id);
    }

    return (
        <div className='view-course-info-container'>
            <div className='view-course-info-wrapper'>
                <label>Golf Course: </label>
                <select 
                    className="golf-course-select" 
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
                {!selectedCourse && (
                    <AddNewCourseLink />
                )}
                {selectedCourse && (
                    <>
                        <EditGolfCourseLink selectedCourse={selectedCourse} />
                        <MapIconAndLink location={selectedCourse.location} />
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
                                        <td className='outing-info-cell'>
                                            <div className='edit-delete-outing-icons-wrapper'>
                                                <img 
                                                    src='/images/pencil.svg'
                                                    className='edit-outing-icon'
                                                    alt='edit-outing'
                                                    onClick={() => window.location.href = `/edit-golf-outing?id=${outing.id}`}
                                                />
                                                <DeleteGolfOuting
                                                    outingId={outing.id}
                                                    outingUser={outing.user}
                                                    outingDate={outing.date}
                                                    outingAddedOrDeletedListener={outingAddedOrDeletedListener}
                                                />                                         
                                                <span className='outing-date-and-user'>{outing.date} {outing.user}</span>
                                            </div>
                                        </td>
                                        {outing.scores.map((score, scoreIndex) => (
                                            <td key={scoreIndex}>{score}</td>
                                        ))}
                                    </tr>
                                ))}
                                <AddGolfOuting 
                                    selectedCourse={selectedCourse} 
                                    outingAddedOrDeletedListener={outingAddedOrDeletedListener} 
                                    addingOuting={addingOuting} 
                                    setAddingOuting={setAddingOuting}
                                />
                            </tbody>
                        </table>
                    </div>
                )}
            </div>   
            
            { selectedCourse && 
                <SortAndFilterOutings 
                    onSortChange={handleSortChange} 
                    onFilterChange={handleFilterChange} 
                    userEmail={userEmail}
                /> 
            }

            { selectedCourse && 
                <CourseReview course={selectedCourse} />
            }

        </div>
    );
};

export default ViewScoreCard;
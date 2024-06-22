import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Sidebar = () => {
    const [golfOutings, setGolfOutings] = useState([]);
    const [courseDetails, setCourseDetails] = useState({});
    const [birdies, setBirdies] = useState(new Set());
    const [pars, setPars] = useState(new Set());
    const [bogeys, setBogeys] = useState(new Set());

    useEffect(() => {
        const fetchGolfOutings = async () => {
            try {
                const response = await axios.get('/api/golf-outings');
                setGolfOutings(response.data);
            } catch (error) {
                console.error('Error fetching golf outings:', error);
            }
        };

        fetchGolfOutings();
    }, []);

    useEffect(() => {
        const fetchCourseDetails = async (courseIds) => {
            try {
                const response = await axios.get(`/api/golf-courses?ids=${courseIds.join(',')}`);
                const courseDetailsMap = {};
                response.data.forEach(course => {
                    courseDetailsMap[course._id] = course;
                });
                setCourseDetails(courseDetailsMap);
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        if (golfOutings.length > 0) {
            const courseIds = golfOutings.map(outing => outing.course);
            fetchCourseDetails(courseIds);
        }
    }, [golfOutings]);

    useEffect(() => {

        const generateBirdieKey = (holeNumber, courseName, player) => {
            return `${holeNumber}-${courseName}-${player}`;
        };

        const generateParKey = (holeNumber, courseName, player) => {
            return `${holeNumber}-${courseName}-${player}`;
        };

        const generateBogeyKey = (holeNumber, courseName, player) => {
            return `${holeNumber}-${courseName}-${player}`;
        };

        const trackedBirdies = {};
        const trackedPars = {}
        const trackedBogeys = {};

        golfOutings.forEach(outing => {
            outing.scores.forEach((score, index) => {

                const course = courseDetails[outing.course];
                
                if (score === (course?.pars[index]-1)) {
                    const birdieKey = generateBirdieKey(index + 1, course?.name, outing.user);

                    if (!trackedBirdies[birdieKey]) {
                        trackedBirdies[birdieKey] = {
                            holeNumber: index + 1,
                            courseName: course?.name,
                            player: outing.user
                        };
                    }

                } else if (score === course?.pars[index]) { 
                    const parKey = generateParKey(index + 1, course?.name, outing.user);

                    if (!trackedPars[parKey]) {
                        trackedPars[parKey] = {
                            holeNumber: index + 1,
                            courseName: course?.name,
                            player: outing.user
                        }
                    }

                } else if (score === (course?.pars[index] + 1)) {
                    const bogeyKey = generateBogeyKey(index + 1, course?.name, outing.user);

                    if (!trackedBogeys[bogeyKey]) {
                        trackedBogeys[bogeyKey] = {
                            holeNumber: index + 1,
                            courseName: course?.name,
                            player: outing.user
                        }
                    }
                }
            });
        });

        setBirdies(new Set(Object.values(trackedBirdies)));
        setPars(new Set(Object.values(trackedPars)));
        setBogeys(new Set(Object.values(trackedBogeys)));
    }, [courseDetails, golfOutings]);

    console.log(birdies);

    return (
        <div>
            <h1>Sidebar!</h1>
            <div>
                {[...birdies].map((birdie, index) => (
                    <ul>
                        <li key={index}>
                            {birdie.player} scored a birdie at {birdie.courseName} on Hole #{birdie.holeNumber}!
                        </li> 
                    </ul>
                ))}
                {[...pars].map((par, index) => (
                    <ul>
                        <li key={index}>
                            {par.player} hit for par at {par.courseName} on Hole #{par.holeNumber}!
                        </li> 
                    </ul>
                ))}
                {[...bogeys].map((bogey, index) => (
                    <ul>
                        <li key={index}>
                            {bogey.player} scored a bogey at {bogey.courseName} on Hole #{bogey.holeNumber}!
                        </li> 
                    </ul>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;

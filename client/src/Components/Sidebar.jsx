import React, { useEffect, useState } from 'react';
import { fetchAllGolfOutings } from '../fetchFunctions/fetchAllGolfOutings';
import { fetchCourseDetailsFromIds } from '../fetchFunctions/fetchCourseDetailsFromIds';

const Sidebar = () => {
    const [golfOutings, setGolfOutings] = useState([]);
    const [courseDetails, setCourseDetails] = useState({});
    const [birdies, setBirdies] = useState(new Set());
    const [pars, setPars] = useState(new Set());
    const [bogeys, setBogeys] = useState(new Set());

    useEffect(() => {
        fetchAllGolfOutings().then(setGolfOutings);
    }, []);

    useEffect(() => {
        if (golfOutings.length > 0) {
            const courseIds = golfOutings.map(outing => outing.course);
            fetchCourseDetailsFromIds(courseIds).then(setCourseDetails);
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

    return (
        <div className='sidebar-wrapper'>
            <h1>Highlights from the Course</h1>
            <div>
                <div className='sidebar-birdies-header-wrapper'>
                    <h2 className='sidebar-birdies-header'>Birdies</h2>
                </div>
                {[...birdies].map((birdie, index) => (
                    <ul>
                        <li key={index}>
                            {birdie.player} - Hole {birdie.holeNumber} at {birdie.courseName}!
                        </li> 
                    </ul>
                ))}
                <h2>Pars</h2>
                {[...pars].map((par, index) => (
                    <ul>
                        <li key={index}>
                            {par.player} - Hole {par.holeNumber} at {par.courseName}!
                        </li> 
                    </ul>
                ))}
                <div className='sidebar-bogeys-header-wrapper'>
                    <h2 className='sidebar-bogeys-header'>Bogeys</h2>
                </div>
                {[...bogeys].map((bogey, index) => (
                    <ul>
                        <li key={index}>
                            {bogey.player} - Hole {bogey.holeNumber} at {bogey.courseName}!
                        </li> 
                    </ul>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;

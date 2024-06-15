import React from 'react';
import ViewScoreCard from './ViewCourseInfo';

const Home = () => {
    return (
        <div>
            <div style={{width: '75%', backgroundColor: 'white', padding: '20px'}}>
                <div className='golf-outing-link-wrapper'>
                    <img
                        alt="clipboard"
                        src="/images/clipboard.svg"
                        width='60px'
                        height='auto'
                    />
                    <a
                        href="/log-golf-outing"
                    >Log Golf Outing</a>
                </div>
                <ViewScoreCard />
            </div>
        </div>
    );
};

export default Home;

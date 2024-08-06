import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseReview = ({ course }) => {
    const [allReviews, setAllReviews] = useState([]);
    const [activeTab, setActiveTab] = useState('courseReviews');
    const [reviewData, setReviewData] = useState({
        _id: '',
        user: 'Nickhoefle',
        course: course._id,
        overallExperienceRating: 0,
        valueRating: 0,
        grassRating: 0,
        greensRating: 0,
        difficultyMatchesSkillRating: 0,
        congestionRating: 0
    });

    useEffect(() => {
        const fetchReviewData = async () => {
            try {
                const userEmail = 'Nickhoefle';
                const response = await axios.get(`/api/course-reviews?course=${course._id}&user=${userEmail}`);

                if (response.data.length > 0) {
                    const existingReview = response.data[0];
                    setReviewData(existingReview);
                } else {
                    // If no review exists for the current course, reset reviewData
                    setReviewData({
                        _id: '',
                        user: userEmail,
                        course: course._id,
                        overallExperienceRating: 0,
                        valueRating: 0,
                        grassRating: 0,
                        greensRating: 0,
                        difficultyMatchesSkillRating: 0,
                        congestionRating: 0
                    });
                }
            } catch (error) {
                console.error('Error fetching review data:', error);
            }
        };

        fetchReviewData();
    }, [course._id]); // Trigger fetchReviewData whenever course._id changes

    useEffect(() => {
        const fetchAllReviews = async () => {
            try {
                const response = await axios.get(`/api/course-reviews?course=${course._id}`);
                setAllReviews(response.data);
            } catch (error) {
                console.error('Error fetching all reviews:', error);
            }
        };

        if (activeTab === 'courseReviews') {
            fetchAllReviews();
        }
    }, [course._id, activeTab]); // Trigger fetchAllReviews whenever course._id or activeTab changes

    const handleRatingChange = (newRating, ratingCategory) => {
        const updatedReviewData = { ...reviewData, [ratingCategory]: newRating };
        setReviewData(updatedReviewData);
        updateReviewInDatabase(updatedReviewData);
    };

    const updateReviewInDatabase = async (updatedReviewData) => {
        try {
            if (updatedReviewData._id) {
                await axios.put(`/api/course-reviews/${updatedReviewData._id}`, updatedReviewData);
                console.log('Review updated successfully');
            } else {
                const response = await axios.post('/api/course-reviews', updatedReviewData);
                console.log('Review submitted successfully:', response.data);
                setReviewData({ ...response.data, _id: response.data._id });
            }
        } catch (error) {
            console.error('Error updating or submitting review:', error);
        }
    };

    const renderRatingInputs = (ratingCategory, label) => {
        const ratings = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        return (
            <div key={ratingCategory}>
                <label className='my-review-category-label'>{label}</label>
                <div className='my-review-radio-buttons'>
                    {ratings.map(rating => (
                        <div key={`${ratingCategory}-${rating}`}>
                            <input
                                type="radio"
                                className='user-review-radio'
                                id={`${ratingCategory}-${rating}`}
                                name={ratingCategory}
                                value={rating}
                                checked={reviewData[ratingCategory] === parseInt(rating)}
                                onChange={() => handleRatingChange(parseInt(rating), ratingCategory)}
                            />
                            <label htmlFor={`${ratingCategory}-${rating}`}>{rating}</label>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="review-tabs-wrapper">
                <span 
                    onClick={() => setActiveTab('courseReviews')} 
                    className={activeTab === 'courseReviews' ? 'active' : ''}
                >
                    Course Reviews
                </span>
                <span 
                    onClick={() => setActiveTab('myReview')} 
                    className={activeTab === 'myReview' ? 'active' : ''}
                >
                    My Review
                </span>
            </div>

            {activeTab === 'myReview' && (
                <div>
                    {renderRatingInputs('overallExperienceRating', 'Overall Experience')}
                    {renderRatingInputs('valueRating', 'Value')}
                    {renderRatingInputs('grassRating', 'Grass Rating')}
                    {renderRatingInputs('greensRating', 'Greens Rating')}
                    {renderRatingInputs('difficultyMatchesSkillRating', 'Difficulty for Skill')}
                    {renderRatingInputs('congestionRating', 'Congestion')}
                </div>
            )}

            {activeTab === 'courseReviews' && (
                <div className='review-wrapper'>
                    {allReviews.length > 0 ? (
                        allReviews.map((review) => (
                            <div 
                                key={review._id}
                                className='review-individual'
                            >
                                <h3>{review.user}:</h3>
                                <div className='review-category-line'>
                                    <img 
                                        src='/images/smiley.svg'
                                        alt='smiley'
                                        className='review-svg'
                                    />
                                    <b>Overall Experience:</b>
                                    <p>{review.overallExperienceRating}/10</p>
                                </div>
                                <div className='review-category-line'>
                                    <img 
                                        src='/images/dollar.svg'
                                        alt='dollar'
                                        className='review-svg'
                                    />
                                    <b>Value:</b>
                                    <p>{review.valueRating}/10</p>
                                </div>
                                <div className='review-category-line'>
                                    <img 
                                        src='/images/grass.svg'
                                        alt='grass'
                                        className='review-svg'
                                    />
                                    <b>Grass: </b>
                                    <p>{review.grassRating}/10</p>
                                </div>
                                <div className='review-category-line'>
                                    <img 
                                        src='/images/greens.svg'
                                        alt='putting-green'
                                        className='review-svg'
                                    />
                                    <b>Greens: </b>
                                    <p>{review.greensRating}/10</p>
                                </div>
                                <div className='review-category-line'>
                                    <img 
                                        src='/images/difficulty.svg'
                                        alt='golfer'
                                        className='review-svg'
                                    />
                                    <b>Difficulty for Skill:</b>
                                    <p>{review.difficultyMatchesSkillRating}/10</p>
                                </div>
                                <div className='review-category-line'>
                                    <img 
                                        src='/images/congestion.svg'
                                        alt='stopwatch'
                                        className='review-svg'
                                    />
                                    <b>Congestion:</b>
                                    <p>{review.congestionRating}/10</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CourseReview;

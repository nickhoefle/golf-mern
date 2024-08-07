import axios from 'axios';

export const fetchAllReviews = async (courseId) => {
    try {
        const response = await axios.get(`/api/course-reviews?course=${courseId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all reviews:', error);
    }
};
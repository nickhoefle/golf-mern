import axios from 'axios';

export const fetchAllGolfCourses = async () => {
    try {
        const response = await axios.get('/api/golf-courses');
        return response.data;
    } catch (error) {
        console.error('Error fetching golf courses:', error);
        return [];
    }
};
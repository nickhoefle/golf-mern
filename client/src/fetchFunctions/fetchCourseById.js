import axios from 'axios';

export const fetchCourseById = async (courseId) => {
    if (!courseId) return null;

    try {
        const response = await axios.get(`/api/golf-courses/${courseId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching outing data:', error);
        return null;
    }
};

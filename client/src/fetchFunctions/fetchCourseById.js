import axios from 'axios';

export const fetchCourseById = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const courseId = queryParams.get('id');
    if (!courseId) return null;

    try {
        const response = await axios.get(`/api/golf-courses/${courseId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching outing data:', error);
        return null;
    }
};
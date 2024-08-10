import axios from 'axios';

export const fetchCourseDetailsFromIds = async (courseIds) => {
    try {
        const response = await axios.get(`/api/golf-courses?ids=${courseIds.join(',')}`);
        const courseDetailsMap = {};
        response.data.forEach(course => {
            courseDetailsMap[course._id] = course;
        });
        return courseDetailsMap;
    } catch (error) {
        console.error('Error fetching course details:', error);
        return {};
    }
};
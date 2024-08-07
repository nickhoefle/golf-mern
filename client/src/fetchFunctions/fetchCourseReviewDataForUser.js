import axios from 'axios';

export const fetchCourseReviewDataForUser = async (courseId, user) => {
    try {
        const response = await axios.get(`/api/course-reviews?course=${courseId}&user=${user}`);
        if (response.data.length > 0) {
            return response.data[0];
        } else {
            return {
                _id: '',
                user: user,
                course: courseId,
                overallExperienceRating: 0,
                valueRating: 0,
                grassRating: 0,
                greensRating: 0,
                difficultyMatchesSkillRating: 0,
                congestionRating: 0
            };
        }
    } catch (error) {
        console.error('Error fetching review data:', error);
        throw error;
    }
};

import axios from 'axios';

export const fetchGolfOutingById = async (outingId) => {
    try {
        const response = await axios.get(`/api/golf-outings/${outingId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching outing data:', error);
        return null;
    }
};
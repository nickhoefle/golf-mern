import axios from 'axios';

export const fetchAllGolfOutings = async () => {
    try {
        const response = await axios.get('/api/golf-outings');
        return response.data;
    } catch (error) {
        console.error('Error fetching golf outings:', error);
        return [];
    }
};
import axios from 'axios';

const API_URL = "https://ipapi.co/json/"

interface BaseResponse {
    city: string;
}

export class IPService {
    static async getClientLocation(): Promise<{ city: string }> {
        try {
            // const response = await axios.get<BaseResponse>(API_URL);
            // const { city } = response.data;
            return { city: 'Zaporizhia' };
        } catch (error) {
            console.error('Error fetching client IP/location:', error);
            throw new Error('Failed to retrieve client location');
        }
    }
}
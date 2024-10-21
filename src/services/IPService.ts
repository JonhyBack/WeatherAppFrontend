import axios from 'axios';

const API_URL = "https://ipapi.co/json/"

interface BaseResponse {
    city: string;
    country: string;
}

export class IPService {
    static async getClientLocation(): Promise<BaseResponse> {
        try {
            const response = await axios.get<BaseResponse>(API_URL);
            return response.data;
        } catch (error) {
            return {
                city: "Zaporizhzhya",
                country: "UA"
            }; //handling api limits
        }
    }
}
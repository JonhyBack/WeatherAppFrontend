import axios from "axios";
import AuthService from "./AuthService";

const API_URL = "http://localhost:3000/favorites"

interface CreateFavoriteData {
    city: string;
    country: string;
}

interface GetResponse {
    id: number;
    city: string;
    country: string;
}

export interface FavoriteData extends GetResponse { }

class FavoriteService {
    static async create(favoriteData: CreateFavoriteData): Promise<boolean> {
        try {
            const response = await axios.post(`${API_URL}/add`, favoriteData, {
                headers: {
                    Authorization: `Bearer ${AuthService.getAccessToken()}`,
                }
            });
            return response.status === 200;
        } catch (error: any) {
            console.error('Error during favorite creation:', error);
            throw new Error(error.response?.data?.message || 'Unknown error occurred');
        }
    }

    static async remove(id: number): Promise<boolean> {
        try {
            const response = await axios.delete(`${API_URL}/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${AuthService.getAccessToken()}`,
                }
            });
            return response.status === 200;
        } catch (error: any) {
            console.error('Error during favorite removal:', error);
            throw new Error(error.response?.data?.message || 'Unknown error occurred');
        }
    }

    static async getAll(): Promise<FavoriteData[]> {
        try {
            const response = await axios.get<GetResponse[]>(API_URL, {
                headers: {
                    Authorization: `Bearer ${AuthService.getAccessToken()}`,
                }
            });
            return response.data;
        } catch (error: any) {
            console.error('Error during favorite retrieval:', error);
            throw new Error(error.response?.data?.message || 'Unknown error occurred');
        }
    }
}



export default FavoriteService
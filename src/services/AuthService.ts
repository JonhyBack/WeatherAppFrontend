import axios from "axios";

const API_URL = "http://localhost:3000/auth"

export interface AuthData {
    username: string;
    password: string;
}

interface BaseResponse {
    access_token: string;
}

class AuthService {
    private setAccessToken(token: string) {
        localStorage.setItem('access_token', token);
    }

    private removeAccessToken() {
        localStorage.removeItem('access_token');
    }

    async login(loginData: AuthData) {
        try {
            const response = await axios.post<BaseResponse>(`${API_URL}/login`, loginData);

            this.setAccessToken(response.data.access_token);

            return response.data.access_token;
        } catch (error: any) {
            console.error('Error during login:', error);
            throw new Error(error.response.data.message);
        }
    }

    async signup(signupData: AuthData) {
        try {
            const response = await axios.post<BaseResponse>(`${API_URL}/signup`, signupData);

            this.setAccessToken(response.data.access_token);

            return response.data.access_token;
        } catch (error: any) {
            console.error('Error during signup:', error);
            throw new Error(error.response.data.message);
        }
    }

    logout() {
        this.removeAccessToken()
    }
}

export default AuthService
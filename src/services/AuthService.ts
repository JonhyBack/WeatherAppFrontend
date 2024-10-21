import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:3000/auth"

export interface AuthData {
    username: string;
    password: string;
}

interface BaseResponse {
    access_token: string;
    username: string;
}

class AuthService {
    private static setAccessToken(token: string) {
        localStorage.setItem('access_token', token);
    }

    private static setUsername(username: string) {
        localStorage.setItem('username', username);
    }

    private static removeAccessToken() {
        localStorage.removeItem('access_token');
    }

    private static removeUsername() {
        localStorage.removeItem('username');
    }

    static getAccessToken() {
        return localStorage.getItem('access_token');
    }

    static getUsername() {
        return localStorage.getItem('username');
    }

    static isTokenExpired(token: string): boolean {
        try {
            const decoded = jwtDecode(token);
            const now = Math.floor(Date.now() / 1000);
            const expired = decoded && decoded.exp !== undefined && decoded.exp < now;

            console.log(expired, decoded);
            return expired;
        } catch (error) {
            return true;
        }
    }

    static async login(loginData: AuthData) {
        try {
            const response = await axios.post<BaseResponse>(`${API_URL}/login`, loginData);

            const { access_token, username } = response.data;
            this.setAccessToken(access_token);
            this.setUsername(username);

            return {
                token: access_token,
                username
            };
        } catch (error: any) {
            console.error('Error during login:', error);
            throw new Error(error.response.data.message);
        }
    }

    static async signup(signupData: AuthData) {
        try {
            const response = await axios.post<BaseResponse>(`${API_URL}/signup`, signupData);

            return response.status === 200;
        } catch (error: any) {
            console.error('Error during signup:', error);
            throw new Error(error.response.data.message);
        }
    }

    static logout() {
        this.removeAccessToken();
        this.removeUsername();
    }
}

export default AuthService
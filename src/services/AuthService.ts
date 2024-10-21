import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

const API_URL = "http://localhost:3000/auth"

export interface AuthData {
    username: string;
    password: string;
}

interface BaseResponse {
    access_token: string;
    username: string;
}

interface Payload extends JwtPayload {
    username?: string;
}

class AuthService {
    private static setAccessToken(token: string) {
        localStorage.setItem('access_token', token);
    }

    private static removeAccessToken() {
        localStorage.removeItem('access_token');
    }

    static getAccessToken() {
        return localStorage.getItem('access_token');
    }

    static getUsername(token: string) {
        try {
            const decoded = jwtDecode<Payload>(token);

            return decoded.username;
        } catch (error) {
            return null;
        }
    }

    static isTokenExpired(token: string): boolean {
        try {
            const decoded = jwtDecode<Payload>(token);
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

            const { access_token } = response.data;
            const username = this.getUsername(access_token);
            this.setAccessToken(access_token);

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
    }
}

export default AuthService
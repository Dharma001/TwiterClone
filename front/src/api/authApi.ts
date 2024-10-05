import axios from 'axios';
import { API_URL } from '../config';

interface LoginResponse {
    message: string;
    status: string;
    token: string;
    statusCode: number;
    user: {
        id: number;
        email: string;
    };
}

interface RegisterResponse {
    message: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, { email, password });
    return response.data;
};

export const registerUser = async (name: string, email: string, password: string): Promise<RegisterResponse> => {
    const response = await axios.post<RegisterResponse>(`${API_URL}/auth/register`, { name, email, password });
    return response.data;
};
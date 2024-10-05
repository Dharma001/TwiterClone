import axios from 'axios';
import { API_URL } from '../config';

interface LoginResponse {
    token: string;
    user: {
        id: number;
        email: string;
        // Add other user properties as needed
    };
}

interface RegisterResponse {
    message: string;
}

// Function to login
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, { email, password });
    return response.data;
};

// Function to register
export const registerUser = async (name: string, email: string, password: string): Promise<RegisterResponse> => {
    const response = await axios.post<RegisterResponse>(`${API_URL}/auth/register`, { name, email, password });
    return response.data;
};

// Export other API functions as needed

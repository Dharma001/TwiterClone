import axios from 'axios';
import { API_URL } from '../config';
import {LoginResponse , RegisterResponse , OtpResponse} from '../interfaces/api/authResponse'

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, { email, password });
    return response.data;
};

export const registerUser = async (name: string, email: string): Promise<RegisterResponse> => {
    const response = await axios.post<RegisterResponse>(`${API_URL}/auth/register`, { name, email });
    return response.data;
};

export const verifyOtp = async (otp: string, email: string): Promise<OtpResponse> => {
    const response = await axios.post<OtpResponse>(`${API_URL}/auth/verify-otp`, { otp, email });
    return response.data;
};

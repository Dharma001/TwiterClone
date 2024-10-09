import { useState } from 'react';
import { loginUser, registerUser, verifyOtp , createPassword } from '../api/authApi';
import { LoginResponse, RegisterResponse, OtpResponse, PasswordResponse } from '../interfaces/api/authResponse';
import { toast } from 'react-toastify';

export interface ServerError {
    [key: string]: string[];
}

export const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ServerError | null>(null);

    const handleResponse = <T extends { message: string }>(response: T) => {
        toast.success(response.message);
        return response;
    };

    const handleError = (err: any) => {
        const errorMessage: ServerError = err?.response?.data?.errors || { general: ['An error occurred. Please try again.'] };
        setError(errorMessage);
        toast.error(errorMessage.general[0]);
        return errorMessage;
    };

    const login = async (email: string, password: string): Promise<LoginResponse | void> => {
        setLoading(true);
        setError(null);
        try {
            const data: LoginResponse = await loginUser(email, password);
            return handleResponse(data);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const authRegister = async (name: string, email: string , dob: Date): Promise<RegisterResponse | void> => {
        setLoading(true);
        setError(null);
        try {
            const data: RegisterResponse = await registerUser(name, email , dob);
            return handleResponse(data);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const verifyOtpCode = async (otp: string, email: string): Promise<OtpResponse | void> => {
        setLoading(true);
        setError(null);
        try {
            const data: OtpResponse = await verifyOtp(otp, email);
            return handleResponse(data);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const passwordCreate = async ( email: string, password: string ): Promise<PasswordResponse | void> => {
        setLoading(true);
        setError(null);
        try {
            const data: PasswordResponse = await createPassword(email , password);
            return handleResponse(data);
        }catch(err) {
            handleError(err);
        }finally {
            setLoading(false);
        }
    }

    return { login, authRegister, verifyOtpCode, passwordCreate, loading, error };
};

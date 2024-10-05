import { useState } from 'react';
import { loginUser, registerUser } from '../api/authApi';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await loginUser(email, password);
            console.log(data)
            toast("Wow so easy !");
            return data; 
        } catch {
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const register = async (name: string, email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await registerUser(name, email, password);
            return data; 
        } catch {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return { login, register, loading, error };
};

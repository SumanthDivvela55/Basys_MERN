import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const API_URL = 'https://basys-ai-mern.onrender.com/api/auth';

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    return token ? jwtDecode(token) : null;
};
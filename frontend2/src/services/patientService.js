import axios from 'axios';

const API_URL = 'http://localhost:5000/api/patients';

export const getPatients = (page = 1, limit = 10) => {
    return axios.get(`${API_URL}?page=${page}&limit=${limit}`);
};
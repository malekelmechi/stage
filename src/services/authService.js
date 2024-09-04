// src/services/authService.js

import axios from 'axios';

const API_URL = 'http://localhost:8082/api/users';

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}signin`, { username, password });
        return response.data;
    } catch (error) {
        throw new Error('Invalid credentials');
    }
};

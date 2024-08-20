// src/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:8213/api/v1/', // Cấu hình base URL
});

export default instance;

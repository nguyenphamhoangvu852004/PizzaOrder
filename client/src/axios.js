// src/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL || 'https://pizzaorder-2rtb.onrender.com/api/v1', // Cấu hình base URL
});

export default instance;

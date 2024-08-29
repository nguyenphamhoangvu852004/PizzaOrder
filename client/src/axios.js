// src/axios.js
import axios from 'axios';


const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL, // Cấu hình base URL
});

export default instance;

import axios from "axios";
import { API_CONFIG } from "@/constants/api";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    }
    return config;
  },
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('API Request Error:', error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    // Always log errors, but with better formatting
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (error.code === 'ECONNREFUSED') {
      if (isDevelopment) {
        console.error('Connection refused - is the backend server running?');
      }
    } else if (error.code === 'ERR_NETWORK') {
      if (isDevelopment) {
        console.error('Network error - check your internet connection and CORS settings');
      }
    } else {
      if (isDevelopment) {
        console.error('API Error:', error.message);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api', // Hardcoded for now to fix connection issues
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3
};

// Environment check
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    REGISTER: '/auth/register'
  },
  DASHBOARD: {
    ADMIN: '/dashboard/admin',
    HOD: '/dashboard/hod',
    TEACHER: '/dashboard/teacher',
    STUDENT: '/dashboard/student'
  },
  ADMIN: {
    USERS: '/admin/users',
    DEPARTMENTS: '/admin/departments'
  }
};

// Default error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.'
};

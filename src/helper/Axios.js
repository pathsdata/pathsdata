import axios from 'axios';
import { toast } from 'react-toastify';

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const ENV = import.meta.env.VITE_ENV || 'development';

// Create axios instance with default configuration
const Axios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add JWT token to all requests
Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log requests in development mode
    if (ENV === 'development') {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        data: config.data,
        params: config.params,
      });
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Public authentication endpoints that should NOT redirect on 401
// These endpoints return 401 for invalid credentials, which is expected behavior
const PUBLIC_AUTH_ENDPOINTS = [
  '/api/v1/auth/signin',
  '/api/v1/auth/verify-otp',
  '/api/v1/auth/resend-otp',
];

/**
 * Check if the URL is a public authentication endpoint
 * @param {string} url - Request URL
 * @returns {boolean}
 */
const isPublicAuthEndpoint = (url) => {
  return PUBLIC_AUTH_ENDPOINTS.some(endpoint => url?.includes(endpoint));
};

// Response interceptor - Handle errors and session timeout
Axios.interceptors.response.use(
  (response) => {
    // Log responses in development mode
    if (ENV === 'development') {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    // Handle session timeout (440 status code)
    if (response.data?.statusCode === 440) {
      handleSessionExpired();
      return Promise.reject(new Error('Session expired'));
    }

    return response;
  },
  (error) => {
    // Log errors in development mode
    if (ENV === 'development') {
      console.error('❌ API Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url,
      });
    }

    // Handle different error scenarios
    if (error.response) {
      const { status, data } = error.response;
      const requestUrl = error.config?.url;

      // Session expired (440 or 401 Unauthorized)
      // BUT: Don't redirect if it's a public auth endpoint (signin/verify-otp)
      // because 401 on those endpoints means "invalid credentials", not "session expired"
      if (status === 440 || status === 401) {
        if (!isPublicAuthEndpoint(requestUrl)) {
          // Only redirect to sign-in for authenticated endpoints
          handleSessionExpired();
          return Promise.reject(error);
        }
        // For public auth endpoints, fall through to show the error message
      }

      // Server error (5xx)
      if (status >= 500) {
        toast.error(data?.message || 'Server error occurred. Please try again later.');
        return Promise.reject(error);
      }

      // Client error (4xx)
      if (status >= 400 && status < 500) {
        const errorMessage = data?.message || data?.detail || 'Request failed';
        toast.error(errorMessage);
        return Promise.reject(error);
      }
    } else if (error.request) {
      // Network error - no response received
      toast.error('Network Error: Unable to reach server. Please check your connection.');
      return Promise.reject(error);
    } else {
      // Other errors
      toast.error(error.message || 'An unexpected error occurred');
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

/**
 * Handle session expiration
 * Clears all authentication data and redirects to sign-in
 */
const handleSessionExpired = () => {
  // Clear all authentication data
  localStorage.removeItem('jwt_token');
  localStorage.removeItem('pd-authed');
  localStorage.removeItem('email');
  localStorage.removeItem('family_id');
  localStorage.removeItem('user_org_id');
  localStorage.setItem('openCloudOption', false);
  localStorage.setItem('openUser', false);

  // Show notification
  toast.error('Your session has expired. Please sign in again.');

  // Redirect to sign-in page
  setTimeout(() => {
    window.location.href = '/sign-in';
  }, 1000);
};

/**
 * Get authorization headers with JWT token
 * @returns {Object} Headers object with Authorization
 */
export const authorizationHeaders = () => {
  const token = localStorage.getItem('jwt_token');

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  };
};

/**
 * Get current API base URL
 * @returns {string} API base URL
 */
export const getApiBaseUrl = () => API_BASE_URL;

/**
 * Check if running in development mode
 * @returns {boolean}
 */
export const isDevelopment = () => ENV === 'development';

export { Axios };
export default Axios;

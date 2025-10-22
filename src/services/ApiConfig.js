import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Xử lý validation errors (400)
      if (status === 400 && data.errors) {
        // Lấy tất cả error messages
        const errorMessages = [];
        
        Object.keys(data.errors).forEach((key) => {
          const messages = data.errors[key];
          if (Array.isArray(messages)) {
            errorMessages.push(...messages);
          } else {
            errorMessages.push(messages);
          }
        });

        // Throw error với message đã format
        const errorMessage = errorMessages.join('. ');
        throw new Error(errorMessage);
      }
      
      // Xử lý các lỗi khác
      const errorMessage = 
        data.title || 
        data.message || 
        data.detail ||
        `Lỗi ${status}: Có lỗi xảy ra`;
      
      throw new Error(errorMessage);
    } 
    
    if (error.request) {
      // Request được gửi nhưng không nhận được response
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
    }
    
    // Lỗi khi setup request
    throw new Error(error.message || 'Có lỗi xảy ra');
  }
);

privateApi.interceptors.request.use(
  (config) => {
    try {
      const rawUser = sessionStorage.getItem("user");
      if (rawUser) {
        const user = JSON.parse(rawUser);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const apiConfig = { publicApi, privateApi };

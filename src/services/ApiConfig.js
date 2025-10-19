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

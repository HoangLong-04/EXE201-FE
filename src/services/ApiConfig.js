import axios from "axios";

const BASE_URL = "https://68c40e9f81ff90c8e61b1479.mockapi.io/EXE201";

const publictApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiConfig = { publictApi, privateApi };

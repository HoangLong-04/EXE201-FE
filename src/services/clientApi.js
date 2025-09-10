import axios from "axios";

const clientApi = axios.create({
  baseURL: "http://localhost:8000/test",
  headers: { "Content-Type": "application/json" },
});

clientApi.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const token = JSON.parse(storedUser).token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default clientApi;

import axios from "axios";

const BASE_API_URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_APP_API_URL_PROD
    : import.meta.env.VITE_API_URL_DEV;

export const fetcher = axios.create({
  baseURL: `${BASE_API_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

fetcher.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

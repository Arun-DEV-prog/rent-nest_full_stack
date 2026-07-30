import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_API_URL,
  // Increase timeout to 30s to allow slower backend responses
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if using cookies/JWT
});

export default axiosInstance;
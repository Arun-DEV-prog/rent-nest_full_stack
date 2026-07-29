import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if using cookies/JWT
});

export default axiosInstance;
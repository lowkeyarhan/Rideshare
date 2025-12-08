import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("rideshareToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token being sent:", token.substring(0, 20) + "...");
    } else {
      console.warn("No token found in localStorage");
    }
  }
  return config;
});

export default apiClient;

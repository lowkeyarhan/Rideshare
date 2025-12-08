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
  console.log("API Request:", config.method?.toUpperCase(), config.url);
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("API Error:", {
        url: error.config?.url,
        status: error.response.status,
        data: error.response.data,
      });

      // Handle 401/403 - token expired or invalid
      if (error.response.status === 401 || error.response.status === 403) {
        console.warn("Authentication failed - clearing session");
        if (typeof window !== "undefined") {
          localStorage.removeItem("rideshareToken");
          localStorage.removeItem("rideshareUser");
          window.location.href = "/auth";
        }
      }
    } else if (error.request) {
      console.error("Network Error - No response received:", error.message);
    } else {
      console.error("Request Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;

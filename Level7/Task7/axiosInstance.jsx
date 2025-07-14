import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Global loading state (could be managed in context or Redux)
let requestCount = 0;
const updateLoadingState = (isLoading) => {
  const loadingIndicator = document.getElementById("loading-indicator");
  if (loadingIndicator) {
    loadingIndicator.style.display = isLoading ? "block" : "none";
  }
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    requestCount++;
    updateLoadingState(true);
    config.headers["Authorization"] = "Bearer my-secret-token"; // Add Authorization header
    return config;
  },
  (error) => {
    updateLoadingState(false);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    requestCount--;
    if (requestCount === 0) updateLoadingState(false);
    console.log("Response:", response.data);
    return response;
  },
  (error) => {
    requestCount--;
    if (requestCount === 0) updateLoadingState(false);
    if (error.response) {
      // Handle common errors
      if (error.response.status === 401) {
        alert("Unauthorized! Please log in.");
      } else if (error.response.status === 404) {
        alert("Resource not found!");
      } else if (error.response.status === 500) {
        alert("Server error! Try again later.");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

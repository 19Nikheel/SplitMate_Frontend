import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosAuth = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// // Response interceptor for automatic refresh
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Call your refresh endpoint
//         const refreshResponse = await axiosInstance.post("/refresh");
//         const newToken = refreshResponse.data.accessToken;

//         // Save new token
//         localStorage.setItem("accessToken", newToken);

//         // Update Authorization header and retry original request
//         originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

//         return axiosInstance(originalRequest);

//       } catch (refreshError) {
//         console.error("Refresh token failed", refreshError);
//         // Optionally redirect to login
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;

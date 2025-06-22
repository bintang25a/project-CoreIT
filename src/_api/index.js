import axios from "axios";

const API = axios.create({
   // baseURL: "http://127.0.0.1:8000/api",
   // baseURL: "http://192.168.1.4:8000/api",
   // baseURL: "https://project-coreit-production.up.railway.app/api",
   // baseURL: "https://coreit.karyakreasi.id/api",
   baseURL: "https://possible-muskrat-quietly.ngrok-free.app/api",
});

API.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem("token");
      if (token) {
         config.headers["Authorization"] = `Bearer ${token}`;
      }
      config.headers["ngrok-skip-browser-warning"] = "true";
      return config;
   },
   (error) => Promise.reject(error)
);

API.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response?.status === 401) {
         localStorage.removeItem("token");
         localStorage.removeItem("user");
         localStorage.removeItem("loginTime");
         window.location.href = "/login";
      }
      return Promise.reject(error);
   }
);

export default API;

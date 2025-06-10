import axios from "axios";

const API = axios.create({
   // baseURL: "http://127.0.0.1:8000/api",
   //  baseURL: "https://akmal-bc.karyakreasi.id/api",
   // baseURL: "http://192.168.1.4:8000/api",
   baseURL: "https://project-coreit-production.up.railway.app/api",
});

API.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem("token");
      if (token) {
         config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
   },
   (error) => Promise.reject(error)
);

API.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response?.status === 401) {
         // Token expired or unauthorized
         localStorage.removeItem("token");
         localStorage.removeItem("user");
         localStorage.removeItem("loginTime");
         window.location.href = "/login";
      }
      return Promise.reject(error);
   }
);

export default API;

import axios from "axios";
import { baseURL } from "../../constants";

export const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || baseURL,
});

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access_token");

//     if (token) {
//       config.headers["authorization"] = `Barier ${token}`;
//     }

//     return config;
//   },

//   (error) => {
//     return Promise.reject(error);
//   }
// );

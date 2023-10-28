import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    post: {
      Accept: "aplication/json",
    },
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + localStorage.getItem("access_token");
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => error.response
);

export default api;
